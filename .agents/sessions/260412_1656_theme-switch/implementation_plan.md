# Teiten LP テーマ（ライト/ダーク）切り替え機能の実装

LP（ランディングページ）とDocsページのヘッダーに、ユーザーが手動でライトモードとダークモードを切り替えられるスイッチ（ボタン）を追加します。

## User Review Required

> [!IMPORTANT]  
> 既存のテーマ判別方法はシステム設定に依存するMedia Query(`@media (prefers-color-scheme: dark)`) を使っています。
> 切り替えボタンを追加するにあたり、以下の実装方針をとります。
> - OS（システム）の設定をデフォルトとする
> - 一度ユーザーが手動で切り替えた場合は、その設定を `localStorage` に保存し、次回以降そのテーマを優先する
> - 初期表示時のちらつき（FOUC）を防ぐため、各HTMLファイルの `<head>` 末尾にインラインのJSを追加する
>
> この方針で問題ないかご確認をお願いします。（問題なければApproveしてください）

## Proposed Changes

### 1. スタイルのリファクタリング (CSS変数による一元管理)

これまでは部分的に `@media (prefers-color-scheme: dark)` ブロック内で `background` などのプロパティを直接上書きしていました。
これをやめ、すべてCSS変数で管理し、`data-theme="dark"` 属性が `html` 要素に付与されたときにそれらの変数の値を切り替えるようにします。

#### [MODIFY] [style.css](file:///c:/Users/FRYX/Documents/MyTools/teiten/style.css)
-  `:root` で定義しているライトモードの色調の直後に、`:root[data-theme="dark"]` によるダークモードの色調変数を再定義します。
- `rgba` によるハードコード部分（例：ヘッダーの背景やドロップシャドウ）を変数化（`--header-bg`, `--mockup-filter`, `--icon-bg` など）して使用するよう変更します。
- メディアクエリベースのダークモード記述（5箇所程度）を削除し、変数呼び出しに置き換えます。

#### [MODIFY] [docs/docs.css](file:///c:/Users/FRYX/Documents/MyTools/teiten/docs/docs.css)
- `style.css` と同様に、各セクション番号やTipsアラート等の専用のダークモード判定部分を `[data-theme="dark"]` セレクタ等に移行します。

---

### 2. 切り替えボタンスタイルの追加

#### [MODIFY] [style.css](file:///c:/Users/FRYX/Documents/MyTools/teiten/style.css)
- ヘッダー内のナビゲーション領域に配置する「テーマ切り替えボタン」のデザイン定義を追加します。
- 太陽と月のアイコンが切り替わるスタイリング等。

---

### 3. 初期表示ちらつき防止スクリプトの追加

#### [MODIFY] [index.html](file:///c:/Users/FRYX/Documents/MyTools/teiten/index.html)
#### [MODIFY] [docs/index.html](file:///c:/Users/FRYX/Documents/MyTools/teiten/docs/index.html)
- `<head>` の末尾（`</head>` の直前）にインラインの `<script>` を追加し、「ユーザー設定が `localStorage` にあれば使用」「なければ `matchMedia` でシステム設定を使用」して、DOMのパース直後に `html` 要素へ `data-theme` 属性（"light" または "dark"）を付与するようにします。

---

### 4. DOM要素（ボタン）の追加

#### [MODIFY] [index.html](file:///c:/Users/FRYX/Documents/MyTools/teiten/index.html)
#### [MODIFY] [docs/index.html](file:///c:/Users/FRYX/Documents/MyTools/teiten/docs/index.html)
- それぞれの `<header id="header">` の `<nav class="header__nav">` 内に、テーマ切り替え用の `<button>` 要素（アイコンSVG込み）を追加します。

---

### 5. 切り替えスクリプトの作成

#### [MODIFY] [script.js](file:///c:/Users/FRYX/Documents/MyTools/teiten/script.js)
- テーマ切り替えボタンの `click` イベントを受け取る処理を実装します。
- 現在のテーマを反転（toggole）させ、`<html>` の `data-theme` 属性を変更します。
- 変更した設定を `localStorage` の `teiten-theme` キーに保存します。
- 他のタブでの設定変更に合わせてテーマを変更する仕組み（オプション）またはシステム設定の変更検知を組み込みます。

## Verification Plan

### 自動/手動検証
- ブラウザ機能を使って `index.html` と `docs/index.html` を開き、以下の動作を確認します。
  1. ヘッダーに切り替えボタン（太陽/月のアイコン）が表示されているか
  2. ボタンクリックでLP・Docsの各ページのテーマ（背景・文字などの各デザイン・カラー）が変わるか
  3. テーマを変更したあとページをリロードして、変更後のテーマが保持されているか（LocalStorageの動作確認）
  4. 初期表示時に一瞬ライト（またはダーク）がちらつく現象（FOUC）が起きていないか
