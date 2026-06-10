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
      <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
        <h2 className="mb-1 text-xl font-bold text-gray-900">ステップ1: 教科書を選ぶ</h2>
        <p className="mb-6 text-sm text-gray-500">
          学習漫画を作りたい教科書の単元を選んでください
        </p>

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
