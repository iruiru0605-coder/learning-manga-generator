# 📚 学習漫画ジェネレーター

教科書の単元と苦手を入力するだけで、AIが8ページの学習漫画台本と画像生成プロンプトを自動生成するWebアプリです。

勉強が苦手なお子さんを持つ親御さんが、お子さんに合わせた学習漫画を手軽に作れることを目指しています。

## 🎯 特徴

- **かんたん4ステップ**: 学年・教科・教科書・単元を選び、苦手を入力するだけ
- **AIが漫画台本を生成**: 先生と生徒の対話形式で、楽しく学べる8ページの学習漫画を自動生成
- **画像生成プロンプト付き**: 各ページの画像生成プロンプトをコピーしてChatGPT Image2やNanoBananaに貼り付けるだけ
- **格安**: DeepSeek V4を使えば1回の生成が約0.5円
- **プライバシー保護**: APIキーはブラウザにのみ保存され、外部に送信されません

## 🚀 使い方

### 1. APIキーを設定する
右上の「API設定」ボタンからAPIキーを入力します。DeepSeek V4がおすすめです（最も安価）。
- [DeepSeek APIキーを取得](https://platform.deepseek.com/)

### 2. 教科書を選ぶ
学年 → 教科 → 教科書 → 単元の順に選択します。

### 3. 苦手を入力する
AIが「どこが苦手ですか？」と質問するので、つまずいているポイントを自由に入力します。

### 4. 漫画台本を確認する
AIが生成した8ページの台本を確認します。

### 5. 画像生成プロンプトをコピーする
各ページのプロンプトをChatGPT Image2やNanoBananaに貼り付けて画像を生成します。

## 💻 開発者向け

```bash
# インストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build
```

### 技術スタック
- React 19 + TypeScript + Vite
- Zustand（状態管理）
- Tailwind CSS v4

### 対応AIプロバイダー
- DeepSeek V4（推奨・最安価）
- OpenAI（GPT-4o mini 等）
- Anthropic（Claude Haiku 等）

## 📊 コスト比較（8ページ漫画1回の生成）

| プロバイダー | モデル | 推定コスト |
|---|---|---|
| DeepSeek | deepseek-chat | ~$0.0035 (約0.5円) |
| OpenAI | gpt-4o-mini | ~$0.0008 (約0.1円) |
| Anthropic | claude-haiku-4-5 | ~$0.0015 (約0.2円) |

画像生成はChatGPT Image2（ChatGPT Plusに含まれる）やNanoBanana（無料）を利用するため、追加費用はかかりません。

## 📄 ライセンス

MIT License

## 🙏 クレジット

教科書データは[教科書LOD](https://w3id.org/jp-textbook/)（CC BY 4.0）および[学習指導要領LOD](https://w3id.org/jp-cos/)を参考にしています。
