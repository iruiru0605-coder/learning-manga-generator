import { useStore } from '@/store'
import { GradeSelector } from '@/components/textbook/GradeSelector'
import { SubjectSelector } from '@/components/textbook/SubjectSelector'
import { TextbookSelector } from '@/components/textbook/TextbookSelector'
import { UnitSelector } from '@/components/textbook/UnitSelector'
import { Button } from '@/components/ui/Button'

interface StepTextbookProps {
  onNext: () => void
  canAdvance: boolean
}

export function StepTextbook({ onNext, canAdvance }: StepTextbookProps) {
  const grade = useStore((s) => s.grade)
  const unit = useStore((s) => s.unit)

  return (
    <div className="space-y-6">
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
