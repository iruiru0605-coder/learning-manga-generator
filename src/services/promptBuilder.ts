import type { TeachingUnit } from '@/types'

export function buildMangaPrompt(unit: TeachingUnit, struggle: string) {
  const systemPrompt = `あなたは教育マンガ制作の専門家です。
与えられた教科書の単元と学習者の苦手情報をもとに、8ページの学習マンガの台本を日本語で作成してください。

【重要なルール】
1. 各ページは1つの学習ポイントに絞り、段階的に理解が深まるようにする
2. 先生役と生徒役のキャラクターが対話形式で学ぶ
3. 難しい概念は具体例や比喩を使って説明する
4. 最後のページ（8ページ目）は「まとめ」として重要なポイントを復習する
5. セリフは学習者の学年に適した難易度の日本語を使用する（小学生ならひらがな多め）
6. 各コマのサイズ（大ゴマ/中ゴマ/小ゴマ）と構図を指定する
7. imageGenerationPromptは、ChatGPT Image2やNanoBananaで漫画のコマを生成するための詳細な英語プロンプト。キャラクターの表情やポーズ、背景、吹き出しの位置まで指定する。英語で書くこと。
8. 学習マンガ特有の工夫として、重要な公式や単語は吹き出しとは別に枠で強調表示する指示を入れる

【出力形式】
以下のJSON形式で厳密に出力してください。余計な説明は一切不要です:
{
  "title": "マンガのタイトル（日本語）",
  "unitName": "${unit.label}",
  "struggleSummary": "苦手内容の要約",
  "targetAudience": "対象学年",
  "pages": [
    {
      "pageNumber": 1,
      "title": "このページのタイトル",
      "summary": "このページで学ぶ内容の簡潔な説明",
      "panels": [
        {
          "panelNumber": 1,
          "size": "大ゴマ",
          "composition": "構図の説明（例：教室の全景、ロングショット）",
          "dialogue": [
            { "speaker": "先生", "text": "セリフ本文", "type": "speech" },
            { "speaker": "生徒", "text": "セリフ本文", "type": "speech" }
          ],
          "narration": "ナレーション文（必要な場合のみ）",
          "effects": "効果音（必要な場合のみ）"
        }
      ],
      "imageGenerationPrompt": "ChatGPT Image2 / NanoBanana用の画像生成プロンプト（英語）。キャラクターの外見、背景、コマ割り、吹き出し位置、画風（モノクロ漫画/カラー）を詳細に指定。"
    }
  ]
}`

  const userPrompt = `【単元情報】
単元名: ${unit.label}

【学習者の苦手】
${struggle}

上記の単元について、学習者の苦手を克服するための8ページの学習マンガ台本を生成してください。
1ページあたり2〜4コマで構成し、先生と生徒の対話を通じて楽しく学べる内容にしてください。`

  return { systemPrompt, userPrompt }
}
