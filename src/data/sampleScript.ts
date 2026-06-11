import type { MangaScript } from '@/types'

/**
 * APIキーなしで完成イメージを体験できるサンプル台本（小5算数「割合」）。
 * createdAt: 'sample' をマーカーとして使い、画面にサンプルバナーを出す。
 */
export const sampleScript: MangaScript = {
  title: 'わりあい大ぼうけん！〜く・も・わで解ける〜',
  unitName: '割合',
  struggleSummary: '割合の意味がピンとこない。「もとにする量」と「くらべられる量」がどっちなのか分からなくなる。',
  targetAudience: '小学5年生',
  createdAt: 'sample',
  testKeywords: ['割合', 'もとにする量', 'くらべられる量', '百分率（％）', '歩合（割）'],
  characterDesign: {
    teacher: {
      name: 'せんせい',
      appearance: 'short black hair, round glasses, white lab coat over light blue blouse, navy skirt, slim',
      personality: 'knowledgeable, patient, encouraging',
    },
    student: {
      name: 'はなこ',
      appearance: 'twin-tail brownish long hair, large sparkling eyes, navy school blazer with grey skirt',
      personality: 'curious, cheerful, struggles with studying but determined',
    },
    mascot: {
      name: 'わりあいちゃん',
      appearance: 'small round pie-chart fairy with a cute face and tiny wings',
      personality: 'cheerful, loves pointing out test tips',
      role: '重要なポイントを教える',
    },
  },
  pages: [
    {
      pageNumber: 1,
      title: '割合ってなんだろう？',
      summary: '身近な例（バーゲンの20%引き）から割合に出会う',
      panels: [
        {
          panelNumber: 1,
          size: '大ゴマ',
          composition: '商店街。「20%引き」ののぼりの前で首をかしげるはなこ',
          dialogue: [
            { speaker: 'はなこ', text: '20%引きって、けっきょく何円安くなるの？', type: 'speech' },
          ],
          effects: 'ザワザワ',
        },
        {
          panelNumber: 2,
          size: '中ゴマ',
          composition: 'せんせいが登場して微笑む',
          dialogue: [
            { speaker: 'せんせい', text: 'それが分かるのが「割合」の力だよ！', type: 'speech' },
            { speaker: 'はなこ', text: 'わりあい…？', type: 'speech' },
          ],
        },
        {
          panelNumber: 3,
          size: '小ゴマ',
          composition: 'わりあいちゃんが飛び出してくる',
          dialogue: [
            { speaker: 'わりあいちゃん', text: 'テストにも超出るよ〜！', type: 'speech' },
          ],
          effects: 'ピコーン！',
        },
      ],
      imageGenerationPrompt:
        'Safe educational manga illustration for children\'s textbook. Cartoon drawing style, G-rated content. A manga page with 3 panels: a girl student (cartoon, chibi) puzzled in front of a sale banner in a shopping street; a kind female teacher (cartoon, anime style, short black hair, round glasses, white lab coat) appearing with a smile; a tiny pie-chart fairy mascot popping up. Black and white manga line art, screentone shading, empty speech bubbles.',
    },
    {
      pageNumber: 2,
      title: '割合のきほんの式',
      summary: '割合＝くらべられる量÷もとにする量を学ぶ',
      panels: [
        {
          panelNumber: 1,
          size: '大ゴマ',
          composition: '黒板に大きく式を書くせんせい',
          dialogue: [
            { speaker: 'せんせい', text: '割合＝くらべられる量÷もとにする量、これが全ての基本！', type: 'speech' },
          ],
        },
        {
          panelNumber: 2,
          size: '中ゴマ',
          composition: 'はなこがノートを取りながら質問',
          dialogue: [
            { speaker: 'はなこ', text: '「もとにする量」ってどっちのこと？', type: 'speech' },
            { speaker: 'せんせい', text: '「〜の」「〜をもとにして」と書いてある方だよ', type: 'speech' },
          ],
        },
        {
          panelNumber: 3,
          size: '小ゴマ',
          composition: 'わりあいちゃんがポイント枠を持つ',
          dialogue: [
            { speaker: 'わりあいちゃん', text: '問題文の「の」の前が、もとにする量！', type: 'speech' },
          ],
          effects: 'キラーン',
        },
      ],
      imageGenerationPrompt:
        'Safe educational manga illustration for children\'s textbook. Cartoon drawing style, G-rated content. A manga page with 3 panels: female teacher writing a big formula frame on a chalkboard; girl student taking notes and asking a question; the pie-chart fairy mascot holding a highlighted point frame. Black and white manga line art, empty speech bubbles.',
    },
    {
      pageNumber: 3,
      title: '百分率（％）に変身！',
      summary: '小数の割合と百分率の関係（0.01=1%）',
      panels: [
        {
          panelNumber: 1,
          size: '大ゴマ',
          composition: '0.2 が「20%」へ変身するイメージ演出',
          dialogue: [
            { speaker: 'せんせい', text: '割合の0.01を1%って呼ぶよ。0.2なら20%！', type: 'speech' },
          ],
          effects: 'シュバッ',
        },
        {
          panelNumber: 2,
          size: '中ゴマ',
          composition: 'はなこがひらめいた表情',
          dialogue: [
            { speaker: 'はなこ', text: 'じゃあ％を小数にもどすには100で割ればいいんだ！', type: 'speech' },
            { speaker: 'せんせい', text: 'よく気づいたね！', type: 'speech' },
          ],
        },
      ],
      imageGenerationPrompt:
        'Safe educational manga illustration for children\'s textbook. Cartoon drawing style, G-rated content. A manga page with 2 panels: a magical transformation scene of a number becoming a percent symbol with sparkles; the girl student having a bright idea, the teacher praising her. Black and white manga line art, empty speech bubbles.',
    },
    {
      pageNumber: 4,
      title: '歩合（割）も同じなかま',
      summary: '0.1=1割、野球の打率を例に歩合を学ぶ',
      panels: [
        {
          panelNumber: 1,
          size: '大ゴマ',
          composition: '野球場。打率3割の選手のパネル',
          dialogue: [
            { speaker: 'せんせい', text: '打率3割は、割合でいうと0.3のことだよ', type: 'speech' },
          ],
        },
        {
          panelNumber: 2,
          size: '中ゴマ',
          composition: 'はなこが指を折って数える',
          dialogue: [
            { speaker: 'はなこ', text: '0.1が1割、0.01が1分、0.001が1厘…！', type: 'speech' },
          ],
        },
        {
          panelNumber: 3,
          size: '小ゴマ',
          composition: 'わりあいちゃんが帽子をかぶって登場',
          dialogue: [
            { speaker: 'わりあいちゃん', text: '％と割、どっちもテストに出るよ！', type: 'speech' },
          ],
        },
      ],
      imageGenerationPrompt:
        'Safe educational manga illustration for children\'s textbook. Cartoon drawing style, G-rated content. A manga page with 3 panels: a baseball stadium scene with a batting average board; the girl student counting on her fingers; the fairy mascot wearing a baseball cap. Black and white manga line art, empty speech bubbles.',
    },
    {
      pageNumber: 5,
      title: 'くらべられる量を求める',
      summary: 'くらべられる量＝もとにする量×割合',
      panels: [
        {
          panelNumber: 1,
          size: '大ゴマ',
          composition: '問題文「500円の20%は何円？」が大きく表示',
          dialogue: [
            { speaker: 'せんせい', text: '500円「の」20%。「の」の前だから、もとにする量は500円だね', type: 'speech' },
          ],
        },
        {
          panelNumber: 2,
          size: '中ゴマ',
          composition: 'はなこが計算する',
          dialogue: [
            { speaker: 'はなこ', text: '500×0.2＝100。100円だ！', type: 'speech' },
          ],
          effects: 'カリカリ',
        },
        {
          panelNumber: 3,
          size: '小ゴマ',
          composition: 'せんせいが花マルを出す',
          dialogue: [
            { speaker: 'せんせい', text: 'それがポイントだよ！かけ算で出せるんだ', type: 'speech' },
          ],
        },
      ],
      imageGenerationPrompt:
        'Safe educational manga illustration for children\'s textbook. Cartoon drawing style, G-rated content. A manga page with 3 panels: a big problem frame on the chalkboard; the girl student calculating in her notebook; the teacher giving a big flower-circle mark. Black and white manga line art, empty speech bubbles.',
    },
    {
      pageNumber: 6,
      title: 'もとにする量を求める',
      summary: 'もとにする量＝くらべられる量÷割合',
      panels: [
        {
          panelNumber: 1,
          size: '大ゴマ',
          composition: '問題「ある数の30%が60。ある数は？」',
          dialogue: [
            { speaker: 'はなこ', text: '今度は「もとにする量」が分からないパターン…！', type: 'speech' },
          ],
          effects: 'ドキッ',
        },
        {
          panelNumber: 2,
          size: '中ゴマ',
          composition: 'せんせいが逆算の矢印を描く',
          dialogue: [
            { speaker: 'せんせい', text: 'こういう時は60÷0.3。わり算で戻せばいいんだよ', type: 'speech' },
            { speaker: 'はなこ', text: '200だ！', type: 'speech' },
          ],
        },
      ],
      imageGenerationPrompt:
        'Safe educational manga illustration for children\'s textbook. Cartoon drawing style, G-rated content. A manga page with 2 panels: the girl student surprised by a reverse problem on the board; the teacher drawing reverse arrows showing division. Black and white manga line art, empty speech bubbles.',
    },
    {
      pageNumber: 7,
      title: '実戦！バーゲンの問題',
      summary: '冒頭の「20%引き」を自力で解く',
      panels: [
        {
          panelNumber: 1,
          size: '大ゴマ',
          composition: '商店街に戻ってきた2人。「2000円の20%引き」の値札',
          dialogue: [
            { speaker: 'せんせい', text: 'さあ、最初のお店の問題に挑戦！2000円の20%引きはいくら？', type: 'speech' },
          ],
        },
        {
          panelNumber: 2,
          size: '中ゴマ',
          composition: 'はなこが暗算する',
          dialogue: [
            { speaker: 'はなこ', text: '値引きは2000×0.2＝400円。だから2000−400＝1600円！', type: 'speech' },
          ],
        },
        {
          panelNumber: 3,
          size: '小ゴマ',
          composition: 'わりあいちゃんが手を挙げて補足',
          dialogue: [
            { speaker: 'わりあいちゃん', text: '2000×0.8＝1600って一発で出すワザもあるよ！', type: 'speech' },
          ],
          effects: 'ピコーン！',
        },
      ],
      imageGenerationPrompt:
        'Safe educational manga illustration for children\'s textbook. Cartoon drawing style, G-rated content. A manga page with 3 panels: back at the shopping street with a price tag; the girl student calculating confidently; the fairy mascot raising its hand with an extra tip. Black and white manga line art, empty speech bubbles.',
    },
    {
      pageNumber: 8,
      title: 'まとめ「く・も・わ」',
      summary: 'く÷も＝わ の関係図で総まとめ',
      panels: [
        {
          panelNumber: 1,
          size: '大ゴマ',
          composition: '黒板に大きな「く・も・わ」の関係図',
          dialogue: [
            { speaker: 'せんせい', text: '「く」らべられる量、「も」とにする量、「わ」りあい。この3つの関係を覚えれば完璧！', type: 'speech' },
          ],
        },
        {
          panelNumber: 2,
          size: '中ゴマ',
          composition: 'はなこがガッツポーズ',
          dialogue: [
            { speaker: 'はなこ', text: 'もう「の」の前を探せば怖くない！', type: 'speech' },
          ],
          effects: 'ジャジャーン！',
        },
        {
          panelNumber: 3,
          size: '小ゴマ',
          composition: 'わりあいちゃんがウィンク',
          dialogue: [
            { speaker: 'わりあいちゃん', text: 'テスト、がんばってね〜！', type: 'speech' },
          ],
        },
      ],
      imageGenerationPrompt:
        'Safe educational manga illustration for children\'s textbook. Cartoon drawing style, G-rated content. A manga page with 3 panels: a big summary relationship diagram frame on the chalkboard; the girl student doing a victory pose; the fairy mascot winking goodbye. Black and white manga line art, empty speech bubbles.',
    },
  ],
}
