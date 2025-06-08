import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_CLAUDE_API_KEY,
});

export async function remixContent(prompt: string): Promise<string> {
  if (!import.meta.env.VITE_CLAUDE_API_KEY) {
    throw new Error('Claude API key is missing. Please set VITE_CLAUDE_API_KEY in your .env file.');
  }

  const msg = await anthropic.messages.create({
    model: "claude-opus-4-20250514",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  return msg.content?.[0]?.text || '';
} 