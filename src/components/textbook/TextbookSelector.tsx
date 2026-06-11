import { useStore } from '@/store'
import { useTextbookFilter } from '@/hooks/useTextbookFilter'
import { cn } from '@/lib/cn'

export function TextbookSelector() {
  const selectedTextbook = useStore((s) => s.textbook)
  const subject = useStore((s) => s.subject)
  const grade = useStore((s) => s.grade)
  const setTextbook = useStore((s) => s.setTextbook)
  const { availableTextbooks } = useTextbookFilter()

  if (!subject || !grade) return null

  // 教科書がわからない人向け: 学習指導要領ベースの単元一覧に直行できる
  const genericId = `generic-${subject.id}-${grade.id}`
  const isGenericSelected = selectedTextbook?.id === genericId

  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-gray-700">教科書を選んでください</label>
      <div className="flex flex-col gap-1.5">
        <button
          onClick={() =>
            setTextbook({
              id: genericId,
              label: '教科書を指定しない',
              publisher: '標準の単元一覧',
              subjectId: subject.id,
              gradeId: grade.id,
            })
          }
          className={cn(
            'flex items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm transition-all duration-150',
            isGenericSelected
              ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/25'
              : 'bg-indigo-50/60 text-gray-700 ring-1 ring-dashed ring-indigo-300 hover:bg-indigo-50 hover:shadow-sm'
          )}
        >
          <span className="font-bold">📋 教科書を指定しない・わからない</span>
          <span
            className={cn(
              'ml-2 rounded-full px-2 py-0.5 text-xs font-medium',
              isGenericSelected ? 'bg-white/20 text-indigo-50' : 'bg-white text-indigo-600'
            )}
          >
            標準の単元一覧
          </span>
        </button>
        {availableTextbooks.map((t) => (
          <button
            key={t.id}
            onClick={() => setTextbook(t)}
            className={cn(
              'flex items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm transition-all duration-150',
              selectedTextbook?.id === t.id
                ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/25'
                : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-indigo-50/60 hover:ring-indigo-300 hover:shadow-sm'
            )}
          >
            <span className="font-bold">{t.label}</span>
            <span
              className={cn(
                'ml-2 rounded-full px-2 py-0.5 text-xs font-medium',
                selectedTextbook?.id === t.id
                  ? 'bg-white/20 text-indigo-50'
                  : 'bg-gray-100 text-gray-500'
              )}
            >
              {t.publisher}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
