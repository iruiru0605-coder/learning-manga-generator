import { useStore } from '@/store'
import { Button } from '@/components/ui/Button'

export function Header({ onOpenSettings }: { onOpenSettings: () => void }) {
  const apiKey = useStore((s) => s.apiKey)
  const imageApiKey = useStore((s) => s.imageApiKey)

  const hasTextKey = !!apiKey.trim()
  const hasImageKey = !!imageApiKey.trim()

  return (
    <header className="sticky top-0 z-40 border-b border-gray-900/5 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl shadow-md shadow-indigo-600/30">
            📚
          </span>
          <div className="leading-tight">
            <h1 className="font-display text-lg font-extrabold tracking-tight text-brand-gradient">
              学習漫画ジェネレーター
            </h1>
            <p className="hidden text-[11px] font-medium text-gray-400 sm:block">
              AIで作る、わが子専用の学習まんが
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!hasTextKey ? (
            <Button variant="primary" size="sm" onClick={onOpenSettings}>
              APIキーを設定（必須）
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 ring-1 ring-green-200 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                AI接続済み
              </span>
              {hasImageKey && (
                <span className="hidden items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 ring-1 ring-green-200 md:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  画像生成可
                </span>
              )}
              <Button variant="secondary" size="sm" onClick={onOpenSettings}>
                ⚙️ API設定
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
