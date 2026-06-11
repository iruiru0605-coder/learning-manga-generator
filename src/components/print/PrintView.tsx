import { useEffect, useState } from 'react'
import { useStore } from '@/store'
import { Button } from '@/components/ui/Button'
import { idbGetAllImages } from '@/services/imageStore'
import type { MangaScript } from '@/types'

/**
 * 表紙+全ページ+セリフをまとめた印刷用ビュー。
 * ブラウザの印刷機能で「PDFに保存」すれば1冊のPDFになる。
 */
export function PrintView({ script, onClose }: { script: MangaScript; onClose: () => void }) {
  const studentName = useStore((s) => s.studentName)
  const [images, setImages] = useState<Record<string, string>>({})

  useEffect(() => {
    idbGetAllImages().then(setImages).catch(() => {})
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const generatedCount = script.pages?.filter((p) => images[`page-${p.pageNumber}`]).length ?? 0

  return (
    <div className="print-overlay fixed inset-0 z-50 overflow-y-auto bg-gray-100">
      {/* 操作バー（印刷時は非表示） */}
      <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-2 bg-white/90 px-4 py-3 shadow-sm backdrop-blur print:hidden">
        <p className="font-display text-sm font-bold text-gray-700">
          📖 印刷プレビュー — 印刷画面で「PDFに保存」を選ぶと1冊のPDFになります
        </p>
        <div className="flex gap-2">
          <Button variant="primary" size="sm" onClick={() => window.print()}>
            🖨 印刷 / PDF保存
          </Button>
          <Button variant="secondary" size="sm" onClick={onClose}>
            閉じる
          </Button>
        </div>
      </div>

      {generatedCount < (script.pages?.length ?? 0) && (
        <p className="mx-auto mt-3 max-w-3xl px-6 text-xs text-amber-700 print:hidden">
          ⚠️ 画像未生成のページはセリフのみで出力されます（{generatedCount}/{script.pages?.length}ページ生成済み）
        </p>
      )}

      <div className="print-area mx-auto max-w-3xl space-y-6 p-6">
        {/* 表紙 */}
        <section className="print-page rounded-2xl bg-white p-10 text-center shadow-sm">
          <p className="mb-2 text-sm text-gray-400">
            {script.targetAudience} ／ {script.unitName}
          </p>
          <h1 className="font-display mb-4 text-3xl font-extrabold text-gray-900">{script.title}</h1>
          {studentName && <p className="mb-6 text-base text-gray-600">{studentName}さんのための学習まんが</p>}
          <p className="mx-auto max-w-md text-sm leading-relaxed text-gray-500">{script.struggleSummary}</p>
          {script.testKeywords && script.testKeywords.length > 0 && (
            <div className="mt-8">
              <p className="mb-2 text-xs font-bold text-gray-400">テストに出るキーワード</p>
              <div className="flex flex-wrap justify-center gap-2">
                {script.testKeywords.map((k) => (
                  <span
                    key={k}
                    className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 ring-1 ring-amber-200"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* 各ページ: 画像 + セリフ */}
        {script.pages?.map((page) => {
          const img = images[`page-${page.pageNumber}`]
          return (
            <section key={page.pageNumber} className="print-page rounded-2xl bg-white p-8 shadow-sm">
              <div className="mb-3 flex items-baseline justify-between">
                <h2 className="font-display text-lg font-extrabold text-gray-900">{page.title}</h2>
                <span className="text-xs text-gray-400">P.{page.pageNumber}</span>
              </div>
              {img ? (
                <img
                  src={img}
                  alt={`ページ${page.pageNumber}`}
                  className="mx-auto mb-4 w-auto max-h-[560px] rounded-lg ring-1 ring-gray-200"
                />
              ) : (
                <p className="mb-4 rounded-lg bg-gray-50 p-4 text-center text-xs text-gray-400 print:hidden">
                  （このページの画像は未生成です）
                </p>
              )}
              <div className="space-y-1.5">
                {(page.panels ?? []).map((panel) => (
                  <div key={panel.panelNumber}>
                    {(panel.dialogue ?? []).map((d, i) => (
                      <p key={i} className="text-sm leading-relaxed text-gray-800">
                        <span className="mr-1 text-xs text-gray-400">コマ{panel.panelNumber}</span>
                        <span className="font-bold">{d.speaker}</span>「{d.text}」
                      </p>
                    ))}
                    {panel.narration && (
                      <p className="text-sm leading-relaxed text-gray-500">
                        <span className="mr-1 text-xs text-gray-400">コマ{panel.panelNumber}</span>
                        {panel.narration}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )
        })}

        <p className="pb-10 text-center text-xs text-gray-400 print:hidden">学習漫画ジェネレーターで作成</p>
      </div>
    </div>
  )
}
