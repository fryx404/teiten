# Teiten ランディングページ実装計画

## 概要

「Teiten（定点）」のランディングページを GitHub Pages 用静的ファイル（HTML/CSS/JS）として `docs/` ディレクトリに作成する。

## 構成

```
docs/
├── index.html      # メインLP
├── style.css       # スタイルシート
├── script.js       # JavaScript
├── assets/         # 画像アセット
│   ├── mockup.webp # スマホモックアップ（AI生成）
│   └── icon.svg    # Teitenアイコン（CSS/SVG生成）
├── privacy.html    # プライバシーポリシー（既存MDから変換）
└── terms.html      # 利用規約（既存MDから変換）
```

## デザインシステム (fryx404 Pop)

| 項目 | Light | Dark |
|------|-------|------|
| Background | `#FFFFFF` | `#000000` |
| Surface | `#FFFFFF` | `#1A1A1A` |
| Primary | `#00D1FF` | `#00D1FF` |
| Accent | `#FFD600` | `#FFD600` |
| Text | `#2D3436` | `#F5F5F5` |

- フォント: Inter, Outfit, Noto Sans JP (Google Fonts)
- 角丸: 16px+
- マイクロアニメーション全要素

## セクション構成

1. **Header** — ロゴ + Privacy/Terms リンク
2. **Hero** — キャッチコピー + CTA + スマホモックアップ（浮遊アニメーション）
3. **Features** — 3カード（1日1枚 / 一言を添える / 安全・プライベート）
4. **Bottom CTA** — ダウンロード訴求（Primary背景）
5. **Footer** — コピーライト + リンク

## 実装ステップ

### Step 1: アセット生成
- スマホモックアップ画像を `generate_image` で作成
- アイコンはSVGインラインで実装

### Step 2: HTML構造 (`index.html`)
- セマンティックHTML5
- SEOメタタグ完備
- Google Fonts読み込み

### Step 3: CSS (`style.css`)
- CSS Custom Properties でカラーパレット定義
- `@media (prefers-color-scheme: dark)` でダークモード
- モバイルファースト + メディアクエリ
- 浮遊アニメーション（`@keyframes float`）
- ホバーエフェクト

### Step 4: JS (`script.js`)
- スクロールアニメーション（Intersection Observer）
- スムーズスクロール

### Step 5: Privacy/Terms HTML
- 既存MDから変換し、LP統一デザインで表示

## 画像について

> [!IMPORTANT]
> スマホモックアップは `generate_image` ツールで生成し、実際の画像ファイルとして配置する。プレースホルダーは使わない。Google Play バッジは公式画像が使えないため、CSSでスタイリングしたボタンで代用する。

## 検証

- ブラウザでローカルプレビュー
- ライト/ダークモード両方の表示確認
- モバイルビューのレスポンシブ確認
