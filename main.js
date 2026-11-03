/* 魂流開導・専属伴走サポート LP
   ★プランの料金・URL・文言はこの PLANS だけを直す（プラン欄と最後の申し込みエリアの両方に出ます） */
const PLANS = [
  {
    key: '2w', name: '2週間プラン', term: '14日間', gauge: 1, healing: '約2回',
    goal: '今の乱れた流れを整え始める', desc: '不安や迷いを軽くして、前向きな毎日へ。',
    regular: '29,800', price: '14,900',
    url: 'https://tamashiimichibikinok.stores.jp/items/6ae81495a77b41544cc1b220'
  },
  {
    key: '1m', name: '1か月プラン', term: '1か月', gauge: 3, healing: '約4回',
    goal: '良い流れを育てる', desc: '同じ悩みに振り回されず、理想へ向かって動き始める。',
    regular: '69,800', price: '39,800',
    url: 'https://tamashiimichibikinok.stores.jp/items/6ae818c6e647ea9c95045003'
  },
  {
    key: '3m', name: '3か月プラン', term: '3か月', gauge: 6, healing: '約13回',
    goal: '理想の未来へ進む', desc: '繰り返す悩みを乗り越え、望む幸せに近づく。',
    regular: '149,800', price: '99,800', recommended: true,
    url: 'https://tamashiimichibikinok.stores.jp/items/6ae8191ab6bf8e73c0d0a157'
  },
  {
    key: '6m', name: '6か月プラン', term: '6か月', gauge: 10, healing: '約26回',
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

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
}

/* ---- プランのカード ---- */
function renderPlans() {
  const box = document.querySelector('[data-plans]');
  if (!box) return;
  PLANS.forEach(p => {
    const card = el('article', 'plan rv' + (p.recommended ? ' is-rec' : ''));
    card.id = 'plan-' + p.key;
    const segs = Array.from({ length: 10 }, (_, i) => `<i${i < p.gauge ? ' class="on"' : ''}></i>`).join('');
    card.innerHTML = `
      ${p.recommended ? '<p class="plan-ribbon">おすすめプラン</p>' : ''}
      <h3 class="plan-name">${p.name}</h3>
      <p class="plan-term">伴走期間：${p.term}</p>
      <p class="plan-goal">${p.goal}</p>
      <p class="plan-desc">${p.desc}</p>
      <div class="plan-meta">
        <div class="plan-meta-row">
          <span class="plan-meta-label">継続期間</span>
          <span class="gauge" role="img" aria-label="比較ゲージ 10段階中${p.gauge}">${segs}</span>
          <span class="gauge-num">${p.gauge}/10</span>
        </div>
        <div class="plan-meta-row plan-heal">
          <span class="plan-meta-label">遠隔ヒーリング</span><b>${p.healing}</b>
        </div>
      </div>
      <p class="plan-price">
        <span class="plan-regular">通常<s>${p.regular}円</s></span>
        <span class="plan-limited">今だけ限定料金</span><span class="plan-yen">${p.price}<small>円</small></span>
      </p>
      ${p.deal ? `<p class="plan-deal">${p.deal}</p>` : ''}
      <p class="plan-gift">《今だけ》特別特典<br>《魂流開運の待ち受け》無料プレゼント</p>
      <a class="btn" href="${p.url}" target="_blank" rel="noopener">${p.name}を申し込む</a>`;
    box.appendChild(card);
  });
}

/* ---- 最後の申し込みエリア（同じ PLANS から） ---- */
function renderFinal() {
  const box = document.querySelector('[data-final]');
  if (!box) return;
  PLANS.forEach(p => {
    const a = el('a', 'final-btn' + (p.recommended ? ' is-rec' : ''));
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

/* ---- スクショの横スワイプ・拡大 ---- */
function setupShots() {
  const wrap = document.querySelector('[data-shots]');
  if (!wrap) return;
  const track = wrap.querySelector('.shots-track');
  const shots = Array.from(track.querySelectorAll('.shot'));
  const dots = wrap.querySelector('.shots-dots');
  shots.forEach(() => dots.appendChild(el('i')));
  const dotEls = Array.from(dots.children);
  function update() {
    const mid = track.scrollLeft + track.clientWidth / 2;
    let best = 0, bestDist = Infinity;
    shots.forEach((s, i) => {
      const c = s.offsetLeft + s.offsetWidth / 2;
      const dist = Math.abs(c - mid);
      if (dist < bestDist) { bestDist = dist; best = i; }
    });
    dotEls.forEach((d, i) => d.classList.toggle('on', i === best));
  }
  track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  update();

  const dlg = document.querySelector('[data-lightbox]');
  const big = dlg && dlg.querySelector('[data-lightbox-img]');
  if (!dlg || typeof dlg.showModal !== 'function') return;
  track.querySelectorAll('.shot-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const img = btn.querySelector('img');
      big.src = img.currentSrc || img.src;
      big.alt = img.alt;
      dlg.showModal();
    });
  });
  dlg.querySelector('[data-lightbox-close]').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
}

/* ---- 下の帯：ファーストビューを過ぎたら出し、プランと申し込みエリアが見えている間は隠す ---- */
function setupSticky() {
  const bar = document.querySelector('[data-sticky]');
  if (!bar || !('IntersectionObserver' in window)) return;
  const fv = document.querySelector('.fv');
  const hideAreas = [document.getElementById('plans'), document.getElementById('apply')];
  let pastFv = false;
  const visible = new Set();
  const sync = () => {
    const show = pastFv && visible.size === 0;
    bar.classList.toggle('show', show);
    bar.setAttribute('aria-hidden', show ? 'false' : 'true');
    bar.querySelector('a').tabIndex = show ? 0 : -1;
  };
  new IntersectionObserver(([e]) => { pastFv = !e.isIntersecting && e.boundingClientRect.top < 0; sync(); }).observe(fv);
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
    sync();
  }, { rootMargin: '0px 0px -20% 0px' });
  hideAreas.forEach(a => a && io.observe(a));
}

/* ---- ふわっと出る ---- */
function setupReveal() {
  const targets = document.querySelectorAll('.h2, .photo, .compare, .support, .voice, .ba, .gift, .limit-box, .plan, .checks, .faq, .final-list, .wipe, .minicta');
  if (REDUCE || !('IntersectionObserver' in window)) { targets.forEach(t => t.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  targets.forEach(t => { t.classList.add('rv'); io.observe(t); });
}

/* ---- 金の粒子（ファーストビュー） ---- */
function setupParticles() {
  const box = document.getElementById('particles');
  if (!box || REDUCE) return;
  const n = innerWidth < 768 ? 18 : 30;
  for (let i = 0; i < n; i++) {
    const p = el('i', 'particle');
    p.style.left = (Math.random() * 100) + '%';
    p.style.setProperty('--duration', (9 + Math.random() * 11) + 's');
    p.style.setProperty('--delay', (Math.random() * 10) + 's');
    p.style.setProperty('--size', (2 + Math.random() * 3).toFixed(1) + 'px');
    box.appendChild(p);
  }
}

/* ---- 見えたら順に：チェックが入る・ゲージが灯る ---- */
function onSeen(nodes, fn, threshold) {
  if (REDUCE || !('IntersectionObserver' in window)) { nodes.forEach(n => fn(n, true)); return; }
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { fn(e.target, false); io.unobserve(e.target); }
  }), { threshold });
  nodes.forEach(n => io.observe(n));
}
function setupSequences() {
  onSeen(document.querySelectorAll('[data-checks]'), (ul, now) => {
    ul.querySelectorAll('li').forEach((li, i) => now ? li.classList.add('on') : setTimeout(() => li.classList.add('on'), 250 + i * 320));
  }, 0.3);
  onSeen(document.querySelectorAll('.gauge'), (g, now) => {
    g.querySelectorAll('i.on').forEach((s, i) => now ? s.classList.add('lit') : setTimeout(() => s.classList.add('lit'), 150 + i * 120));
  }, 0.6);
}

renderPlans();
renderFinal();
startCountdown();
setupShots();
setupSticky();
setupReveal();
setupParticles();
setupSequences();
