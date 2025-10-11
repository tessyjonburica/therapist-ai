import { Message } from './storage';

// Note: This file now uses Google Gemini API instead of OpenAI

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
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('Gemini API key not found. Please add NEXT_PUBLIC_GEMINI_API_KEY to your environment variables.');
  }

  // Convert conversation history to Gemini format
  const contents: GeminiMessage[] = [
    {
      role: 'user',
      parts: [{ text: `You are Valentino AI, a compassionate AI therapist and relationship guide. Your role is to:

- Provide empathetic, supportive responses to users' emotional needs
- Help users express their feelings about relationships and personal growth
- Offer gentle guidance and therapeutic insights
- Maintain a warm, understanding, and non-judgmental tone
- Keep responses concise but meaningful (2-4 sentences)
- Focus on emotional support and relationship advice
- Avoid giving medical advice or replacing professional therapy

Remember: You're here to help users process their emotions and improve their relationships through thoughtful conversation.` }]
    },
    ...conversationHistory
      .filter(msg => msg.type !== 'options') // Filter out option buttons
      .map(msg => ({
        role: msg.type === 'user' ? 'user' as const : 'model' as const,
        parts: [{ text: msg.content }]
      })),
    { role: 'user', parts: [{ text: message }] }
  ];

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300,
          topP: 0.8,
          topK: 40
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts[0]) {
      throw new Error('Invalid response format from Gemini API');
    }

    return data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error('Gemini API call failed:', error);
    
    // Return a fallback response if API fails
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('Please check your Gemini API key configuration.');
      }
      if (error.message.includes('rate limit')) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      }
      if (error.message.includes('quota')) {
        throw new Error('API quota exceeded. Please check your Gemini account.');
      }
    }
    
    throw new Error('Failed to get AI response. Please try again.');
  }
};

// Helper function to generate conversation titles
export const generateChatTitle = async (firstMessage: string): Promise<string> => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      return 'New Session';
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `Generate a short, descriptive title (3-5 words) for a therapy conversation based on the first message. Return only the title, nothing else.

First message: "${firstMessage}"` }]
          }
        ],
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 20,
          topP: 0.8,
          topK: 40
        }
      })
    });

    if (!response.ok) {
      return 'New Session';
    }

    const data: GeminiResponse = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text?.trim() || 'New Session';
  } catch (error) {
    console.error('Error generating chat title:', error);
    return 'New Session';
  }
};
