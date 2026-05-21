# Google Playリンク更新の変更履歴と検証結果

## 概要

アプリの製品版リリースに伴い、LP（ランディングページ）内の Google Play への遷移先リンクを内部テスト版のものから、新しく公開された製品版 URL へ更新しました。

## 変更内容

### index.html

`index.html` 内の以下の2箇所の Google Play リンクを変更しました。

1. **Hero セクション（上部）のダウンロードバッジリンク**  
   - 変更前: `https://play.google.com/apps/testing/com.fryx404.teiten.app`
   - 変更後: `https://play.google.com/store/apps/details?id=com.fryx404.teiten.app`
   - 不要になった TODO コメント (`<!-- TODO: アプリ公開後に実際のGoogle Play URLに差し替え -->`) の削除

2. **ボトム CTA セクションのダウンロードバッジリンク**  
   - 変更前: `https://play.google.com/apps/testing/com.fryx404.teiten.app`
   - 変更後: `https://play.google.com/store/apps/details?id=com.fryx404.teiten.app`

## 検証結果

### 自動テスト

`npm test` コマンドを実行し、テストがすべて正常に通過することを確認しました。

```bash
> teiten-lp@1.0.0 test
> node script.test.mjs

TAP version 13
# Subtest: Theme toggle updates localStorage
ok 1 - Theme toggle updates localStorage
  ---
  duration_ms: 1.0505
  type: 'test'
  ...
# Subtest: Theme toggle handles localStorage error
ok 2 - Theme toggle handles localStorage error
  ---
  duration_ms: 1.8043
  type: 'test'
  ...
1..2
# tests 2
# suites 0
# pass 2
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 8.6
```
