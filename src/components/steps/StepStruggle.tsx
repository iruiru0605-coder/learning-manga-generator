import { useState } from 'react'
import { useStore } from '@/store'
import { useMangaGeneration } from '@/hooks/useMangaGeneration'
import { Button } from '@/components/ui/Button'
import { fileToResizedDataUrl, dataUrlToResizedDataUrl } from '@/services/image/resize'
import { generateImage, buildCharacterPrompt, NO_TEXT_RULE, dataUrlToImageRef, type ImageRef } from '@/services/image/gemini'
import { toFriendlyErrorMessage } from '@/services/friendlyError'
import type { StudentGender } from '@/types'

interface StepStruggleProps {
  onNext: () => void
  canAdvance: boolean
}

export function StepStruggle({ onNext, canAdvance }: StepStruggleProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCreatingChar, setIsCreatingChar] = useState(false)
  const [charCreateError, setCharCreateError] = useState<string | null>(null)
  const unit = useStore((s) => s.unit)
  const struggle = useStore((s) => s.struggle)
  const status = useStore((s) => s.status)
  const error = useStore((s) => s.error)
  const apiKey = useStore((s) => s.apiKey)
  const setStruggle = useStore((s) => s.setStruggle)
  const studentName = useStore((s) => s.studentName)
  const studentGender = useStore((s) => s.studentGender)
  const characterNotes = useStore((s) => s.characterNotes)
  const characterRefImage = useStore((s) => s.characterRefImage)
  const customCharacterImage = useStore((s) => s.customCharacterImage)
  const imageApiKey = useStore((s) => s.imageApiKey)
  const imageModel = useStore((s) => s.imageModel)
  const setStudentName = useStore((s) => s.setStudentName)
  const setStudentGender = useStore((s) => s.setStudentGender)
  const setCharacterNotes = useStore((s) => s.setCharacterNotes)
  const setCharacterRefImage = useStore((s) => s.setCharacterRefImage)
  const setCustomCharacterImage = useStore((s) => s.setCustomCharacterImage)
  const { generate } = useMangaGeneration()

  // 名前・性別・メモ（＋参考画像）から、漫画スタイルの主人公キャラをその場で生成する
  const handleCreateCharacter = async () => {
    if (!imageApiKey) return
    setIsCreatingChar(true)
    setCharCreateError(null)
    try {
      const genderDesc =
        studentGender === 'girl'
          ? 'Japanese girl student'
          : studentGender === 'boy'
            ? 'Japanese boy student'
            : 'Japanese student'
      let prompt = `${NO_TEXT_RULE}\n\n${buildCharacterPrompt({
        name: studentName.trim() || '主人公',
        role: 'Student protagonist of an educational manga',
        appearance: `${genderDesc} in school uniform. Additional traits specified by the parent (in Japanese, follow them faithfully): ${characterNotes.trim() || '明るく元気な子ども'}`,
        personality: '明るく素直で好奇心旺盛',
      })}`
      let referenceImages: ImageRef[] | undefined
      if (characterRefImage) {
        const ref = dataUrlToImageRef(characterRefImage)
        if (ref) {
          referenceImages = [ref]
          prompt +=
            '\n\nA reference photo/illustration is provided. Design the character to resemble it ' +
            '(hairstyle, hair color, glasses or accessories, overall vibe) while strictly keeping the ' +
            'cute chibi manga cartoon style. Never draw a realistic portrait of the reference.'
        }
      }
      const result = await generateImage({ prompt, apiKey: imageApiKey, referenceImages, model: imageModel })
      // localStorageに保存できるサイズへ縮小してから保持する
      const resized = await dataUrlToResizedDataUrl(`data:${result.mimeType};base64,${result.imageData}`)
      setCustomCharacterImage(resized)
    } catch (err) {
      setCharCreateError(toFriendlyErrorMessage(err, 'キャラクター画像の生成に失敗しました'))
    } finally {
      setIsCreatingChar(false)
    }
  }

  const handleRefImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const dataUrl = await fileToResizedDataUrl(file)
      setCharacterRefImage(dataUrl)
    } catch (err) {
      alert(err instanceof Error ? err.message : '画像の読み込みに失敗しました')
    } finally {
      e.target.value = ''
    }
  }

  const handleGenerate = async () => {
    if (!apiKey) {
      alert('先にAPIキーを設定してください（右上の「API設定」ボタン）')
      return
    }
    setIsGenerating(true)
    await generate()
    setIsGenerating(false)
  }

  if (isGenerating || status === 'generating') {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-gray-900/5">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
          <svg className="h-10 w-10 animate-bounce text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-bold text-gray-900">AIが漫画を執筆中...</h3>
        <p className="mb-4 text-sm text-gray-500">
          「{unit?.label}」の学習漫画を8ページ分、制作しています
        </p>
        <div className="mx-auto max-w-xs">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div className="h-full animate-pulse rounded-full bg-indigo-500" style={{ width: '60%' }} />
          </div>
        </div>
        <p className="mt-3 text-xs text-gray-400">
          コマ割り・セリフ・画像プロンプトを生成中... 約20〜30秒かかります
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 text-xl">
            💭
          </span>
          <div>
            <h2 className="font-display text-xl font-extrabold tracking-tight text-gray-900">苦手を教えてください</h2>
            <p className="text-sm text-gray-500">選んだ単元の中で、特につまずいているところを自由に書いてください</p>
          </div>
        </div>

        {unit && (
          <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
            選択中: {unit.label}
          </div>
        )}

        <div className="mb-4 rounded-lg bg-blue-50 p-4">
          <p className="text-sm font-medium text-blue-800">🤖 AIからの質問:</p>
          <p className="mt-1 text-sm text-blue-700">
            「{unit?.label || 'この単元'}」の中で、どこが一番わかりにくいですか？
            つまずいているところや、もっと詳しく知りたいところを教えてください。
          </p>
        </div>

        <textarea
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 min-h-[120px]"
          placeholder="例：分数の足し算で、分母が違うときにどうすればいいかわかりません。通分の考え方がピンときません..."
          value={struggle}
          onChange={(e) => setStruggle(e.target.value)}
        />

        <details className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4" open={!!(studentName || characterNotes || characterRefImage)}>
          <summary className="cursor-pointer text-sm font-medium text-gray-700">
            🎨 主人公キャラクター設定（任意）— お子さんを漫画の主人公にできます
          </summary>
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">主人公の名前</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="例：ゆうと（未入力なら たろう／はなこ）"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">性別</label>
                <select
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  value={studentGender}
                  onChange={(e) => setStudentGender(e.target.value as StudentGender)}
                >
                  <option value="auto">指定しない</option>
                  <option value="boy">男の子</option>
                  <option value="girl">女の子</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                外見・性格のメモ（台本のセリフとキャラクター画像の両方に反映されます）
              </label>
              <textarea
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                rows={2}
                placeholder="例：ポニーテールでメガネ。サッカーが大好きで、いつも犬のぬいぐるみを持っている"
                value={characterNotes}
                onChange={(e) => setCharacterNotes(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                参考画像（任意）— お子さんの写真や好きなイラストに似せてキャラクターを生成します
              </label>
              {characterRefImage ? (
                <div className="flex items-center gap-3">
                  <img
                    src={characterRefImage}
                    alt="キャラクター参考画像"
                    className="h-20 w-20 rounded-lg border border-gray-200 object-cover"
                  />
                  <Button variant="secondary" size="sm" onClick={() => setCharacterRefImage('')}>
                    削除
                  </Button>
                </div>
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleRefImageUpload}
                  className="block w-full text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-xs file:font-medium file:text-indigo-700 hover:file:bg-indigo-100"
                />
              )}
              <p className="mt-1 text-xs text-gray-400">
                画像はあなたのブラウザ内にのみ保存され、キャラクター画像の生成時にGeminiへ参考として送信されます
              </p>
            </div>

            <div className="rounded-lg border border-indigo-200 bg-white p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-bold text-gray-700">✨ オリジナルキャラクターをその場で生成</p>
                  <p className="text-xs text-gray-400">
                    上の名前・性別・メモ（と参考画像）から、漫画スタイルの主人公キャラ画像をいま作れます
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  disabled={isCreatingChar || !imageApiKey}
                  onClick={handleCreateCharacter}
                >
                  {isCreatingChar ? '生成中...' : customCharacterImage ? '作り直す' : 'キャラクターを生成'}
                </Button>
              </div>
              {!imageApiKey && (
                <p className="mt-2 text-xs text-amber-600">
                  この機能を使うには、右上の「API設定」で画像生成APIキー（Gemini）の設定が必要です
                </p>
              )}
              {charCreateError && (
                <p className="mt-2 whitespace-pre-line text-xs text-red-600">{charCreateError}</p>
              )}
              {customCharacterImage && (
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={customCharacterImage}
                    alt="生成した主人公キャラクター"
                    className="h-32 w-32 rounded-lg border border-gray-200 bg-gray-50 object-contain"
                  />
                  <div className="flex flex-col gap-1.5">
                    <p className="text-xs font-medium text-green-700">
                      ✓ このキャラクターが主人公として全ページの参照に使われます
                    </p>
                    <p className="text-xs text-gray-400">
                      イメージと違うときは、メモを書き足して「作り直す」を押してください
                    </p>
                    <Button variant="ghost" size="sm" onClick={() => setCustomCharacterImage('')}>
                      削除
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </details>

        {error && (
          <div className="mt-3 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            <p className="font-medium mb-1">⚠️ エラーが発生しました</p>
            <p className="whitespace-pre-line">{error}</p>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <Button onClick={handleGenerate} disabled={!struggle.trim()} size="lg" variant="primary">
          漫画の台本を生成する
        </Button>
        {canAdvance && (
          <Button onClick={onNext} variant="secondary" size="lg">
            生成された台本を見る →
          </Button>
        )}
      </div>
    </div>
  )
}
