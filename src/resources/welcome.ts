export const resources = [
    {
        uri: "demo://welcome",
        name: "Welcome Resource",
        description: "Returns a welcome message",
        mimeType: "text/plain",
    },
];

export function readResource(uri: string) {
    switch (uri) {
        case "demo://welcome":
            return {
                contents: [
                    {
                        uri: "demo://welcome",
                        mimeType: "text/plain",
                        text: "Welcome to my MCP Server!",
                    },
                ],
            };

        default:
            throw new Error(`Resource not found: ${uri}`);
    }
}