import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
    ListResourcesRequestSchema,
    ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { tools as greetTools, handleGreet } from "./tools/greet.js";
import { tools as addTools, handleAdd } from "./tools/add.js";
import { readResource } from "./resources/welcome.js";
import {
    tools as geminiTools,
    handleAskGemini,
} from "./tools/askGemini.js";

import { askGemini } from "./services/gemini.js";

const allTools = [...greetTools, ...addTools, ...geminiTools];
const server = new Server(
    {
        name: "demo-server",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
            resources: {},
        },
    }
);


server.setRequestHandler(ListToolsRequestSchema, async () => ({    tools: allTools,
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    if (name === "greet") {
        return handleGreet((args ?? {}) as { name?: string });
    }

    if (name === "add") {
        return handleAdd((args ?? {}) as { a?: number; b?: number });
    }

    if (name === "askGemini") {
        const prompt = args?.prompt;
    
        if (typeof prompt !== "string" || !prompt.trim()) {
            throw new Error("Prompt is required");
        }
    
        return await handleAskGemini({ prompt });
    }

    throw new Error(`Unknown tool: ${name}`);
});

server.setRequestHandler(
    ListResourcesRequestSchema,
    async () => ({
        resources: [
            {
                uri: "demo://welcome",
                name: "Welcome Resource",
                description: "A simple welcome message",
                mimeType: "text/plain",
            },
        ],
    })
);

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    return readResource(request.params.uri);
});

const transport = new StdioServerTransport();
console.error("MCP Server Started");

await server.connect(transport);