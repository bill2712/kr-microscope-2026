import { GoogleGenAI, Type, Schema } from "@google/genai";
import { QuizQuestion, Language } from "../types";

// Helper to get the API key
const getApiKey = (): string | undefined => {
  return process.env.API_KEY;
};

export const generateQuiz = async (language: Language): Promise<QuizQuestion[]> => {
  const apiKey = getApiKey();
  if (!apiKey) {

    // Fallback static data if API key is missing (for demo reliability)
    return [
      {
        question: language === 'zh' ? "顯微鏡的哪個部分是你眼睛看的地方？" : "Which part of the microscope do you look through?",
        options: language === 'zh' ? ["目鏡", "物鏡", "載物台", "反光鏡"] : ["Eyepiece", "Objective Lens", "Stage", "Mirror"],
        correctAnswerIndex: 0,
        explanation: language === 'zh' ? "目鏡是位於顯微鏡頂端的鏡頭，你的眼睛通過它來觀察。" : "The eyepiece is the lens at the top that you look through."
      },
      {
        question: language === 'zh' ? "如果你想看更清楚，應該調節什麼？" : "What should you adjust to make the image clearer?",
        options: language === 'zh' ? ["反光鏡", "準焦螺旋", "底座", "鏡臂"] : ["Mirror", "Focus Knob", "Base", "Arm"],
        correctAnswerIndex: 1,
        explanation: language === 'zh' ? "準焦螺旋用來調整焦距，讓影像從模糊變清晰。" : "Focus knobs move the stage to bring the image into sharp focus."
      },
      {
        question: language === 'zh' ? "我們把標本放在什麼上面？" : "What do we place the specimen on?",
        options: language === 'zh' ? ["載玻片", "蓋玻片", "培養皿", "試管"] : ["Slide", "Cover slip", "Petri dish", "Test tube"],
        correctAnswerIndex: 0,
        explanation: language === 'zh' ? "標本通常放置在長方形的玻璃載玻片上。" : "Specimens are placed on a glass slide to be viewed."
      }
    ];
  }

  const ai = new GoogleGenAI({ apiKey });

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      questions: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctAnswerIndex: { type: Type.INTEGER },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctAnswerIndex", "explanation"]
        }
      }
    }
  };

  const prompt = `Generate 3 fun and simple multiple-choice questions about microscopes, biology, or science experiments suitable for an 8-year-old child. 
  The language MUST be ${language === 'zh' ? 'Traditional Chinese (Cantonese context preferred but standard TC is fine)' : 'English'}.
  Ensure the questions are encouraging and educational.
  Return only JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    const data = JSON.parse(text);
    return data.questions;

  } catch (error) {

    throw error;
  }
};
