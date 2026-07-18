export const tools = [
    {
        name: "add",
        description: "Adds two numbers",
        inputSchema: {
            type: "object",
            properties: {
                a: {
                    type: "number",
                    description: "First number",
                },
                b: {
                    type: "number",
                    description: "Second number",
                },
            },
            required: ["a", "b"],
        },
    },
];

export function handleAdd(args: { a?: number; b?: number }) {
    const a = args.a ?? 0;
    const b = args.b ?? 0;
    const sum = a + b;
    return {
        content: [{ type: "text" as const, text: `${a} + ${b} = ${sum}` }],
    };
}
