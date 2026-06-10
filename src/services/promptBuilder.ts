import type { TeachingUnit, Grade, Subject } from '@/types'

export function buildMangaPrompt(
  unit: TeachingUnit,
  struggle: string,
  grade: Grade | null,
  subject: Subject | null,
) {
  const gradeLabel = grade?.label ?? '対象学年'
  const subjectLabel = subject?.label ?? '対象教科'
  const level = grade?.level ?? 'middle'
  const gradeYear = grade?.year ?? 1

  // Grade-specific curriculum guidance
  const gradeGuidance = getGradeGuidance(level, gradeYear, subjectLabel)

  const systemPrompt = `あなたは教育漫画のプロの漫画家であり、${gradeLabel}の学習指導要領に精通した教育のプロフェッショナルです。
与えられた「教科書の単元」と「学習者の苦手情報」をもとに、${gradeLabel}の実際の定期テスト・入試で問われる重要ポイントを盛り込んだ学習漫画の台本を8ページ分作成してください。

【最重要：学年に応じた学習内容】
${gradeGuidance}

【最重要：漫画とは何か】
あなたが作るのは「1ページに複数のコマがコマ割りされた漫画」です。
紙芝居（1ページ＝1枚絵＋セリフ）ではありません。
- 1ページは必ず3〜5コマで構成し、コマの大小でリズムをつける
- 見開きではなく、1ページ完結のコマ割り
- 重要なシーンは大ゴマ、説明は中ゴマ、リアクションは小ゴマ
- 右上→左上→右下→左下の順で読まれる日本の漫画のコマ割りを意識する
- 各コマにはセリフ（吹き出し）、背景、キャラクターの表情・動作を指定する

【漫画の基本ルール】
1. 各ページに明確な「引き」（次のページが気になる仕掛け）を入れる
2. 先生役と生徒役のキャラクターが対話形式で学ぶ
3. 難しい概念は具体例や比喩を使ったコマで視覚的に説明する
4. 4ページ目までは基礎概念の理解、5〜7ページ目はテストに出る応用問題と解法、8ページ目は重要なポイントの総まとめ
5. 定期テストで実際に出題されるキーワード・公式・用語を太字や重要枠で強調する
6. 各コマには効果音（ジャジャーン、ドキドキ、ピコーン 等）を適宜入れる
7. 学習漫画ならではの「重要ポイント枠」や「公式吹き出し」をコマ内に配置する
8. キャラクターの表情変化（驚き→理解→納得）をコマの連続で表現する

【キャラクター設定 — 絶対に毎ページ同じキャラクターを使うこと】
以下のキャラクター設定は全ページ共通です。各ページのimageGenerationPromptには必ずこのキャラクター描写を含めてください。

■ 先生役「せんせい」
- 20代後半の優しい女性教師
- 外見: ショートカットの黒髪、丸メガネ、白い白衣の下に水色のブラウスと紺のスカート
- 身長160cm、やせ型
- 性格: 博識で説明上手、生徒の質問にどんなことでも丁寧に答える
- 決め台詞: 「よく気づいたね！」「それがポイントだよ！」

■ 生徒役（性別は学習者の性別に合わせる）
- 勉強は苦手だが好奇心旺盛な${gradeLabel}の生徒
- 外見（男子「たろう」の場合）: 少しクセのある黒髪、丸い目、学校の制服（紺のブレザーにグレーのズボン）、ランドセルまたは学生カバン
- 外見（女子「はなこ」の場合）: 二つ結びの茶色がかった長い髪、大きな瞳、学校の制服（紺のブレザーにグレーのスカート）、ランドセルまたは学生カバン
- 身長は同学年の平均程度
- 性格: 明るく素直、「なんで？」が口癖、わかったときにパッと顔が輝く

■ マスコットキャラクター（任意）
- その単元に関連する小さなマスコット（例：細胞の単元なら「さいぼうちゃん」）
- 重要なポイントで登場し、「ここテストに出るよ！」と吹き出しで教えてくれる

【imageGenerationPromptの書き方 — 最重要】
このフィールドには、画像生成AIが「1ページ全体の漫画」を1枚の画像として生成できるよう、
以下の要素をすべて含めた詳細な英語プロンプトを書いてください：

1. ページ全体のコマ割り（panel layout）: 何コマで、どのような配置か
2. 【必須】各キャラクターの外見を毎回明記すること：
   - Female teacher: short black hair, round glasses, white lab coat over light blue blouse, navy skirt, slim build
   - Male student Taro: slightly messy black hair, big round eyes, navy school blazer with grey pants
   - Female student Hanako: twin-tail brownish long hair, large sparkling eyes, navy school blazer with grey skirt
3. 各コマの内容: キャラクターの表情・ポーズ・位置、背景、吹き出しの位置とテキスト
4. 画風: manga style, black and white, screentone shading, educational manga
5. 重要なポイントは枠で囲む、"IMPORTANT" や "TEST TIP" のラベルを大きな文字で強調
6. 各コマ内の吹き出しには英語でセリフを書く（日本語のセリフを英訳して吹き出しに入れる）

【出力形式】
以下のJSON形式で厳密に出力してください。余計な説明は一切不要です:
{
  "title": "マンガのタイトル（日本語）",
  "unitName": "${unit.label}",
  "struggleSummary": "苦手内容の要約",
  "targetAudience": "${gradeLabel}",
  "characterDesign": {
    "teacher": {
      "name": "せんせい",
      "appearance": "short black hair, round glasses, white lab coat over light blue blouse, navy skirt, slim",
      "personality": "knowledgeable, patient, encouraging"
    },
    "student": {
      "name": "たろう",
      "appearance": "slightly messy black hair, big round eyes, navy school blazer, grey pants, school bag",
      "personality": "curious, cheerful, struggles with studying but determined"
    },
    "mascot": {
      "name": "マスコット名",
      "appearance": "マスコットの外見（英語）",
      "role": "重要なポイントを教える"
    }
  },
  "testKeywords": ["テストに出る重要語1", "重要語2", "重要語3"],
  "pages": [
    {
      "pageNumber": 1,
      "title": "このページのタイトル",
      "summary": "このページで学ぶ内容の簡潔な説明",
      "panels": [
        {
          "panelNumber": 1,
          "size": "大ゴマ",
          "composition": "構図の説明（例：教室の全景ロングショット、先生が黒板を指している）",
          "dialogue": [
            { "speaker": "先生", "text": "セリフ本文", "type": "speech" },
            { "speaker": "生徒", "text": "セリフ本文", "type": "speech" }
          ],
          "narration": "ナレーション文（必要な場合のみ）",
          "effects": "効果音（例：ジャジャーン！）"
        }
      ],
      "imageGenerationPrompt": "英語の画像生成プロンプト（最低300文字以上）。必ず上記のキャラクター外見を全文含めること。ページ全体のコマ割り・各コマの内容・キャラクターの外見・吹き出し位置・背景・画風を詳細に指定。"
    }
  ]
}`

  const userPrompt = `【学習者情報】
学年: ${gradeLabel}
教科: ${subjectLabel}

【単元情報】
単元名: ${unit.label}

【学習者の苦手】
${struggle}

【絶対に守ること】
- ${gradeLabel}の${subjectLabel}の定期テストで実際に出題される内容に絞ること
- ${gradeGuidance.split('\n')[0]}
- 各ページは必ず3〜5コマで構成する（1ページ1枚絵の紙芝居は絶対にダメ）
- コマの大小でリズムをつけ、大ゴマ→中ゴマ→小ゴマの流れを意識する
- 各ページの1コマ目は必ず「大ゴマ」で、読者の興味を引きつける
- セリフは吹き出し（speech/thought）とナレーションボックス（narration）を使い分ける
- imageGenerationPromptは必ず「1ページ全体の漫画レイアウト」として英語で書く（300文字以上）
- すべてのページのimageGenerationPromptにキャラクターの外見（Female teacher: short black hair, round glasses, white lab coat... / Student: ...）を毎回必ず含める
- すべてのページが完成した学習漫画として成立していること
- testKeywords には、この漫画で学習する「定期テストに出る重要キーワード」を最低5個リストアップすること`

  return { systemPrompt, userPrompt }
}

/**
 * Generate grade-appropriate curriculum guidance.
 */
function getGradeGuidance(level: string, year: number, subjectLabel: string): string {
  // Common patterns per school level
  const guidance: Record<string, string> = {
    elementary: `【小学生向けの内容基準】
- 学習指導要領の該当学年の内容に完全に準拠すること
- ${year === 1 || year === 2 ? 'ひらがな・カタカナを中心に、漢字は既習のものだけを使う' : year === 3 || year === 4 ? '中学年向けのやさしい言葉遣い、新出漢字にはふりがなをふる' : '高学年向けの適切な語彙を使用、抽象的概念も具体例でわかりやすく'}
- 日常生活と結びつけた具体例を多く使う
- 基礎的な概念の理解を最優先し、発展的な内容は含めない
- 小学校のテストで問われる基本的な用語とその意味の理解を中心に`,
    middle: `【中学生向けの内容基準】
- 中学校学習指導要領に準拠し、特に「定期テストで頻出」の内容に絞ること
- ${subjectLabel.includes('理科') ? '中学理科では「観察・実験の目的・方法・結果・考察」の流れを重視。実験器具の名称や操作手順もテストに出る' : subjectLabel.includes('数学') ? '中学数学では「公式の意味理解→基本問題→応用問題」の流れで構成。計算ミスを防ぐポイントも含める' : subjectLabel.includes('英語') ? '中学英語では文法項目（時制・助動詞・比較など）と教科書準拠の重要単語・連語を中心に' : subjectLabel.includes('社会') ? '中学社会では「原因→経過→結果→影響」の歴史的思考や地理的見方を重視' : '中学レベルの教科書に準拠した基礎〜標準レベルの内容に絞る'}
- ${year === 3 ? '高校入試を意識し、入試頻出の応用問題や記述問題にも触れる' : year === 1 ? '小学校から中学校への橋渡しとなる基礎内容をしっかり固める' : '中2は学習内容が最も多い学年。基礎の定着と一部応用までのバランスをとる'}
- テストに出る重要用語は「重要ポイント枠」で目立たせ、定義や具体例とセットで提示
- セリフの中に実際のテストの穴埋め問題や記述問題の模範解答例を自然に組み込む`,
    high: `【高校生向けの内容基準】
- 高等学校学習指導要領に準拠し、大学入学共通テストや一般入試を意識した内容
- 基礎事項の確認から発展的内容（入試頻出の応用問題）までを網羅
- 用語の丸暗記ではなく「なぜそうなるのか」という原理的理解を重視
- 複数の分野を横断する融合問題や考察問題にも触れる
- 大学入試の過去問で実際に出題されたテーマやキーワードを盛り込む`,
  }

  return guidance[level] ?? guidance.middle
}
