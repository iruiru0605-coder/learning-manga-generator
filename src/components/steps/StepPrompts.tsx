import { useState, useCallback } from 'react'
import { useStore } from '@/store'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { generateImage, buildCharacterPrompt, type ImageRef } from '@/services/image/gemini'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import type { MangaPage } from '@/types'

// ─── Types ────────────────────────────────────────────

interface CharGenState {
  status: 'idle' | 'generating' | 'done' | 'error'
  dataUrl?: string
  error?: string
}

interface PageGenState {
  status: 'idle' | 'generating' | 'done' | 'error'
  dataUrl?: string
  error?: string
}

// ─── Character Reference Card ────────────────────────

function CharacterCard({
  label,
  name,
  appearance,
  personality,
  state,
  onGenerate,
}: {
  label: string
  name: string
  appearance: string
  personality: string
  state: CharGenState
  onGenerate: () => void
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-start gap-4">
        {/* Preview or placeholder */}
        <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          {state.status === 'done' && state.dataUrl ? (
            <img src={state.dataUrl} alt={name} className="h-full w-full object-contain" />
          ) : state.status === 'generating' ? (
            <div className="flex h-full items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent" />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-center text-xs text-gray-400">
              未生成
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-xs font-medium text-indigo-700">
              {label}
            </span>
            <span className="text-sm font-bold text-gray-900">{name}</span>
          </div>
          <p className="mb-1 text-xs text-gray-500">{personality}</p>
          <p className="text-xs text-gray-400 line-clamp-2">{appearance}</p>
          {state.status === 'error' && (
            <p className="mt-1 text-xs text-red-600">{state.error}</p>
          )}
        </div>

        <Button
          variant={state.status === 'done' ? 'secondary' : 'primary'}
          size="sm"
          disabled={state.status === 'generating'}
          onClick={onGenerate}
        >
          {state.status === 'generating'
            ? '生成中...'
            : state.status === 'done'
              ? '再生成'
              : '生成する'}
        </Button>
      </div>
    </div>
  )
}

// ─── Page Card ────────────────────────────────────────

function PromptCard({
  page,
  isCopied,
  onCopy,
  pageState,
  onGenerate,
  hasApiKey,
}: {
  page: MangaPage
  isCopied: boolean
  onCopy: (text: string, id: string) => void
  pageState: PageGenState
  onGenerate: (pageNumber: number) => void
  hasApiKey: boolean
}) {
  const promptText = page.imageGenerationPrompt || ''

  return (
    <Card className="overflow-hidden">
      <div className="bg-indigo-50 px-4 py-2 flex items-center justify-between flex-wrap gap-2">
        <span className="text-sm font-bold text-indigo-900">
          ページ {page.pageNumber}: {page.title}
        </span>
        <div className="flex gap-2">
          <Button
            variant={isCopied ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onCopy(promptText, page.pageNumber.toString())}
          >
            {isCopied ? 'コピー済み ✓' : 'プロンプトをコピー'}
          </Button>
          {hasApiKey && (
            <Button
              variant="primary"
              size="sm"
              disabled={pageState.status === 'generating'}
              onClick={() => onGenerate(page.pageNumber)}
            >
              {pageState.status === 'generating'
                ? '生成中...'
                : pageState.status === 'done'
                  ? '再生成'
                  : '画像を生成'}
            </Button>
          )}
        </div>
      </div>

      {pageState.status === 'generating' && (
        <div className="bg-blue-50 px-4 py-3 text-center">
          <div className="mx-auto mb-2 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-blue-100">
            <div className="h-full animate-pulse rounded-full bg-blue-500" style={{ width: '60%' }} />
          </div>
          <p className="text-xs text-blue-700">Geminiで画像を生成中... 約5〜10秒</p>
        </div>
      )}

      {pageState.status === 'error' && (
        <div className="bg-red-50 px-4 py-2 text-xs text-red-700">
          {pageState.error || '画像生成に失敗しました'}
        </div>
      )}

      {pageState.status === 'done' && pageState.dataUrl && (
        <div className="border-b border-gray-200">
          <img
            src={pageState.dataUrl}
            alt={`Page ${page.pageNumber}`}
            className="w-full"
          />
        </div>
      )}

      <div className="p-4">
        <p className="mb-2 text-xs text-gray-500">{page.summary}</p>
        <div className="rounded-lg bg-gray-900 p-3">
          <pre className="whitespace-pre-wrap text-xs text-green-400 font-mono leading-relaxed max-h-48 overflow-y-auto">
            {promptText || '(画像生成プロンプトは生成されませんでした)'}
          </pre>
        </div>
      </div>
    </Card>
  )
}

// ─── Main Component ───────────────────────────────────

export function StepPrompts() {
  const script = useStore((s) => s.script)
  const imageApiKey = useStore((s) => s.imageApiKey)
  const { copiedId, copy } = useCopyToClipboard()

  // Character reference generation state
  const [charStates, setCharStates] = useState<Record<string, CharGenState>>({})

  // Page image generation state
  const [pageStates, setPageStates] = useState<Record<number, PageGenState>>({})
  const [isBulkGenerating, setIsBulkGenerating] = useState(false)

  const hasApiKey = !!imageApiKey.trim()
  const totalPages = script?.pages?.length || 0
  const estimatedCost = totalPages > 0 ? `約${Math.round(totalPages * 5.8)}円` : ''

  // ── Character References ────────────────────────────

  const charDesign = script?.characterDesign

  const characters = charDesign
    ? [
        {
          key: 'teacher',
          label: '先生役',
          ...charDesign.teacher,
        },
        {
          key: 'student',
          label: '生徒役',
          ...charDesign.student,
        },
        ...(charDesign.mascot
          ? [
              {
                key: 'mascot',
                label: 'マスコット',
                ...charDesign.mascot,
              },
            ]
          : []),
      ]
    : []

  const handleGenerateChar = useCallback(
    async (key: string) => {
      const char = characters.find((c) => c.key === key)
      if (!char) return

      setCharStates((prev) => ({ ...prev, [key]: { status: 'generating' } }))

      try {
        const prompt = buildCharacterPrompt(char)
        const result = await generateImage({
          prompt,
          apiKey: imageApiKey,
        })
        const dataUrl = `data:${result.mimeType};base64,${result.imageData}`
        setCharStates((prev) => ({ ...prev, [key]: { status: 'done', dataUrl } }))
      } catch (err) {
        const msg = err instanceof Error ? err.message : '生成に失敗しました'
        setCharStates((prev) => ({ ...prev, [key]: { status: 'error', error: msg } }))
      }
    },
    [characters, imageApiKey],
  )

  const handleGenerateAllChars = useCallback(async () => {
    for (const char of characters) {
      await handleGenerateChar(char.key)
    }
  }, [characters, handleGenerateChar])

  // Collect reference images for page generation
  const getCharRefs = useCallback((): ImageRef[] => {
    const refs: ImageRef[] = []
    for (const char of characters) {
      const state = charStates[char.key]
      if (state?.status === 'done' && state.dataUrl) {
        const [header, data] = state.dataUrl.split(',')
        const mimeType = header?.match(/:(.*?);/)?.[1] || 'image/png'
        refs.push({ mimeType, data })
      }
    }
    return refs
  }, [charStates, characters])

  // ── Page Image Generation ───────────────────────────

  const handleGeneratePage = useCallback(
    async (pageNumber: number) => {
      const page = script?.pages?.find((p) => p.pageNumber === pageNumber)
      if (!page?.imageGenerationPrompt) return

      setPageStates((prev) => ({ ...prev, [pageNumber]: { status: 'generating' } }))

      try {
        const charRefs = getCharRefs()
        const result = await generateImage({
          prompt: page.imageGenerationPrompt,
          apiKey: imageApiKey,
          referenceImages: charRefs.length > 0 ? charRefs : undefined,
        })
        const dataUrl = `data:${result.mimeType};base64,${result.imageData}`
        setPageStates((prev) => ({ ...prev, [pageNumber]: { status: 'done', dataUrl } }))
      } catch (err) {
        const msg = err instanceof Error ? err.message : '画像生成に失敗しました'
        setPageStates((prev) => ({ ...prev, [pageNumber]: { status: 'error', error: msg } }))
      }
    },
    [script, imageApiKey, getCharRefs],
  )

  const handleBulkGenerate = useCallback(async () => {
    if (!script?.pages) return
    setIsBulkGenerating(true)
    for (const page of script.pages) {
      await handleGeneratePage(page.pageNumber)
    }
    setIsBulkGenerating(false)
  }, [script, handleGeneratePage])

  // ── Bulk copy ───────────────────────────────────────

  const bulkPrompt =
    script?.pages
      ?.map((p) => `## ページ${p.pageNumber}: ${p.title}\n${p.imageGenerationPrompt || ''}`)
      .join('\n\n---\n\n') || ''

  const generatedCount = Object.values(pageStates).filter((s) => s.status === 'done').length
  const charGeneratedCount = Object.values(charStates).filter((s) => s.status === 'done').length

  // ── Empty state ─────────────────────────────────────

  if (!script) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200 text-center">
        <p className="text-gray-500">まだ台本が生成されていません。</p>
      </div>
    )
  }

  // ── Render ──────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* ===== Section 1: Character References ===== */}
      {characters.length > 0 && hasApiKey && (
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">キャラクター参照画像</h2>
              <p className="text-sm text-gray-500">
                先にキャラクター画像を生成すると、全ページで統一されたキャラクターが使われます
              </p>
            </div>
            {charGeneratedCount < characters.length && (
              <Button variant="primary" size="sm" onClick={handleGenerateAllChars}>
                全キャラクターを一括生成
              </Button>
            )}
            {charGeneratedCount === characters.length && (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                全{characters.length}体 生成済み ✓
              </span>
            )}
          </div>

          <div className="space-y-3">
            {characters.map((char) => (
              <CharacterCard
                key={char.key}
                label={char.label}
                name={char.name}
                appearance={char.appearance}
                personality={char.personality}
                state={charStates[char.key] || { status: 'idle' }}
                onGenerate={() => handleGenerateChar(char.key)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ===== Section 2: Page Image Generation ===== */}
      <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
        <h2 className="mb-1 text-lg font-bold text-gray-900">ページ画像生成</h2>
        <p className="mb-4 text-sm text-gray-500">
          {hasApiKey
            ? '各ページの「画像を生成」ボタンで漫画画像を生成します'
            : 'プロンプトをコピーして外部ツールで画像生成してください'}
        </p>

        {/* API status banner */}
        {hasApiKey ? (
          <div className="mb-4 rounded-lg bg-green-50 p-3 text-xs text-green-800 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-medium">Gemini Nano Banana</span>
            <span>8ページ合計: {estimatedCost}</span>
            <span>1枚約5.8円</span>
            {charGeneratedCount > 0 && (
              <span className="text-green-600">
                参照画像: {charGeneratedCount}/{characters.length}体
              </span>
            )}
            {generatedCount > 0 && (
              <span>ページ生成済み: {generatedCount}/{totalPages}</span>
            )}
          </div>
        ) : (
          <div className="mb-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
            <p className="font-medium mb-1">画像生成APIキーが未設定です</p>
            <p>
              右上の「API設定」からGemini APIキーを設定すると、ツール上で画像生成まで完結できます。
              未設定のままでも、下のプロンプトをコピーしてChatGPT Image2等で無料生成できます。
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="mb-4 flex flex-wrap gap-3">
          {hasApiKey && charGeneratedCount === 0 && characters.length > 0 && (
            <div className="flex items-center rounded-lg bg-blue-50 px-3 py-1.5 text-xs text-blue-800">
              上で先にキャラクター参照画像を生成するのがおすすめです
            </div>
          )}
          {hasApiKey && (
            <Button
              onClick={handleBulkGenerate}
              variant="primary"
              size="sm"
              disabled={isBulkGenerating}
            >
              {isBulkGenerating
                ? `一括生成中... (${generatedCount}/${totalPages})`
                : `全ページ一括生成（${estimatedCost}）`}
            </Button>
          )}
          <Button onClick={() => copy(bulkPrompt, 'bulk')} variant="secondary" size="sm">
            {copiedId === 'bulk' ? '全コピー済み ✓' : '全プロンプトをまとめてコピー'}
          </Button>
        </div>

        {/* Page cards */}
        <div className="space-y-4">
          {script.pages?.map((page) => (
            <PromptCard
              key={page.pageNumber}
              page={page}
              isCopied={copiedId === page.pageNumber.toString()}
              onCopy={copy}
              pageState={pageStates[page.pageNumber] || { status: 'idle' }}
              onGenerate={handleGeneratePage}
              hasApiKey={hasApiKey}
            />
          ))}
        </div>
      </div>

      {/* Reset */}
      <div className="flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (confirm('最初からやり直しますか？')) {
              window.location.reload()
            }
          }}
        >
          最初からやり直す
        </Button>
      </div>
    </div>
  )
}
