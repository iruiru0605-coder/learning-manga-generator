import { useStore } from '@/store'
import { useTextbookFilter } from '@/hooks/useTextbookFilter'
import { cn } from '@/lib/cn'

export function TextbookSelector() {
  const selectedTextbook = useStore((s) => s.textbook)
  const subject = useStore((s) => s.subject)
  const setTextbook = useStore((s) => s.setTextbook)
  const { availableTextbooks } = useTextbookFilter()

  if (!subject) return null

  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-gray-700">教科書を選んでください</label>
      <div className="flex flex-col gap-1.5">
        {availableTextbooks.map((t) => (
          <button
            key={t.id}
            onClick={() => setTextbook(t)}
            className={cn(
              'rounded-lg px-4 py-2.5 text-left text-sm transition-colors',
              selectedTextbook?.id === t.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
            )}
          >
            <span className="font-medium">{t.label}</span>
            <span className={cn(
              'ml-2 text-xs',
              selectedTextbook?.id === t.id ? 'text-indigo-200' : 'text-gray-400'
            )}>
              {t.publisher}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
