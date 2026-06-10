import type { Grade, Subject, Textbook, TeachingUnit } from '@/types'

export const grades: Grade[] = [
  { id: 'e1', label: '小学1年生', shortLabel: '小1', level: 'elementary', year: 1 },
  { id: 'e2', label: '小学2年生', shortLabel: '小2', level: 'elementary', year: 2 },
  { id: 'e3', label: '小学3年生', shortLabel: '小3', level: 'elementary', year: 3 },
  { id: 'e4', label: '小学4年生', shortLabel: '小4', level: 'elementary', year: 4 },
  { id: 'e5', label: '小学5年生', shortLabel: '小5', level: 'elementary', year: 5 },
  { id: 'e6', label: '小学6年生', shortLabel: '小6', level: 'elementary', year: 6 },
  { id: 'm1', label: '中学1年生', shortLabel: '中1', level: 'middle', year: 1 },
  { id: 'm2', label: '中学2年生', shortLabel: '中2', level: 'middle', year: 2 },
  { id: 'm3', label: '中学3年生', shortLabel: '中3', level: 'middle', year: 3 },
  { id: 'h1', label: '高校1年生', shortLabel: '高1', level: 'high', year: 1 },
  { id: 'h2', label: '高校2年生', shortLabel: '高2', level: 'high', year: 2 },
  { id: 'h3', label: '高校3年生', shortLabel: '高3', level: 'high', year: 3 },
]

export const subjects: Subject[] = [
  { id: 'kokugo', label: '国語', gradeIds: ['e1','e2','e3','e4','e5','e6','m1','m2','m3','h1','h2','h3'] },
  { id: 'sansu', label: '算数', gradeIds: ['e1','e2','e3','e4','e5','e6'] },
  { id: 'math', label: '数学', gradeIds: ['m1','m2','m3','h1','h2','h3'] },
  { id: 'rika', label: '理科', gradeIds: ['e3','e4','e5','e6','m1','m2','m3'] },
  { id: 'butsuri', label: '物理', gradeIds: ['h1','h2','h3'] },
  { id: 'kagaku', label: '化学', gradeIds: ['h1','h2','h3'] },
  { id: 'seibutsu', label: '生物', gradeIds: ['h1','h2','h3'] },
  { id: 'shakai', label: '社会', gradeIds: ['e3','e4','e5','e6','m1','m2'] },
  { id: 'chiri', label: '地理', gradeIds: ['m1','m2','h1','h2'] },
  { id: 'rekishi', label: '歴史', gradeIds: ['m1','m2','m3','h1','h2','h3'] },
  { id: 'komin', label: '公民', gradeIds: ['m3','h1','h2','h3'] },
  { id: 'eigo', label: '英語', gradeIds: ['m1','m2','m3','h1','h2','h3'] },
  { id: 'seikatsu', label: '生活', gradeIds: ['e1','e2'] },
]

const eGradeIds = ['e1','e2','e3','e4','e5','e6']
const mGradeIds = ['m1','m2','m3']
const hGradeIds = ['h1','h2','h3']

function makeTextbook(id: string, label: string, publisher: string, subjectId: string, gradeIds: string[]): Textbook[] {
  return gradeIds.map((gid) => ({
    id: `${id}-${gid}`,
    label,
    publisher,
    subjectId,
    gradeId: gid,
  }))
}

const textbookDefs: { id: string; label: string; publisher: string; subjectId: string; grades: string[] }[] = [
  { id: 'kokugo-mitsumura', label: '国語', publisher: '光村図書', subjectId: 'kokugo', grades: [...eGradeIds, ...mGradeIds] },
  { id: 'kokugo-kyoiku', label: '国語', publisher: '教育出版', subjectId: 'kokugo', grades: [...eGradeIds, ...mGradeIds] },
  { id: 'kokugo-tokyo', label: '新編国語', publisher: '東京書籍', subjectId: 'kokugo', grades: hGradeIds },
  { id: 'kokugo-chikuma', label: '精選国語', publisher: '筑摩書房', subjectId: 'kokugo', grades: hGradeIds },
  { id: 'sansu-tokyo', label: '新しい算数', publisher: '東京書籍', subjectId: 'sansu', grades: eGradeIds },
  { id: 'sansu-keirin', label: 'わくわく算数', publisher: '啓林館', subjectId: 'sansu', grades: eGradeIds },
  { id: 'sansu-gakko', label: 'みんなと学ぶ 小学校算数', publisher: '学校図書', subjectId: 'sansu', grades: eGradeIds },
  { id: 'math-tokyo', label: '新しい数学', publisher: '東京書籍', subjectId: 'math', grades: mGradeIds },
  { id: 'math-keirin', label: '未来へひろがる数学', publisher: '啓林館', subjectId: 'math', grades: mGradeIds },
  { id: 'math-h-tokyo', label: '数学I・A', publisher: '東京書籍', subjectId: 'math', grades: hGradeIds },
  { id: 'math-h-suken', label: '高等学校数学', publisher: '数研出版', subjectId: 'math', grades: hGradeIds },
  { id: 'rika-tokyo', label: '新しい理科', publisher: '東京書籍', subjectId: 'rika', grades: ['e3','e4','e5','e6'] },
  { id: 'rika-keirin', label: '未来をひらく 小学理科', publisher: '啓林館', subjectId: 'rika', grades: ['e3','e4','e5','e6'] },
  { id: 'rika-m-tokyo', label: '新しい科学', publisher: '東京書籍', subjectId: 'rika', grades: mGradeIds },
  { id: 'rika-m-keirin', label: '未来へひろがるサイエンス', publisher: '啓林館', subjectId: 'rika', grades: mGradeIds },
  { id: 'butsuri-suken', label: '物理基礎・物理', publisher: '数研出版', subjectId: 'butsuri', grades: hGradeIds },
  { id: 'butsuri-tokyo', label: '物理', publisher: '東京書籍', subjectId: 'butsuri', grades: hGradeIds },
  { id: 'kagaku-suken', label: '化学基礎・化学', publisher: '数研出版', subjectId: 'kagaku', grades: hGradeIds },
  { id: 'kagaku-tokyo', label: '化学', publisher: '東京書籍', subjectId: 'kagaku', grades: hGradeIds },
  { id: 'seibutsu-suken', label: '生物基礎・生物', publisher: '数研出版', subjectId: 'seibutsu', grades: hGradeIds },
  { id: 'shakai-tokyo', label: '新しい社会', publisher: '東京書籍', subjectId: 'shakai', grades: ['e3','e4','e5','e6'] },
  { id: 'shakai-kyoiku', label: '小学社会', publisher: '教育出版', subjectId: 'shakai', grades: ['e3','e4','e5','e6'] },
  { id: 'chiri-tokyo', label: '新しい社会 地理', publisher: '東京書籍', subjectId: 'chiri', grades: ['m1','m2'] },
  { id: 'rekishi-tokyo', label: '新しい社会 歴史', publisher: '東京書籍', subjectId: 'rekishi', grades: ['m1','m2','m3'] },
  { id: 'rekishi-h-yamakawa', label: '詳説日本史', publisher: '山川出版社', subjectId: 'rekishi', grades: hGradeIds },
  { id: 'komin-tokyo', label: '新しい社会 公民', publisher: '東京書籍', subjectId: 'komin', grades: ['m3'] },
  { id: 'eigo-tokyo', label: 'NEW HORIZON', publisher: '東京書籍', subjectId: 'eigo', grades: [...mGradeIds, ...hGradeIds] },
  { id: 'eigo-sanseido', label: 'CROWN', publisher: '三省堂', subjectId: 'eigo', grades: hGradeIds },
  { id: 'seikatsu-tokyo', label: '新しい生活', publisher: '東京書籍', subjectId: 'seikatsu', grades: ['e1','e2'] },
]

export const textbooks: Textbook[] = textbookDefs.flatMap((d) => makeTextbook(d.id, d.label, d.publisher, d.subjectId, d.grades))

// Teaching units — representative data focused on common units
interface UnitDef { label: string; textbookBaseId: string; gradeId: string; parentId?: string; order: number }

function makeUnits(defs: UnitDef[]): TeachingUnit[] {
  return defs.map((d, i) => ({
    id: `${d.textbookBaseId}-${d.gradeId}-u${i}`,
    label: d.label,
    textbookId: `${d.textbookBaseId}-${d.gradeId}`,
    parentUnitId: d.parentId || null,
    order: d.order,
  }))
}

const elementarySansuTokyo: UnitDef[] = [
  { label: '大きい数', textbookBaseId: 'sansu-tokyo', gradeId: 'e1', order: 1 },
  { label: 'いくつといくつ', textbookBaseId: 'sansu-tokyo', gradeId: 'e1', order: 2 },
  { label: 'たし算', textbookBaseId: 'sansu-tokyo', gradeId: 'e1', order: 3 },
  { label: 'ひき算', textbookBaseId: 'sansu-tokyo', gradeId: 'e1', order: 4 },
  { label: '長さくらべ', textbookBaseId: 'sansu-tokyo', gradeId: 'e1', order: 5 },
  { label: 'かたちあそび', textbookBaseId: 'sansu-tokyo', gradeId: 'e1', order: 6 },

  { label: 'ひょうとグラフ', textbookBaseId: 'sansu-tokyo', gradeId: 'e2', order: 1 },
  { label: 'たし算のひっ算', textbookBaseId: 'sansu-tokyo', gradeId: 'e2', order: 2 },
  { label: 'ひき算のひっ算', textbookBaseId: 'sansu-tokyo', gradeId: 'e2', order: 3 },
  { label: '長さのたんい', textbookBaseId: 'sansu-tokyo', gradeId: 'e2', order: 4 },
  { label: 'かけ算', textbookBaseId: 'sansu-tokyo', gradeId: 'e2', order: 5 },
  { label: '水のかさ', textbookBaseId: 'sansu-tokyo', gradeId: 'e2', order: 6 },

  { label: 'かけ算のきまり', textbookBaseId: 'sansu-tokyo', gradeId: 'e3', order: 1 },
  { label: '時こくと時間', textbookBaseId: 'sansu-tokyo', gradeId: 'e3', order: 2 },
  { label: 'わり算', textbookBaseId: 'sansu-tokyo', gradeId: 'e3', order: 3 },
  { label: '円と球', textbookBaseId: 'sansu-tokyo', gradeId: 'e3', order: 4 },
  { label: '小数', textbookBaseId: 'sansu-tokyo', gradeId: 'e3', order: 5 },
  { label: '分数', textbookBaseId: 'sansu-tokyo', gradeId: 'e3', order: 6 },

  { label: '大きな数', textbookBaseId: 'sansu-tokyo', gradeId: 'e4', order: 1 },
  { label: 'わり算の筆算', textbookBaseId: 'sansu-tokyo', gradeId: 'e4', order: 2 },
  { label: '折れ線グラフ', textbookBaseId: 'sansu-tokyo', gradeId: 'e4', order: 3 },
  { label: '小数のしくみ', textbookBaseId: 'sansu-tokyo', gradeId: 'e4', order: 4 },
  { label: '面積', textbookBaseId: 'sansu-tokyo', gradeId: 'e4', order: 5 },
  { label: '分数', textbookBaseId: 'sansu-tokyo', gradeId: 'e4', order: 6 },

  { label: '整数の性質', textbookBaseId: 'sansu-tokyo', gradeId: 'e5', order: 1 },
  { label: '小数のかけ算', textbookBaseId: 'sansu-tokyo', gradeId: 'e5', order: 2 },
  { label: '小数のわり算', textbookBaseId: 'sansu-tokyo', gradeId: 'e5', order: 3 },
  { label: '分数のたし算とひき算', textbookBaseId: 'sansu-tokyo', gradeId: 'e5', order: 4 },
  { label: '割合', textbookBaseId: 'sansu-tokyo', gradeId: 'e5', order: 5 },
  { label: '円周率と円の面積', textbookBaseId: 'sansu-tokyo', gradeId: 'e5', order: 6 },
  { label: '正多角形', textbookBaseId: 'sansu-tokyo', gradeId: 'e5', order: 7 },

  { label: '対称な図形', textbookBaseId: 'sansu-tokyo', gradeId: 'e6', order: 1 },
  { label: '分数のかけ算', textbookBaseId: 'sansu-tokyo', gradeId: 'e6', order: 2 },
  { label: '分数のわり算', textbookBaseId: 'sansu-tokyo', gradeId: 'e6', order: 3 },
  { label: '文字と式', textbookBaseId: 'sansu-tokyo', gradeId: 'e6', order: 4 },
  { label: '比', textbookBaseId: 'sansu-tokyo', gradeId: 'e6', order: 5 },
  { label: '比例と反比例', textbookBaseId: 'sansu-tokyo', gradeId: 'e6', order: 6 },
  { label: '立体の体積', textbookBaseId: 'sansu-tokyo', gradeId: 'e6', order: 7 },
]

const middleMathTokyo: UnitDef[] = [
  { label: '正の数・負の数', textbookBaseId: 'math-tokyo', gradeId: 'm1', order: 1 },
  { label: '文字と式', textbookBaseId: 'math-tokyo', gradeId: 'm1', order: 2 },
  { label: '方程式', textbookBaseId: 'math-tokyo', gradeId: 'm1', order: 3 },
  { label: '比例と反比例', textbookBaseId: 'math-tokyo', gradeId: 'm1', order: 4 },
  { label: '平面図形', textbookBaseId: 'math-tokyo', gradeId: 'm1', order: 5 },
  { label: '空間図形', textbookBaseId: 'math-tokyo', gradeId: 'm1', order: 6 },
  { label: 'データの分析', textbookBaseId: 'math-tokyo', gradeId: 'm1', order: 7 },

  { label: '式の計算', textbookBaseId: 'math-tokyo', gradeId: 'm2', order: 1 },
  { label: '連立方程式', textbookBaseId: 'math-tokyo', gradeId: 'm2', order: 2 },
  { label: '一次関数', textbookBaseId: 'math-tokyo', gradeId: 'm2', order: 3 },
  { label: '図形の性質と合同', textbookBaseId: 'math-tokyo', gradeId: 'm2', order: 4 },
  { label: '三角形と四角形', textbookBaseId: 'math-tokyo', gradeId: 'm2', order: 5 },
  { label: '確率', textbookBaseId: 'math-tokyo', gradeId: 'm2', order: 6 },

  { label: '式の展開と因数分解', textbookBaseId: 'math-tokyo', gradeId: 'm3', order: 1 },
  { label: '平方根', textbookBaseId: 'math-tokyo', gradeId: 'm3', order: 2 },
  { label: '二次方程式', textbookBaseId: 'math-tokyo', gradeId: 'm3', order: 3 },
  { label: '関数 y=ax²', textbookBaseId: 'math-tokyo', gradeId: 'm3', order: 4 },
  { label: '相似な図形', textbookBaseId: 'math-tokyo', gradeId: 'm3', order: 5 },
  { label: '円の性質', textbookBaseId: 'math-tokyo', gradeId: 'm3', order: 6 },
  { label: '三平方の定理', textbookBaseId: 'math-tokyo', gradeId: 'm3', order: 7 },
  { label: '標本調査', textbookBaseId: 'math-tokyo', gradeId: 'm3', order: 8 },
]

const middleRikaTokyo: UnitDef[] = [
  { label: '身近な生物の観察', textbookBaseId: 'rika-m-tokyo', gradeId: 'm1', order: 1 },
  { label: '植物のつくりとはたらき', textbookBaseId: 'rika-m-tokyo', gradeId: 'm1', order: 2 },
  { label: '物質のすがた', textbookBaseId: 'rika-m-tokyo', gradeId: 'm1', order: 3 },
  { label: '水溶液の性質', textbookBaseId: 'rika-m-tokyo', gradeId: 'm1', order: 4 },
  { label: '光・音・力', textbookBaseId: 'rika-m-tokyo', gradeId: 'm1', order: 5 },
  { label: '大地の変化', textbookBaseId: 'rika-m-tokyo', gradeId: 'm1', order: 6 },

  { label: '生物の体のつくりとはたらき', textbookBaseId: 'rika-m-tokyo', gradeId: 'm2', order: 1 },
  { label: '動物の生活と生物の進化', textbookBaseId: 'rika-m-tokyo', gradeId: 'm2', order: 2 },
  { label: '化学変化と原子・分子', textbookBaseId: 'rika-m-tokyo', gradeId: 'm2', order: 3 },
  { label: '化学変化とイオン', textbookBaseId: 'rika-m-tokyo', gradeId: 'm2', order: 4 },
  { label: '電流とその利用', textbookBaseId: 'rika-m-tokyo', gradeId: 'm2', order: 5 },
  { label: '気象のしくみと天気の変化', textbookBaseId: 'rika-m-tokyo', gradeId: 'm2', order: 6 },

  { label: '力と運動', textbookBaseId: 'rika-m-tokyo', gradeId: 'm3', order: 1 },
  { label: 'エネルギーと仕事', textbookBaseId: 'rika-m-tokyo', gradeId: 'm3', order: 2 },
  { label: '天体の動きと地球の自転・公転', textbookBaseId: 'rika-m-tokyo', gradeId: 'm3', order: 3 },
  { label: '太陽系と宇宙', textbookBaseId: 'rika-m-tokyo', gradeId: 'm3', order: 4 },
  { label: '自然界のつながり', textbookBaseId: 'rika-m-tokyo', gradeId: 'm3', order: 5 },
  { label: '科学技術と人間', textbookBaseId: 'rika-m-tokyo', gradeId: 'm3', order: 6 },
]

const middleEigoTokyo: UnitDef[] = [
  { label: 'アルファベットと単語', textbookBaseId: 'eigo-tokyo', gradeId: 'm1', order: 1 },
  { label: 'I am ~. You are ~.', textbookBaseId: 'eigo-tokyo', gradeId: 'm1', order: 2 },
  { label: '一般動詞と疑問文・否定文', textbookBaseId: 'eigo-tokyo', gradeId: 'm1', order: 3 },
  { label: '三人称単数現在形', textbookBaseId: 'eigo-tokyo', gradeId: 'm1', order: 4 },
  { label: '代名詞', textbookBaseId: 'eigo-tokyo', gradeId: 'm1', order: 5 },
  { label: '現在進行形', textbookBaseId: 'eigo-tokyo', gradeId: 'm1', order: 6 },

  { label: '過去形（規則動詞・不規則動詞）', textbookBaseId: 'eigo-tokyo', gradeId: 'm2', order: 1 },
  { label: '未来形 will', textbookBaseId: 'eigo-tokyo', gradeId: 'm2', order: 2 },
  { label: '助動詞（can, mustなど）', textbookBaseId: 'eigo-tokyo', gradeId: 'm2', order: 3 },
  { label: '不定詞', textbookBaseId: 'eigo-tokyo', gradeId: 'm2', order: 4 },
  { label: '比較級・最上級', textbookBaseId: 'eigo-tokyo', gradeId: 'm2', order: 5 },
  { label: '受動態（受け身）', textbookBaseId: 'eigo-tokyo', gradeId: 'm2', order: 6 },

  { label: '現在完了形', textbookBaseId: 'eigo-tokyo', gradeId: 'm3', order: 1 },
  { label: '関係代名詞', textbookBaseId: 'eigo-tokyo', gradeId: 'm3', order: 2 },
  { label: '分詞・間接疑問文', textbookBaseId: 'eigo-tokyo', gradeId: 'm3', order: 3 },
  { label: '仮定法（基礎）', textbookBaseId: 'eigo-tokyo', gradeId: 'm3', order: 4 },
]

const middleShakaiTokyo: UnitDef[] = [
  { label: '世界の地域構成', textbookBaseId: 'chiri-tokyo', gradeId: 'm1', order: 1 },
  { label: 'アジア州', textbookBaseId: 'chiri-tokyo', gradeId: 'm1', order: 2 },
  { label: 'アフリカ州', textbookBaseId: 'chiri-tokyo', gradeId: 'm1', order: 3 },
  { label: 'ヨーロッパ州', textbookBaseId: 'chiri-tokyo', gradeId: 'm1', order: 4 },
  { label: '日本の姿と様々な地域', textbookBaseId: 'chiri-tokyo', gradeId: 'm2', order: 1 },
  { label: '日本の産業', textbookBaseId: 'chiri-tokyo', gradeId: 'm2', order: 2 },
  { label: '身近な地域の調査', textbookBaseId: 'chiri-tokyo', gradeId: 'm2', order: 3 },

  { label: '古代までの日本', textbookBaseId: 'rekishi-tokyo', gradeId: 'm1', order: 1 },
  { label: '中世の日本（鎌倉〜室町）', textbookBaseId: 'rekishi-tokyo', gradeId: 'm1', order: 2 },
  { label: '近世の日本（戦国〜江戸）', textbookBaseId: 'rekishi-tokyo', gradeId: 'm2', order: 1 },
  { label: '近代の日本と世界（明治維新〜）', textbookBaseId: 'rekishi-tokyo', gradeId: 'm2', order: 2 },
  { label: '二度の世界大戦と日本', textbookBaseId: 'rekishi-tokyo', gradeId: 'm3', order: 1 },
  { label: '戦後日本の発展と国際社会', textbookBaseId: 'rekishi-tokyo', gradeId: 'm3', order: 2 },

  { label: '現代社会と私たち', textbookBaseId: 'komin-tokyo', gradeId: 'm3', order: 1 },
  { label: '日本国憲法と人権', textbookBaseId: 'komin-tokyo', gradeId: 'm3', order: 2 },
  { label: '政治のしくみ（三権分立）', textbookBaseId: 'komin-tokyo', gradeId: 'm3', order: 3 },
  { label: '経済のしくみ', textbookBaseId: 'komin-tokyo', gradeId: 'm3', order: 4 },
]

const elementaryRikaTokyo: UnitDef[] = [
  { label: '植物の育ち方', textbookBaseId: 'rika-tokyo', gradeId: 'e3', order: 1 },
  { label: 'こん虫の育ち方', textbookBaseId: 'rika-tokyo', gradeId: 'e3', order: 2 },
  { label: 'かげと太陽', textbookBaseId: 'rika-tokyo', gradeId: 'e3', order: 3 },
  { label: '磁石の性質', textbookBaseId: 'rika-tokyo', gradeId: 'e3', order: 4 },
  { label: 'ものの重さ', textbookBaseId: 'rika-tokyo', gradeId: 'e3', order: 5 },
  { label: '明かりをつけよう', textbookBaseId: 'rika-tokyo', gradeId: 'e3', order: 6 },

  { label: '季節と生物', textbookBaseId: 'rika-tokyo', gradeId: 'e4', order: 1 },
  { label: '人の体のつくりと運動', textbookBaseId: 'rika-tokyo', gradeId: 'e4', order: 2 },
  { label: '空気と水の性質', textbookBaseId: 'rika-tokyo', gradeId: 'e4', order: 3 },
  { label: '金属・水・空気と温度', textbookBaseId: 'rika-tokyo', gradeId: 'e4', order: 4 },
  { label: '電流の働き', textbookBaseId: 'rika-tokyo', gradeId: 'e4', order: 5 },
  { label: '月と星', textbookBaseId: 'rika-tokyo', gradeId: 'e4', order: 6 },

  { label: '植物の発芽と成長', textbookBaseId: 'rika-tokyo', gradeId: 'e5', order: 1 },
  { label: '動物の誕生', textbookBaseId: 'rika-tokyo', gradeId: 'e5', order: 2 },
  { label: 'もののとけ方', textbookBaseId: 'rika-tokyo', gradeId: 'e5', order: 3 },
  { label: 'ふりこの動き', textbookBaseId: 'rika-tokyo', gradeId: 'e5', order: 4 },
  { label: '流れる水の働き', textbookBaseId: 'rika-tokyo', gradeId: 'e5', order: 5 },
  { label: '天気の変化', textbookBaseId: 'rika-tokyo', gradeId: 'e5', order: 6 },

  { label: '物の燃え方と空気', textbookBaseId: 'rika-tokyo', gradeId: 'e6', order: 1 },
  { label: '水溶液の性質', textbookBaseId: 'rika-tokyo', gradeId: 'e6', order: 2 },
  { label: '電気の利用', textbookBaseId: 'rika-tokyo', gradeId: 'e6', order: 3 },
  { label: '大地のつくりと変化', textbookBaseId: 'rika-tokyo', gradeId: 'e6', order: 4 },
  { label: '生物と環境', textbookBaseId: 'rika-tokyo', gradeId: 'e6', order: 5 },
  { label: '月と太陽', textbookBaseId: 'rika-tokyo', gradeId: 'e6', order: 6 },
]

const elementaryKokugoTokyo: UnitDef[] = [
  { label: 'どうぞよろしく', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e1', order: 1 },
  { label: 'くじらぐも', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e1', order: 2 },
  { label: 'たぬきの糸車', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e1', order: 3 },
  { label: 'おむすびころりん', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e1', order: 4 },

  { label: 'スイミー', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e2', order: 1 },
  { label: '名前を見てちょうだい', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e2', order: 2 },
  { label: 'お手紙', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e2', order: 3 },

  { label: 'きつつきの商売', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e3', order: 1 },
  { label: 'ちいちゃんのかげおくり', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e3', order: 2 },
  { label: 'すがたをかえる大豆', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e3', order: 3 },
  { label: 'モチモチの木', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e3', order: 4 },

  { label: 'ごんぎつね', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e4', order: 1 },
  { label: '世界一美しいぼくの村', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e4', order: 2 },
  { label: '説明文の組み立て', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e4', order: 3 },

  { label: '大造じいさんとガン', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e5', order: 1 },
  { label: '注文の多い料理店', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e5', order: 2 },
  { label: '敬語の使い方', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e5', order: 3 },

  { label: 'やまなし', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e6', order: 1 },
  { label: '海の命', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e6', order: 2 },
  { label: '伝えにくいことを伝える', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e6', order: 3 },
  { label: '漢字の成り立ち', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e6', order: 4 },
]

const highMathSuken: UnitDef[] = [
  { label: '数と式（数学I）', textbookBaseId: 'math-h-suken', gradeId: 'h1', order: 1 },
  { label: '二次関数（数学I）', textbookBaseId: 'math-h-suken', gradeId: 'h1', order: 2 },
  { label: '三角比（数学I）', textbookBaseId: 'math-h-suken', gradeId: 'h1', order: 3 },
  { label: '集合と論理（数学A）', textbookBaseId: 'math-h-suken', gradeId: 'h1', order: 4 },
  { label: '場合の数と確率（数学A）', textbookBaseId: 'math-h-suken', gradeId: 'h1', order: 5 },

  { label: '指数関数と対数関数（数学II）', textbookBaseId: 'math-h-suken', gradeId: 'h2', order: 1 },
  { label: '図形と方程式（数学II）', textbookBaseId: 'math-h-suken', gradeId: 'h2', order: 2 },
  { label: '三角関数（数学II）', textbookBaseId: 'math-h-suken', gradeId: 'h2', order: 3 },
  { label: '微分・積分の基礎（数学II）', textbookBaseId: 'math-h-suken', gradeId: 'h2', order: 4 },
  { label: '数列（数学B）', textbookBaseId: 'math-h-suken', gradeId: 'h2', order: 5 },
  { label: 'ベクトル（数学B）', textbookBaseId: 'math-h-suken', gradeId: 'h2', order: 6 },

  { label: '微分法とその応用（数学III）', textbookBaseId: 'math-h-suken', gradeId: 'h3', order: 1 },
  { label: '積分法とその応用（数学III）', textbookBaseId: 'math-h-suken', gradeId: 'h3', order: 2 },
  { label: '複素数平面（数学C）', textbookBaseId: 'math-h-suken', gradeId: 'h3', order: 3 },
  { label: '統計的な推測（数学B）', textbookBaseId: 'math-h-suken', gradeId: 'h3', order: 4 },
]

export const units: TeachingUnit[] = [
  ...makeUnits(elementarySansuTokyo),
  ...makeUnits(middleMathTokyo),
  ...makeUnits(middleRikaTokyo),
  ...makeUnits(middleEigoTokyo),
  ...makeUnits(middleShakaiTokyo),
  ...makeUnits(elementaryRikaTokyo),
  ...makeUnits(elementaryKokugoTokyo),
  ...makeUnits(highMathSuken),
]
