# 魂流開導・専属伴走サポート LP

静的な HTML/CSS/JS だけで動きます（ビルド不要）。

- 起動：このフォルダで `python3 -m http.server 8000` → http://localhost:8000/
- 公開：フォルダごと Vercel・GitHub Pages・Netlify などに置くだけ。
- プランの料金・URL・文言：`main.js` の `PLANS` を1か所直すと、冒頭の限定料金・期間の比べ・プラン欄・最後の申し込みエリア・下の帯に反映。
- カウントダウン：`main.js` の `DEADLINE_HOURS`（初めて開いた時から72時間・再読み込みでは戻らない）。
- LINE の感想画像：`img/voices/` に画像を置き、`index.html` の `<figure class="shot">` を足す・消す。
- 特商法：フッターのリンク（https://tamashiimichibikinok.stores.jp/tokushoho）。
