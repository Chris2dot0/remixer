import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_CLAUDE_API_KEY,
  dangerouslyAllowBrowser: true,
});

const tweetFromPostPrompt = `You are a social media expert and ghostwriter. 

You work for a popular blogger, and your job is to take their blog post and come up with a variety of tweets to share ideas from the post. 

Since you are a ghostwriter, you need to make sure to follow the style, tone, and voice of the blog post as closely as possible.

Remember: Tweets cannot be longer than 280 characters.

Please return the tweets in a list format, with each tweet on a new line, and be sure to include at least five tweets.

Do not use any hashtags or emojis. 

Here is the blog post: `

export async function remixContent(prompt: string): Promise<string> {
  if (!import.meta.env.VITE_CLAUDE_API_KEY) {
    throw new Error('Claude API key is missing. Please set VITE_CLAUDE_API_KEY in your .env file.');
  }

  const msg = await anthropic.messages.create({
    model: "claude-opus-4-20250514",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  return msg.content?.[0]?.type === 'text' ? msg.content[0].text : '';
}

export async function tweetsFromPost(content: string): Promise<string> {
  if (!import.meta.env.VITE_CLAUDE_API_KEY) {
    throw new Error('Claude API key is missing. Please set VITE_CLAUDE_API_KEY in your .env file.');
  }

  const msg = await anthropic.messages.create({
    model: "claude-opus-4-20250514",
    max_tokens: 1024,
    messages: [{ role: "user", content: `${tweetFromPostPrompt} ${content}` }],
  });

  return msg.content?.[0]?.type === 'text' ? msg.content[0].text : '';
} 