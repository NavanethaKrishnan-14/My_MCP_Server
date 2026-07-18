export const tools = [
    {
        name: "greet",
        description: "Greets a user",
        inputSchema: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    description: "Name of the person",
                },
            },
            required: ["name"],
        },
    },
];

export function handleGreet(args: { name?: string }) {
    const name = args.name ?? "there";
    return {
        content: [{ type: "text" as const, text: `Hello, ${name}! Welcome to the MCP server.` }],
    };
}