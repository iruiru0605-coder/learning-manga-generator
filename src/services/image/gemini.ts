/**
 * Gemini image generation via Gemini 2.5 Flash Image (Nano Banana) API.
 * Uses the Gemini generateContent endpoint with responseModalities: ["IMAGE", "TEXT"].
 */

export interface ImageGenRequest {
  prompt: string
  apiKey: string
  referenceImageUrl?: string
}

export interface ImageGenResponse {
  imageData: string // base64 encoded image
  mimeType: string
}

function getBaseUrl(): string {
  if (import.meta.env.DEV) {
    return '/api/gemini/v1beta/models/gemini-2.5-flash-image:generateContent'
  }
  return 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent'
}

export async function generateImage(req: ImageGenRequest): Promise<ImageGenResponse> {
  const url = import.meta.env.DEV
    ? `${getBaseUrl()}`
    : `${getBaseUrl()}?key=${encodeURIComponent(req.apiKey)}`

  const parts: Record<string, unknown>[] = [{ text: req.prompt }]

  // If reference image URL is provided, include it
  if (req.referenceImageUrl) {
    try {
      // Fetch the reference image and include as base64
      const imgRes = await fetch(req.referenceImageUrl)
      if (imgRes.ok) {
        const blob = await imgRes.blob()
        const buffer = await blob.arrayBuffer()
        const base64 = btoa(
          new Uint8Array(buffer).reduce((d, b) => d + String.fromCharCode(b), '')
        )
        const mimeType = blob.type || 'image/png'
        parts.unshift({
          inlineData: {
            mimeType,
            data: base64,
          },
        })
      }
    } catch {
      // Silently continue without reference image if fetch fails
    }
  }

  const body: Record<string, unknown> = {
    contents: [
      {
        parts,
      },
    ],
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

  // Extract image from response
  const parts2 = data.candidates?.[0]?.content?.parts
  if (!parts2) {
    throw new Error('Geminiから画像が返ってきませんでした。プロンプトを調整してもう一度お試しください。')
  }

  for (const part of parts2) {
    if (part.inlineData) {
      return {
        imageData: part.inlineData.data,
        mimeType: part.inlineData.mimeType || 'image/png',
      }
    }
  }

  throw new Error('Geminiからの応答に画像データが含まれていませんでした。')
}
