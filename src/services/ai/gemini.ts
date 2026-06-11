import type { AIProvider, GenerationRequest, GenerationResponse, ProviderId } from '@/types'
import { getApiBaseUrl } from './utils'

/**
 * Gemini をテキスト（台本）生成にも使えるようにするプロバイダー。
 * 無料枠があるため、画像生成と同じキー1本で全機能を試せる。
 */
export class GeminiProvider implements AIProvider {
  id: ProviderId = 'gemini'

  async generate(req: GenerationRequest): Promise<GenerationResponse> {
    const path = `/v1beta/models/${req.model}:generateContent`
    const baseUrl = req.baseUrl || `${getApiBaseUrl('gemini')}${path}`
    const url = import.meta.env.DEV ? baseUrl : `${baseUrl}?key=${encodeURIComponent(req.apiKey)}`

    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (import.meta.env.DEV) {
      headers['x-goog-api-key'] = req.apiKey
    }

    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: req.systemPrompt }] },
        contents: [{ parts: [{ text: req.userPrompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 16000,
        },
      }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error?.message || `APIエラー (${res.status})`)
    }

    const data = await res.json()
    const parts = data.candidates?.[0]?.content?.parts
    const content = Array.isArray(parts) ? parts.map((p: { text?: string }) => p.text ?? '').join('') : ''
    if (!content) {
      throw new Error('Geminiから台本テキストが返ってきませんでした。もう一度お試しください。')
    }

    return {
      content,
      model: req.model,
      usage: {
        inputTokens: data.usageMetadata?.promptTokenCount ?? 0,
        outputTokens: data.usageMetadata?.candidatesTokenCount ?? 0,
      },
    }
  }
}
