import { Message } from './storage';

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: Array<{
    text: string;
  }>;
}

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export const callGemini = async (message: string, conversationHistory: Message[]): Promise<string> => {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history: conversationHistory }),
  })
  const data = await res.json().catch(() => ({} as any))
  if (!res.ok) {
    // Surface server-provided details to help debugging
    const details = data?.details || data?.message || data?.error || `HTTP ${res.status}`
    throw new Error(typeof details === "string" ? details : JSON.stringify(details))
  }
  if (!data?.text) throw new Error("Empty response from AI")
  return data.text
};


export const generateChatTitle = async (firstMessage: string): Promise<string> => {
  const res = await fetch("/api/title", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstMessage }),
  })
  const data = await res.json().catch(() => ({} as any))
  if (!res.ok) return "New Session"
  return data.text || "New Session"
};


