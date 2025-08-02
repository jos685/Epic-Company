import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // Changed to secure key
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const systemPrompt = `
      You are Epic AI, a helpful assistant for epicsoftwares.shop.
      - For pricing, say: "Our eCommerce packages start at $500."
      - For hosting, say: "Yes, we offer hosting support."
      - If unsure, reply: "Please contact our support team."
    `;

    const chat = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
    });

    return NextResponse.json({ reply: chat.choices[0].message.content });

  } catch (error: any) {
    console.error('Epic AI error:', error);

    // Specific handling for OpenAI quota exceeded (429)
    if (error.status === 429 || error.code === 'insufficient_quota') {
      return NextResponse.json({
        reply: "Epic AI is temporarily unavailable due to usage limits. Please try again later or contact support."
      }, { status: 429 });
    }

    // Optional: development fallback
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({ reply: "Mock response: This is a dev environment fallback." });
    }

    return NextResponse.json(
      { error: 'Something went wrong with Epic AI.' },
      { status: 500 }
    );
  }
}
