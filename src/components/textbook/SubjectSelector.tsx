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
              'flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-150',
              selectedSubject?.id === s.id
                ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/25'
                : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:-translate-y-0.5 hover:bg-indigo-50/60 hover:ring-indigo-300 hover:shadow-sm'
            )}
          >
            <span className="text-base">{subjectIcons[s.id] || '📚'}</span>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}
