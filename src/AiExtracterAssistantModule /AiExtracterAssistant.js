import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";
import { content } from "./sysContent.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

let conversationHistory = [];

export async function AiExtractorAssistant(userInput) {
  // Add user input to conversation history
  conversationHistory.push({ role: "user", parts: [{ text: userInput }] });

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 300,
      topP: 1,
      topK: 1,
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_NONE",
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_NONE",
      },
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_NONE",
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_NONE",
      },
    ],
  });
  const chat = await model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: `STRICT RULES:
  You are Cooksy 🍳, a structured cooking assistant (she/her).
  Always reply in a valid JSON object using this format ONLY:
  {
    "recipe_name": "",
    "ingredients": [],
    "msg": "your message here",
    "ready": true/false,
    "search_mode": ""
  }
  Never explain yourself. No markdown. No line breaks. Never reply with plain text.
  
  ${content}`,
          },
        ],
      },
      ...conversationHistory,
    ],
  });

  try {
    const result = await chat.sendMessage(userInput);
    const rawContent = result.response.text();
    const data = {
      choices: [{ message: { content: rawContent } }],
    };

    const parsed = validateJsonStructure(data);

    // Add assistant reply to conversation history
    conversationHistory.push({
      role: "model",
      parts: [{ text: JSON.stringify(parsed) }],
    });

    return parsed;
  } catch (error) {
    return handleErrors(error);
  }
}

function validateJsonStructure(data) {
  try {
    const parsed = extractJsonContent(data);

    const isValid = [
      "recipe_name" in parsed,
      "ingredients" in parsed && Array.isArray(parsed.ingredients),
      "msg" in parsed && typeof parsed.msg === "string",
      "ready" in parsed && typeof parsed.ready === "boolean",
      "search_mode" in parsed,
    ].every((check) => check === true);

    if (!isValid) throw new Error("Invalid response structure");

    parsed.msg = parsed.msg
      .replace(/[\n\*\-•]/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim();

    return parsed;
  } catch (error) {
    console.error("Validation failed:", error);
    return fallbackResponse();
  }
}

function extractJsonContent(data) {
  const raw = data.choices?.[0]?.message?.content || "";

  const noMarkdown = raw.replace(/```json|```/g, "").trim();

  const startIndex = noMarkdown.indexOf("{");
  if (startIndex === -1) {
    console.warn("❌ No '{' found in Gemini output");
    throw new Error("No JSON start found.");
  }

  let cleaned = noMarkdown.slice(startIndex).trim();

  if (!cleaned.endsWith("}")) {
    cleaned += "}";
  }

  try {
    return JSON.parse(cleaned);
  } catch (e) {
    console.warn("🧨 Failed to parse JSON. Cleaned content:\n", cleaned);
    throw new Error("Invalid JSON returned from AI");
  }
}

function handleErrors(error) {
  console.error("Processing error:", error);
  return fallbackResponse();
}

function fallbackResponse() {
  return {
    recipe_name: "",
    ingredients: [],
    msg: "Let's focus on recipes! How can I assist with your cooking needs? 🍳",
    ready: false,
    search_mode: "",
  };
}

export default AiExtractorAssistant;
