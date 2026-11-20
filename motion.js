/* fix9: restrained interaction layer — press feedback, page/tab motion, CTA loading, amount ticks. */
(() => {
  const html = document.documentElement;
  const Motion = {
    skip() {
      try {
        if (window.__TP_SKIP_MOTION) return true;
        if (html.dataset.skipMotion === '1') return true;
        if (sessionStorage.getItem('tp-skip-motion') === '1') return true;
        if (new URLSearchParams(location.search).get('motion') === 'skip') return true;
      } catch (e) {}
      return false;
    },
    reduce() {
      return this.skip() || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
    },
    ms(full, reduced) {
      if (this.skip()) return 0;
      if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return reduced != null ? reduced : Math.min(160, full);
      }
      return full;
    },
    spinMs() {
      if (this.skip()) return 0;
      if (typeof window.__TP_SPIN_MS === 'number') return window.__TP_SPIN_MS;
      if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return 180;
      return 4000;
    }
  };
  try {
    if (Motion.skip()) html.dataset.skipMotion = '1';
  } catch (e) {}
  window.TpowerMotion = Motion;

  function vibrate(ms) {
    try {
      if (Motion.skip() || Motion.reduce()) return;
      if (!(window.matchMedia && matchMedia('(pointer: coarse)').matches)) return;
      if (navigator.vibrate) navigator.vibrate(ms == null ? 10 : ms);
    } catch (e) {}
  }
  window.TpowerMotion.vibrate = vibrate;

  /* ---------- Press + primary CTA loading ---------- */
  const HOLD = /(claim-confirm|redeem-confirm|convert-confirm|unlock-confirm|finish-confirm|deposit-confirm|claim-weekly|claim-upgrade|claim-retention|claim-rebate|claim-festival|mt-join)$/;
  let ctaLock = false;
  function isHoldCta(name) {
    return !!name && HOLD.test(name) && !/go-/.test(name);
  }
  function markLoading(btn) {
    if (!btn) return;
    btn.classList.add('is-loading');
    btn.setAttribute('aria-busy', 'true');
    btn.disabled = true;
    if (!btn.dataset.fxLabel) btn.dataset.fxLabel = btn.innerHTML;
    btn.innerHTML = '<span class="fx-spinner" aria-hidden="true"></span><span>处理中</span>';
  }
  function clearLoading(btn) {
    if (!btn) return;
    btn.classList.remove('is-loading');
    btn.removeAttribute('aria-busy');
    if (btn.dataset.fxLabel) btn.innerHTML = btn.dataset.fxLabel;
  }
  if (typeof handleAction === 'function') {
    const _handle = handleAction;
    handleAction = function (name) {
      if (ctaLock && isHoldCta(name)) return;
      if (!isHoldCta(name) || Motion.skip() || Motion.ms(520, 0) === 0) return _handle(name);
      const btn = document.querySelector('#modal[open] [data-action="' + name + '"]')
        || document.querySelector('[data-action="' + name + '"].primary')
        || document.querySelector('[data-action="' + name + '"]');
      ctaLock = true;
      if (btn) markLoading(btn);
      vibrate(10);
      const delay = Motion.ms(520, 80);
      setTimeout(() => {
        clearLoading(btn);
        ctaLock = false;
        _handle(name);
      }, delay);
    };
  }
  document.addEventListener('click', e => {
    const press = e.target.closest('button, .promo-card, .fd-option-card, .vip-benefit-card, .source-card, [data-promo], [data-category]');
    if (!press || press.disabled || press.getAttribute('aria-disabled') === 'true') return;
    const primary = press.matches('button.primary, #dw-spin-btn, .records-button');
    if (primary) vibrate(10);
  }, true);

  /* ---------- Navigation + tab ink + stepper + amounts ---------- */
  let lastHash = location.hash;
  let navBusy = false;
  const amountCache = new Map();
  let listStaggered = false;
  let lastGuide = '';
  let lastStep = '';

  function paramsOf(hash) {
    return new URLSearchParams(String(hash || '').replace(/^#/, ''));
  }
  function navDir() {
    const prev = paramsOf(lastHash);
    const next = paramsOf(location.hash);
    const pa = prev.get('activity') || '';
    const na = next.get('activity') || '';
    const pt = prev.get('tab') || '0';
    const nt = next.get('tab') || '0';
    const ps = prev.get('demo') || '';
    const ns = next.get('demo') || '';
    if (pa === na && pt === nt && ps === ns && lastHash === location.hash) return 'same';
    if (pa === na && pa && pt !== nt && (ps === ns || (!ps && !ns))) return 'tab';
    if (ps && !ns) return 'back';
    if (pa && !na) return 'back';
    if (!ps && ns) return 'forward';
    if (!pa && na) return 'forward';
    if (pa && na && pa !== na) return 'forward';
    return 'fade';
  }

  function syncTabInk() {
    const tabs = document.querySelector('.activity-tabs');
    if (!tabs) return;
    let ink = tabs.querySelector('.fx-tab-ink');
    if (!ink) {
      ink = document.createElement('span');
      ink.className = 'fx-tab-ink';
      ink.setAttribute('aria-hidden', 'true');
      tabs.append(ink);
      tabs.classList.add('has-ink');
    }
    const active = tabs.querySelector('button.active') || tabs.querySelector('button');
    if (!active) return;
    const tr = tabs.getBoundingClientRect();
    const br = active.getBoundingClientRect();
    ink.style.width = br.width + 'px';
    ink.style.transform = 'translateX(' + (br.left - tr.left + tabs.scrollLeft) + 'px)';
  }

  function syncStepper() {
    const root = document.querySelector('.journey-steps, .flow-steps.trial-steps');
    if (!root) return;
    const items = [...root.querySelectorAll('li, button')];
    const cur = items.findIndex(el => el.classList.contains('current') || el.classList.contains('active'));
    const n = Math.max(items.length - 1, 1);
    const pct = cur < 0 ? 0 : (cur / n) * 100;
    let rail = root.querySelector('.fx-rail');
    if (!rail) {
      rail = document.createElement('span');
      rail.className = 'fx-rail';
      rail.setAttribute('aria-hidden', 'true');
      rail.innerHTML = '<i></i>';
      root.append(rail);
    }
    const fill = rail.querySelector('i');
    if (fill) {
      const apply = () => { fill.style.width = pct + '%'; };
      if (Motion.skip()) apply();
      else requestAnimationFrame(apply);
    }
    const key = (location.hash || '') + ':' + cur;
    if (cur >= 0 && lastStep && lastStep !== key) {
      const dot = items[cur] && items[cur].querySelector('b');
      if (dot && !Motion.skip()) {
        dot.classList.remove('fx-dot-pop');
        void dot.offsetWidth;
        dot.classList.add('fx-dot-pop');
      }
    }
    lastStep = key;
  }

  function fadeGuide() {
    const el = document.querySelector('.next-guide');
    if (!el) { lastGuide = ''; return; }
    const text = el.textContent;
    if (text !== lastGuide && lastGuide && !Motion.skip() && !Motion.reduce()) {
      el.classList.remove('fx-guide-in');
      el.classList.add('fx-guide-swap');
      void el.offsetWidth;
      el.classList.add('fx-guide-in');
    }
    lastGuide = text;
  }

  function parseAmount(text) {
    const m = String(text || '').replace(/,/g, '').match(/(\d+)(?:\.(\d+))?/);
    return m ? Number(m[1] + '.' + (m[2] || '0')) : null;
  }
  function tickNumber(el, from, to) {
    if (Motion.skip() || Motion.reduce() || from == null || to == null || from === to) return;
    const raw = el.textContent;
    const prefix = raw.replace(/[\d,]+(\.\d+)?/, '');
    const hasDec = /\.\d+/.test(raw);
    const t0 = performance.now();
    const dur = 420;
    const step = now => {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      const val = from + (to - from) * e;
      const body = hasDec
        ? val.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : Math.round(val).toLocaleString('en-US');
      el.textContent = raw.match(/^RM/) ? ('RM ' + body) : (prefix && !raw.startsWith(String(Math.round(from))) ? raw.replace(/[\d,]+(\.\d+)?/, body) : body);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  function animateAmounts(root) {
    if (!root) return;
    root.querySelectorAll('.wallet-card strong, .play-wallet strong, .growth-amount, .stat-row em, .record-right b').forEach(el => {
      const label = (el.previousElementSibling && el.previousElementSibling.textContent)
        || (el.parentElement && el.parentElement.querySelector('span') && el.parentElement.querySelector('span').textContent)
        || el.className;
      const key = (location.hash || '') + '|' + label;
      const to = parseAmount(el.textContent);
      const from = amountCache.has(key) ? amountCache.get(key) : null;
      if (to != null) amountCache.set(key, to);
      if (from != null && to != null && Math.abs(from - to) >= 0.005) tickNumber(el, from, to);
    });
  }

  function afterRender(dir) {
    const app = document.getElementById('app');
    syncTabInk();
    syncStepper();
    fadeGuide();
    animateAmounts(app);
    if (app && app.querySelector('.cards') && !listStaggered && !Motion.skip() && !Motion.reduce()) {
      app.querySelector('.cards').classList.add('fx-stagger');
      listStaggered = true;
    }
    if (dir === 'demo-toggle' && app && !Motion.skip() && !Motion.reduce()) {
      app.classList.add('fx-demo-swap');
      setTimeout(() => app.classList.remove('fx-demo-swap'), 360);
    }
  }

  function playRoute(raw, dir) {
    const app = document.getElementById('app');
    raw();
    lastHash = location.hash;
    if (app && !Motion.skip() && !Motion.reduce() && dir !== 'same' && dir !== 'tab') {
      app.classList.add(dir === 'back' ? 'fx-enter-back' : (dir === 'fade' ? 'fx-enter-fade' : 'fx-enter-fwd'));
      setTimeout(() => app.classList.remove('fx-enter-fwd', 'fx-enter-back', 'fx-enter-fade'), Motion.ms(280, 0) + 20);
    }
    afterRender(dir);
  }

  if (typeof route === 'function') {
    const raw = route;
    window.removeEventListener('hashchange', raw);
    route = function () {
      const dir = navDir();
      const app = document.getElementById('app');
      if (Motion.skip() || Motion.reduce() || !app || dir === 'same' || navBusy) {
        const y = dir === 'tab' && app ? app.scrollTop : null;
        raw();
        lastHash = location.hash;
        afterRender(dir);
        if (y != null) app.scrollTo(0, y);
        return;
      }
      if (dir === 'tab') {
        const y = app.scrollTop;
        raw();
        lastHash = location.hash;
        const content = document.getElementById('detail-content');
        if (content && !Motion.reduce()) {
          content.classList.add('fx-tab-fade');
          setTimeout(() => content.classList.remove('fx-tab-fade'), 280);
        }
        afterRender(dir);
        app.scrollTo(0, y);
        return;
      }
      navBusy = true;
      app.classList.add(dir === 'back' ? 'fx-leave-back' : 'fx-leave-fwd');
      const leave = Motion.ms(160, 0);
      const go = () => {
        app.classList.remove('fx-leave-back', 'fx-leave-fwd');
        playRoute(raw, dir);
        navBusy = false;
      };
      if (leave <= 0) go();
      else setTimeout(go, leave);
    };
    window.addEventListener('hashchange', route);
  }

  /* Demo toggle: soft swap rather than a hard jump */
  const demoObs = new MutationObserver(muts => {
    if (muts.some(m => m.attributeName === 'data-demo')) {
      afterRender('demo-toggle');
    }
  });
  demoObs.observe(html, { attributes: true, attributeFilter: ['data-demo'] });

  window.addEventListener('resize', () => syncTabInk());
  const app = document.getElementById('app');
  if (app) {
    let q = false;
    const kick = () => { q = false; syncTabInk(); syncStepper(); };
    const mo = new MutationObserver(() => { if (!q) { q = true; requestAnimationFrame(kick); } });
    mo.observe(app, { childList: true, subtree: true });
  }
  afterRender('same');
})();
