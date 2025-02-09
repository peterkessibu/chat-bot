import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Define the system prompt with a clear and structured message
const systemPrompt = `You are chat assistant. You are helping a user to find a job
`;

export async function POST(req: NextRequest) {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
    defaultHeaders: {
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "Headstarter Gh",
    },
  });
  const data = await req.json();
  const messages = Array.isArray(data) ? data : [data];
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    model: "deepseek/deepseek-r1-distill-llama-8b",
    stream: true,
  });

  let accumulatedResponse = '';

  try {
    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        accumulatedResponse += content;
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }

  return new NextResponse(accumulatedResponse);
}