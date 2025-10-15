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
  if (!res.ok) {
    const data = await res.json().catch(() => ({} as any))
    throw new Error(data?.error || "Failed to get AI response")
  }
  const data = (await res.json()) as { text: string }
  return data.text
};


export const generateChatTitle = async (firstMessage: string): Promise<string> => {
  const res = await fetch("/api/title", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstMessage }),
  })
  if (!res.ok) return "New Session"
  const data = (await res.json()) as { text: string }
  return data.text || "New Session"
};


