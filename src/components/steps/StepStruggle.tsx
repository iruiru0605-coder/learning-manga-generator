import { useStore } from '@/store'
import { useMangaGeneration } from '@/hooks/useMangaGeneration'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

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
          <div className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {status === 'generating' && (
          <div className="mt-4">
            <LoadingSpinner />
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <Button onClick={handleGenerate} disabled={!struggle.trim() || status === 'generating'} size="lg" variant="primary">
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
