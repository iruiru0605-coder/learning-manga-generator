import { useStore } from '@/store'
import { useTextbookFilter } from '@/hooks/useTextbookFilter'
import { cn } from '@/lib/cn'

const subjectIcons: Record<string, string> = {
  kokugo: '📖', sansu: '🧮', math: '📐', rika: '🔬',
  butsuri: '⚡', kagaku: '⚗️', seibutsu: '🦋',
  shakai: '🌏', chiri: '🗺️', rekishi: '🏯', komin: '⚖️',
  eigo: '🌐', seikatsu: '🌱',
}

export function SubjectSelector() {
  const selectedSubject = useStore((s) => s.subject)
  const setSubject = useStore((s) => s.setSubject)
  const grade = useStore((s) => s.grade)
  const { availableSubjects } = useTextbookFilter()

  if (!grade) return null

  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-gray-700">教科を選んでください</label>
      <div className="flex flex-wrap gap-2">
        {availableSubjects.map((s) => (
          <button
            key={s.id}
            onClick={() => setSubject(s)}
            className={cn(
              'flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
              selectedSubject?.id === s.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
            )}
          >
            <span>{subjectIcons[s.id] || '📚'}</span>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}
