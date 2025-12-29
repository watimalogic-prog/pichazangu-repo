
import { GoogleGenAI } from "@google/genai";

// Always use new GoogleGenAI({ apiKey: process.env.API_KEY }) directly.
// Create the instance right before the call to ensure the latest API key is used.
export const analyzePhoto = async (imageBase64: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: imageBase64, mimeType: 'image/jpeg' } },
          { text: 'Analyze this photo taken in East Africa. Provide a descriptive title, relevant tags (including location if identifiable), and suggest a commercial or editorial license category.' }
        ]
      }
    });
    // The response.text property directly returns the generated string.
    return response.text;
  } catch (error) {
    console.error('Error analyzing photo:', error);
    return null;
  }
};
