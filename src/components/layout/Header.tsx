import { useStore } from '@/store'
import { Button } from '@/components/ui/Button'

export function Header({ onOpenSettings }: { onOpenSettings: () => void }) {
  const apiKey = useStore((s) => s.apiKey)

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">📚</span>
          <h1 className="text-lg font-bold text-gray-900">学習漫画ジェネレーター</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className={`h-2 w-2 rounded-full ${apiKey ? 'bg-green-500' : 'bg-gray-300'}`} />
          <Button variant="ghost" size="sm" onClick={onOpenSettings}>
            {apiKey ? 'API設定' : 'APIキーを設定'}
          </Button>
        </div>
      </div>
    </header>
  )
}
