import { useState } from 'react'
import { useStore } from '@/store'
import { useTextbookFilter } from '@/hooks/useTextbookFilter'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

export function UnitSelector() {
  const selectedUnit = useStore((s) => s.unit)
  const textbook = useStore((s) => s.textbook)
  const setUnit = useStore((s) => s.setUnit)
  const { availableUnits, isCurriculumFallback } = useTextbookFilter()
  const [search, setSearch] = useState('')
  const [customUnit, setCustomUnit] = useState('')

  if (!textbook) return null

  const filtered = search.trim()
    ? availableUnits.filter((u) => u.label.includes(search.trim()))
    : availableUnits

  const handleCustomUnit = () => {
    const label = customUnit.trim()
    if (!label) return
    setUnit({
      id: `custom-${textbook.id}-${Date.now()}`,
      label,
      textbookId: textbook.id,
      parentUnitId: null,
      order: 999,
    })
  }

  const isCustomSelected = !!selectedUnit && selectedUnit.id.startsWith('custom-')

  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-gray-700">単元を選んでください</label>

      {isCurriculumFallback && (
        <p className="mb-2 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700">
          学習指導要領にもとづく標準的な単元一覧です。お使いの教科書と単元名や順序が少し異なる場合は、
          近い単元を選ぶか、下の欄に教科書どおりの単元名を直接入力してください。
        </p>
      )}

      <input
        type="text"
        className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        placeholder="単元名で検索..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="max-h-64 overflow-y-auto rounded-lg border border-gray-200">
        {filtered.length === 0 ? (
          <p className="px-4 py-3 text-sm text-gray-400">該当する単元がありません。下の欄から直接入力できます。</p>
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

      <div className="mt-3 rounded-lg border border-dashed border-gray-300 p-3">
        <label className="mb-1 block text-xs font-medium text-gray-600">
          一覧にない場合は、教科書の単元名をそのまま入力できます
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="例：てこのはたらき"
            value={customUnit}
            onChange={(e) => setCustomUnit(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCustomUnit()
            }}
          />
          <Button variant="secondary" size="sm" disabled={!customUnit.trim()} onClick={handleCustomUnit}>
            この単元にする
          </Button>
        </div>
        {isCustomSelected && (
          <p className="mt-2 text-xs font-medium text-indigo-700">
            ✓ 入力した単元「{selectedUnit!.label}」を選択中
          </p>
        )}
      </div>
    </div>
  )
}
