import { useState } from 'react'
import { useStore } from '@/store'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import type { MangaPage } from '@/types'

interface StepScriptProps {
  onNext: () => void
  canAdvance: boolean
}

// 1Mトークンあたりのおおよその料金（USD）。表示用の概算なので厳密でなくてよい
const ROUGH_RATES: Record<string, { input: number; output: number }> = {
  deepseek: { input: 0.27, output: 1.1 },
  openai: { input: 0.15, output: 0.6 },
  anthropic: { input: 1.0, output: 5.0 },
  gemini: { input: 0.3, output: 2.5 },
}

function estimateCostYen(usage: { inputTokens: number; outputTokens: number; providerId: string }): string {
  const rate = ROUGH_RATES[usage.providerId]
  if (!rate) return ''
  const usd = (usage.inputTokens * rate.input + usage.outputTokens * rate.output) / 1_000_000
  const yen = usd * 150
  return yen < 0.05 ? '0.1円未満' : `約${yen.toFixed(1)}円`
}

function PageCardView({ page }: { page: MangaPage }) {
  const updateDialogueText = useStore((s) => s.updateDialogueText)
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex-shrink-0 rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
            ページ {page.pageNumber}
          </span>
          <span className="truncate text-sm font-medium text-gray-900">{page.title}</span>
        </div>
        <Button variant={isEditing ? 'primary' : 'ghost'} size="sm" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? '✓ 完了' : '✏️ セリフを編集'}
        </Button>
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
                {isEditing ? (
                  <input
                    type="text"
                    className="ml-1 w-[calc(100%-5rem)] rounded border border-indigo-200 bg-white px-2 py-1 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none"
                    value={d.text}
                    onChange={(e) => updateDialogueText(page.pageNumber, panel.panelNumber, i, e.target.value)}
                  />
                ) : (
                  <span className="ml-1 text-sm text-gray-700">{d.text}</span>
                )}
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
  const lastUsage = useStore((s) => s.lastUsage)

  if (!script) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-gray-900/5">
        <p className="text-gray-500">まだ台本が生成されていません。前のステップで生成してください。</p>
      </div>
    )
  }

  const isSample = script.createdAt === 'sample'
  const costLabel = !isSample && lastUsage ? estimateCostYen(lastUsage) : ''

  return (
    <div className="space-y-6">
      {isSample && (
        <div className="rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 p-4 text-sm text-amber-900 ring-1 ring-amber-200">
          <span className="font-bold">🎁 これはサンプル作品です。</span>
          完成イメージを確認したら、ステップ1に戻ってお子さんの苦手に合わせた漫画を作ってみてください（APIキーが必要です）。
        </div>
      )}

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 sm:p-8">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/25">
            <Icon name="script" />
          </span>
          <div>
            <h2 className="font-display text-xl font-extrabold tracking-tight text-gray-900">生成された漫画台本</h2>
            <p className="text-sm text-gray-500">
              {script.pages?.length ?? 0}ページの学習漫画の台本です。セリフはこの画面で自由に書き直せます
              {costLabel && <span className="ml-2 text-gray-400">（今回の生成コスト: {costLabel}）</span>}
            </p>
          </div>
        </div>

        <div className="mb-5 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-4 ring-1 ring-green-100">
          <p className="font-display text-lg font-extrabold text-gray-900">{script.title}</p>
          <p className="text-sm text-gray-600">{script.struggleSummary}</p>
          {script.testKeywords && script.testKeywords.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-amber-700">🎯 テストに出るキーワード:</span>
              {script.testKeywords.map((k) => (
                <span
                  key={k}
                  className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-800 ring-1 ring-amber-200"
                >
                  {k}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {script.pages?.map((page) => (
            <PageCardView key={page.pageNumber} page={page} />
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!canAdvance} size="lg">
          画像にする →
        </Button>
      </div>
    </div>
  )
}
