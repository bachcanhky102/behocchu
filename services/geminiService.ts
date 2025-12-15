import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Generates a short, simple rhyming sentence for children about a specific object.
 */
export const generateFunRhyme = async (word: string): Promise<string> => {
  try {
    const prompt = `Bạn là một người kể chuyện vui tính cho trẻ mầm non.
    Hãy viết một câu thơ ngắn (2 câu) hoặc một câu nói vần điệu vui nhộn, thật đơn giản về từ: "${word}".
    Không dùng từ khó. Chỉ trả về nội dung câu thơ/câu nói.
    Ví dụ cho 'Con Mèo': "Meo meo rửa mặt như mèo, Xấu xấu lắm chẳng được mẹ yêu."`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || `Bé học chữ thật vui với ${word}!`;
  } catch (error) {
    console.error("Gemini Error:", error);
    return `Cùng bé chơi với ${word} nào!`;
  }
};
