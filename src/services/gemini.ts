import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
console.error(
  "GEMINI_API_KEY:",
  apiKey ? `${apiKey.slice(0, 6)}...${apiKey.slice(-3)}` : "Not Found"
);

export async function askGemini(prompt: string): Promise<string> {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text ?? "No response";
}