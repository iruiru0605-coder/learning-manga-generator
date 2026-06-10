import { useStore } from '@/store'
import { useMangaGeneration } from '@/hooks/useMangaGeneration'
import { Button } from '@/components/ui/Button'

interface StepStruggleProps {
  onNext: () => void
  canAdvance: boolean
}

export function StepStruggle({ onNext, canAdvance }: StepStruggleProps) {
  const unit = useStore((s) => s.unit)
  const struggle = useStore((s) => s.struggle)
  const status = useStore((s) => s.status)
  const error = useStore((s) => s.error)
  const apiKey = useStore((s) => s.apiKey)
  const setStruggle = useStore((s) => s.setStruggle)
  const { generate } = useMangaGeneration()

  const handleGenerate = async () => {
    if (!apiKey) {
      alert('先にAPIキーを設定してください（右上の「API設定」ボタン）')
      return
    }
    await generate()
  }

  if (status === 'generating') {
    return (
      <div className="rounded-xl bg-white p-12 shadow-sm border border-gray-200 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
          <svg className="h-10 w-10 animate-bounce text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-bold text-gray-900">AIが漫画を執筆中...</h3>
        <p className="mb-4 text-sm text-gray-500">
          「{unit?.label}」の学習漫画を8ページ分、制作しています
        </p>
        <div className="mx-auto max-w-xs">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div className="h-full animate-pulse rounded-full bg-indigo-500" style={{ width: '60%' }} />
          </div>
        </div>
        <p className="mt-3 text-xs text-gray-400">
          コマ割り・セリフ・画像プロンプトを生成中... 約20〜30秒かかります
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
        <h2 className="mb-1 text-xl font-bold text-gray-900">ステップ2: 苦手を教えてください</h2>
        <p className="mb-6 text-sm text-gray-500">
          選んだ単元の中で、特につまずいているところを自由に書いてください
        </p>

        {unit && (
          <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
            選択中: {unit.label}
          </div>
        )}

        <div className="mb-4 rounded-lg bg-blue-50 p-4">
          <p className="text-sm font-medium text-blue-800">🤖 AIからの質問:</p>
          <p className="mt-1 text-sm text-blue-700">
            「{unit?.label || 'この単元'}」の中で、どこが一番わかりにくいですか？
            つまずいているところや、もっと詳しく知りたいところを教えてください。
          </p>
        </div>

        <textarea
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 min-h-[120px]"
          placeholder="例：分数の足し算で、分母が違うときにどうすればいいかわかりません。通分の考え方がピンときません..."
          value={struggle}
          onChange={(e) => setStruggle(e.target.value)}
        />

        {error && (
          <div className="mt-3 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            <p className="font-medium mb-1">⚠️ エラーが発生しました</p>
            <p>{error}</p>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <Button onClick={handleGenerate} disabled={!struggle.trim()} size="lg" variant="primary">
          漫画の台本を生成する
        </Button>
        {canAdvance && (
          <Button onClick={onNext} variant="secondary" size="lg">
            生成された台本を見る →
          </Button>
        )}
      </div>
    </div>
  )
}
