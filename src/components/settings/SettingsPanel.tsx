import { useStore } from '@/store'
import { providerConfigs } from '@/services/ai/registry'
import { IMAGE_MODELS } from '@/services/image/gemini'
import { Button } from '@/components/ui/Button'
import type { ProviderId } from '@/types'

export function SettingsPanel({ onClose }: { onClose: () => void }) {
  const apiKey = useStore((s) => s.apiKey)
  const provider = useStore((s) => s.provider)
  const characterImageUrl = useStore((s) => s.characterImageUrl)
  const imageApiKey = useStore((s) => s.imageApiKey)
  const imageModel = useStore((s) => s.imageModel)
  const setApiKey = useStore((s) => s.setApiKey)
  const setProvider = useStore((s) => s.setProvider)
  const setCharacterImageUrl = useStore((s) => s.setCharacterImageUrl)
  const setImageApiKey = useStore((s) => s.setImageApiKey)
  const setImageModel = useStore((s) => s.setImageModel)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="mx-4 w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-lg font-bold text-gray-900">API設定</h2>

        {/* Text AI section */}
        <div className="mb-4 rounded-lg bg-indigo-50 p-3 text-xs text-indigo-800">
          <span className="font-medium">必須: </span>
          漫画の台本生成に使うAIのAPIキーを設定してください
        </div>

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

        <div className="mb-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
          <strong>おすすめ:</strong> DeepSeek V4 は1回の生成が約0.0035ドル（約0.5円）で最も安価です。
          <a
            href="https://platform.deepseek.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 underline"
          >
            APIキーを取得 →
          </a>
        </div>

        <hr className="mb-4 border-gray-200" />

        {/* Image generation section */}
        <h3 className="mb-3 text-sm font-bold text-gray-800">画像生成設定</h3>

        <div className="mb-3 rounded-lg bg-green-50 p-3 text-xs text-green-800">
          <p className="font-medium mb-1">ツール上で画像生成まで完結できます</p>
          <p>
            Gemini APIキーを設定すると、キャラクター参照画像の生成から各ページの漫画画像生成まで、
            すべてツール内で自動で行えます。設定しない場合はプロンプトのコピーで外部ツールをご利用ください。
          </p>
        </div>

        <label className="mb-2 block text-sm font-medium text-gray-700">
          画像生成APIキー（Gemini）
        </label>
        <input
          type="password"
          className="mb-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="AIza..."
          value={imageApiKey}
          onChange={(e) => setImageApiKey(e.target.value)}
        />
        <p className="mb-1 text-xs text-gray-400">
          <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="underline">
            Gemini APIキーを取得 →
          </a>
        </p>

        <label className="mb-2 mt-3 block text-sm font-medium text-gray-700">
          画像生成モデル
        </label>
        <select
          className="mb-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={imageModel}
          onChange={(e) => setImageModel(e.target.value)}
        >
          <option value={IMAGE_MODELS.standard}>標準: Nano Banana — 約6円/枚・吹き出しは空欄</option>
          <option value={IMAGE_MODELS.pro}>高品質: Nano Banana Pro — 約20円/枚・日本語セリフ入り</option>
        </select>
        <p className="mb-4 text-xs text-gray-400">
          標準モデルは日本語の文字描画が苦手（文字化けの原因）なため、文字を入れずに生成し、セリフはアプリ上に表示します。
          Proモデルは日本語のセリフをそのまま画像に描き込めます。
        </p>

        <div className="mb-4 rounded-lg bg-green-50 p-3 text-xs text-green-800">
          <p className="font-medium mb-1">料金の目安（8ページの漫画1作品あたり）</p>
          <table className="w-full mt-1">
            <thead>
              <tr className="text-left">
                <th className="py-0.5">方法</th>
                <th className="py-0.5">料金</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gemini API (Nano Banana)</td>
                <td>約47円（$0.039×8枚）</td>
              </tr>
              <tr>
                <td>Gemini API (Nano Banana Pro)</td>
                <td>約160円（$0.134×8枚）</td>
              </tr>
              <tr>
                <td>ChatGPT Image2</td>
                <td>Plus加入者は無料</td>
              </tr>
              <tr>
                <td>NanoBanana（無料枠）</td>
                <td>20枚/日まで無料</td>
              </tr>
              <tr>
                <td>コピペ式（プロンプトのみ）</td>
                <td>無料</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="mb-4 border-gray-200" />

        {/* Advanced: external character reference */}
        <details className="mb-4">
          <summary className="cursor-pointer text-sm font-medium text-gray-500 hover:text-gray-700">
            上級者向け: 外部キャラクター参照画像URL
          </summary>
          <div className="mt-3">
            <p className="mb-2 text-xs text-gray-500">
              ツール上でのキャラクター生成とは別に、外部で作成した画像のURLを参照画像として使うこともできます。
            </p>
            <input
              type="text"
              className="mb-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="https://... （画像URL）"
              value={characterImageUrl}
              onChange={(e) => setCharacterImageUrl(e.target.value)}
            />
            <p className="text-xs text-gray-400">
              全ページの画像生成プロンプトに参照画像として自動付与されます
            </p>
          </div>
        </details>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" size="sm" onClick={onClose}>
            閉じる
          </Button>
        </div>
      </div>
    </div>
  )
}
