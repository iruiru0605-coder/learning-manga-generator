import { useStore } from '@/store'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import type { MangaPage } from '@/types'

function PromptCard({ page, isCopied, onCopy }: {
  page: MangaPage
  isCopied: boolean
  onCopy: (text: string, id: string) => void
}) {
  const promptText = page.imageGenerationPrompt || ''

  return (
    <Card className="overflow-hidden">
      <div className="bg-indigo-50 px-4 py-2 flex items-center justify-between">
        <span className="text-sm font-bold text-indigo-900">
          ページ {page.pageNumber}: {page.title}
        </span>
        <Button
          variant={isCopied ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onCopy(promptText, page.pageNumber.toString())}
        >
          {isCopied ? 'コピー済み ✓' : 'プロンプトをコピー'}
        </Button>
      </div>
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
  const { copiedId, copy } = useCopyToClipboard()

  if (!script) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200 text-center">
        <p className="text-gray-500">まだ台本が生成されていません。</p>
      </div>
    )
  }

  const bulkPrompt = script.pages
    ?.map((p) => `## ページ${p.pageNumber}: ${p.title}\n${p.imageGenerationPrompt || ''}`)
    .join('\n\n---\n\n') || ''

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
        <h2 className="mb-1 text-xl font-bold text-gray-900">ステップ4: 画像生成プロンプト</h2>
        <p className="mb-4 text-sm text-gray-500">
          各ページのプロンプトをコピーして、ChatGPT Image2 や NanoBanana に貼り付けてください
        </p>

        <div className="mb-4 flex flex-wrap gap-3">
          <Button onClick={() => copy(bulkPrompt, 'bulk')} variant="primary" size="sm">
            {copiedId === 'bulk' ? '全コピー済み ✓' : '全8ページをまとめてコピー'}
          </Button>
          <div className="flex items-center rounded-lg bg-amber-50 px-3 py-1.5 text-xs text-amber-800">
            💡 コピーしたプロンプトをChatGPT Image2に貼り付けて画像を生成してください
          </div>
        </div>

        <div className="space-y-4">
          {script.pages?.map((page) => (
            <PromptCard
              key={page.pageNumber}
              page={page}
              isCopied={copiedId === page.pageNumber.toString()}
              onCopy={copy}
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
