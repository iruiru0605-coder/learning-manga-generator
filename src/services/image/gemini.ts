/**
 * Gemini image generation via Gemini 2.5 Flash Image (Nano Banana) API.
 * Uses the Gemini generateContent endpoint with responseModalities: ["IMAGE", "TEXT"].
 */

export const IMAGE_MODELS = {
  /** Nano Banana: 安価だが日本語の文字描画が苦手（文字なし運用） */
  standard: 'gemini-2.5-flash-image',
  /** Nano Banana Pro: 高価だが日本語を含む文字描画に強い */
  pro: 'gemini-3-pro-image-preview',
} as const

export interface ImageRef {
  mimeType: string
  data: string // base64
}

export interface ImageGenRequest {
  prompt: string
  apiKey: string
  referenceImages?: ImageRef[]
  model?: string
}

export interface ImageGenResponse {
  imageData: string // base64
  mimeType: string
}

function getBaseUrl(model: string): string {
  if (import.meta.env.DEV) {
    return `/api/gemini/v1beta/models/${model}:generateContent`
  }
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`
}

export async function generateImage(req: ImageGenRequest): Promise<ImageGenResponse> {
  const model = req.model || IMAGE_MODELS.standard
  const url = import.meta.env.DEV
    ? getBaseUrl(model)
    : `${getBaseUrl(model)}?key=${encodeURIComponent(req.apiKey)}`

  const parts: Record<string, unknown>[] = []

  // Include reference images first (character references for consistency)
  if (req.referenceImages) {
    for (const ref of req.referenceImages) {
      parts.push({
        inlineData: {
          mimeType: ref.mimeType,
          data: ref.data,
        },
      })
    }
  }

  // Then the text prompt
  parts.push({ text: req.prompt })

  const body: Record<string, unknown> = {
    contents: [{ parts }],
    generationConfig: {
      responseModalities: ['IMAGE', 'TEXT'],
    },
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (import.meta.env.DEV) {
    headers['x-goog-api-key'] = req.apiKey
  }

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    const msg = err.error?.message || `Gemini APIエラー (${res.status})`
    throw new Error(msg)
  }

  const data = await res.json()

  const respParts = data.candidates?.[0]?.content?.parts
  if (!respParts) {
    throw new Error('Geminiから画像が返ってきませんでした。プロンプトを調整してもう一度お試しください。')
  }

  for (const part of respParts) {
    if (part.inlineData) {
      return {
        imageData: part.inlineData.data,
        mimeType: part.inlineData.mimeType || 'image/png',
      }
    }
  }

  throw new Error('Geminiからの応答に画像データが含まれていませんでした。')
}

/**
 * Shortcut: generate character reference image from a description.
 */
export function buildCharacterPrompt(character: {
  name: string
  role?: string
  appearance: string
  personality: string
}): string {
  return `Character reference sheet for a Japanese educational manga character.
Single character, full body standing pose, front view, white background.

Name: ${character.name}
Role: ${character.role || 'Character'}
Appearance: ${character.appearance}
Personality: ${character.personality}

Style: Clean manga line art, black and white, simple shading, chibi-inspired proportions, cute and friendly expression.
Character design sheet, turnaround reference. Safe for children's educational materials.
Cartoon illustration, 2D anime art, G-rated content. No background, just the character on white.`
}
