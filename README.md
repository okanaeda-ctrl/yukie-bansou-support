# 魂流開導・専属伴走サポート LP

静的な HTML/CSS/JS だけで動きます（ビルド不要）。

- 起動：このフォルダで `python3 -m http.server 8000` → http://localhost:8000/
- 公開：フォルダごと Vercel・GitHub Pages・Netlify などに置くだけ。
- プランの料金・URL・文言：`main.js` の `PLANS` を1か所直すと、冒頭の限定料金・期間の比べ・プラン欄・最後の申し込みエリア・下の帯に反映。
- カウントダウン：`main.js` の `DEADLINE_HOURS`（初めて開いた時から72時間・再読み込みでは戻らない）。
- LINE の感想画像：`img/voices/` に画像を置き、`index.html` の `<figure class="shot">` を足す・消す。
- 特商法：フッターのリンク（https://tamashiimichibikinok.stores.jp/tokushoho）。
- 改行：`budoux.min.js`（Google の BudouX・Apache-2.0、日本語モデルだけを同梱）で文節ごとに折り返します。語の途中では改行しません。
- 下の帯の値段：`PLANS` のいちばん安いプランから「〇〇円～」と出します。
