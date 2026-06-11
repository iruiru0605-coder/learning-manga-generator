import { useStore } from '@/store'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import type { MangaPage } from '@/types'

interface StepScriptProps {
  onNext: () => void
  canAdvance: boolean
}

function PageCardView({ page }: { page: MangaPage }) {
  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
          ページ {page.pageNumber}
        </span>
        <span className="text-sm font-medium text-gray-900">{page.title}</span>
      </div>
      <p className="mb-3 text-xs text-gray-500">{page.summary}</p>
      <div className="space-y-2">
        {page.panels?.map((panel) => (
          <div key={panel.panelNumber} className="rounded-lg border border-gray-100 bg-gray-50 p-3">
            <div className="mb-1 flex items-center gap-2">
              <span className="text-xs text-gray-400">コマ{panel.panelNumber}</span>
              <span className="rounded bg-gray-200 px-1.5 py-0.5 text-xs text-gray-600">{panel.size}</span>
              <span className="text-xs text-gray-400">{panel.composition}</span>
            </div>
            {panel.dialogue?.map((d, i) => (
              <div key={i} className="ml-2 border-l-2 border-indigo-200 pl-2 py-0.5">
                <span className="text-xs font-medium text-indigo-600">{d.speaker}:</span>
                <span className="ml-1 text-sm text-gray-700">{d.text}</span>
              </div>
            ))}
            {panel.narration && (
              <p className="mt-1 text-xs text-gray-400 italic">📝 {panel.narration}</p>
            )}
            {panel.effects && (
              <p className="text-xs text-gray-400">💥 {panel.effects}</p>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}

export function StepScript({ onNext, canAdvance }: StepScriptProps) {
  const script = useStore((s) => s.script)

  if (!script) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-gray-900/5">
        <p className="text-gray-500">まだ台本が生成されていません。前のステップで生成してください。</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 sm:p-8">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 text-xl">
            📝
          </span>
          <div>
            <h2 className="font-display text-xl font-extrabold tracking-tight text-gray-900">生成された漫画台本</h2>
            <p className="text-sm text-gray-500">AIが作成した8ページの学習漫画の台本です。内容を確認してください</p>
          </div>
        </div>

        <div className="mb-5 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-4 ring-1 ring-green-100">
          <p className="font-display text-lg font-extrabold text-gray-900">{script.title}</p>
          <p className="text-sm text-gray-600">{script.struggleSummary}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {script.pages?.map((page) => (
            <PageCardView key={page.pageNumber} page={page} />
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!canAdvance} size="lg">
          画像生成プロンプトを見る →
        </Button>
      </div>
    </div>
  )
}
