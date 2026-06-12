import { useStore } from '@/store'
import { Icon } from '@/components/ui/Icon'

export function Header({ onOpenSettings }: { onOpenSettings: () => void }) {
  const apiKey = useStore((s) => s.apiKey)
  const imageApiKey = useStore((s) => s.imageApiKey)

  const hasTextKey = !!apiKey.trim()
  const hasImageKey = !!imageApiKey.trim()

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-900/10">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
            <Icon name="book" className="h-5 w-5 text-white" />
          </span>
          <div className="leading-tight">
            <h1 className="font-display text-lg font-extrabold tracking-tight text-white">
              学習漫画ジェネレーター
            </h1>
            <p className="hidden text-[11px] font-medium text-indigo-100/90 sm:block">
              AIで作る、わが子専用の学習まんが
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!hasTextKey ? (
            <button
              onClick={onOpenSettings}
              className="h-9 cursor-pointer rounded-xl bg-white px-4 text-sm font-bold text-indigo-700 shadow-sm transition-colors hover:bg-indigo-50"
            >
              APIキーを設定（必須）
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white ring-1 ring-white/20 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                AI接続済み
              </span>
              {hasImageKey && (
                <span className="hidden items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white ring-1 ring-white/20 md:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  画像生成可
                </span>
              )}
              <button
                onClick={onOpenSettings}
                className="flex h-9 cursor-pointer items-center gap-1.5 rounded-xl bg-white/15 px-3.5 text-sm font-bold text-white ring-1 ring-white/25 transition-colors hover:bg-white/25"
              >
                <Icon name="sliders" className="h-4 w-4" />
                API設定
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
