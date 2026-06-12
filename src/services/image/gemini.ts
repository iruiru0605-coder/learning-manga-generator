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

/**
 * 画像内テキストの全面禁止ルール。
 * プロンプトの「先頭」に置くこと — 台本側プロンプトに旧仕様のセリフ描画指示が
 * 含まれていても、これで明示的に無効化する。
 */
export const NO_TEXT_RULE =
  'CRITICAL TEXT POLICY — THIS RULE OVERRIDES EVERYTHING ELSE IN THIS PROMPT: ' +
  'Do NOT render any text, letters, numbers, or writing anywhere in the image. ' +
  'If any part of this prompt mentions dialogue text, speech bubble contents, labels, captions, sound effects, or chalkboard writing, ' +
  'IGNORE those words completely and draw the speech bubbles / boxes / signs EMPTY (blank white inside) instead. ' +
  'Speech bubbles must be drawn as shapes only, with nothing written inside them. Visual elements only.'

export function dataUrlToImageRef(dataUrl: string): ImageRef | null {
  const [header, data] = dataUrl.split(',')
  if (!data) return null
  const mimeType = header?.match(/:(.*?);/)?.[1] || 'image/png'
  return { mimeType, data }
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
 * アップロードされたキャラクター画像（三面図など）から、画像生成用の
 * キャラクター説明をテキストAI（gemini-2.5-flash・低コスト）で作る。
 */
export async function describeCharacterImage(dataUrl: string, apiKey: string): Promise<string> {
  const ref = dataUrlToImageRef(dataUrl)
  if (!ref) throw new Error('画像の読み込みに失敗しました')

  const model = 'gemini-2.5-flash'
  const url = import.meta.env.DEV
    ? `/api/gemini/v1beta/models/${model}:generateContent`
    : `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`

  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (import.meta.env.DEV) {
    headers['x-goog-api-key'] = apiKey
  }

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { inlineData: { mimeType: ref.mimeType, data: ref.data } },
            {
              text:
                'Describe this character precisely for an image-generation prompt: hair style and color, eyes, face, ' +
                'outfit, accessories, body proportions, and art style. Write 3-6 concise English sentences. ' +
                'Output only the description, no preamble.',
            },
          ],
        },
      ],
      generationConfig: { temperature: 0.3, maxOutputTokens: 1000 },
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || `Gemini APIエラー (${res.status})`)
  }

  const data = await res.json()
  const text = ((data.candidates?.[0]?.content?.parts ?? []) as { text?: string }[])
    .map((p) => p.text ?? '')
    .join('')
    .trim()
  if (!text) throw new Error('画像の説明を生成できませんでした。もう一度お試しください。')
  return text
}

/** アップロード画像の説明文から、キャラクター生成プロンプトを組み立てる */
export function buildCharacterPromptFromDescription(name: string, description: string): string {
  return `Character reference sheet for a Japanese educational manga character.
Single character, full body standing pose, front view, white background.

Name: ${name}
Appearance (from the uploaded reference image): ${description}

Style: Clean manga line art, black and white, simple shading, chibi-inspired proportions, cute and friendly expression.
Character design sheet, turnaround reference. Safe for children's educational materials.
Cartoon illustration, 2D anime art, G-rated content. No background, just the character on white.`
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
