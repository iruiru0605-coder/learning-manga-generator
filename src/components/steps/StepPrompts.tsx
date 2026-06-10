import { useState } from 'react'
import { useStore } from '@/store'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { generateImage } from '@/services/image/gemini'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import type { MangaPage } from '@/types'

interface ImageState {
  status: 'idle' | 'generating' | 'done' | 'error'
  dataUrl?: string
  error?: string
}

function PromptCard({
  page,
  isCopied,
  onCopy,
  imageState,
  onGenerateImage,
  hasApiKey,
}: {
  page: MangaPage
  isCopied: boolean
  onCopy: (text: string, id: string) => void
  imageState: ImageState
  onGenerateImage: (pageNumber: number) => void
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
              disabled={imageState.status === 'generating'}
              onClick={() => onGenerateImage(page.pageNumber)}
            >
              {imageState.status === 'generating'
                ? '生成中...'
                : imageState.status === 'done'
                  ? '再生成'
                  : '画像を生成'}
            </Button>
          )}
        </div>
      </div>

      {imageState.status === 'generating' && (
        <div className="bg-blue-50 px-4 py-3 text-center">
          <div className="mx-auto mb-2 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-blue-100">
            <div className="h-full animate-pulse rounded-full bg-blue-500" style={{ width: '60%' }} />
          </div>
          <p className="text-xs text-blue-700">Geminiで画像を生成中... 約3〜5秒</p>
        </div>
      )}

      {imageState.status === 'error' && (
        <div className="bg-red-50 px-4 py-2 text-xs text-red-700">
          ⚠️ {imageState.error || '画像生成に失敗しました'}
        </div>
      )}

      {imageState.status === 'done' && imageState.dataUrl && (
        <div className="border-b border-gray-200">
          <img
            src={imageState.dataUrl}
            alt={`Page ${page.pageNumber} generated manga`}
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

export function StepPrompts() {
  const script = useStore((s) => s.script)
  const imageApiKey = useStore((s) => s.imageApiKey)
  const characterImageUrl = useStore((s) => s.characterImageUrl)
  const { copiedId, copy } = useCopyToClipboard()
  const [imageStates, setImageStates] = useState<Record<number, ImageState>>({})
  const [isBulkGenerating, setIsBulkGenerating] = useState(false)

  if (!script) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200 text-center">
        <p className="text-gray-500">まだ台本が生成されていません。</p>
      </div>
    )
  }

  const hasApiKey = !!imageApiKey.trim()

  const handleGenerateImage = async (pageNumber: number) => {
    const page = script.pages?.find((p) => p.pageNumber === pageNumber)
    if (!page?.imageGenerationPrompt) return

    setImageStates((prev) => ({
      ...prev,
      [pageNumber]: { status: 'generating' },
    }))

    try {
      const result = await generateImage({
        prompt: page.imageGenerationPrompt,
        apiKey: imageApiKey,
        referenceImageUrl: characterImageUrl || undefined,
      })

      const dataUrl = `data:${result.mimeType};base64,${result.imageData}`
      setImageStates((prev) => ({
        ...prev,
        [pageNumber]: { status: 'done', dataUrl },
      }))
    } catch (err) {
      const msg = err instanceof Error ? err.message : '画像生成に失敗しました'
      setImageStates((prev) => ({
        ...prev,
        [pageNumber]: { status: 'error', error: msg },
      }))
    }
  }

  const handleBulkGenerate = async () => {
    if (!script.pages) return
    setIsBulkGenerating(true)
    for (const page of script.pages) {
      await handleGenerateImage(page.pageNumber)
    }
    setIsBulkGenerating(false)
  }

  const bulkPrompt = script.pages
    ?.map((p) => `## ページ${p.pageNumber}: ${p.title}\n${p.imageGenerationPrompt || ''}`)
    .join('\n\n---\n\n') || ''

  const generatedCount = Object.values(imageStates).filter((s) => s.status === 'done').length
  const totalPages = script.pages?.length || 0
  const estimatedCost = hasApiKey ? `約${Math.round(totalPages * 5.8)}円` : ''

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
        <h2 className="mb-1 text-xl font-bold text-gray-900">ステップ4: 画像生成</h2>
        <p className="mb-4 text-sm text-gray-500">
          {hasApiKey
            ? '各ページの「画像を生成」ボタンを押すと、Gemini AIが自動で漫画画像を生成します'
            : '各ページのプロンプトをコピーして、ChatGPT Image2 や NanoBanana に貼り付けてください'}
        </p>

        {/* Cost & provider info */}
        {hasApiKey && (
          <div className="mb-4 rounded-lg bg-green-50 p-3 text-xs text-green-800">
            <span className="font-medium">Gemini Nano Banana</span>
            <span className="mx-2">|</span>
            <span>8ページ合計: {estimatedCost}</span>
            <span className="mx-2">|</span>
            <span>1枚約5.8円（$0.039）</span>
            {generatedCount > 0 && (
              <>
                <span className="mx-2">|</span>
                <span>生成済み: {generatedCount}/{totalPages}ページ</span>
              </>
            )}
          </div>
        )}

        {!hasApiKey && (
          <div className="mb-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
            <p className="font-medium mb-1">画像生成APIキーが未設定です</p>
            <p>
              右上の「API設定」からGemini APIキーを設定すると、ツール上で画像生成まで完結できます（8ページ約47円）。
              未設定のままでも、プロンプトをコピーして外部ツールで無料生成できます。
            </p>
          </div>
        )}

        <div className="mb-4 flex flex-wrap gap-3">
          <Button onClick={() => copy(bulkPrompt, 'bulk')} variant="secondary" size="sm">
            {copiedId === 'bulk' ? '全コピー済み ✓' : '全8ページのプロンプトをまとめてコピー'}
          </Button>
          {hasApiKey && (
            <Button
              onClick={handleBulkGenerate}
              variant="primary"
              size="sm"
              disabled={isBulkGenerating}
            >
              {isBulkGenerating
                ? `画像生成中... (${generatedCount}/${totalPages})`
                : `全ページの画像を一括生成（${estimatedCost}）`}
            </Button>
          )}
          {!hasApiKey && (
            <div className="flex items-center rounded-lg bg-blue-50 px-3 py-1.5 text-xs text-blue-800">
              コピーしたプロンプトをChatGPT Image2やNanoBananaに貼り付けて画像を生成してください
            </div>
          )}
        </div>

        <div className="space-y-4">
          {script.pages?.map((page) => (
            <PromptCard
              key={page.pageNumber}
              page={page}
              isCopied={copiedId === page.pageNumber.toString()}
              onCopy={copy}
              imageState={imageStates[page.pageNumber] || { status: 'idle' }}
              onGenerateImage={handleGenerateImage}
              hasApiKey={hasApiKey}
            />
          ))}
        </div>
      </div>

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
