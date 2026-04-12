# Teiten LP サイト — 引き継ぎ資料

## 1. 概要

定点観測アプリ「Teiten」のランディングページ + 法的ページを GitHub Pages 用静的サイトとして新規構築した。

| 項目 | 内容 |
|------|------|
| 公開URL | `https://fryx404.github.io/teiten/` |
| 技術スタック | HTML5 / Vanilla CSS / Vanilla JS（フレームワーク不使用） |
| デプロイ先 | GitHub Pages（`main` ブランチ / root） |
| Jekyll | `.nojekyll` で無効化済み |

---

## 2. ファイル構成

```
teiten/                          ← リポジトリルート = GitHub Pages ルート
├── .nojekyll                    ← Jekyll無効化マーカー
├── index.html                   ← LP本体（5セクション構成）
├── style.css                    ← 共通デザインシステム（580行）
├── script.js                    ← スクロールアニメーション
├── assets/
│   ├── google-play-badge.png    ← 公式Google Playバッジ（日本語版）
│   └── mockup.png               ← スマホモックアップ（AI生成）
├── legal/
│   ├── legal.css                ← 法的ページ専用スタイル
│   ├── privacy-policy.html      ← プライバシーポリシー
│   └── terms.html               ← 利用規約
└── README.md
```

> [!IMPORTANT]
> 旧 `.md` 形式の法的ファイルは削除済み。`.html` が正式版。

---

## 3. デザインシステム (fryx404 Pop)

### カラーパレット

| トークン | Light | Dark | 用途 |
|---------|-------|------|------|
| `--bg` | `#FFFFFF` | `#000000` | 背景 |
| `--surface` | `#FFFFFF` | `#1A1A1A` | カード面 |
| `--primary` | `#00D1FF` | `#00D1FF` | アクセント、CTA |
| `--primary-dark` | `#00A3CC` | — | グラデーション末端 |
| `--accent` | `#FFD600` | `#FFD600` | 強調、ハイライト |
| `--text` | `#2D3436` | `#F5F5F5` | 本文 |
| `--text-sub` | `#636E72` | `#B0B0B0` | サブテキスト |
| `--card-bg` | `#F8FAFB` | `#111111` | Features背景 |

### テーマ切替

CSS `@media (prefers-color-scheme: dark)` でOS設定に自動追従。手動トグルは未実装。

### フォント

[Google Fonts](https://fonts.google.com/) から以下を読み込み：
- **英語**: Outfit (800), Inter (400/600/700/800)
- **日本語**: Noto Sans JP (400/600/700/800)

### デザイン原則

| 項目 | 値 |
|------|-----|
| 角丸 | `--radius: 20px` / `--radius-sm: 12px` |
| 最大幅 | `--max-w: 1120px` |
| セクション余白 | `--section-y: 120px`（タブレット80px / モバイル64px） |
| ヘッダー | sticky + glassmorphism（`backdrop-filter: blur(20px)`） |
| ホバー | カード浮き上がり（`translateY(-8px)`）、ボタン浮き（`translateY(-3px)`） |

---

## 4. LP セクション構成

| # | セクション | ID | 内容 |
|---|-----------|-----|------|
| 1 | Header | `#header` | ロゴ（SVGインライン）+ Privacy/Terms リンク |
| 2 | Hero | `#hero` | キャッチコピー + Google Play バッジ + モックアップ（浮遊アニメーション） |
| 3 | Features | `#features` | 3カード：1日1枚 / 一言を添える / 安全・プライベート |
| 4 | Bottom CTA | `#bottom-cta` | シアングラデーション背景 + バッジ |
| 5 | Footer | `#footer` | コピーライト + 法的リンク + Google商標表記 |

---

## 5. JavaScript の動作

[script.js](file:///c:/Users/FRYX/Documents/MyTools/teiten/script.js) は以下の2機能のみ：

1. **Intersection Observer** — `.fade-in` クラスを対象要素に付与し、ビューポート進入時に `.is-visible` を追加してフェードインアニメーションを発火。カードには `transitionDelay` でスタガーアニメーションを追加。
2. **ヘッダーシャドウ** — スクロール量 > 10px でヘッダーに `box-shadow` を追加。

---

## 6. 法的ページ

### 構造

Privacy Policy・Terms ともに同一テンプレート：
- 共通CSS: `../style.css`（ヘッダー・フッター・リセット）
- 専用CSS: `./legal.css`（本文レイアウト）
- ナビの `header__link--active` クラスで現在ページをシアン色に強調

### URL

| ページ | URL |
|--------|-----|
| LP | `https://fryx404.github.io/teiten/` |
| Privacy Policy | `https://fryx404.github.io/teiten/legal/privacy-policy.html` |
| Terms | `https://fryx404.github.io/teiten/legal/terms.html` |

---

## 7. レスポンシブ対応

| ブレークポイント | レイアウト変更 |
|----------------|--------------|
| > 900px | Hero横並び（テキスト左 / モックアップ右）、カード3列 |
| ≤ 900px | Hero縦積み中央揃え、カード1列（max-width: 480px） |
| ≤ 600px | ヘッダー高さ56px、フォント縮小、余白縮小 |

---

## 8. アセット管理

### Google Play バッジ

公式のバッジ画像（日本語版）を `assets/google-play-badge.png` に配置。

- ダウンロード元: `https://play.google.com/intl/en_us/badges/static/images/badges/ja_badge_web_generic.png`
- ガイドライン: [Badge Guidelines](https://partnermarketinghub.withgoogle.com/brands/google-play/visual-identity/badge-guidelines/)
- フッターに「Google Play および Google Play ロゴは、Google LLC の商標です。」の免責表記あり

### モックアップ画像

`assets/mockup.png` は AI 生成画像。実際のアプリスクリーンショットに差し替える場合は同名ファイルを上書きするだけでOK。

---

## 9. TODO（将来対応）

- [ ] Google Play URL の更新（`index.html` 内の `TODO` コメント参照。`id=com.fryx404.teiten` の部分）
- [ ] `assets/mockup.png` を実際のアプリスクショに差し替え
- [ ] `favicon.ico` の追加（現状404）
- [ ] OGP画像（`og:image`）の追加
- [ ] ダークモード手動トグルの追加（必要なら）

---

## 10. デプロイ手順

```bash
git add -A
git commit -m "feat: add landing page and legal HTML pages"
git push origin main
```

GitHub Pages Settings で **Source: `main` / `/ (root)`** が設定されていれば、push後に自動デプロイされる。

---

## 11. 検証結果

| 項目 | 結果 |
|------|------|
| デスクトップ（1400px）表示 | ✅ Hero横並び、3カラムカード、CTA正常 |
| タブレット（〜900px）表示 | ✅ 縦積みレイアウト、1カラムカード |
| Google Playバッジ表示 | ✅ 公式日本語版バッジ正常読み込み |
| モックアップ画像 | ✅ 浮遊アニメーション動作 |
| Privacy Policy ページ | ✅ 全7セクション表示、アクティブリンク強調 |
| Terms ページ | ✅ 全9条表示、リスト正常レンダリング |
| CSS/JSファイル読み込み | ✅ 200レスポンス確認 |
