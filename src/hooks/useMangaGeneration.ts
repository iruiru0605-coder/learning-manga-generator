import { useCallback } from 'react'
import { useStore } from '@/store'
import { buildMangaPrompt } from '@/services/promptBuilder'
import { getProvider, getDefaultModel } from '@/services/ai/registry'
import { extractAndParseJSON } from '@/services/jsonRepair'
import { toFriendlyErrorMessage } from '@/services/friendlyError'
import { idbClearPageImages } from '@/services/imageStore'
import type { MangaScript } from '@/types'

export function useMangaGeneration() {
  const apiKey = useStore((s) => s.apiKey)
  const provider = useStore((s) => s.provider)
  const unit = useStore((s) => s.unit)
  const struggle = useStore((s) => s.struggle)
  const grade = useStore((s) => s.grade)
  const subject = useStore((s) => s.subject)
  const characterImageUrl = useStore((s) => s.characterImageUrl)
  const studentName = useStore((s) => s.studentName)
  const studentGender = useStore((s) => s.studentGender)
  const characterNotes = useStore((s) => s.characterNotes)
  const pageCount = useStore((s) => s.pageCount)
  const setScript = useStore((s) => s.setScript)
  const setStatus = useStore((s) => s.setStatus)
  const setError = useStore((s) => s.setError)
  const setLastUsage = useStore((s) => s.setLastUsage)

  const generate = useCallback(async () => {
    if (!unit || !struggle.trim()) return

    setStatus('generating')
    setError(null)

    try {
      const { systemPrompt, userPrompt } = buildMangaPrompt(unit, struggle, grade, subject, characterImageUrl, {
        studentName,
        studentGender,
        characterNotes,
      }, pageCount)
      const ai = getProvider(provider)

      const response = await ai.generate({
        systemPrompt,
        userPrompt,
        model: getDefaultModel(provider),
        apiKey,
      })

      const parsed = extractAndParseJSON(response.content)

      if (!parsed.pages || !Array.isArray(parsed.pages)) {
        throw new Error('生成された台本にページデータが含まれていません。もう一度お試しください。')
      }

      if (response.usage) {
        setLastUsage({ ...response.usage, providerId: provider })
      }

      // 古い台本のページ画像が新しい台本に紛れ込まないように消す
      await idbClearPageImages().catch(() => {})

      const script = parsed as unknown as MangaScript
      setScript(script)
    } catch (err) {
      setError(toFriendlyErrorMessage(err, '生成中にエラーが発生しました'))
    }
  }, [unit, struggle, grade, subject, characterImageUrl, studentName, studentGender, characterNotes, pageCount, apiKey, provider, setScript, setStatus, setError, setLastUsage])

  return { generate }
}
