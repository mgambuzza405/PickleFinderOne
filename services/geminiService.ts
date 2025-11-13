
import { GoogleGenAI } from "@google/genai";
import { Court } from '../types';

export async function findPickleballCourts(zipCode: string) {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `Find public pickleball courts in or near US zip code ${zipCode}. For each court, provide its name, full address, and a brief description. Format each entry on its own set of lines, separated by a blank line, like this example:
**Court Name**
Address: Full Address
Description: Brief Description`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      tools: [{ googleMaps: {} }],
    },
  });

  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const textResponse = response.text;
  
  return { textResponse, groundingChunks };
}
