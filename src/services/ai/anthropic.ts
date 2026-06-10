import type { AIProvider, GenerationRequest, GenerationResponse, ProviderId } from '@/types'

export class AnthropicProvider implements AIProvider {
  id: ProviderId = 'anthropic'

  async generate(req: GenerationRequest): Promise<GenerationResponse> {
    const res = await fetch(req.baseUrl || 'https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': req.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: req.model,
        max_tokens: 6000,
        system: req.systemPrompt,
        messages: [{ role: 'user', content: req.userPrompt }],
      }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error?.message || `APIエラー (${res.status})`)
    }

    const data = await res.json()
    return {
      content: data.content[0].text,
      model: data.model,
      usage: {
        inputTokens: data.usage?.input_tokens ?? 0,
        outputTokens: data.usage?.output_tokens ?? 0,
      },
    }
  }
}
