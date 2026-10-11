import ollama from "ollama";

export const MODEL = "qwen3:4b";

export async function askModel(messages, tools = undefined) {
  const response = await ollama.chat({
    model: MODEL,
    messages,
    ...(tools ? { tools } : {}),
    stream: false
  });

  return response.message;
}