import { useStore } from '@/store'
import { grades } from '@/data/textbooks'
import { cn } from '@/lib/cn'

export function GradeSelector() {
  const selectedGrade = useStore((s) => s.grade)
  const setGrade = useStore((s) => s.setGrade)

  const levels = [
    { label: '小学校', grades: grades.filter((g) => g.level === 'elementary') },
    { label: '中学校', grades: grades.filter((g) => g.level === 'middle') },
    { label: '高校', grades: grades.filter((g) => g.level === 'high') },
  ]

  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-gray-700">学年を選んでください</label>
      {levels.map((level) => (
        <div key={level.label} className="mb-3">
          <p className="mb-1.5 text-xs font-medium text-gray-400">{level.label}</p>
          <div className="flex flex-wrap gap-1.5">
            {level.grades.map((g) => (
              <button
                key={g.id}
                onClick={() => setGrade(g)}
                className={cn(
                  'rounded-xl px-3.5 py-2 text-sm font-bold transition-all duration-150',
                  selectedGrade?.id === g.id
                    ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/25'
                    : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:-translate-y-0.5 hover:bg-indigo-50/60 hover:ring-indigo-300 hover:shadow-sm'
                )}
              >
                {g.shortLabel}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
