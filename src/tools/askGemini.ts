import { askGemini } from "../services/gemini.js";

export const tools = [
  {
    name: "askGemini",
    description: "Ask a question to Gemini AI",
    inputSchema: {
      type: "object",
      properties: {
        prompt: {
          type: "string",
          description: "Question for Gemini",
        },
      },
      required: ["prompt"],
    },
  },
];

export async function handleAskGemini(args: { prompt: string }) {
  try {
    const response = await askGemini(args.prompt);

    return {
      content: [
        {
          type: "text",
          text: response,
        },
      ],
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown Gemini error";

    if (message.includes("401") || message.includes("UNAUTHENTICATED")) {
      throw new Error(
        "Gemini authentication failed. Set a valid GEMINI_API_KEY from Google AI Studio in your .env file."
      );
    }

    throw error;
  }
}