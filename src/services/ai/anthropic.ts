import type { AIProvider, GenerationRequest, GenerationResponse, ProviderId } from '@/types'
import { getApiBaseUrl } from './utils'

export class AnthropicProvider implements AIProvider {
  id: ProviderId = 'anthropic'

  async generate(req: GenerationRequest): Promise<GenerationResponse> {
    const baseUrl = req.baseUrl || `${getApiBaseUrl('anthropic')}/v1/messages`
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': req.apiKey,
        'anthropic-version': '2023-06-01',
        // 静的サイトのためブラウザから直接呼び出す（キーはユーザー自身のもの）
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: req.model,
        max_tokens: 16000,
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
