import { useStore } from '@/store'
import { Button } from '@/components/ui/Button'

export function Header({ onOpenSettings }: { onOpenSettings: () => void }) {
  const apiKey = useStore((s) => s.apiKey)
  const imageApiKey = useStore((s) => s.imageApiKey)

  const hasTextKey = !!apiKey.trim()
  const hasImageKey = !!imageApiKey.trim()

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">📚</span>
          <h1 className="text-lg font-bold text-gray-900">学習漫画ジェネレーター</h1>
        </div>

        <div className="flex items-center gap-2">
          {!hasTextKey ? (
            <Button variant="primary" size="sm" onClick={onOpenSettings}>
              APIキーを設定（必須）
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                AI接続済み
              </span>
              {hasImageKey && (
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  画像生成可
                </span>
              )}
              <Button variant="ghost" size="sm" onClick={onOpenSettings}>
                API設定
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
