import { useStore } from '@/store'
import { providerConfigs } from '@/services/ai/registry'
import { Button } from '@/components/ui/Button'
import type { ProviderId } from '@/types'

export function SettingsPanel({ onClose }: { onClose: () => void }) {
  const apiKey = useStore((s) => s.apiKey)
  const provider = useStore((s) => s.provider)
  const setApiKey = useStore((s) => s.setApiKey)
  const setProvider = useStore((s) => s.setProvider)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-lg font-bold text-gray-900">API設定</h2>

        <label className="mb-2 block text-sm font-medium text-gray-700">
          AIプロバイダー
        </label>
        <select
          className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={provider}
          onChange={(e) => setProvider(e.target.value as ProviderId)}
        >
          {providerConfigs.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>

        <label className="mb-2 block text-sm font-medium text-gray-700">
          APIキー
        </label>
        <input
          type="password"
          className="mb-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="sk-..."
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <p className="mb-4 text-xs text-gray-400">
          APIキーはあなたのブラウザにのみ保存され、外部に送信されることはありません
        </p>

        <div className="rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
          <strong>おすすめ:</strong> DeepSeek V4 を使うと1回の生成が約0.0035ドル（約0.5円）です。
          <a
            href="https://platform.deepseek.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 underline"
          >
            APIキーを取得 →
          </a>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" size="sm" onClick={onClose}>
            閉じる
          </Button>
        </div>
      </div>
    </div>
  )
}
