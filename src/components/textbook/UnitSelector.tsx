import { useState } from 'react'
import { useStore } from '@/store'
import { useTextbookFilter } from '@/hooks/useTextbookFilter'
import { cn } from '@/lib/cn'

export function UnitSelector() {
  const selectedUnit = useStore((s) => s.unit)
  const textbook = useStore((s) => s.textbook)
  const setUnit = useStore((s) => s.setUnit)
  const { availableUnits } = useTextbookFilter()
  const [search, setSearch] = useState('')

  if (!textbook) return null

  const filtered = search.trim()
    ? availableUnits.filter((u) => u.label.includes(search.trim()))
    : availableUnits

  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-gray-700">単元を選んでください</label>
      <input
        type="text"
        className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        placeholder="単元名で検索..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="max-h-64 overflow-y-auto rounded-lg border border-gray-200">
        {filtered.length === 0 ? (
          <p className="px-4 py-3 text-sm text-gray-400">該当する単元がありません</p>
        ) : (
          filtered.map((u) => (
            <button
              key={u.id}
              onClick={() => setUnit(u)}
              className={cn(
                'w-full px-4 py-2.5 text-left text-sm transition-colors border-b border-gray-100 last:border-b-0',
                selectedUnit?.id === u.id
                  ? 'bg-indigo-600 text-white'
                  : 'hover:bg-indigo-50 text-gray-700'
              )}
            >
              {u.label}
            </button>
          ))
        )}
      </div>
    </div>
  )
}
