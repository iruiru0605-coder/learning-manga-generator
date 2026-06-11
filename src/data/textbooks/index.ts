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
  { id: 'shakai', label: '社会', gradeIds: ['e3','e4','e5','e6'] },
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
  // 国語
  { id: 'kokugo-mitsumura', label: '国語', publisher: '光村図書', subjectId: 'kokugo', grades: [...eGradeIds, ...mGradeIds] },
  { id: 'kokugo-kyoiku', label: '国語', publisher: '教育出版', subjectId: 'kokugo', grades: [...eGradeIds, ...mGradeIds] },
  { id: 'kokugo-tokyo-m', label: '新しい国語', publisher: '東京書籍', subjectId: 'kokugo', grades: [...eGradeIds, ...mGradeIds] },
  { id: 'kokugo-tokyo', label: '新編国語', publisher: '東京書籍', subjectId: 'kokugo', grades: hGradeIds },
  { id: 'kokugo-chikuma', label: '精選国語', publisher: '筑摩書房', subjectId: 'kokugo', grades: hGradeIds },
  // 算数
  { id: 'sansu-tokyo', label: '新しい算数', publisher: '東京書籍', subjectId: 'sansu', grades: eGradeIds },
  { id: 'sansu-keirin', label: 'わくわく算数', publisher: '啓林館', subjectId: 'sansu', grades: eGradeIds },
  { id: 'sansu-gakko', label: 'みんなと学ぶ 小学校算数', publisher: '学校図書', subjectId: 'sansu', grades: eGradeIds },
  { id: 'sansu-dainippon', label: 'たのしい算数', publisher: '大日本図書', subjectId: 'sansu', grades: eGradeIds },
  { id: 'sansu-kyoiku', label: '小学算数', publisher: '教育出版', subjectId: 'sansu', grades: eGradeIds },
  // 数学（中学）
  { id: 'math-tokyo', label: '新しい数学', publisher: '東京書籍', subjectId: 'math', grades: mGradeIds },
  { id: 'math-keirin', label: '未来へひろがる数学', publisher: '啓林館', subjectId: 'math', grades: mGradeIds },
  { id: 'math-suken-m', label: 'これからの数学', publisher: '数研出版', subjectId: 'math', grades: mGradeIds },
  { id: 'math-dainippon', label: '数学の世界', publisher: '大日本図書', subjectId: 'math', grades: mGradeIds },
  // 数学（高校）
  { id: 'math-h-tokyo', label: '数学I・A／II・B／III・C', publisher: '東京書籍', subjectId: 'math', grades: hGradeIds },
  { id: 'math-h-suken', label: '高等学校数学', publisher: '数研出版', subjectId: 'math', grades: hGradeIds },
  // 理科（小学）
  { id: 'rika-tokyo', label: '新しい理科', publisher: '東京書籍', subjectId: 'rika', grades: ['e3','e4','e5','e6'] },
  { id: 'rika-keirin', label: 'わくわく理科', publisher: '啓林館', subjectId: 'rika', grades: ['e3','e4','e5','e6'] },
  { id: 'rika-dainippon', label: 'たのしい理科', publisher: '大日本図書', subjectId: 'rika', grades: ['e3','e4','e5','e6'] },
  // 理科（中学）
  { id: 'rika-m-tokyo', label: '新しい科学', publisher: '東京書籍', subjectId: 'rika', grades: mGradeIds },
  { id: 'rika-m-keirin', label: '未来へひろがるサイエンス', publisher: '啓林館', subjectId: 'rika', grades: mGradeIds },
  { id: 'rika-m-dainippon', label: '理科の世界', publisher: '大日本図書', subjectId: 'rika', grades: mGradeIds },
  // 高校理科
  { id: 'butsuri-suken', label: '物理基礎・物理', publisher: '数研出版', subjectId: 'butsuri', grades: hGradeIds },
  { id: 'butsuri-tokyo', label: '物理', publisher: '東京書籍', subjectId: 'butsuri', grades: hGradeIds },
  { id: 'butsuri-keirin', label: '物理基礎・物理', publisher: '啓林館', subjectId: 'butsuri', grades: hGradeIds },
  { id: 'kagaku-suken', label: '化学基礎・化学', publisher: '数研出版', subjectId: 'kagaku', grades: hGradeIds },
  { id: 'kagaku-tokyo', label: '化学', publisher: '東京書籍', subjectId: 'kagaku', grades: hGradeIds },
  { id: 'kagaku-keirin', label: '化学基礎・化学', publisher: '啓林館', subjectId: 'kagaku', grades: hGradeIds },
  { id: 'seibutsu-suken', label: '生物基礎・生物', publisher: '数研出版', subjectId: 'seibutsu', grades: hGradeIds },
  { id: 'seibutsu-keirin', label: '生物基礎・生物', publisher: '啓林館', subjectId: 'seibutsu', grades: hGradeIds },
  // 社会（小学）
  { id: 'shakai-tokyo', label: '新しい社会', publisher: '東京書籍', subjectId: 'shakai', grades: ['e3','e4','e5','e6'] },
  { id: 'shakai-kyoiku', label: '小学社会', publisher: '教育出版', subjectId: 'shakai', grades: ['e3','e4','e5','e6'] },
  // 地理
  { id: 'chiri-tokyo', label: '新しい社会 地理', publisher: '東京書籍', subjectId: 'chiri', grades: ['m1','m2'] },
  { id: 'chiri-teikoku', label: '中学生の地理', publisher: '帝国書院', subjectId: 'chiri', grades: ['m1','m2'] },
  { id: 'chiri-h-teikoku', label: '地理総合・地理探究', publisher: '帝国書院', subjectId: 'chiri', grades: ['h1','h2'] },
  // 歴史
  { id: 'rekishi-tokyo', label: '新しい社会 歴史', publisher: '東京書籍', subjectId: 'rekishi', grades: mGradeIds },
  { id: 'rekishi-teikoku', label: '中学生の歴史', publisher: '帝国書院', subjectId: 'rekishi', grades: mGradeIds },
  { id: 'rekishi-h-yamakawa', label: '詳説日本史', publisher: '山川出版社', subjectId: 'rekishi', grades: hGradeIds },
  // 公民
  { id: 'komin-tokyo', label: '新しい社会 公民', publisher: '東京書籍', subjectId: 'komin', grades: ['m3'] },
  { id: 'komin-kyoiku', label: '中学社会 公民', publisher: '教育出版', subjectId: 'komin', grades: ['m3'] },
  { id: 'komin-h-tokyo', label: '公共・政治経済', publisher: '東京書籍', subjectId: 'komin', grades: hGradeIds },
  // 英語
  { id: 'eigo-tokyo', label: 'NEW HORIZON', publisher: '東京書籍', subjectId: 'eigo', grades: mGradeIds },
  { id: 'eigo-sanseido-m', label: 'NEW CROWN', publisher: '三省堂', subjectId: 'eigo', grades: mGradeIds },
  { id: 'eigo-kairyudo', label: 'SUNSHINE', publisher: '開隆堂', subjectId: 'eigo', grades: mGradeIds },
  { id: 'eigo-mitsumura', label: 'Here We Go!', publisher: '光村図書', subjectId: 'eigo', grades: mGradeIds },
  { id: 'eigo-sanseido', label: 'CROWN', publisher: '三省堂', subjectId: 'eigo', grades: hGradeIds },
  { id: 'eigo-keirin', label: 'LANDMARK', publisher: '啓林館', subjectId: 'eigo', grades: hGradeIds },
  // 生活
  { id: 'seikatsu-tokyo', label: '新しい生活', publisher: '東京書籍', subjectId: 'seikatsu', grades: ['e1','e2'] },
]

export const textbooks: Textbook[] = textbookDefs.flatMap((d) => makeTextbook(d.id, d.label, d.publisher, d.subjectId, d.grades))

// ─── 教科書固有の単元データ ──────────────────────────────
// 掲載作品が出版社固有である国語（光村図書）のみ個別データを持つ。
// それ以外の教科は単元構成が学習指導要領に準拠しており出版社間でほぼ共通のため、
// 下の curriculumUnitDefs（教科×学年の汎用単元）を全出版社で共用する。

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

const elementaryKokugoMitsumura: UnitDef[] = [
  { label: 'どうぞよろしく', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e1', order: 1 },
  { label: 'くじらぐも', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e1', order: 2 },
  { label: 'たぬきの糸車', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e1', order: 3 },
  { label: 'おむすびころりん', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e1', order: 4 },
  { label: 'ひらがな・カタカナ', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e1', order: 5 },

  { label: 'スイミー', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e2', order: 1 },
  { label: '名前を見てちょうだい', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e2', order: 2 },
  { label: 'お手紙', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e2', order: 3 },
  { label: 'かん字の読み書き', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e2', order: 4 },

  { label: 'きつつきの商売', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e3', order: 1 },
  { label: 'ちいちゃんのかげおくり', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e3', order: 2 },
  { label: 'すがたをかえる大豆', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e3', order: 3 },
  { label: 'モチモチの木', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e3', order: 4 },
  { label: 'ローマ字', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e3', order: 5 },

  { label: 'ごんぎつね', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e4', order: 1 },
  { label: '世界一美しいぼくの村', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e4', order: 2 },
  { label: '説明文の組み立て', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e4', order: 3 },
  { label: '慣用句', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e4', order: 4 },

  { label: '大造じいさんとガン', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e5', order: 1 },
  { label: '注文の多い料理店', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e5', order: 2 },
  { label: '敬語の使い方', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e5', order: 3 },
  { label: '古典に親しむ', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e5', order: 4 },

  { label: 'やまなし', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e6', order: 1 },
  { label: '海の命', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e6', order: 2 },
  { label: '伝えにくいことを伝える', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e6', order: 3 },
  { label: '漢字の成り立ち', textbookBaseId: 'kokugo-mitsumura', gradeId: 'e6', order: 4 },
]

export const units: TeachingUnit[] = [
  ...makeUnits(elementaryKokugoMitsumura),
]

// ─── 学習指導要領ベースの汎用単元（教科×学年） ──────────────
// 教科書固有の単元データがない場合のフォールバックとして全出版社で共用する。

const curriculumUnitDefs: { subjectId: string; gradeId: string; labels: string[] }[] = [
  // ── 算数 ──
  { subjectId: 'sansu', gradeId: 'e1', labels: [
    '10までのかず', 'いくつといくつ', 'たしざん', 'ひきざん', '10より大きいかず',
    'とけい（なんじ・なんじはん）', 'ながさくらべ・かさくらべ', 'かたちあそび', '20より大きいかず', 'たしざんとひきざんのふくしゅう',
  ]},
  { subjectId: 'sansu', gradeId: 'e2', labels: [
    'ひょうとグラフ', 'たし算のひっ算', 'ひき算のひっ算', '長さのたんい（cm・mm）', '1000までの数',
    '水のかさ（L・dL・mL）', '時こくと時間', 'かけ算九九', '三角形と四角形', '分数のはじめ（半分・4分の1）',
  ]},
  { subjectId: 'sansu', gradeId: 'e3', labels: [
    'かけ算のきまり', '時こくと時間', 'わり算', 'たし算とひき算の筆算', '長い長さ（km）',
    'あまりのあるわり算', '大きい数（万）', 'かけ算の筆算', '円と球', '小数',
    '重さ（g・kg）', '分数', '□を使った式', '三角形と角',
  ]},
  { subjectId: 'sansu', gradeId: 'e4', labels: [
    '大きい数（億・兆）', '折れ線グラフ', 'わり算の筆算', '角の大きさ', '小数のしくみ',
    '垂直・平行と四角形', '式と計算の順じょ', '面積（長方形・正方形）', '小数のかけ算とわり算', '変わり方',
    '分数（仮分数・帯分数）', '直方体と立方体',
  ]},
  { subjectId: 'sansu', gradeId: 'e5', labels: [
    '整数と小数', '体積', '小数のかけ算', '小数のわり算', '合同な図形',
    '偶数・奇数、倍数・約数', '分数のたし算とひき算', '平均', '単位量あたりの大きさ', '速さ',
    '割合', '帯グラフと円グラフ', '正多角形と円周', '角柱と円柱',
  ]},
  { subjectId: 'sansu', gradeId: 'e6', labels: [
    '対称な図形', '文字と式', '分数のかけ算', '分数のわり算', '比とその利用',
    '拡大図と縮図', '円の面積', '角柱と円柱の体積', '比例と反比例', '並べ方と組み合わせ',
    'データの調べ方（平均値・中央値・最頻値）',
  ]},
  // ── 数学（中学） ──
  { subjectId: 'math', gradeId: 'm1', labels: [
    '正の数・負の数', '文字の式', '一次方程式', '比例と反比例', '平面図形（作図・おうぎ形）',
    '空間図形（立体の体積・表面積）', 'データの活用（度数分布・相対度数）',
  ]},
  { subjectId: 'math', gradeId: 'm2', labels: [
    '式の計算', '連立方程式', '一次関数', '平行線と角・多角形の角', '図形の合同と証明',
    '三角形と四角形', '確率', 'データの比較（四分位範囲・箱ひげ図）',
  ]},
  { subjectId: 'math', gradeId: 'm3', labels: [
    '多項式（展開と因数分解）', '平方根', '二次方程式', '関数 y=ax²', '相似な図形',
    '円周角の定理', '三平方の定理', '標本調査',
  ]},
  // ── 数学（高校） ──
  { subjectId: 'math', gradeId: 'h1', labels: [
    '数と式（数学I）', '集合と命題（数学I）', '二次関数（数学I）', '図形と計量・三角比（数学I）', 'データの分析（数学I）',
    '場合の数と確率（数学A）', '図形の性質（数学A）', '数学と人間の活動・整数（数学A）',
  ]},
  { subjectId: 'math', gradeId: 'h2', labels: [
    '式と証明（数学II）', '複素数と方程式（数学II）', '図形と方程式（数学II）', '三角関数（数学II）', '指数関数・対数関数（数学II）',
    '微分と積分（数学II）', '数列（数学B）', '統計的な推測（数学B）', 'ベクトル（数学C）',
  ]},
  { subjectId: 'math', gradeId: 'h3', labels: [
    '極限（数学III）', '微分法とその応用（数学III）', '積分法とその応用（数学III）', '複素数平面（数学C）', '式と曲線・2次曲線（数学C）',
    '入試総合演習',
  ]},
  // ── 理科（小学） ──
  { subjectId: 'rika', gradeId: 'e3', labels: [
    '植物の育ち方', 'こん虫のかんさつ', '風やゴムのはたらき', 'かげと太陽', '光のせいしつ',
    '音のせいしつ', '電気で明かりをつけよう', 'じしゃくのふしぎ', 'ものの重さ',
  ]},
  { subjectId: 'rika', gradeId: 'e4', labels: [
    '季節と生き物', '天気と気温', '電気のはたらき', '雨水のゆくえ', '月や星の動き',
    'わたしたちの体と運動', 'ものの温度と体積', 'もののあたたまり方', '水のすがたの変化', '空気と水のせいしつ',
  ]},
  { subjectId: 'rika', gradeId: 'e5', labels: [
    '天気の変化', '植物の発芽と成長', 'メダカのたんじょう', '花から実へ（受粉）', '台風と防災',
    '流れる水のはたらき', 'もののとけ方', '電磁石の性質', 'ふりこの動き', '人のたんじょう',
  ]},
  { subjectId: 'rika', gradeId: 'e6', labels: [
    'ものの燃え方と空気', '人や動物の体（呼吸・消化・血液）', '植物の体（光合成・蒸散）', '生き物と環境', '月と太陽',
    '大地のつくりと変化（地層・火山・地震）', 'てこのはたらき', '水よう液の性質', '電気の利用',
  ]},
  // ── 理科（中学） ──
  { subjectId: 'rika', gradeId: 'm1', labels: [
    '生物の観察と分類', '植物の体のつくりとはたらき', '動物の分類', '身のまわりの物質（密度・状態変化）', '気体の性質',
    '水溶液の性質', '光の性質（反射・屈折・凸レンズ）', '音の性質', '力のはたらき（フックの法則・圧力）', '火山と火成岩',
    '地震のしくみ', '地層と堆積岩',
  ]},
  { subjectId: 'rika', gradeId: 'm2', labels: [
    '化学変化と原子・分子', '化合と分解', '酸化と還元', '化学変化と熱', '生物と細胞',
    '消化と吸収・呼吸', '血液の循環と排出', '刺激と反応（神経）', '電流の性質（オームの法則）', '電流と磁界',
    '静電気と電子', '気象観測と湿度', '前線と天気の変化', '日本の気象',
  ]},
  { subjectId: 'rika', gradeId: 'm3', labels: [
    '水溶液とイオン', '酸・アルカリと中和', '電池とイオン', '生物の成長と生殖（細胞分裂）', '遺伝の規則性',
    '生物の進化', '力の合成と分解', '物体の運動（等速直線運動・自由落下）', '仕事とエネルギー', '天体の動き（自転・公転と星の動き）',
    '月と金星の見え方', '太陽系と恒星', '生態系と物質の循環', '科学技術と環境',
  ]},
  // ── 物理 ──
  { subjectId: 'butsuri', gradeId: 'h1', labels: [
    '運動の表し方（速度・加速度）', '落体の運動', '力のつり合い', '運動の法則（運動方程式）', '摩擦力と圧力',
    '仕事と力学的エネルギー', '熱とエネルギー', '波の性質', '音波と弦・気柱の振動', '電気（オームの法則・電力）',
    'エネルギーの変換と保存',
  ]},
  { subjectId: 'butsuri', gradeId: 'h2', labels: [
    '平面内の運動と放物運動', '剛体のつり合い・力のモーメント', '運動量の保存', '円運動', '単振動',
    '万有引力と惑星の運動', '気体分子の運動と状態変化', '熱力学第一法則', '波の伝わり方と干渉', '光の性質（回折・干渉）',
  ]},
  { subjectId: 'butsuri', gradeId: 'h3', labels: [
    '電場と電位', 'コンデンサー', '直流回路', '電流と磁場', '電磁誘導',
    '交流と電磁波', '電子と光（光電効果・粒子性と波動性）', '原子と原子核', '放射線と素粒子', '入試総合演習',
  ]},
  // ── 化学 ──
  { subjectId: 'kagaku', gradeId: 'h1', labels: [
    '物質の分類と構成粒子', '原子の構造と電子配置', '周期表と元素の性質', 'イオン結合とイオン結晶', '共有結合と分子',
    '金属結合', '物質量（mol）と濃度', '化学反応式と量的関係', '酸と塩基', '中和反応と塩',
    '酸化と還元', '金属のイオン化傾向と電池',
  ]},
  { subjectId: 'kagaku', gradeId: 'h2', labels: [
    '結晶と化学結合', '物質の三態と状態変化', '気体の性質（ボイル・シャルルの法則）', '溶液の性質（溶解度・コロイド）', '化学反応とエネルギー（熱化学）',
    '電池と電気分解', '反応の速さ', '化学平衡', '無機物質（非金属元素）', '無機物質（金属元素）',
  ]},
  { subjectId: 'kagaku', gradeId: 'h3', labels: [
    '脂肪族炭化水素', 'アルコールとカルボン酸', '芳香族化合物', '有機化合物の分離と検出', '油脂とセッケン',
    '糖類', 'アミノ酸とタンパク質', '合成高分子化合物', '医薬品・染料・肥料', '入試総合演習',
  ]},
  // ── 生物 ──
  { subjectId: 'seibutsu', gradeId: 'h1', labels: [
    '生物の特徴と細胞', '代謝とATP', '光合成と呼吸の概要', '遺伝情報とDNA', '体細胞分裂と遺伝情報の分配',
    '遺伝子の発現（転写・翻訳）', '体液と循環', '腎臓と肝臓のはたらき', 'ホルモンによる調節', '自律神経系',
    '免疫のしくみ', '植生と遷移', 'バイオームと気候', '生態系の保全',
  ]},
  { subjectId: 'seibutsu', gradeId: 'h2', labels: [
    '細胞と分子（タンパク質・酵素）', '細胞膜と物質輸送', '呼吸と発酵のしくみ', '光合成のしくみ', 'DNAの複製と細胞周期',
    '遺伝子の発現調節', 'バイオテクノロジー', '動物の配偶子形成と受精', '動物の発生のしくみ', '植物の発生と環境応答',
  ]},
  { subjectId: 'seibutsu', gradeId: 'h3', labels: [
    'ニューロンと興奮の伝導・伝達', '刺激の受容（眼・耳）', '神経系と動物の行動', '筋肉と運動のしくみ', '個体群と相互作用',
    '生態系の物質生産とエネルギーの流れ', '進化のしくみ（自然選択・遺伝的浮動）', '分子進化と系統', '生物の系統と分類', '入試総合演習',
  ]},
  // ── 社会（小学） ──
  { subjectId: 'shakai', gradeId: 'e3', labels: [
    'わたしたちのまちの様子', '店ではたらく人びと', '農家や工場の仕事', '火事からまちを守る', '事故や事件からまちを守る',
    '市のうつりかわり',
  ]},
  { subjectId: 'shakai', gradeId: 'e4', labels: [
    '水はどこから', 'ごみのしょりと活用', '自然災害にそなえるまちづくり', 'きょう土の伝統と文化', '県の広がりと特色',
    '特色ある地いきのくらし',
  ]},
  { subjectId: 'shakai', gradeId: 'e5', labels: [
    '日本の国土と地形・気候', '低い土地・高い土地のくらし', '米づくりのさかんな地域', '水産業のさかんな地域', 'これからの食料生産',
    '自動車工業と日本の工業生産', '情報化した社会とくらし', '自然災害を防ぐ', '森林とわたしたちのくらし', '環境を守るわたしたち',
  ]},
  { subjectId: 'shakai', gradeId: 'e6', labels: [
    'わたしたちのくらしと日本国憲法', '国の政治のしくみと選挙', '縄文・弥生・古墳時代', '飛鳥・奈良・平安時代', '鎌倉・室町時代',
    '戦国・安土桃山時代', '江戸時代', '明治維新と近代化', '戦争と人々のくらし', '戦後の日本と世界とのつながり',
  ]},
  // ── 地理 ──
  { subjectId: 'chiri', gradeId: 'm1', labels: [
    '世界の姿（六大陸と三大洋）', '世界各地の人々の生活と環境', 'アジア州', 'ヨーロッパ州', 'アフリカ州',
    '北アメリカ州', '南アメリカ州', 'オセアニア州',
  ]},
  { subjectId: 'chiri', gradeId: 'm2', labels: [
    '日本の姿（位置・領域・時差）', '世界と日本の地形・気候', '日本の人口・資源・エネルギー', '日本の産業', '九州地方',
    '中国・四国地方', '近畿地方', '中部地方', '関東地方', '東北地方',
    '北海道地方', '身近な地域の調査',
  ]},
  { subjectId: 'chiri', gradeId: 'h1', labels: [
    '地図や地理情報システム（GIS）', '結びつきを深める現代世界', '世界の生活文化の多様性', '地球的課題と国際協力', '自然環境と防災',
    '生活圏の調査と地域の展望',
  ]},
  { subjectId: 'chiri', gradeId: 'h2', labels: [
    '世界の自然環境（地形・気候）', '資源と産業', '人口と都市・村落', '生活文化・民族・宗教', '現代世界の地誌（各地域の特色）',
    '持続可能な国土像の探究',
  ]},
  // ── 歴史 ──
  { subjectId: 'rekishi', gradeId: 'm1', labels: [
    '文明のおこりと日本の成り立ち', '古代国家の歩み（飛鳥・奈良・平安）', '武家政治の始まり（鎌倉時代）', '室町幕府と民衆の成長',
  ]},
  { subjectId: 'rekishi', gradeId: 'm2', labels: [
    'ヨーロッパ人との出会いと全国統一', '江戸幕府の成立と鎖国', '産業の発達と幕府政治の動き', '欧米の近代化と日本の開国', '明治維新',
  ]},
  { subjectId: 'rekishi', gradeId: 'm3', labels: [
    '日清・日露戦争と近代産業', '第一次世界大戦と大正デモクラシー', '世界恐慌と日中戦争', '第二次世界大戦と日本', '戦後日本の民主化と復興',
    '高度経済成長と現代の日本',
  ]},
  { subjectId: 'rekishi', gradeId: 'h1', labels: [
    '近代化と私たち（産業革命・市民革命）', '結びつく世界と日本の開国', '国民国家の形成と明治維新', '大衆化と私たち（二つの世界大戦）', 'グローバル化と私たち（冷戦と現代）',
  ]},
  { subjectId: 'rekishi', gradeId: 'h2', labels: [
    '原始・古代の社会と文化', '律令国家の形成', '貴族政治と国風文化', '中世の武家社会（鎌倉・室町）', '近世の幕藩体制',
    '幕末の動乱',
  ]},
  { subjectId: 'rekishi', gradeId: 'h3', labels: [
    '明治維新と立憲体制', '日清・日露戦争と資本主義の発展', '二つの世界大戦と日本', '占領と戦後改革', '高度成長と現代日本の課題',
    '入試総合演習',
  ]},
  // ── 公民 ──
  { subjectId: 'komin', gradeId: 'm3', labels: [
    '現代社会と私たちの生活', '個人の尊重と日本国憲法', '基本的人権の尊重', '民主政治のしくみ（国会・内閣・裁判所）', '地方自治',
    '消費生活と市場経済', '生産と企業・労働', '財政と国民の福祉', '地球社会と私たち',
  ]},
  { subjectId: 'komin', gradeId: 'h1', labels: [
    '公共的な空間と人間（青年期・倫理）', '日本国憲法と基本的人権', '民主政治のしくみと課題', '市場経済のしくみ', '金融と財政',
    '労働と社会保障', '国際政治と平和', '国際経済とグローバル化',
  ]},
  { subjectId: 'komin', gradeId: 'h2', labels: [
    '民主政治の基本原理', '日本の政治機構と政治参加', '現代経済のしくみ（市場・金融・財政）', '日本経済の現状と課題', '国際政治の動向',
    '国際経済の動向と課題',
  ]},
  { subjectId: 'komin', gradeId: 'h3', labels: [
    '青年期の課題と自己形成', '源流思想（ギリシア哲学・三大宗教）', '日本の思想', '西洋の近現代思想', '現代の諸課題と倫理',
    '入試総合演習',
  ]},
  // ── 英語 ──
  { subjectId: 'eigo', gradeId: 'm1', labels: [
    'be動詞（I am / You are）', '一般動詞の文', '疑問詞を使った疑問文', '三人称単数現在形', '代名詞',
    '現在進行形', '一般動詞の過去形', '助動詞can',
  ]},
  { subjectId: 'eigo', gradeId: 'm2', labels: [
    'be動詞の過去形・過去進行形', '未来表現（will / be going to）', '助動詞（must / have to / should）', 'There is 構文', '不定詞の基本3用法',
    '動名詞', '比較級・最上級', '受け身（受動態）', '接続詞（when / if / because）',
  ]},
  { subjectId: 'eigo', gradeId: 'm3', labels: [
    '現在完了形（完了・経験・継続）', '現在完了進行形', '不定詞の発展（It is ... to ~ / want 人 to ~）', '分詞の後置修飾', '関係代名詞',
    '間接疑問文', '仮定法', '長文読解と入試対策',
  ]},
  { subjectId: 'eigo', gradeId: 'h1', labels: [
    '文型（5文型）と時制の整理', '完了形の用法', '助動詞の重要表現', '受動態の発展', '不定詞・動名詞の使い分け',
    '分詞と分詞構文の基礎', '比較の重要表現', '関係詞（関係代名詞・関係副詞）', '長文読解の基礎', '英作文の基礎',
  ]},
  { subjectId: 'eigo', gradeId: 'h2', labels: [
    '仮定法（過去・過去完了・重要表現）', '分詞構文の発展', '強調・倒置・省略・挿入', '名詞構文と無生物主語', '長文読解（評論・物語）',
    'パラグラフライティング', 'リスニング演習',
  ]},
  { subjectId: 'eigo', gradeId: 'h3', labels: [
    '入試長文総合演習', '文法・語法の総整理', '和文英訳の実践', '自由英作文の実践', 'リスニング実戦演習',
    '共通テスト対策',
  ]},
  // ── 生活 ──
  { subjectId: 'seikatsu', gradeId: 'e1', labels: [
    'がっこうだいすき（学校たんけん）', 'はなやさいをそだてよう', 'なつとなかよし', 'あきとなかよし', 'ふゆとなかよし',
    'もうすぐ2ねんせい',
  ]},
  { subjectId: 'seikatsu', gradeId: 'e2', labels: [
    'まちたんけん', 'やさいをそだてよう', '生きものとなかよし', 'うごくおもちゃをつくろう', 'あしたへジャンプ（自分の成長）',
  ]},
]

/**
 * 教科書に対応する単元一覧を返す。
 * 教科書固有のデータがあればそれを、なければ同じ教科×学年の
 * 学習指導要領ベースの汎用単元を返す（isCurriculumFallback = true）。
 */
export function getUnitsForTextbook(textbook: Textbook): { units: TeachingUnit[]; isCurriculumFallback: boolean } {
  const own = units.filter((u) => u.textbookId === textbook.id).sort((a, b) => a.order - b.order)
  if (own.length > 0) return { units: own, isCurriculumFallback: false }

  const cur = curriculumUnitDefs.find((c) => c.subjectId === textbook.subjectId && c.gradeId === textbook.gradeId)
  if (!cur) return { units: [], isCurriculumFallback: false }

  return {
    units: cur.labels.map((label, i) => ({
      id: `cur-${textbook.subjectId}-${textbook.gradeId}-u${i}`,
      label,
      textbookId: textbook.id,
      parentUnitId: null,
      order: i + 1,
    })),
    isCurriculumFallback: true,
  }
}
