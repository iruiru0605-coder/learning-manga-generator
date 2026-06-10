import type { AIProvider, GenerationRequest, GenerationResponse, ProviderId } from '@/types'
import { getApiBaseUrl } from './utils'

export class DeepSeekProvider implements AIProvider {
  id: ProviderId = 'deepseek'

  async generate(req: GenerationRequest): Promise<GenerationResponse> {
    const baseUrl = req.baseUrl || `${getApiBaseUrl('deepseek')}/v1/chat/completions`
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${req.apiKey}`,
      },
      body: JSON.stringify({
        model: req.model,
        messages: [
          { role: 'system', content: req.systemPrompt },
          { role: 'user', content: req.userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 16000,
      }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error?.message || `APIエラー (${res.status})`)
    }

    const data = await res.json()
    return {
      content: data.choices[0].message.content,
      model: data.model,
      usage: {
        inputTokens: data.usage?.prompt_tokens ?? 0,
        outputTokens: data.usage?.completion_tokens ?? 0,
      },
    }
  }
}
