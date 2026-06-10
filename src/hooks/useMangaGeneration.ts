import { useCallback } from 'react'
import { useStore } from '@/store'
import { buildMangaPrompt } from '@/services/promptBuilder'
import { getProvider } from '@/services/ai/registry'
import { extractAndParseJSON } from '@/services/jsonRepair'
import type { MangaScript } from '@/types'

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

      const parsed = extractAndParseJSON(response.content)

      if (!parsed.pages || !Array.isArray(parsed.pages)) {
        throw new Error('生成された台本にページデータが含まれていません。もう一度お試しください。')
      }

      const script = parsed as unknown as MangaScript
      setScript(script)
    } catch (err) {
      const msg = err instanceof Error ? err.message : '生成中にエラーが発生しました'
      setError(msg)
    }
  }, [unit, struggle, apiKey, provider, setScript, setStatus, setError])

  return { generate }
}
