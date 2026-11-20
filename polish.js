/* fix4: premium interaction layer — dialogs, reward moments, toasts, rules typography. Visual only; no business logic. */
(() => {
  const reduce = () => (window.TpowerMotion && window.TpowerMotion.reduce()) || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const fmt = n => Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const svg = {
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    alert: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>',
    info: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.5h.01"/></svg>',
    wallet: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7.5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2h10"/><path d="M16 13.5h.01"/></svg>'
  };

  /* ---------- Dialog enter / exit motion ---------- */
  const modal = document.getElementById('modal');
  const baseOpen = window.openModal, baseClose = window.closeModal;
  let closeTimer = null;
  function finishClose() {
    closeTimer = null;
    modal.classList.remove('is-closing', 'lx-reward-open');
    if (modal.open) baseClose();
    document.body.classList.remove('modal-open');
  }
  if (modal && typeof baseOpen === 'function' && typeof baseClose === 'function') {
    window.openModal = function (html) {
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      modal.classList.remove('is-closing', 'lx-reward-open');
      if (modal.open) { $('#modal-body').innerHTML = html; } else baseOpen(html);
      enhance(modal);
    };
    window.closeModal = function () {
      if (!modal.open) { document.body.classList.remove('modal-open'); return; }
      if (closeTimer) return;
      if (reduce()) { finishClose(); return; }
      modal.classList.add('is-closing');
      closeTimer = setTimeout(finishClose, 190);
    };
    modal.addEventListener('close', () => { if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; } modal.classList.remove('is-closing', 'lx-reward-open'); document.body.classList.remove('modal-open'); });
  }

  /* ---------- Reward moment sheet ---------- */
  window.lxReward = function (o) {
    const amt = Number(o.amount || 0);
    const parts = fmt(amt).split('.');
    const cur = esc(o.currency || 'RM');
    const rows = (o.rows || []).map(r => `<li><span>${esc(r[0])}</span><span class="lx-ba">${r.length > 2 ? `<s>${cur} ${fmt(r[1])}</s><i aria-hidden="true">→</i><b>${cur} ${fmt(r[2])}</b>` : `<b>${esc(r[1])}</b>`}</span></li>`).join('');
    const sparks = Array.from({ length: 14 }, (_, i) => `<i style="--a:${i * (360 / 14)}deg;--d:${(i % 3) * 40}ms"></i>`).join('');
    const html = `<div class="lx-reward">
      <div class="lx-reward-mark" aria-hidden="true"><div class="lx-burst">${sparks}</div><svg viewBox="0 0 56 56"><circle class="lx-ring" cx="28" cy="28" r="26"/><path class="lx-tick" d="M17 29.5l7.5 7.5L40 21"/></svg></div>
      <p class="lx-kicker">${esc(o.kicker || '领取成功')}</p>
      <h2>${esc(o.title || '奖励已到账')}</h2>
      <div class="lx-amount" aria-label="${cur} ${fmt(amt)}"><small>${cur}</small><span class="lx-int" data-to="${amt}">${reduce() ? parts[0] : '0'}</span><em>.${parts[1]}</em></div>
      ${o.dest ? `<p class="lx-dest">${svg.wallet}<span>${esc(o.destPrefix || '已到账至')} ${esc(o.dest)}</span></p>` : ''}
      ${rows ? `<ul class="lx-rows">${rows}</ul>` : ''}
      ${o.note ? `<p class="lx-note">${esc(o.note)}</p>` : ''}
      <button type="button" class="primary" data-close>${esc(o.primary || '完成')}</button>
    </div>`;
    setTimeout(() => {
      window.openModal(html);
      modal.classList.add('lx-reward-open');
      countUp(modal.querySelector('.lx-int'));
    }, 120);
  };
  function countUp(el) {
    if (!el || reduce()) return;
    const to = Math.floor(Number(el.dataset.to || 0));
    const t0 = performance.now(), dur = 900;
    const step = now => {
      const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * e).toLocaleString('en-US');
      if (p < 1) requestAnimationFrame(step);
    };
    setTimeout(() => requestAnimationFrame(step), 180);
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('#modal [data-close]');
    if (b && modal.classList.contains('lx-reward-open')) window.closeModal();
  }, true);

  /* ---------- Toasts: icon + tone ---------- */
  const baseToast = window.toast;
  if (typeof baseToast === 'function') {
    window.toast = function (message) {
      baseToast(message);
      const el = document.getElementById('demo-toast');
      if (!el) return;
      const m = String(message);
      const tone = /不可|不能|无法|请先|失效|作废|未中奖|不符|未达|未获得|不计入|勿重复|已锁定|互斥|不产生|须|失败/.test(m) ? 'warn'
        : /已领取|已到账|已转出|成功|已发放|已完成|获得|已兑换|已达到|已解锁|已按/.test(m) ? 'ok' : 'info';
      el.dataset.tone = tone;
      el.innerHTML = `<span class="lx-toast-icon">${tone === 'ok' ? svg.check : tone === 'warn' ? svg.alert : svg.info}</span><span class="lx-toast-text"></span>`;
      el.lastChild.textContent = m;
    };
  }

  /* ---------- DOM enhancement (idempotent) ---------- */
  const NUM = /(RM\s?[\d,]+(?:\.\d+)?|\d+(?:\.\d+)?%|[x×]\s?\d+|\d+(?:,\d{3})*(?:\.\d+)?)/g;
  function wrapNumbers(p) {
    if (p.dataset.lxNum || p.querySelector('*')) return;
    const lang = document.documentElement.lang || 'zh-CN';
    const dict = ((typeof UI_DICTIONARIES !== 'undefined' && UI_DICTIONARIES) || {})[lang] || {};
    if (lang !== 'zh-CN' && dict[p.textContent.trim()] !== undefined) return;
    const text = p.textContent;
    if (!NUM.test(text)) return;
    NUM.lastIndex = 0;
    p.dataset.lxNum = '1';
    p.innerHTML = esc(text).replace(NUM, m => `<span class="lx-num${/^RM/.test(m) ? ' is-money' : ''}">${m}</span>`);
  }
  function enhance(root) {
    if (!root || !root.querySelectorAll) return;
    root.querySelectorAll('.rules-content .rule-content p').forEach(wrapNumbers);
    root.querySelectorAll('.flow-steps b, .journey-steps b').forEach(b => { b.classList.toggle('lx-tick', b.textContent.trim() === '✓'); });
    root.querySelectorAll('.kyc-summary li').forEach(li => {
      const k = (li.firstElementChild || {}).textContent || '';
      if (/彩金|奖金|到账|奖励|转出/.test(k)) li.classList.add('lx-em');
    });
    root.querySelectorAll('table').forEach(t => {
      const heads = [...t.querySelectorAll('thead th, tr:first-child th')].map(th => th.textContent.trim());
      if (heads.length < 5) return;
      t.classList.add('lx-stack');
      t.querySelectorAll('tbody tr, tr').forEach(tr => [...tr.children].forEach((td, i) => { if (td.tagName === 'TD' && heads[i]) td.dataset.label = heads[i]; }));
    });
    root.querySelectorAll('.demo-status-card.success:not([data-lx])').forEach(card => {
      card.dataset.lx = '1';
      const mark = card.querySelector('.demo-success-mark');
      if (mark) {
        mark.classList.add('lx-success-mark');
        mark.innerHTML = `<div class="lx-burst">${Array.from({ length: 12 }, (_, i) => `<i style="--a:${i * 30}deg;--d:${(i % 3) * 40}ms"></i>`).join('')}</div><svg viewBox="0 0 56 56"><circle class="lx-ring" cx="28" cy="28" r="26"/><path class="lx-tick" d="M17 29.5l7.5 7.5L40 21"/></svg>`;
      }
      const hi = card.querySelector('.wallet-card.main.highlight');
      const h3 = card.querySelector('h3');
      if (hi && h3 && !card.querySelector('.lx-dest')) {
        const label = (hi.querySelector('span') || {}).textContent || '主钱包';
        h3.insertAdjacentHTML('afterend', `<p class="lx-dest">${svg.wallet}<span>已到账至 ${esc(label)}</span></p>`);
      }
      const strong = hi && hi.querySelector('strong');
      if (strong && !reduce()) {
        const m = strong.textContent.match(/RM\s?([\d,]+)\.(\d{2})/);
        if (m) {
          const to = Number(m[1].replace(/,/g, ''));
          const t0 = performance.now();
          const step = now => { const p = Math.min(1, (now - t0) / 900), e = 1 - Math.pow(1 - p, 3); strong.textContent = 'RM ' + Math.round(to * e).toLocaleString('en-US') + '.' + (p < 1 ? '00' : m[2]); if (p < 1) requestAnimationFrame(step); };
          requestAnimationFrame(step);
        }
      }
    });
    if (!reduce()) root.querySelectorAll('progress:not([data-lx])').forEach(pg => {
      pg.dataset.lx = '1';
      const to = Number(pg.value), t0 = performance.now();
      if (!(to > 0)) return;
      pg.value = 0;
      const step = now => { const p = Math.min(1, (now - t0) / 700), e = 1 - Math.pow(1 - p, 3); pg.value = to * e; if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }
  const app = document.getElementById('app');
  let queued = false;
  const run = () => { queued = false; obs.disconnect(); enhance(app); enhance(document.getElementById('modal-body')); obs.observe(app, { childList: true, subtree: true }); obs.observe(document.getElementById('modal-body'), { childList: true, subtree: true }); };
  const obs = new MutationObserver(() => { if (!queued) { queued = true; requestAnimationFrame(run); } });
  run();
})();
