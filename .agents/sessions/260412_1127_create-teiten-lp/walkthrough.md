# Teiten LP 実装 Walkthrough

## 実施内容

Teiten（定点観測アプリ）のランディングページを HTML/CSS/JS で新規作成した。

### ファイル構成

```
teiten/
├── index.html          # LP本体
├── style.css           # デザインシステム + レスポンシブCSS
├── script.js           # スクロールアニメーション
├── assets/
│   ├── mockup.png      # AI生成スマホモックアップ
│   └── google-play-badge.png  # 公式Google Playバッジ（日本語）
├── legal/
│   ├── privacy-policy.md  # 既存（GitHub Pages Jekyll変換）
│   └── terms.md           # 既存（GitHub Pages Jekyll変換）
└── README.md
```

### デザインシステム (fryx404 Pop)

| 要素 | 値 |
|------|-----|
| Primary | `#00D1FF` (Electric Cyan) |
| Accent | `#FFD600` (Sunshine Yellow) |
| フォント | Outfit + Noto Sans JP |
| 角丸 | 20px |
| ダークモード | `@media (prefers-color-scheme: dark)` |

### LP構成

1. **Header** — sticky、glassmorphism背景、ロゴ + Privacy/Terms リンク
2. **Hero** — キャッチコピー + Google Playバッジ + 浮遊モックアップ
3. **Features** — 3カード横並び（1日1枚 / 一言 / プライベート）
4. **Bottom CTA** — シアングラデーション背景 + バッジ
5. **Footer** — コピーライト + 法的リンク + Google商標表記

### 実装ポイント

- **Google Playバッジ**: 公式画像 (`play.google.com/intl/en_us/badges/static/images/badges/ja_badge_web_generic.png`) をダウンロードして配置
- **Privacy/Terms リンク**: 既存の `./legal/privacy-policy.html`, `./legal/terms.html` へリンク（URLを変更しない）
- **ファイル配置**: `docs/` ではなくリポジトリルートに配置（既存のJekyll GitHub Pages設定との整合性）
- **アニメーション**: Intersection Observer によるスクロールフェードイン + CSS `@keyframes float` による浮遊効果

## 検証結果

ローカルHTTPサーバーでデスクトップ/タブレット幅の双方で表示確認済み。

````carousel
![Hero セクション（デスクトップ）](C:\Users\FRYX\.gemini\antigravity\brain\b3289470-f2c4-4a89-9a86-0add7a194f0d\lp_hero.png)
<!-- slide -->
![Features セクション（3カラム）](C:\Users\FRYX\.gemini\antigravity\brain\b3289470-f2c4-4a89-9a86-0add7a194f0d\lp_features.png)
<!-- slide -->
![Bottom CTA + Footer](C:\Users\FRYX\.gemini\antigravity\brain\b3289470-f2c4-4a89-9a86-0add7a194f0d\lp_footer.png)
````

## GitHub Pages デプロイ手順

1. GitHub リポジトリ Settings → Pages → Source: 「Deploy from a branch」→ Branch: `main`, Folder: `/ (root)` を選択
2. `index.html` がルートにあるため、Jekyll は README.md より index.html を優先して配信する
3. 既存の `legal/privacy-policy.md` → `privacy-policy.html`, `legal/terms.md` → `terms.html` の変換も維持される

## TODO（ユーザー対応）

- [ ] `index.html` 内の Google Play Store URL (`https://play.google.com/store/apps/details?id=com.fryx404.teiten`) をアプリ公開後の実URLに更新
- [ ] `docs/` が空で残っている場合、手動で削除（ブラウザプロセスのロックにより自動削除できなかった）
- [ ] 必要に応じて `favicon.ico` を追加（現状404）
- [ ] モックアップ画像を実際のアプリスクリーンショットに差し替える場合は `assets/mockup.png` を上書き
