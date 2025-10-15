import { NextResponse } from "next/server"
import type { Message } from "@/lib/storage"

interface GeminiMessage {
  role: "user" | "model"
  parts: Array<{ text: string }>
}

export async function POST(request: Request) {
  try {
    const { message, history } = (await request.json()) as { message: string; history: Message[] }

    if (!message || !Array.isArray(history)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Server Gemini API key not configured" }, { status: 500 })
    }

    const contents: GeminiMessage[] = [
      {
        role: "user",
        parts: [
          {
            text:
              "You are Valentino AI, a compassionate AI therapist and relationship guide. Your role is to:\n\n- Provide empathetic, supportive responses to users' emotional needs\n- Help users express their feelings about relationships and personal growth\n- Offer gentle guidance and therapeutic insights\n- Maintain a warm, understanding, and non-judgmental tone\n- Keep responses concise but meaningful (2-4 sentences)\n- Focus on emotional support and relationship advice\n- Avoid giving medical advice or replacing professional therapy\n\nRemember: You're here to help users process their emotions and improve their relationships through thoughtful conversation.",
          },
        ],
      },
      ...history
        .filter((m) => m.type !== "options")
        .map((m) => ({ role: m.type === "user" ? ("user" as const) : ("model" as const), parts: [{ text: m.content }] })),
      { role: "user", parts: [{ text: message }] },
    ]

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: { temperature: 0.7, maxOutputTokens: 300, topP: 0.8, topK: 40 },
        }),
      },
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        { error: `Gemini API error: ${response.status} - ${errorData?.error?.message || "Unknown error"}` },
        { status: 502 },
      )
    }

    const data = await response.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
    if (!text) {
      return NextResponse.json({ error: "Invalid response format from Gemini API" }, { status: 502 })
    }

    return NextResponse.json({ text })
  } catch (error) {
    return NextResponse.json({ error: "Failed to get AI response" }, { status: 500 })
  }
}


