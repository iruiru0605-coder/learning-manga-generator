import { useStore } from '@/store'
import { GradeSelector } from '@/components/textbook/GradeSelector'
import { SubjectSelector } from '@/components/textbook/SubjectSelector'
import { TextbookSelector } from '@/components/textbook/TextbookSelector'
import { UnitSelector } from '@/components/textbook/UnitSelector'
import { Button } from '@/components/ui/Button'

interface StepTextbookProps {
  onNext: () => void
  canAdvance: boolean
  onShowSample: () => void
}

export function StepTextbook({ onNext, canAdvance, onShowSample }: StepTextbookProps) {
  const grade = useStore((s) => s.grade)
  const unit = useStore((s) => s.unit)

  return (
    <div className="space-y-6">
      {/* 初めての人向け: APIキーなしで完成イメージを見られる */}
      <button
        onClick={onShowSample}
        className="flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 p-4 text-left ring-1 ring-amber-200 transition-all hover:-translate-y-0.5 hover:shadow-md"
      >
        <span className="text-sm text-amber-900">
          <span className="font-bold">🎁 はじめての方へ:</span> APIキーなしで完成イメージを見られます
        </span>
        <span className="rounded-xl bg-white px-3 py-1.5 text-sm font-bold text-amber-700 shadow-sm">
          サンプルを見る →
        </span>
      </button>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 text-xl">
            📖
          </span>
          <div>
            <h2 className="font-display text-xl font-extrabold tracking-tight text-gray-900">教科書を選ぶ</h2>
            <p className="text-sm text-gray-500">学習漫画を作りたい教科書の単元を選んでください</p>
          </div>
        </div>

        <div className="space-y-6">
          <GradeSelector />
          {grade && (
            <>
              <div className="border-t border-gray-100 pt-5">
                <SubjectSelector />
              </div>
              <TextbookSelector />
              <UnitSelector />
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!canAdvance} size="lg">
          {unit ? `「${unit.label}」で次へ →` : '単元を選んでください'}
        </Button>
      </div>
    </div>
  )
}
