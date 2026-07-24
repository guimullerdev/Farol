import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

/**
 * Reserved for analyses that require more reasoning than the local model
 * can deliver. Don't use it for classification/summarization/ticker
 * extraction — that stays with Ollama.
 */
export async function analyzeWithClaude(model: string, prompt: string): Promise<string> {
  const message = await client.messages.create({
    model,
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });
  const block = message.content[0];
  return block?.type === 'text' ? block.text : '';
}
