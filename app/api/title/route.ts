import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { firstMessage } = (await request.json()) as { firstMessage: string }

    if (!firstMessage) {
      return NextResponse.json({ error: "Missing firstMessage" }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Server Gemini API key not configured" }, { status: 500 })
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Generate a short, descriptive title (3-5 words) for a therapy conversation based on the first message. Return only the title, nothing else.\n\nFirst message: "${firstMessage}"`,
                },
              ],
            },
          ],
          generationConfig: { temperature: 0.5, maxOutputTokens: 20, topP: 0.8, topK: 40 },
        }),
      },
    )

    if (!response.ok) {
      return NextResponse.json({ text: "New Session" })
    }

    const data = await response.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "New Session"
    return NextResponse.json({ text })
  } catch (error) {
    return NextResponse.json({ text: "New Session" })
  }
}


