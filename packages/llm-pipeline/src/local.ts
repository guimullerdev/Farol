import ollama from 'ollama';

/**
 * News classification/summarization and ticker extraction always run on
 * local Ollama — the paid API is reserved for analyses that require
 * heavier reasoning (see CLAUDE.md).
 */
export async function classifyWithOllama(model: string, text: string): Promise<string> {
  const response = await ollama.generate({ model, prompt: text });
  return response.response;
}
