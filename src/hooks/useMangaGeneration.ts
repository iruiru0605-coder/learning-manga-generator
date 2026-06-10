import { useCallback } from 'react'
import { useStore } from '@/store'
import { buildMangaPrompt } from '@/services/promptBuilder'
import { getProvider } from '@/services/ai/registry'
import type { MangaScript } from '@/types'

function cleanJsonResponse(raw: string): string {
  const cleaned = raw
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/g, '')
    .trim()
  return cleaned
}

export function useMangaGeneration() {
  const apiKey = useStore((s) => s.apiKey)
  const provider = useStore((s) => s.provider)
  const unit = useStore((s) => s.unit)
  const struggle = useStore((s) => s.struggle)
  const setScript = useStore((s) => s.setScript)
  const setStatus = useStore((s) => s.setStatus)
  const setError = useStore((s) => s.setError)

  const generate = useCallback(async () => {
    if (!unit || !struggle.trim()) return

    setStatus('generating')
    setError(null)

    try {
      const { systemPrompt, userPrompt } = buildMangaPrompt(unit, struggle)
      const ai = getProvider(provider)

      const response = await ai.generate({
        systemPrompt,
        userPrompt,
        model: 'deepseek-chat',
        apiKey,
      })

      const jsonStr = cleanJsonResponse(response.content)
      const script: MangaScript = JSON.parse(jsonStr)

      if (!script.pages || !Array.isArray(script.pages)) {
        throw new Error('応答の形式が正しくありません。もう一度お試しください。')
      }

      setScript(script)
    } catch (err) {
      const msg = err instanceof Error ? err.message : '生成中にエラーが発生しました'
      setError(msg)
    }
  }, [unit, struggle, apiKey, provider, setScript, setStatus, setError])

  return { generate }
}
