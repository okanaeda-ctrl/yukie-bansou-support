/* 魂流開導・専属伴走サポート LP
   ★プランの料金・URL・文言はこの PLANS だけを直す（冒頭の限定料金・期間の比べ・プラン欄・最後の申し込みエリア・下の帯に出ます） */
const PLANS = [
  {
    key: '2w', name: '2週間プラン', short: '2週間', lat: '14 DAYS', term: '14日間', gauge: 1, healing: 2,
    goal: '今の乱れた流れを整え始める', desc: '不安や迷いを軽くして、前向きな毎日へ。',
    regular: '29,800', price: '14,900',
    url: 'https://tamashiimichibikinok.stores.jp/items/6ae81495a77b41544cc1b220'
  },
  {
    key: '1m', name: '1か月プラン', short: '1か月', lat: '1 MONTH', term: '1か月', gauge: 3, healing: 4,
    goal: '良い流れを育てる', desc: '同じ悩みに振り回されず、理想へ向かって動き始める。',
    regular: '69,800', price: '39,800',
    url: 'https://tamashiimichibikinok.stores.jp/items/6ae818c6e647ea9c95045003'
  },
  {
    key: '3m', name: '3か月プラン', short: '3か月', lat: '3 MONTHS', term: '3か月', gauge: 6, healing: 13,
    goal: '理想の未来へ進む', desc: '繰り返す悩みを乗り越え、望む幸せに近づく。',
    regular: '149,800', price: '99,800', recommended: true,
    url: 'https://tamashiimichibikinok.stores.jp/items/6ae8191ab6bf8e73c0d0a157'
  },
  {
    key: '6m', name: '6か月プラン', short: '6か月', lat: '6 MONTHS', term: '6か月', gauge: 10, healing: 26,
    goal: '理想の流れを自分のものにする', desc: '過去の悩みに縛られず、幸せを選び続けられる自分へ。',
    regular: '259,800', price: '159,800', deal: '3か月プラン2回分より39,800円お得',
    url: 'https://tamashiimichibikinok.stores.jp/items/6ae81972905a76b74d9d9543'
  }
];

/* 限定料金のカウントダウン：このページを初めて開いた時から72時間（再読み込みしても戻らない） */
const DEADLINE_HOURS = 72;
const DEADLINE_KEY = 'konryu_bansou_first_open_v1';

document.documentElement.classList.add('js');
const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const HAS_IO = 'IntersectionObserver' in window;

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
}

/* ---- 冒頭の限定料金の一覧 ---- */
function renderLimitPrices() {
  document.querySelectorAll('[data-limit-prices]').forEach(box => {
    box.innerHTML = PLANS.map(p => `<span class="lp">${p.short} <b>${p.price}円</b></span>`)
      .reduce((s, x, i) => s + (i === 0 ? '' : i % 2 ? '<span class="sl"> ／ </span>' : '<br>') + x, '');
  });
}

/* ---- 伴走期間の比べ ---- */
function renderDepth() {
  const box = document.querySelector('[data-depth]');
  if (!box) return;
  box.innerHTML = '<p class="ttl">伴走期間と遠隔ヒーリングの回数</p>' + PLANS.map(p => `
    <div class="row${p.recommended ? ' rec' : ''}">
      <div class="nm">${p.short}</div>
      <div class="bar"><i style="--w:${Math.max(p.gauge * 10, 18)}%"></i><b>ヒーリング約${p.healing}回</b></div>
    </div>`).join('') + '<div class="scale"><div></div><div><span>短い</span><span>長い</span></div></div>';
}

/* ---- プランのカード ---- */
function renderPlans() {
  const box = document.querySelector('[data-plans]');
  if (!box) return;
  PLANS.forEach(p => {
    const card = el('article', 'plan rv' + (p.recommended ? ' rec' : ''));
    card.id = 'plan-' + p.key;
    const rings = Array.from({ length: 10 }, (_, i) => `<i${i < p.gauge ? ' data-f' : ''}></i>`).join('');
    card.innerHTML = `
      ${p.recommended ? '<p class="badge">おすすめプラン</p>' : ''}
      <p class="pterm">${p.lat}</p>
      <h3 class="pname">${p.name}</h3>
      <p class="pperiod">伴走期間：${p.term}</p>
      <p class="was">通常 <s>${p.regular}円</s></p>
      <p class="limtag">今だけ限定料金</p>
      <p class="price">${p.price}<small>円</small></p>
      ${p.deal ? `<p class="deal">${p.deal}</p>` : ''}
      <p class="goal">${p.goal}</p>
      <p class="desc">${p.desc}</p>
      <div class="wave" role="img" aria-label="継続期間の比較ゲージ 10段階中${p.gauge}">
        <p class="lbl">継続期間（比較ゲージ）</p>
        <div class="rings">${rings}</div>
        <p class="cnt"><b>${p.gauge}</b>/ 10</p>
      </div>
      <p class="heal">遠隔ヒーリング<b>約<span data-count="${p.healing}">${p.healing}</span>回</b></p>
      <p class="gift">《今だけ》特別特典《魂流開運の待ち受け》無料プレゼント</p>
      <a class="pbtn" href="${p.url}" target="_blank" rel="noopener">${p.name}を申し込む${p.recommended ? '<span class="s">迷ったら、3か月の伴走サポートがおすすめだよ。</span>' : ''}</a>`;
    box.appendChild(card);
  });
}

/* ---- 最後の申し込みエリア（同じ PLANS から） ---- */
function renderFinal() {
  const box = document.querySelector('[data-final]');
  if (!box) return;
  PLANS.forEach(p => {
    const a = el('a', 'final-btn rv' + (p.recommended ? ' is-rec' : ''));
    a.href = p.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML = `
      ${p.recommended ? '<span class="final-btn-tag">おすすめ</span>' : ''}
      <span class="final-btn-name">${p.name}<small>${p.name}を申し込む</small></span>
      <span class="final-btn-yen">${p.price}<small>円</small></span>`;
    a.setAttribute('aria-label', `${p.name}を申し込む（${p.price}円）`);
    box.appendChild(a);
  });
}

/* ---- 下の帯の値段（いちばん安いプランから「〜円～」） ---- */
function renderStickyPrice() {
  const box = document.querySelector('[data-sticky-price]');
  const yen = p => Number(p.price.replace(/,/g, ''));
  const low = PLANS.reduce((a, b) => (yen(b) < yen(a) ? b : a));
  if (box) box.innerHTML = `<span class="p">${low.price}<small>円～</small></span>`;
}

/* ---- 日本語の改行を文節で（語の途中で折らない・BudouX） ---- */
function wrapJapanese() {
  if (!window.jaWrap) return;
  const roots = document.querySelectorAll('body > header, body > section, body > div, body > a, main, footer');
  roots.forEach(el => window.jaWrap(el));
  // BudouX が1つにまとめた長い文節（12字超）は、助詞・「て」のあとでも折れるようにする（行より長いと「。」の前で折れてしまうため）
  const ZW = '\u200b';
  const splitLong = s => s.split(ZW).map(c => c.length <= 12 ? c
    : c.replace(/([てにがをはでとも])(?=[\u3041-\u3096\u4e00-\u9fff])/g, (m, k, i) => (i >= 2 && i < c.length - 4 ? k + ZW : k))).join(ZW);
  // BudouX が語の途中で切るもの（と|して・と|いう・当ては|まる・も|しかして）はつなぐ
  const joinBad = new RegExp(`(と|は|も)${ZW}(?=して|いう|まる|しかして)`, 'g');
  roots.forEach(root => {
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n; (n = tw.nextNode());) {
      if (!n.data.includes(ZW)) continue;
      const s = splitLong(n.data).replace(joinBad, '$1');
      if (s !== n.data) n.data = s;
    }
  });
}

/* ---- カウントダウン ---- */
function startCountdown() {
  let opened = Date.now();
  try {
    const saved = Number(localStorage.getItem(DEADLINE_KEY));
    if (saved && saved <= Date.now()) opened = saved;
    else localStorage.setItem(DEADLINE_KEY, String(opened));
  } catch (e) { /* 保存できないブラウザでは、開いた時から数える */ }
  const deadline = opened + DEADLINE_HOURS * 3600 * 1000;
  const cds = document.querySelectorAll('[data-countdown]');
  const minis = document.querySelectorAll('[data-mini]');
  const pad = n => String(n).padStart(2, '0');

  function tick() {
    const left = Math.max(0, deadline - Date.now());
    const d = Math.floor(left / 86400000);
    const h = Math.floor(left % 86400000 / 3600000);
    const m = Math.floor(left % 3600000 / 60000);
    const s = Math.floor(left % 60000 / 1000);
    cds.forEach(c => {
      c.querySelector('[data-d]').textContent = d;
      c.querySelector('[data-h]').textContent = pad(h);
      c.querySelector('[data-m]').textContent = pad(m);
      c.querySelector('[data-s]').textContent = pad(s);
    });
    minis.forEach(x => { x.textContent = `残り${d}日 ${pad(h)}:${pad(m)}:${pad(s)}`; });
    if (left === 0) {
      cds.forEach(c => {
        c.classList.add('is-expired');
        const ex = c.nextElementSibling;
        if (ex && ex.classList.contains('cd-expired')) ex.hidden = false;
      });
      minis.forEach(x => { x.textContent = ''; });
      return;
    }
    setTimeout(tick, 1000 - (Date.now() % 1000));
  }
  tick();
}

/* ---- 見えたら on を付ける（ふわっと出る・1行ずつ・下線・グラフ・バー） ---- */
function setupReveal() {
  const targets = document.querySelectorAll('.rv,.rv-s,.rv-b,.stag,.lines,.eyebrow,h2,.wipe,.limbox,.depthbar,.graph');
  if (REDUCE || !HAS_IO) { targets.forEach(t => t.classList.add('on')); return; }
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
  }), { threshold: .12, rootMargin: '0px 0px -8% 0px' });
  targets.forEach(t => io.observe(t));
}

/* ---- 金の粒子 ---- */
function setupParticles() {
  if (REDUCE) return;
  document.querySelectorAll('#particles,[data-particles]').forEach(box => {
    const n = Number(box.dataset.particles) || (innerWidth < 768 ? 18 : 32);
    for (let i = 0; i < n; i++) {
      const p = el('i', 'particle');
      p.style.left = (Math.random() * 100) + '%';
      p.style.setProperty('--duration', (9 + Math.random() * 11) + 's');
      p.style.setProperty('--delay', (Math.random() * 10) + 's');
      p.style.setProperty('--size', (2 + Math.random() * 3.5).toFixed(1) + 'px');
      box.appendChild(p);
    }
  });
}

/* ---- 見えたら順に：チェックが入る・ゲージが灯る・数が増える ---- */
function onSeen(nodes, fn, threshold) {
  if (REDUCE || !HAS_IO) { nodes.forEach(n => fn(n, true)); return; }
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { fn(e.target, false); io.unobserve(e.target); }
  }), { threshold });
  nodes.forEach(n => io.observe(n));
}
function setupSequences() {
  onSeen(document.querySelectorAll('[data-checks]'), (ul, now) => {
    ul.querySelectorAll('li').forEach((li, i) => now ? li.classList.add('on') : setTimeout(() => li.classList.add('on'), 250 + i * 320));
  }, 0.3);
  onSeen(document.querySelectorAll('.wave'), (w, now) => {
    w.querySelectorAll('i[data-f]').forEach((s, i) => now ? s.classList.add('f') : setTimeout(() => s.classList.add('f'), 200 + i * 120));
  }, 0.6);
  onSeen(document.querySelectorAll('[data-count]'), (n, now) => {
    const goal = Number(n.dataset.count);
    if (now) { n.textContent = goal; return; }
    const t0 = performance.now(), dur = 1400;
    (function step(t) {
      const k = Math.min((t - t0) / dur, 1);
      n.textContent = Math.max(1, Math.round(goal * (1 - Math.pow(1 - k, 3))));
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }, 0.8);
}

/* ---- 写真の視差・上の進み具合・下の帯 ---- */
function setupScroll() {
  const prog = document.querySelector('[data-prog]');
  const pxs = Array.from(document.querySelectorAll('.px img'));
  const bar = document.querySelector('[data-sticky]');
  const hero = document.querySelector('.hero');
  const hides = Array.from(document.querySelectorAll('[data-sticky-hide]'));
  let ticking = false;
  function update() {
    ticking = false;
    const vh = innerHeight, doc = document.documentElement;
    if (prog) prog.style.width = (scrollY / Math.max(1, doc.scrollHeight - vh) * 100).toFixed(2) + '%';
    if (!REDUCE) pxs.forEach(img => {
      const r = img.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      img.style.setProperty('--py', (((r.top + r.height / 2 - vh / 2) / vh) * -6).toFixed(2) + '%');
    });
    if (bar && hero) {
      const past = hero.getBoundingClientRect().bottom < 0;
      const inHide = hides.some(z => { const r = z.getBoundingClientRect(); return r.top < vh * .8 && r.bottom > vh * .2; });
      const show = past && !inHide;
      bar.classList.toggle('show', show);
      bar.setAttribute('aria-hidden', show ? 'false' : 'true');
      bar.querySelector('a').tabIndex = show ? 0 : -1;
    }
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', update);
  update();
}

renderLimitPrices();
renderDepth();
renderPlans();
renderFinal();
renderStickyPrice();
startCountdown();
setupReveal();
setupParticles();
setupSequences();
setupScroll();
wrapJapanese();
