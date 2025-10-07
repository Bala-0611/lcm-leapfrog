
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: apiKey! });

export const getLcmExplanation = async (num1: number, num2: number, lcm: number): Promise<string> => {
  if (!apiKey) {
    return "The AI explainer is not configured. Please check the API key.";
  }
  
  try {
    const prompt = `
      You are a friendly and encouraging teacher explaining a math concept to a 10-year-old.
      Explain the concept of the Least Common Multiple (LCM) using a simple, real-world analogy.
      The two numbers are ${num1} and ${num2}, and their LCM is ${lcm}.
      Keep the explanation short (2-3 sentences), fun, and easy to understand.
      Do not use complex math terms.
      Start the explanation with a phrase like "Here's another way to think about it..." or "Imagine this...".
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
       config: {
        // Disable thinking for a faster, more direct response suitable for this simple task
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching Gemini explanation:", error);
    return "Oops! Our AI friend is taking a nap. But great job finding the answer yourself!";
  }
};
