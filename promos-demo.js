(() => {
  const r2 = n => Math.round((Number(n) || 0) * 100) / 100;
  const store = () => window.DemoAPI;
  const demoOf = () => store().get();

  const NC_JOURNEY = ['领取', '流水', '解锁', '彩金流水', '完成'];
  const RF_JOURNEY = ['邀请', '绑定好友', '任务解锁', '自动到账'];
  const GR_JOURNEY = ['首次充值', '累计投注', '解锁领取', '下一档', '完成'];
  const AN_JOURNEY = ['累计流水', '抽奖券', '开奖', '领取', '到账'];
  const MT_JOURNEY = ['参与', '挑战', '达标', '完成任务', '到账'];

  const NC_SPINS = [
    { turn: 80, delta: 2, symbols: ['7', '7', '7'] },
    { turn: 80, delta: -10, symbols: ['星', 'BAR', '7'] },
    { turn: 80, delta: 5, symbols: ['星', '星', '星'] },
    { turn: 80, delta: -15, symbols: ['铃', 'BAR', '星'] },
    { turn: 80, delta: 5, symbols: ['7', '铃', '7'] },
    { turn: 40, delta: -15, symbols: ['7', '7', 'BAR'] }
  ];
  const MT_WIN = [
    { delta: 20, symbols: ['7', '7', '7'] },
    { delta: -10, symbols: ['星', 'BAR', '7'] },
    { delta: 30, symbols: ['星', '星', '星'] },
    { delta: 20, symbols: ['铃', '铃', '铃'] },
    { delta: 20, symbols: ['7', '7', 'BAR'] },
    { delta: 20, symbols: ['7', '7', '7'] }
  ];
  const MT_LOSE = [
    { delta: -40, symbols: ['BAR', '星', '7'] },
    { delta: -40, symbols: ['铃', 'BAR', '星'] },
    { delta: -20, symbols: ['7', '星', 'BAR'] }
  ];
  const AN_TICKETS = ['582130', '619204', '305816'];
  const AN_DRAW = '582917';
  const GAMES = [
    { id: 'lucky-star', name: '幸运星老虎机', tag: '指定游戏', icon: 'slot' },
    { id: 'golden-spin', name: '黄金旋转', tag: '指定游戏', icon: 'crown' },
    { id: 'classic-fruit', name: '经典水果机', tag: '指定游戏', icon: 'gift' }
  ];

  function page(title, body, backHash) {
    return store().demoPage(title, body, backHash);
  }
  function checks(items) {
    return `<ul class="eligibility-list trial-prose">${items.map(item => `<li><span class="eligibility-mark" aria-hidden="true"></span><span>${item}</span></li>`).join('')}</ul>`;
  }
  function termsList(items) {
    return `<ul class="trial-terms trial-prose">${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
  }
  function stepper(steps, viewStep, attr) {
    return `<div class="flow-steps trial-steps" aria-label="活动流程">${steps.map((st, i) => `<button type="button" data-promo-step="${attr}:${i}" aria-pressed="${viewStep === i}" class="${viewStep === i ? 'active' : ''}${i < viewStep ? ' done' : ''}"><b>${i < viewStep ? '✓' : i + 1}</b><span>${st.title}</span></button>`).join('')}</div>`;
  }
  function sticky(triple) {
    const [label, name, disabled] = triple;
    return `<div class="trial-cta-slot">${action(label, name, disabled)}</div>`;
  }
  function pathRow(items) {
    return `<div class="trial-path" aria-hidden="true">${items.map((it, i) => `${i ? '<span class="trial-path-arrow"></span>' : ''}<div><strong>${it[0]}</strong><span>${it[1]}</span></div>`).join('')}</div>`;
  }
  function inspect(key, max, auto) {
    const raw = state.promoInspect && state.promoInspect[key];
    if (Number.isInteger(raw)) return Math.max(0, Math.min(max, raw));
    return auto;
  }
  function refreshPromo() {
    const y = $('#app').scrollTop;
    const params = currentRoute();
    const id = params.get('activity');
    const p = PROMOS.find(x => x.id === id);
    if (!p) return;
    const tab = Number(params.get('tab') || 0);
    renderDetail(p, Number.isFinite(tab) ? tab : 0);
    $('#app').scrollTo(0, y);
  }
  function record(title, amount, status) {
    store().addRecord({ id: title + '-' + Date.now(), title, amount, status, time: new Date().toISOString() });
  }

  function ncIndex(n) {
    if (n.abandoned || n.expired) return n.challengeDone ? 2 : (n.claimed ? 1 : 0);
    if (n.completed) return 4;
    if (n.bonusReleased || n.deposited) return 3;
    if (n.challengeDone) return 2;
    if (n.claimed) return 1;
    return 0;
  }
  /* rfIndex/grIndex/anIndex defined with activity renderers */
  function mtIndex(m) {
    if (m.completed) return 4;
    if (m.reached) return 3;
    if (m.ended) return 1;
    if (m.joined) return 1;
    return 0;
  }

  window.PromoJourney = function (params, demo) {
    const screen = params.get('demo') || '';
    const id = params.get('activity');
    const prefix = screen.split('-')[0];
    const map = {
      newcomer: () => ({ labels: NC_JOURNEY, current: ncIndex(demo.newcomer), finished: demo.newcomer.completed }),
      referral: () => ({ labels: RF_JOURNEY, current: rfIndex(demo.referral), finished: rfUnlockedTotal(demo.referral) > 0 }),
      growth: () => ({ labels: GR_JOURNEY, current: grIndex(demo.growth), finished: GROWTH_SOURCE.caps.every((c, i) => (demo.growth.claimed[i] || 0) >= c) }),
      anniversary: () => ({ labels: AN_JOURNEY, current: anIndex(demo.anniversary), finished: demo.anniversary.claimed }),
      maintenance: () => ({ labels: MT_JOURNEY, current: mtIndex(demo.maintenance), finished: demo.maintenance.completed }),
      'newcomer-free-challenge': () => ({ labels: NFC_JOURNEY, current: nfcIndex(demo.freeChallenge), finished: demo.freeChallenge.redeemed }),
      'daily-wheel': () => ({ labels: DW_JOURNEY, current: dwIndex(demo.dailyWheel), finished: (demo.dailyWheel.converted || 0) > 0 && (demo.dailyWheel.bonusWallet || 0) <= 0 })
    };
    if (map[id]) return map[id]();
    const byScreen = { nc: 'newcomer', ref: 'referral', gr: 'growth', an: 'anniversary', mt: 'maintenance', nfc: 'newcomer-free-challenge', dw: 'daily-wheel' };
    if (byScreen[prefix] && map[byScreen[prefix]]) return map[byScreen[prefix]]();
    return null;
  };


  /* ------------ 新人免费挑战赢取RM100 ------------ */
  const NFC_JOURNEY = ['领取', '试玩', '达标', '兑换', '到账'];
  const NFC_WIN = [
    { delta: 20, symbols: ['7', '7', '7'] },
    { delta: -10, symbols: ['星', 'BAR', '7'] },
    { delta: 30, symbols: ['星', '星', '星'] },
    { delta: 20, symbols: ['铃', '铃', '铃'] },
    { delta: 20, symbols: ['7', '7', 'BAR'] },
    { delta: 20, symbols: ['7', '7', '7'] }
  ];
  const NFC_LOSE = [
    { delta: -40, symbols: ['BAR', '星', '7'] },
    { delta: -40, symbols: ['铃', 'BAR', '星'] },
    { delta: -20, symbols: ['7', '星', 'BAR'] }
  ];
  const NFC_GAMES = [
    { id: 'lucky-star', name: '幸运星老虎机', tag: '指定试玩', icon: 'slot' },
    { id: 'golden-spin', name: '黄金旋转', tag: '指定试玩', icon: 'crown' },
    { id: 'classic-fruit', name: '经典水果机', tag: '指定试玩', icon: 'gift' }
  ];
  function nfcOf() {
    return demoOf().freeChallenge;
  }
  function nfcIndex(c) {
    if (!c.claimed) return 0;
    if (c.redeemed) return 4;
    if (c.reachedTarget) {
      const screen = currentRoute().get('demo');
      if (screen === 'nfc-redeem-success') return 4;
      if (screen === 'nfc-redeem' || screen === 'nfc-redeem-process') return 3;
      return 2;
    }
    return 1;
  }
  function nfcCta(c) {
    if (c.redeemed) return ['已领取', 'demo-done', true];
    if (!c.claimed) return ['领取RM100试玩额度', 'nfc-go-claim', false];
    if (c.trialEnded) return ['未达RM200，不可兑换', 'demo-done', true];
    if (c.reachedTarget) return ['兑换RM100现金', 'nfc-go-redeem', false];
    return ['去试玩', 'nfc-go-play', false];
  }
  function nfcStatus(c) {
    if (c.redeemed) return ['已领取 · 终身限领一次', 'muted'];
    if (c.trialEnded) return ['未达标 · 不可兑换', 'muted'];
    if (c.reachedTarget) return ['已达标 · 可兑换', ''];
    if (c.claimed) return ['已领取 · 试玩中', ''];
    return ['已认证 · 待领取', ''];
  }
  function nfcBalancePanel(c) {
    if (!c.claimed) return '';
    return `<div class="wallet-pair" id="nfc-balance">
      <div class="wallet-card trial"><span>试玩钱包</span><strong>RM ${money(c.trialBalance)}</strong><small>${c.redeemed ? '已清零' : c.trialEnded ? '试玩已结束' : '不可充值、转账或提款'}</small></div>
      <div class="wallet-card main ${demoOf().mainWallet > 0 ? 'highlight' : ''}"><span>主钱包</span><strong>RM ${money(demoOf().mainWallet)}</strong><small>${c.redeemed ? 'RM100 现金已到账' : '兑换现金将进入此钱包'}</small></div>
    </div>
    <div class="trial-balance">${c.claimed && !c.redeemed && !c.trialEnded ? `<div class="bar-label"><span>试玩余额</span><span>RM ${money(c.trialBalance)} / RM 200.00</span></div><progress max="200" value="${Math.min(200, c.trialBalance)}" aria-label="试玩余额进度"></progress>` : ''}
    <p class="fine-print trial-prose">${c.redeemed ? '达标兑换后，试玩额度及剩余试玩余额自动清零。' : c.trialEnded ? '未达RM200目标，不可兑换部分奖励。' : '试玩余额达到RM200，即可兑换RM100现金奖励。未达RM200目标，不可兑换部分奖励。'}</p></div>`;
  }
  window.renderFreeChallengeDemo = function () {
    store().ensureBanner();
    const c = store().load().freeChallenge;
    const [status, statusCls] = nfcStatus(c);
    const viewMap = { 0: 1, 1: 2, 2: 3, 3: 3, 4: 3 };
    const auto = viewMap[nfcIndex(c)] ?? 1;
    const viewStep = inspect('newcomer-free-challenge', 3, auto);
    const s = CHALLENGE_SOURCE.steps[viewStep];
    const path = pathRow([['RM100', '免费试玩'], ['RM200', '达标余额'], ['RM100', '兑换现金']]);
    return `${store().journeyBar()}${nfcBalancePanel(c)}<section class="reward-feature trial-hero"><div class="panel-top"><span class="eyebrow">活动奖励</span><span class="status-badge ${statusCls}">${status}</span></div><div class="amount"><small>RM</small>100<span>.00</span></div><p class="trial-prose">${CHALLENGE_SOURCE.reward}</p>${path}</section><section class="section-panel"><div class="section-header"><h3>参与条件</h3></div>${checks(CHALLENGE_SOURCE.eligibility)}</section><section class="section-panel flow-panel"><div class="section-header"><h3>活动流程</h3><span>点击步骤查看要求</span></div>${stepper(CHALLENGE_SOURCE.steps, viewStep, 'newcomer-free-challenge')}<div class="step-explanation trial-prose"><div class="step-heading"><span class="step-kicker">0${viewStep + 1} / 04</span><h4>${s.heading}</h4></div><p>${s.text}</p></div></section><section class="section-panel"><div class="section-header"><h3>重要条款</h3></div>${termsList(CHALLENGE_SOURCE.terms)}</section><button type="button" class="outline-wide" data-tab="1">查看完整活动规则 ${icon('arrow')}</button>`;
  };
  function renderNfcClaim() {
    $('#app').innerHTML = page('领取试玩额度', `
      <section class="reward-feature trial-hero">
        <div class="panel-top"><span class="eyebrow">活动奖励</span><span class="status-badge">待领取</span></div>
        <div class="amount"><small>RM</small>100<span>.00</span></div>
        <p class="trial-prose">免费领取RM100试玩额度。</p>
      </section>
      <section class="section-panel">
        <div class="section-header"><h3>领取前请确认</h3></div>
        ${termsList([
          '试玩额度不可直接充值、转账或提款。',
          '每位符合资格的会员终身限领一次。',
          '试玩余额达到RM200，即可兑换RM100现金奖励。'
        ])}
      </section>
      <button type="button" class="primary" data-action="nfc-claim-confirm">确认领取</button>
    `, 'activity=newcomer-free-challenge');
    document.title = '领取试玩额度 · TPOWER';
  }
  function renderNfcGames() {
    const c = nfcOf();
    $('#app').innerHTML = page('指定游戏', `
      <div class="wallet-pair compact">
        <div class="wallet-card trial"><span>试玩钱包</span><strong>RM ${money(c.trialBalance)}</strong></div>
        <div class="wallet-card"><span>达标目标</span><strong>RM 200.00</strong></div>
      </div>
      <p class="demo-lead trial-prose">在指定游戏中进行试玩。试玩额度不可直接充值、转账或提款。</p>
      <div class="game-grid">${NFC_GAMES.map(g => `<button type="button" class="game-tile" data-action="nfc-open-game" data-nfc-game="${g.id}"><span class="game-icon">${icon(g.icon)}</span><strong>${g.name}</strong><small>${g.tag}</small></button>`).join('')}</div>
    `, 'activity=newcomer-free-challenge');
    document.title = '指定游戏 · TPOWER';
  }
  function renderNfcPlay() {
    const c = nfcOf();
    const game = NFC_GAMES.find(g => g.id === c.currentGame) || NFC_GAMES[0];
    const over = c.trialEnded;
    const ready = c.reachedTarget && !c.redeemed;
    const canSpin = c.claimed && !over && !ready && !c.redeemed;
    const symbols = (c.lastSymbols || ['7', '星', '铃']).map(s => `<span>${s}</span>`).join('');
    $('#app').innerHTML = page(game.name, `
      <div class="play-wallet">
        <div><span>试玩钱包</span><strong id="nfc-play-balance">RM ${money(c.trialBalance)}</strong></div>
        <div class="play-progress"><div class="bar-label"><span>达标进度</span><span>RM ${money(c.trialBalance)} / RM 200.00</span></div><progress max="200" value="${Math.min(200, c.trialBalance)}" aria-label="试玩余额进度"></progress></div>
      </div>
      <section class="slot-machine" aria-label="演示老虎机">
        <div class="slot-window" id="nfc-slot-window">${symbols}</div>
        <p class="slot-result" id="nfc-slot-result" aria-live="polite">${over ? '试玩已结束' : ready ? '已达到 RM200' : '按下开始，演示一局试玩'}</p>
        <button type="button" class="primary" id="nfc-spin-btn" data-action="nfc-spin" ${canSpin ? '' : 'disabled'}>${canSpin ? '开始旋转' : '暂停试玩'}</button>
      </section>
      ${ready ? '<button type="button" class="primary" data-action="nfc-go-redeem">兑换RM100现金</button>' : ''}
      ${over ? `<section class="section-panel"><h3>试玩已结束</h3><p class="trial-prose">未达RM200目标，不可兑换部分奖励。</p><p class="fine-print">试玩额度已用尽。每位符合资格的会员终身限领一次，演示中可重置后重新体验。</p><button type="button" class="outline-wide" data-action="demo-reset">重置演示</button></section>` : ''}
      ${canSpin ? '<button type="button" class="text-button trial-reset" data-action="nfc-fail-path">演示未达标（余额归零）</button>' : ''}
    `, 'demo=nfc-games');
    document.title = game.name + ' · TPOWER';
  }
  function renderNfcRedeem() {
    const c = nfcOf();
    const demo = demoOf();
    $('#app').innerHTML = page('兑换现金', `
      <section class="reward-feature trial-hero">
        <div class="panel-top"><span class="eyebrow">可兑换现金</span><span class="status-badge">已达标</span></div>
        <div class="amount"><small>RM</small>100<span>.00</span></div>
        <p class="trial-prose">试玩余额达到RM200，即可兑换RM100现金奖励。</p>
      </section>
      <section class="section-panel">
        <div class="section-header"><h3>兑换说明</h3></div>
        ${termsList([
          '达标兑换后，试玩额度及剩余试玩余额自动清零。',
          '兑换的 RM100 现金将转入主钱包。',
          '每位符合资格的会员终身限领一次。'
        ])}
        <div class="wallet-pair">
          <div class="wallet-card trial"><span>试玩钱包（兑换后清零）</span><strong>RM ${money(c.trialBalance)}</strong></div>
          <div class="wallet-card main"><span>主钱包（到账后）</span><strong>RM ${money(demo.mainWallet + 100)}</strong></div>
        </div>
      </section>
      <button type="button" class="primary" data-action="nfc-redeem-confirm">确认兑换</button>
    `, 'activity=newcomer-free-challenge');
    document.title = '兑换现金 · TPOWER';
  }
  function renderNfcRedeemProcess() {
    $('#app').innerHTML = page('兑换中', `
      <section class="demo-status-card">
        <div class="demo-spinner" aria-hidden="true"></div>
        <h3>正在兑换</h3>
        <p>正在将 RM100 现金转入主钱包。</p>
      </section>
    `, 'activity=newcomer-free-challenge');
    document.title = '兑换中 · TPOWER';
    store().later(() => {
      const demo = store().load();
      const c = demo.freeChallenge;
      if (!c.reachedTarget || c.redeemed) return;
      c.redeemed = true;
      c.trialBalance = 0;
      demo.mainWallet = r2((demo.mainWallet || 0) + 100);
      record('新人免费挑战赢取RM100', 100, '已到账');
      store().save();
      navigate('demo=nfc-redeem-success');
    }, 1400);
  }
  function renderNfcRedeemSuccess() {
    const demo = demoOf();
    $('#app').innerHTML = page('兑换成功', `
      <section class="demo-status-card success">
        <div class="demo-success-mark" aria-hidden="true">${icon('cash')}</div>
        <h3>兑换成功</h3>
        <p class="trial-prose">达标兑换后，试玩额度及剩余试玩余额自动清零。</p>
        <div class="wallet-pair">
          <div class="wallet-card main highlight"><span>主钱包</span><strong>RM ${money(demo.mainWallet)}</strong><small>RM100 现金已到账</small></div>
          <div class="wallet-card trial"><span>试玩钱包</span><strong>RM 0.00</strong><small>已清零</small></div>
        </div>
        <button type="button" class="primary" data-demo-nav="demo=records">查看领奖记录</button>
        <button type="button" class="outline-wide" data-demo-nav="activity=newcomer-free-challenge">返回活动</button>
      </section>
    `, 'activity=newcomer-free-challenge');
    document.title = '兑换成功 · TPOWER';
  }
  function runNfcSpin(forceLose) {
    const demo = store().load();
    const c = demo.freeChallenge;
    if (c.spinning || !c.claimed || c.trialEnded || c.reachedTarget || c.redeemed) return;
    const path = forceLose || c.playMode === 'lose' ? NFC_LOSE : NFC_WIN;
    if (forceLose) { c.playMode = 'lose'; c.spinIndex = 0; }
    const step = path[Math.min(c.spinIndex, path.length - 1)];
    c.spinning = true;
    const btn = document.getElementById('nfc-spin-btn');
    const windowEl = document.getElementById('nfc-slot-window');
    const resultEl = document.getElementById('nfc-slot-result');
    if (btn) { btn.disabled = true; btn.textContent = '旋转中…'; }
    if (windowEl) windowEl.classList.add('is-spinning');
    if (resultEl) resultEl.textContent = '旋转中…';
    store().later(() => {
      const demo = store().load();
      const c = demo.freeChallenge;
      c.spinIndex += 1;
      c.lastSymbols = step.symbols;
      c.spinning = false;
      if (forceLose) {
        c.trialBalance = 0;
        c.trialEnded = true;
      } else {
        c.trialBalance = Math.max(0, Math.min(200, c.trialBalance + step.delta));
        if (c.trialBalance >= 200) { c.trialBalance = 200; c.reachedTarget = true; }
        if (c.trialBalance <= 0) { c.trialBalance = 0; c.trialEnded = true; }
      }
      store().save();
      renderNfcPlay();
      if (c.reachedTarget) {
        toast('试玩余额已达到 RM200');
        store().later(() => openModal(`<div class="goal-celebration"><div class="goal-burst" aria-hidden="true"></div><h2>恭喜达标</h2><p class="trial-prose">试玩余额达到RM200，即可兑换RM100现金奖励。</p><button type="button" class="primary" data-action="nfc-go-redeem">兑换RM100现金</button></div>`), 400);
      } else if (c.trialEnded) {
        toast('未达RM200目标，不可兑换部分奖励。');
      }
    }, 900);
  }


  /* ------------ 每日幸运大转盘RM888 ------------ */
  const DW_JOURNEY = ['获得次数', '抽奖', '彩金钱包', '完成流水', '转现金'];
  const DW_DEMO_PRIZES = [188, 58, 18];
  const DW_SPIN_MS = 2600;
  function dwOf() {
    return demoOf().dailyWheel;
  }
  function dwSpinsLeft(w) {
    return Math.max(0, (w.earnedToday || 0) - (w.usedToday || 0));
  }
  function dwIndex(w) {
    if ((w.converted || 0) > 0 && (w.bonusWallet || 0) <= 0 && dwSpinsLeft(w) <= 0) return 4;
    if ((w.bonusWallet || 0) > 0 && (w.turnover || 0) >= (w.turnoverNeed || 0) && w.turnoverNeed > 0) return 4;
    if ((w.bonusWallet || 0) > 0 && (w.turnover || 0) > 0) return 3;
    if ((w.bonusWallet || 0) > 0) return 2;
    if ((w.usedToday || 0) > 0) return 1;
    if ((w.earnedToday || 0) > 0) return 1;
    return 0;
  }
  function dwCta(w) {
    if (w.spinning) return ['转盘转动中', 'demo-done', true];
    if ((w.bonusWallet || 0) > 0 && w.turnoverNeed > 0 && (w.turnover || 0) >= w.turnoverNeed) return ['转换为现金', 'dw-go-convert', false];
    if ((w.bonusWallet || 0) > 0 && (w.turnover || 0) < w.turnoverNeed) return ['去完成有效流水', 'dw-go-turnover', false];
    if (dwSpinsLeft(w) > 0) return ['去抽奖', 'dw-go-spin', false];
    if ((w.earnedToday || 0) >= 3) return ['今日次数已达上限', 'demo-done', true];
    return ['去充值获得抽奖次数', 'dw-focus-deposit', false];
  }
  function dwStatus(w) {
    if ((w.bonusWallet || 0) > 0 && w.turnoverNeed > 0 && (w.turnover || 0) >= w.turnoverNeed) return ['可转换为现金', ''];
    if ((w.bonusWallet || 0) > 0) return ['彩金待完成流水', ''];
    if (dwSpinsLeft(w) > 0) return ['可抽奖 · 剩余 ' + dwSpinsLeft(w) + ' 次', ''];
    if ((w.earnedToday || 0) >= 3) return ['今日次数已用完', 'muted'];
    if ((w.converted || 0) > 0) return ['已有奖金到账', 'muted'];
    return ['已认证 · 待充值', ''];
  }
  function dwPrizeTable() {
    return `<div class="table-wrap"><table class="prize-table"><thead><tr><th>转盘奖金</th><th>3倍流水要求</th></tr></thead><tbody>${WHEEL_SOURCE.prizes.map(n => `<tr${n === 888 ? ' class="first-prize"' : ''}><td>RM ${money(n)}</td><td>RM ${money(n * WHEEL_SOURCE.wagerMult)}</td></tr>`).join('')}</tbody></table></div>`;
  }
  function dwWheelMarkup(w, rotating) {
    const prizes = WHEEL_SOURCE.prizes;
    const angle = w.lastAngle || 0;
    const labels = prizes.map((n, i) => `<div class="wheel-label" style="--i:${i};--spin:${angle}deg"><b>RM${n}</b></div>`).join('');
    return `<div class="wheel-stage"><div class="wheel-pointer" aria-hidden="true"></div><div class="lucky-wheel${rotating ? ' is-spinning' : ''}" id="lucky-wheel" style="transform:rotate(${angle}deg)">${labels}</div></div>`;
  }
  window.renderDailyWheelDemo = function () {
    store().ensureBanner();
    const demo = store().load();
    const w = demo.dailyWheel;
    const [status, statusCls] = dwStatus(w);
    const viewStep = inspect('daily-wheel', 3, Math.min(3, dwIndex(w)));
    const s = WHEEL_SOURCE.steps[viewStep];
    const left = dwSpinsLeft(w);
    const pending = Math.max(0, (w.turnoverNeed || 0) - (w.turnover || 0));
    return `${store().journeyBar()}<section class="reward-feature trial-hero wheel-hero"><div class="panel-top"><span class="eyebrow">活动奖励</span><span class="status-badge ${statusCls}">${status}</span></div><div class="amount"><small>最高 RM</small>888</div><p class="trial-prose">${WHEEL_SOURCE.reward}</p>${statRow([['今日已获次数', String(w.earnedToday || 0) + ' / 3'], ['剩余抽奖', String(left)], ['活动彩金', money(w.bonusWallet || 0)]])}<span class="unit-note">金额单位：MYR</span></section>
      <section class="section-panel"><div class="section-header"><h3>参与条件</h3></div>${checks(WHEEL_SOURCE.eligibility)}<p class="fine-print trial-prose">仅计算真实且成功入账的充值。取消、退款或异常充值不产生抽奖机会。每笔符合条件的充值最多产生1次抽奖。</p></section>
      <section class="section-panel" id="dw-deposit"><div class="section-header"><h3>演示充值</h3><span>第 ${w.day || 1} 个演示日</span></div>
        <p class="trial-prose">每成功充值一笔超过RM100，即可获得1次免费抽奖机会。充值不可合并计算抽奖次数。</p>
        <div class="rate-actions">
          <button type="button" class="outline-wide" data-action="dw-deposit-ok">演示充值 RM150（超过RM100，获得1次）</button>
          <button type="button" class="outline-wide" data-action="dw-deposit-100">演示充值 RM100（未超过RM100，不获得次数）</button>
          <button type="button" class="outline-wide" data-action="dw-deposit-50">演示充值 RM50（未超过RM100，不获得次数）</button>
          <button type="button" class="outline-wide" data-action="dw-deposit-merge">演示两笔各 RM80（不可合并，不获得次数）</button>
          <button type="button" class="outline-wide" data-action="dw-deposit-void">演示取消或退款充值 RM200（不产生抽奖机会）</button>
        </div>
        <p class="fine-print trial-prose">每日抽奖次数于00:00重置。</p>
        <button type="button" class="text-button" data-action="dw-next-day">模拟次日（演示用）</button>
      </section>
      <section class="section-panel"><div class="section-header"><h3>转盘奖金</h3><span>共6档 · 每次必中一档</span></div>${dwPrizeTable()}<p class="fine-print trial-prose">每次抽奖必定获得以上其中一档奖金。抽中的奖金进入活动彩金钱包。</p></section>
      ${(w.bonusWallet || 0) > 0 || (w.converted || 0) > 0 ? `<section class="section-panel"><div class="section-header"><h3>活动彩金钱包</h3></div>${statRow([['彩金余额', money(w.bonusWallet || 0)], ['已完成流水', money(w.turnover || 0)], ['仍需流水', money(pending)]])}<p class="fine-print trial-prose">彩金必须完成3倍有效流水后才可转换为现金。流水仅限指定游戏商：FUMA、WUDI、BWG。</p></section>` : ''}
      <section class="section-panel flow-panel"><div class="section-header"><h3>活动流程</h3><span>点击步骤查看要求</span></div>${stepper(WHEEL_SOURCE.steps, viewStep, 'daily-wheel')}<div class="step-explanation trial-prose"><div class="step-heading"><span class="step-kicker">0${viewStep + 1} / 04</span><h4>${s.heading}</h4></div><p>${s.text}</p></div></section>
      <section class="section-panel"><div class="section-header"><h3>奖励规则</h3></div>${termsList(WHEEL_SOURCE.terms)}</section>
      <button type="button" class="outline-wide" data-tab="1">查看完整活动规则 ${icon('arrow')}</button>`;
  };
  function dwTargetAngle(prizeIndex, fromAngle) {
    const center = prizeIndex * 60 + 30;
    const base = (360 - center) % 360;
    const current = ((fromAngle || 0) % 360 + 360) % 360;
    let extra = base - current;
    if (extra <= 0) extra += 360;
    return (fromAngle || 0) + 360 * 5 + extra;
  }
  function renderDwSpin() {
    const w = dwOf();
    const left = dwSpinsLeft(w);
    const rotating = !!w.spinning;
    $('#app').innerHTML = page('幸运大转盘', `
      ${dwWheelMarkup(w, rotating)}
      <div class="play-wallet">
        <div><span>剩余抽奖</span><strong>${left} / 3</strong></div>
        <div><span>活动彩金钱包</span><strong>RM ${money(w.bonusWallet || 0)}</strong></div>
      </div>
      ${w.lastPrize ? `<p class="fine-print center trial-prose">演示结果：RM ${money(w.lastPrize)}，非正式开奖，仅用于预览兑奖流程。</p>` : '<p class="fine-print center trial-prose">每次抽奖必定获得其中一档奖金。以下为演示结果，非正式开奖。</p>'}
      <button type="button" class="primary" id="dw-spin-btn" data-action="dw-spin" ${rotating || left <= 0 ? 'disabled' : ''}>${rotating ? '转盘转动中…' : left > 0 ? '开始抽奖' : '暂无抽奖次数'}</button>
      ${left <= 0 ? '<button type="button" class="outline-wide" data-demo-nav="activity=daily-wheel">返回活动充值</button>' : ''}
      ${(w.bonusWallet || 0) > 0 && !rotating ? '<button type="button" class="outline-wide" data-action="dw-go-turnover">查看彩金流水</button>' : ''}
    `, 'activity=daily-wheel');
    document.title = '幸运大转盘 · TPOWER';
  }
  function renderDwTurnover() {
    const w = dwOf();
    const need = w.turnoverNeed || 0;
    const done = w.turnover || 0;
    const ready = need > 0 && done >= need && (w.bonusWallet || 0) > 0;
    const pending = Math.max(0, need - done);
    $('#app').innerHTML = page('完成有效流水', `
      <div class="play-wallet">
        <div><span>活动彩金钱包</span><strong>RM ${money(w.bonusWallet || 0)}</strong></div>
        <div class="play-progress"><div class="bar-label"><span>3倍有效流水</span><span>RM ${money(done)} / ${money(need)}</span></div><progress max="${Math.max(need, 1)}" value="${Math.min(need, done)}" aria-label="流水进度"></progress></div>
      </div>
      <p class="trial-prose">彩金必须完成3倍有效流水后才可转换为现金。例如：抽中RM188，需要完成RM564有效流水。流水仅限指定游戏商：FUMA、WUDI、BWG。</p>
      <div class="rate-actions">${WHEEL_SOURCE.providers.map(name => `<button type="button" class="outline-wide" data-action="dw-bet-valid" data-provider="${name}" ${ready || (w.bonusWallet || 0) <= 0 ? 'disabled' : ''}>演示${name}投注 RM 188.00（计入流水）</button>`).join('')}
        <button type="button" class="outline-wide" data-action="dw-bet-other" ${ready || (w.bonusWallet || 0) <= 0 ? 'disabled' : ''}>演示其他游戏商投注 RM 188.00（不计入）</button>
      </div>
      <button type="button" class="primary" data-action="dw-accelerate" ${ready || (w.bonusWallet || 0) <= 0 || pending <= 0 ? 'disabled' : ''}>演示加速完成流水</button>
      <p class="fine-print trial-prose">「演示加速完成流水」仅用于预览转换流程，不是官方投注要求。</p>
      ${ready ? '<button type="button" class="primary" data-action="dw-go-convert">转换为现金</button>' : ''}
      ${pending > 0 && (w.bonusWallet || 0) > 0 ? `<p class="fine-print trial-prose">还需完成 RM ${money(pending)} 有效流水。</p>` : ''}
    `, 'activity=daily-wheel');
    document.title = '完成有效流水 · TPOWER';
  }
  function renderDwConvert() {
    const w = dwOf();
    const amt = w.bonusWallet || 0;
    $('#app').innerHTML = page('转换为现金', `
      <section class="reward-feature trial-hero">
        <div class="panel-top"><span class="eyebrow">活动彩金钱包</span><span class="status-badge">流水已完成</span></div>
        <div class="amount"><small>RM</small>${money(amt).split('.')[0]}<span>.${money(amt).split('.')[1] || '00'}</span></div>
        <p class="trial-prose">彩金已完成3倍有效流水，可转换为现金并转入现金钱包。</p>
      </section>
      <button type="button" class="primary" data-action="dw-convert-confirm" ${amt > 0 ? '' : 'disabled'}>确认转换为现金</button>
    `, 'activity=daily-wheel');
    document.title = '转换为现金 · TPOWER';
  }

  /* ------------ 新人专享挑战 ------------ */
  function ncCta(n) {
    if (n.abandoned) return ['已放弃，不能再次参加', 'demo-done', true];
    if (n.completed) return ['已完成', 'demo-done', true];
    if (n.expired) return ['解锁资格已失效', 'demo-done', true];
    if (!n.claimed) return ['领取RM88活动金', 'nc-go-claim', false];
    if (!n.challengeDone) return ['去完成流水', 'nc-go-play', false];
    if (!n.deposited) return ['去充值解锁', 'nc-go-unlock', false];
    if (!n.bonusReleased) return ['去完成12倍流水', 'nc-go-wager', false];
    if (!n.completed) return ['去完成本金流水', 'nc-go-principal', false];
    return ['已完成', 'demo-done', true];
  }
  function ncStatus(n) {
    if (n.abandoned) return ['已放弃', 'muted'];
    if (n.completed) return ['已完成', 'muted'];
    if (n.expired) return ['解锁资格已失效', 'muted'];
    if (n.bonusReleased) return ['本金流水进行中', ''];
    if (n.deposited) return ['已解锁 · 12倍流水', ''];
    if (n.challengeDone) return ['待充值解锁 · 48小时', ''];
    if (n.claimed) return ['已领取 · 流水中', ''];
    return ['已认证 · 待领取', ''];
  }
  function ncPanel(n) {
    if (!n.claimed) return '';
    if (!n.deposited) {
      return `<div class="wallet-pair" id="nc-balance">
        <div class="wallet-card trial"><span>活动余额</span><strong>RM ${money(n.bonus)}</strong><small>只能用于指定游戏</small></div>
        <div class="wallet-card"><span>有效流水</span><strong>RM ${money(n.turnover)} / 440.00</strong><small>${n.challengeDone ? '已完成 RM440' : 'RM88 × 5 = RM440'}</small></div>
      </div>
      ${n.challengeDone ? '' : `<div class="trial-balance"><div class="bar-label"><span>流水进度</span><span>RM ${money(n.turnover)} / RM 440.00</span></div><progress max="440" value="${Math.min(440, n.turnover)}" aria-label="有效流水进度"></progress></div>`}`;
    }
    return `<div class="wallet-pair" id="nc-balance">
      <div class="wallet-card"><span>钱包总额</span><strong>RM ${money(n.walletTotal)}</strong><small>剩余余额 + 本次充值 + 解锁彩金</small></div>
      <div class="wallet-card main ${demoOf().mainWallet > 0 ? 'highlight' : ''}"><span>主钱包</span><strong>RM ${money(demoOf().mainWallet)}</strong><small>${n.bonusReleased ? '解锁彩金已发放' : '彩金完成后发放'}</small></div>
    </div>
    <div class="trial-balance">${n.bonusReleased
      ? (n.completed ? '<p class="fine-print trial-prose">充值彩金完成12倍流水后，发放至真钱钱包。本金再完成1倍流水后，按 Tpower 提款规则申请提款。</p>' : `<div class="bar-label"><span>本金1倍流水</span><span>RM ${money(n.principalWager)} / RM ${money(n.principalNeed)}</span></div><progress max="${n.principalNeed || 1}" value="${Math.min(n.principalNeed, n.principalWager)}" aria-label="本金流水进度"></progress>`)
      : `<div class="bar-label"><span>12倍有效流水</span><span>RM ${money(n.wager12)} / RM ${money(n.wager12Need)}</span></div><progress max="${n.wager12Need || 1}" value="${Math.min(n.wager12Need, n.wager12)}" aria-label="12倍流水进度"></progress>`}</div>`;
  }
  window.renderNewcomerDemo = function () {
    store().ensureBanner();
    const demo = store().load();
    const n = demo.newcomer;
    const [status, cls] = ncStatus(n);
    const auto = Math.min(4, ncIndex(n) === 4 ? 4 : ncIndex(n));
    const viewStep = inspect('newcomer', 4, Math.min(4, auto));
    const s = NEWCOMER_SOURCE.steps[viewStep];
    return `${store().journeyBar()}${ncPanel(n)}<section class="reward-feature trial-hero"><div class="panel-top"><span class="eyebrow">活动奖励</span><span class="status-badge ${cls}">${status}</span></div><div class="amount"><small>RM</small>88<span>.00</span></div><p class="trial-prose">${NEWCOMER_SOURCE.reward}</p><p class="trial-prose">${NEWCOMER_SOURCE.summary}</p>${pathRow([['RM88', '活动金'], ['RM440', '有效流水'], ['RM1,888', '解锁上限']])}</section><section class="section-panel"><div class="section-header"><h3>参与条件</h3></div>${checks(NEWCOMER_SOURCE.eligibility)}</section><section class="section-panel flow-panel"><div class="section-header"><h3>活动流程</h3><span>点击步骤查看要求</span></div>${stepper(NEWCOMER_SOURCE.steps, viewStep, 'newcomer')}<div class="step-explanation trial-prose"><div class="step-heading"><span class="step-kicker">0${viewStep + 1} / 0${NEWCOMER_SOURCE.steps.length}</span><h4>${s.heading}</h4></div><p>${s.text}</p></div></section><section class="section-panel"><div class="section-header"><h3>充值解锁示例</h3><span>1:1 · 最高 RM1,888</span></div><div class="table-wrap"><table><thead><tr><th>活动余额</th><th>充值金额</th><th>可解锁彩金</th></tr></thead><tbody><tr><td>RM500</td><td>RM500</td><td>RM500</td></tr><tr><td>RM1,000</td><td>RM600</td><td>RM600</td></tr><tr><td>RM2,000</td><td>RM2,000</td><td>RM1,888</td></tr></tbody></table></div><p class="fine-print trial-prose">最低充值 RM10；只有一次充值解锁机会。该次充值同时激活成长彩金计划。</p></section><section class="section-panel"><div class="section-header"><h3>重要条款</h3></div>${termsList(NEWCOMER_SOURCE.terms)}</section><button type="button" class="outline-wide" data-tab="1">查看完整活动规则 ${icon('arrow')}</button>`;
  };
  function renderNcClaim() {
    const n = demoOf().newcomer;
    $('#app').innerHTML = page('领取活动金', `
      <section class="reward-feature trial-hero">
        <div class="panel-top"><span class="eyebrow">新人活动金</span><span class="status-badge">待领取</span></div>
        <div class="amount"><small>RM</small>88<span>.00</span></div>
        <p class="trial-prose">完成 KYC 实名认证后，可领取 RM88 活动金；活动金只能用于指定游戏。</p>
      </section>
      <section class="section-panel"><div class="section-header"><h3>领取前请确认</h3></div>
        <ul class="trial-terms trial-prose">
          <li>每位新会员只能参加一次。</li>
          <li>活动期间不能提款、不能转账。</li>
          <li>只计算指定游戏商的有效投注。RM88 × 5 = RM440，完成后进入充值解锁阶段。</li>
        </ul>
      </section>
      <button type="button" class="primary" data-action="nc-claim-confirm">确认领取</button>
    `, 'activity=newcomer');
    document.title = '领取活动金 · TPOWER';
  }
  function renderNcPlay() {
    const n = demoOf().newcomer;
    const game = GAMES.find(g => g.id === n.currentGame) || GAMES[0];
    const canSpin = n.claimed && !n.challengeDone && !n.abandoned && n.bonus > 0;
    const symbols = (n.lastSymbols || ['7', '星', '铃']).map(s => `<span>${s}</span>`).join('');
    $('#app').innerHTML = page(game.name, `
      <div class="play-wallet">
        <div><span>活动余额</span><strong id="play-balance">RM ${money(n.bonus)}</strong></div>
        <div class="play-progress"><div class="bar-label"><span>有效流水</span><span>RM ${money(n.turnover)} / RM 440.00</span></div><progress max="440" value="${Math.min(440, n.turnover)}" aria-label="有效流水进度"></progress></div>
      </div>
      <p class="fine-print trial-prose">只计算指定游戏商的有效投注。本活动只能在指定的真人现场游戏和老虎机中进行。截图未列出具体游戏商名单。</p>
      <section class="slot-machine" aria-label="演示老虎机">
        <div class="slot-window" id="slot-window">${symbols}</div>
        <p class="slot-result" id="slot-result" aria-live="polite">${n.challengeDone ? '已完成 RM440 有效流水' : '按下开始，演示一局投注'}</p>
        <button type="button" class="primary" id="spin-btn" data-action="nc-spin" ${canSpin ? '' : 'disabled'}>${canSpin ? '开始旋转' : '暂停投注'}</button>
      </section>
      ${n.challengeDone ? '<button type="button" class="primary" data-action="nc-go-unlock">去充值解锁</button>' : ''}
      ${n.claimed && !n.challengeDone && !n.abandoned ? '<button type="button" class="text-button trial-reset" data-action="nc-abandon">放弃活动</button>' : ''}
    `, 'activity=newcomer');
    document.title = game.name + ' · TPOWER';
  }
  function renderNcUnlock() {
    const n = demoOf().newcomer;
    const remaining = n.remaining || n.bonus;
    const suggested = Math.max(10, remaining);
    $('#app').innerHTML = page('充值解锁', `
      <section class="reward-feature trial-hero">
        <div class="panel-top"><span class="eyebrow">可解锁彩金</span><span class="status-badge">待充值 · 48小时</span></div>
        <div class="amount"><small>RM</small>${money(remaining).split('.')[0]}<span>.${money(remaining).split('.')[1]}</span></div>
        <p class="trial-prose">完成 RM440 流水后，以剩余余额作为可解锁彩金。充值对应金额，按1:1解锁，最高 RM1,888；最低充值 RM10，只有一次充值解锁机会。</p>
      </section>
      <section class="section-panel">
        <div class="section-header"><h3>确认充值金额</h3></div>
        <p class="trial-prose">活动剩余余额 RM ${money(remaining)}。演示按1:1充值对应金额，不连接真实支付。</p>
        <p class="fine-print trial-prose">此充值会同时激活成长彩金计划奖励。48小时内未充值，解锁资格自动失效。</p>
        <button type="button" class="primary" data-action="nc-unlock-confirm" data-deposit="${suggested}">确认充值 RM ${money(suggested)} 并解锁</button>
        <button type="button" class="outline-wide" data-action="nc-expire">演示48小时未充值</button>
      </section>
    `, 'activity=newcomer');
    document.title = '充值解锁 · TPOWER';
  }
  function renderNcWager() {
    const n = demoOf().newcomer;
    const done12 = n.bonusReleased;
    const need = done12 ? n.principalNeed : n.wager12Need;
    const have = done12 ? n.principalWager : n.wager12;
    $('#app').innerHTML = page(done12 ? '本金流水' : '12倍流水', `
      <div class="play-wallet">
        <div><span>钱包总额</span><strong>RM ${money(n.walletTotal)}</strong></div>
        <div class="play-progress"><div class="bar-label"><span>${done12 ? '本金1倍流水' : '12倍有效流水'}</span><span>RM ${money(have)} / RM ${money(need)}</span></div><progress max="${need || 1}" value="${Math.min(need, have)}" aria-label="流水进度"></progress></div>
      </div>
      <p class="trial-prose">${done12
        ? '充值彩金完成12倍流水后，发放至真钱钱包。本金再完成1倍流水后，按 Tpower 提款规则申请提款。'
        : '解锁充值彩金后，继续在指定游戏商投注。钱包总金额须完成12倍有效流水。'}</p>
      <p class="fine-print trial-prose">规则示例：钱包原余额 RM50 + RM100 充值彩金 = RM150；所需有效流水 RM150 × 12 = RM1,800。本次演示钱包总额为剩余余额 RM ${money(n.remaining)} + 本次充值 RM ${money(n.depositAmount)} + 解锁彩金 RM ${money(n.unlockedBonus)} = RM ${money(n.walletTotal)}。</p>
      <button type="button" class="primary" data-action="${done12 ? 'nc-principal-accelerate' : 'nc-wager-accelerate'}">演示加速完成流水</button>
    `, 'activity=newcomer');
    document.title = (done12 ? '本金流水' : '12倍流水') + ' · TPOWER';
  }
  function renderNcDone() {
    const demo = demoOf();
    const n = demo.newcomer;
    $('#app').innerHTML = page('挑战完成', `
      <section class="demo-status-card success">
        <div class="demo-success-mark" aria-hidden="true">${icon('cash')}</div>
        <h3>${n.expired ? '解锁资格已失效' : n.abandoned ? '已放弃活动' : '挑战完成'}</h3>
        <p class="trial-prose">${n.expired ? '48小时内未充值，解锁资格自动失效。' : n.abandoned ? '可主动放弃活动，但不能再次参加。' : '充值彩金完成12倍流水后，发放至真钱钱包。本金再完成1倍流水后，按 Tpower 提款规则申请提款。'}</p>
        <div class="wallet-pair"><div class="wallet-card main highlight"><span>主钱包</span><strong>RM ${money(demo.mainWallet)}</strong></div></div>
        <button type="button" class="primary" data-demo-nav="demo=records">查看领奖记录</button>
        <button type="button" class="outline-wide" data-demo-nav="activity=newcomer">返回活动</button>
      </section>
    `);
    document.title = '挑战完成 · TPOWER';
  }

  /* ------------ 邀请好友 ------------ */
  /* ------------ 邀请好友挑战 ------------ */
  function rfUnlockedTotal(r) {
    return r2((r.friends || []).reduce((s, f) => s + (f.disqualified ? 0 : (f.unlocked || 0)), 0));
  }
  function rfIndex(r) {
    if (rfUnlockedTotal(r) > 0) return 3;
    if ((r.friends || []).some(f => !f.disqualified && (f.kyc || f.registered))) return 2;
    if ((r.friends || []).length) return 1;
    return 0;
  }
  function friendCard(f, i) {
    const cap = REFERRAL_SOURCE.cap;
    const pct = Math.min(100, (f.unlocked / cap) * 100);
    if (f.disqualified) {
      return `<article class="friend-card is-void"><div class="section-header"><h3>${f.name}</h3><span class="status-badge muted">已取消资格</span></div><p class="trial-prose">${f.reason}</p><p class="fine-print">已解锁 RM 0.00</p></article>`;
    }
    const kyc = f.kyc ? '已完成 · +RM2.00' : '未完成';
    const dep = f.deposited ? '已完成 · +RM3.00' : (f.kyc ? '待完成' : '需先完成实名认证');
    const bet = `已累计 ${f.betUnits || 0} 次 × RM1,000 · +RM ${money((f.betUnits || 0) * 0.5)}`;
    return `<article class="friend-card ${f.kyc ? '' : 'is-pending'}" data-friend="${i}">
      <div class="section-header"><h3>${f.name}</h3><span class="status-badge">${f.kyc ? '合格好友' : '仅注册未认证'}</span></div>
      <p class="fine-print">${f.account}</p>
      <ul class="task-list trial-prose">
        <li><span>完成实名认证（KYC）</span><strong>${kyc}</strong></li>
        <li><span>累计成功充值RM100</span><strong>${dep}</strong></li>
        <li><span>每累计有效投注RM1,000</span><strong>${bet}</strong></li>
      </ul>
      <div class="bar-label"><span>本好友已解锁</span><span>RM ${money(f.unlocked)} / RM ${money(cap)}</span></div>
      <progress max="${cap}" value="${Math.min(cap, f.unlocked)}" aria-label="好友奖励上限"></progress>
      ${f.kyc ? `<div class="friend-actions">
        ${f.deposited ? '' : `<button type="button" class="outline-wide" data-action="ref-friend-deposit" data-friend="${i}">演示好友累计充值 RM100</button>`}
        <button type="button" class="outline-wide" data-action="ref-friend-bet" data-friend="${i}">演示好友有效投注 RM1,000（+RM0.50）</button>
        <button type="button" class="text-button" data-action="ref-friend-cap" data-friend="${i}">演示累计投注至本好友上限</button>
      </div>` : '<p class="fine-print trial-prose">未完成实名认证，邀请奖励为 RM0.00。</p>'}
    </article>`;
  }
  function rfCta(r) {
    if ((r.friends || []).length) return ['继续邀请好友', 'ref-go-invite', false];
    return ['分享邀请码', 'ref-go-invite', false];
  }
  window.renderReferralDemo = function () {
    store().ensureBanner();
    const demo = store().load();
    const r = demo.referral;
    const total = rfUnlockedTotal(r);
    r.unlocked = total;
    const viewStep = inspect('referral', 3, Math.min(3, rfIndex(r)));
    const s = REFERRAL_SOURCE.steps[viewStep];
    const cards = r.friends.length ? r.friends.map(friendCard).join('') : `<div class="compact-empty">${icon('friends')}<h4>暂无邀请好友</h4><p>好友任务进度将显示在这里</p></div>`;
    return `${store().journeyBar()}<section class="reward-feature trial-hero"><div class="panel-top"><span class="eyebrow">每成功邀请一名好友</span><span class="status-badge">${total > 0 ? '已自动解锁' : r.friends.length ? '进行中' : '未参加'}</span></div><div class="amount"><small>最高累计 RM</small>1,000</div><p class="trial-prose">${REFERRAL_SOURCE.reward}</p></section><section class="section-panel"><div class="section-header"><h3>参与方式</h3></div>${checks(REFERRAL_SOURCE.eligibility)}</section><section class="section-panel"><div class="section-header"><h3>好友任务与奖励</h3></div><div class="table-wrap"><table><thead><tr><th>好友完成条件</th><th>邀请人获得</th></tr></thead><tbody><tr><td>完成实名认证（KYC）</td><td>RM2</td></tr><tr><td>累计成功充值RM100</td><td>RM3</td></tr><tr><td>每累计有效投注RM1,000</td><td>RM0.50</td></tr></tbody></table></div></section><section class="section-panel"><div class="section-header"><h3>已解锁奖励</h3><span>自动到账</span></div>${statRow([['已邀请好友', r.friends.length + '<span> 位</span>'], ['已自动解锁', money(total)], ['主钱包', money(demo.mainWallet)]], 'four-stats')}<span class="unit-note">金额单位：MYR · 系统自动解锁对应邀请奖励</span></section><section class="section-panel flow-panel"><div class="section-header"><h3>活动流程</h3><span>点击步骤查看要求</span></div>${stepper(REFERRAL_SOURCE.steps, viewStep, 'referral')}<div class="step-explanation trial-prose"><div class="step-heading"><span class="step-kicker">0${viewStep + 1} / 04</span><h4>${s.heading}</h4></div><p>${s.text}</p></div></section><section class="section-panel"><div class="section-header"><h3>好友奖励进度</h3><span>${r.friends.length} 位好友</span></div>${cards}</section><section class="section-panel"><div class="section-header"><h3>重要条款</h3></div>${termsList(REFERRAL_SOURCE.terms)}</section><button type="button" class="outline-wide" data-tab="1">查看活动说明 ${icon('arrow')}</button>`;
  };
  function renderRefInvite() {
    const r = demoOf().referral;
    $('#app').innerHTML = page('分享邀请', `
      <p class="demo-lead trial-prose">分享专属邀请链接或邀请码。好友成功注册并完成指定任务后，系统自动解锁对应邀请奖励。预览不向外发送邀请。</p>
      <section class="section-panel invite-code-card">
        <div class="section-header"><h3>演示邀请码</h3></div>
        <p class="invite-code" id="invite-code">${r.code}</p>
        <p class="fine-print" id="invite-link">${r.link}</p>
        <button type="button" class="outline-wide" data-action="ref-copy">复制邀请码</button>
      </section>
      <button type="button" class="primary" data-action="ref-friend-kyc">演示好友注册并完成实名认证</button>
      <button type="button" class="outline-wide" data-action="ref-friend-nokyc">演示好友仅注册、未完成KYC</button>
      <button type="button" class="text-button trial-reset" data-action="ref-friend-self">演示自行邀请自己的其他账号</button>
      <button type="button" class="text-button trial-reset" data-action="ref-friend-dup">演示相同实名身份重复邀请</button>
    `, 'activity=referral');
    document.title = '分享邀请 · TPOWER';
  }

  /* ------------ 成长彩金200%扶持计划 ------------ */
  function grClaimable(g, i) {
    if (!g.started || (g.expired && g.expired[i])) return 0;
    return r2(Math.max(0, (g.unlocked[i] || 0) - (g.claimed[i] || 0)));
  }
  function grIndex(g) {
    if (!g.started) return 0;
    if (GROWTH_SOURCE.caps.every((c, i) => (g.claimed[i] || 0) >= c)) return 4;
    if (g.expired && g.expired[g.tier]) return 3;
    if (g.tier > 0) return 3;
    if (grClaimable(g, g.tier) > 0) return 2;
    if (g.unlocked.some(v => v > 0)) return 1;
    return 1;
  }
  function ringStyle(pct) {
    const p = Math.max(0, Math.min(100, Number(pct) || 0));
    return `background:conic-gradient(#f02d43 0 ${p}%,#3c2732 ${p}% 100%)`;
  }
  function growthRateOf(game) {
    return (GROWTH_SOURCE.rates || []).find(r => r.key === game || (r.aliases || []).includes(game));
  }
  function growthLevelStatus(g, i) {
    if (!g.started) return i === 0 ? '待首次充值启动' : '可提前点亮，不可累计';
    if (g.expired && g.expired[i]) return '已失效，不能恢复';
    if ((g.claimed[i] || 0) >= GROWTH_SOURCE.caps[i]) return '已完成';
    if (i === g.tier) return i === 0 ? '进行中' : `进行中 · 剩余 ${g.daysLeft[i] == null ? 10 : g.daysLeft[i]} 天`;
    if (i > g.tier) return '已达标·待激活';
    return '已结束';
  }
  function grCta(g) {
    if (!g.started) return ['演示首次充值 MYR 2,944', 'gr-first-deposit', false];
    if (g.expired && g.expired[g.tier]) return ['当期档位已失效', 'demo-done', true];
    if (GROWTH_SOURCE.caps.every((c, i) => (g.claimed[i] || 0) >= c)) return ['已完成全部档位', 'demo-done', true];
    if (grClaimable(g, g.tier) > 0) return ['立即领取', 'gr-go-claim', false];
    return ['去累计有效投注', 'gr-go-play', false];
  }
  function growthLevelBody(g, i) {
    const cap = GROWTH_SOURCE.caps[i];
    const expired = g.expired && g.expired[i];
    if (g.started && i > g.tier && !expired && (g.claimed[i] || 0) < cap) {
      return `<div class="waiting-box">${icon('shield')}<p>充值已达标，等待当前档位完成后自动激活</p></div>`;
    }
    if (expired) {
      return `<div class="waiting-box">${icon('shield')}<p>已失效档位不可重复领取或重新启动。</p></div>`;
    }
    return `<div class="bar-label"><span>已解锁 MYR ${money(g.unlocked[i] || 0)}</span><span>MYR ${money(cap)}</span></div><progress max="${cap}" value="${Math.min(cap, g.unlocked[i] || 0)}" aria-label="${GROWTH_SOURCE.titles[i]}解锁进度"></progress><p class="fine-print">已领取 MYR ${money(g.claimed[i] || 0)} · 可领取 MYR ${money(grClaimable(g, i))}${i > 0 && g.started && i === g.tier && !expired ? ' · 剩余 ' + (g.daysLeft[i] == null ? 10 : g.daysLeft[i]) + ' 天' : ''}</p>${i === g.tier && g.started && !expired && grClaimable(g, i) > 0 ? '<button type="button" class="primary" data-action="gr-go-claim">立即领取</button>' : ''}`;
  }
  window.renderGrowthDemo = function () {
    store().ensureBanner();
    const demo = store().load();
    const g = demo.growth;
    const cap = GROWTH_SOURCE.caps[g.started ? g.tier : 0] || GROWTH_SOURCE.caps[0];
    const title = GROWTH_SOURCE.titles[g.started ? g.tier : 0] || GROWTH_SOURCE.titles[0];
    const claimable = g.started ? grClaimable(g, g.tier) : 0;
    const unlocked = g.started ? (g.unlocked[g.tier] || 0) : 0;
    const claimed = g.started ? (g.claimed[g.tier] || 0) : 0;
    const pending = Math.max(0, cap - unlocked);
    const pct = cap ? Math.floor((unlocked / cap) * 100) : 0;
    const viewStep = inspect('growth', 3, Math.min(3, grIndex(g)));
    const s = GROWTH_SOURCE.steps[viewStep];
    const doneCount = (g.claimed || []).filter((v, i) => v >= GROWTH_SOURCE.caps[i]).length;
    const expiredNow = g.started && g.expired && g.expired[g.tier];
    const allDone = GROWTH_SOURCE.caps.every((c, i) => (g.claimed[i] || 0) >= c);
    const status = !g.started ? ['待首次充值', ''] : expiredNow ? ['已失效', 'muted'] : allDone ? ['已完成', 'muted'] : '进行中';
    const statusText = Array.isArray(status) ? status : [status, ''];
    const eyebrow = (g.started ? g.tier : 0) === 0
      ? '首充200% 最高MYR 5,888.00 (不限时)'
      : `${title} 最高MYR ${money(cap)}${expiredNow || allDone ? '' : ' · 剩余 ' + (g.daysLeft[g.tier] == null ? 10 : g.daysLeft[g.tier]) + ' 天'}`;
    const levels = GROWTH_SOURCE.titles.map((t, i) => {
      const capLabel = i === 0 ? '首充200% 最高MYR 5,888.00 (不限时)' : '最高MYR ' + money(GROWTH_SOURCE.caps[i]);
      const st = growthLevelStatus(g, i);
      const waitCls = g.started && i > g.tier && st === '已达标·待激活' ? ' waiting' : '';
      return `<details class="level-card" ${i === (g.started ? g.tier : 0) ? 'open' : ''}><summary><span class="level-icon">${icon('gift')}</span><span class="level-title"><b>${t}</b><small>${capLabel}</small></span><span class="level-status${waitCls} ${i === g.tier && g.started ? 'current' : ''}">${st}</span>${icon('arrow')}</summary><div class="level-content">${growthLevelBody(g, i)}</div></details>`;
    }).join('');
    const claimBtn = !expiredNow && !allDone
      ? `<button type="button" class="primary" data-action="gr-go-claim" ${claimable > 0 ? '' : 'disabled'}>立即领取</button>`
      : '';
    return `${store().journeyBar()}<section class="section-panel growth-overview"><div class="panel-top"><span class="eyebrow">${title}</span><span class="status-badge ${statusText[1]}">${statusText[0]}</span></div><p class="growth-hero-copy trial-prose">${eyebrow}</p><div class="growth-main"><div><div class="growth-amount"><small>MYR</small> ${money(cap).split('.')[0]}<span>.${money(cap).split('.')[1] || '00'}</span></div></div><div class="progress-ring" role="img" aria-label="已解锁${pct}%" style="${ringStyle(pct)}"><div><b>${pct}<span>%</span></b><small>已解锁</small></div></div></div><div class="bar-label"><span>已解锁 MYR ${money(unlocked)}</span><span>MYR ${money(cap)}</span></div><progress max="${cap}" value="${Math.min(cap, unlocked)}" aria-label="已解锁进度"></progress>${statRow([['已解锁', money(unlocked)], ['已领取', money(claimed)], ['待解锁', money(pending)]])}<span class="unit-note">金额单位：MYR</span><div class="rate-head"><h4>解锁比例</h4><button type="button" class="info-icon" data-action="gr-rates" aria-label="解锁比例说明">i</button></div>${rateTable()}${claimBtn}</section><section class="section-panel"><div class="section-header"><h3>参与说明</h3></div>${checks(GROWTH_SOURCE.eligibility)}</section><section class="section-panel flow-panel"><div class="section-header"><h3>活动流程</h3><span>首次充值 → 激活200%档位 → 累计有效投注 → 解锁彩金 → 领取奖励 → 完成当前档位 → 进入下一档位</span></div>${stepper(GROWTH_SOURCE.steps, viewStep, 'growth')}<div class="step-explanation trial-prose"><div class="step-heading"><span class="step-kicker">0${viewStep + 1} / 04</span><h4>${s.heading}</h4></div><p>${s.text}</p></div></section><div class="section-header outside"><h3>活动档位</h3><span>已完成 ${doneCount} / ${GROWTH_SOURCE.caps.length}</span></div><section class="level-list">${levels}</section><section class="section-panel"><div class="section-header"><h3>重要条款</h3></div>${termsList(GROWTH_SOURCE.terms)}</section><button type="button" class="outline-wide" data-tab="1">查看活动说明 ${icon('arrow')}</button>`;
  };
  function renderGrPlay() {
    const g = demoOf().growth;
    const cap = GROWTH_SOURCE.caps[g.tier];
    const claimable = grClaimable(g, g.tier);
    const expired = g.expired && g.expired[g.tier];
    const stake = GROWTH_SOURCE.demoBet;
    const rateBtns = (GROWTH_SOURCE.rates || []).map(r => {
      const bonus = r2(stake * r.rate);
      return `<button type="button" class="outline-wide" data-action="gr-bet-valid" data-game="${r.key}" ${expired ? 'disabled' : ''}>演示${r.key}投注 MYR ${money(stake)}（${r.label} → MYR ${money(bonus)}）</button>`;
    }).join('');
    $('#app').innerHTML = page('累计有效投注', `
      <div class="play-wallet">
        <div><span>${GROWTH_SOURCE.titles[g.tier]} 已解锁</span><strong>MYR ${money(g.unlocked[g.tier])} / ${money(cap)}</strong></div>
        <div class="play-progress"><div class="bar-label"><span>可领取</span><span>MYR ${money(claimable)}</span></div><progress max="${cap}" value="${Math.min(cap, g.unlocked[g.tier])}" aria-label="解锁进度"></progress></div>
      </div>
      <p class="trial-prose">会员参与指定游戏，系统自动计算有效投注进度。有效投注 × 对应游戏类型比例 = 解锁彩金。电子 0.3%，打鱼 0.3%，现场 0.1%，体育 0.5%。其他游戏投注不计入活动进度。</p>
      <div class="rate-actions">${rateBtns}
        <button type="button" class="outline-wide" data-action="gr-bet-other" ${expired ? 'disabled' : ''}>演示其他游戏投注 MYR ${money(stake)}（不计入）</button>
      </div>
      ${g.tier > 0 && !expired ? `<button type="button" class="text-button trial-reset" data-action="gr-expire">演示超过10天未完成</button><p class="fine-print trial-prose">后续每个档位有效期为10天。超过10天未完成，当期档位失效，且不能恢复。</p>` : ''}
      ${g.tier === 0 ? '<p class="fine-print trial-prose">首充档位不设完成期限。</p>' : ''}
      <button type="button" class="primary" data-action="gr-accelerate" ${expired || g.unlocked[g.tier] >= cap ? 'disabled' : ''}>演示加速解锁当前档位</button>
      <p class="fine-print trial-prose">「演示加速解锁当前档位」仅用于预览领取流程，不是官方投注要求。</p>
      ${claimable > 0 && !expired ? '<button type="button" class="primary" data-action="gr-go-claim">立即领取</button>' : ''}
    `, 'activity=growth');
    document.title = '累计有效投注 · TPOWER';
  }
  function renderGrClaim() {
    const g = demoOf().growth;
    const amt = grClaimable(g, g.tier);
    $('#app').innerHTML = page('立即领取', `
      <section class="reward-feature trial-hero">
        <div class="panel-top"><span class="eyebrow">${GROWTH_SOURCE.titles[g.tier]} 可领取</span><span class="status-badge">已解锁</span></div>
        <div class="amount"><small>MYR</small>${money(amt).split('.')[0]}<span>.${money(amt).split('.')[1] || '00'}</span></div>
        <p class="trial-prose">玩家点击「立即领取」。奖励直接发放至现金钱包。已领取的成长彩金无需额外流水要求。</p>
      </section>
      <button type="button" class="primary" data-action="gr-claim-confirm" ${amt > 0 ? '' : 'disabled'}>立即领取</button>
    `, 'activity=growth');
    document.title = '立即领取 · TPOWER';
  }

  /* ------------ 3周年幸运大抽奖 ------------ */
  function anIndex(a) {
    if (a.claimed) return 4;
    if (a.expired) return 3;
    if (a.drawDone && a.winAmount > 0) return 3;
    if (a.drawDone) return 2;
    if (a.tickets.length) return 1;
    return 0;
  }
  function prizeMatch(ticket, draw) {
    if (ticket === draw) return ['头奖', 100000];
    if (ticket.slice(0, 5) === draw.slice(0, 5) || ticket.slice(1) === draw.slice(1)) return ['二奖', 3000];
    if (ticket.slice(0, 4) === draw.slice(0, 4) || ticket.slice(2) === draw.slice(2)) return ['三奖', 300];
    if (ticket.slice(0, 3) === draw.slice(0, 3) || ticket.slice(3) === draw.slice(3)) return ['四奖', 30];
    if (ticket.slice(0, 2) === draw.slice(0, 2) || ticket.slice(4) === draw.slice(4)) return ['五奖', 4];
    return null;
  }
  function anCta(a) {
    if (a.expired) return ['奖金已作废', 'demo-done', true];
    if (a.claimed) return ['已领取', 'demo-done', true];
    if (a.drawDone && a.winAmount > 0) return ['领取奖金', 'an-go-claim', false];
    if (a.drawDone && a.winAmount <= 0) return ['未中奖', 'demo-done', true];
    if (a.tickets.length) return ['演示开奖', 'an-go-draw', false];
    return ['去累计有效流水', 'an-go-play', false];
  }
  window.renderAnniversaryDemo = function () {
    store().ensureBanner();
    const demo = store().load();
    const a = demo.anniversary;
    const [status, cls] = a.claimed ? ['已领取', 'muted'] : a.expired ? ['奖金已作废', 'muted'] : a.drawDone && a.winAmount > 0 ? ['待领取', ''] : a.tickets.length ? ['已获抽奖券', ''] : ['第3期进行中', ''];
    const viewStep = inspect('anniversary', 3, Math.min(3, anIndex(a)));
    const s = DRAW_SOURCE.steps[viewStep];
    const balls = a.drawDone
      ? a.drawNumber.split('').map(d => `<span>${d}</span>`).join('')
      : Array(6).fill('<span>—</span>').join('');
    return `${store().journeyBar()}<section class="reward-feature draw-hero trial-hero"><div class="panel-top"><span class="eyebrow">3周年幸运大抽奖</span><span class="status-badge ${cls}">${status}</span></div><div class="amount"><small>头奖 RM</small>100,000</div><p class="trial-prose">有效流水累计每满 RM200，获得1张抽奖券。</p><div class="period-dates"><div><span>活动开始</span><b>2026.11.15 <small>19:00:00</small></b></div><div><span>活动结束</span><b>2026.11.22 <small>18:59:59</small></b></div></div></section>${note('中奖奖金须在48小时内手动领取，逾期自动作废。')}<section class="section-panel"><div class="section-header"><h3>参与说明</h3></div>${checks(DRAW_SOURCE.eligibility)}</section><section class="section-panel flow-panel"><div class="section-header"><h3>活动流程</h3><span>点击步骤查看要求</span></div>${stepper(DRAW_SOURCE.steps, viewStep, 'anniversary')}<div class="step-explanation trial-prose"><div class="step-heading"><span class="step-kicker">0${viewStep + 1} / 04</span><h4>${s.heading}</h4></div><p>${s.text}</p></div></section><section class="section-panel"><div class="section-header"><h3>开奖参考</h3><span>TOTO 6D</span></div><div class="draw-reference"><div><b>2026年11月22日</b><p>根据当周星期日 TOTO 6D 开奖号码兑奖</p></div></div><div class="number-balls" aria-label="${a.drawDone ? '演示开奖号码' : '尚未开奖'}">${balls}</div><p class="fine-print center trial-prose">${a.drawDone ? '以上为演示开奖号码，非官方 TOTO 6D 结果，仅用于预览兑奖流程。' : '官方开奖以当周星期日 TOTO 6D 为准。演示中可使用「演示开奖」预览兑奖。'}</p></section><section class="section-panel"><div class="section-header"><h3>奖项一览</h3><span>共5个奖项</span></div>${prizeTable()}</section><section class="section-panel"><div class="section-header"><h3>重要条款</h3></div>${termsList(DRAW_SOURCE.terms)}</section><button type="button" class="outline-wide" data-tab="1">查看完整活动规则 ${icon('arrow')}</button><button type="button" class="text-button" data-tab="2">我的抽奖券 ${icon('arrow')}</button>`;
  };
  window.renderAnniversaryTickets = function () {
    store().ensureBanner();
    const demo = store().load();
    const a = demo.anniversary;
    const period = state.period;
    const day = { 3: '22', 2: '15', 1: '08' }[period];
    const current = period === 3;
    const list = current && a.tickets.length
      ? `<ul class="record-list ticket-list">${a.tickets.map((no, i) => {
          const hit = a.drawDone ? prizeMatch(no, a.drawNumber) : null;
          const st = !a.drawDone ? '待开奖' : a.expired && hit ? '已作废' : hit ? hit[0] : '未中奖';
          return `<li><div><strong>抽奖券 ${i + 1}</strong><small>号码 ${no}</small></div><div class="record-right"><b>${hit ? 'RM ' + money(hit[1]) : '—'}</b><span class="status-badge">${st}</span></div></li>`;
        }).join('')}</ul>`
      : '';
    return `${store().journeyBar()}<section class="section-panel tickets-panel"><div class="section-header"><h3>我的抽奖券</h3></div><div class="period-tabs" aria-label="抽奖期数">${[3, 2, 1].map(n => `<button data-period="${n}" aria-pressed="${n === period}" class="${n === period ? 'active' : ''}">第${n}期<small>11月${{ 3: '22', 2: '15', 1: '08' }[n]}日</small></button>`).join('')}</div><div class="ticket-period"><b>第${period}期 · 2026年11月${day}日</b>${current ? '<p>2026.11.15 19:00:00 — 2026.11.22 18:59:59</p>' : '<p>仅提供了该期期数与开奖参考日期。</p>'}</div>${current ? `${a.drawDone ? `<div class="number-balls small-balls">${a.drawNumber.split('').map(d => `<span>${d}</span>`).join('')}</div><p class="fine-print center trial-prose">演示开奖号码 ${a.drawNumber}，非官方结果。</p>` : `<div class="number-balls small-balls">${Array(6).fill('<span>—</span>').join('')}</div><p class="fine-print center">尚未开奖</p>`}${statRow([['抽奖券数', String(a.tickets.length)], ['中奖总额', a.drawDone ? money(a.winAmount) : '—'], ['未领取奖额', a.drawDone && !a.claimed && !a.expired ? money(a.winAmount) : money(0)]])}${list}` : `<p class="fine-print center">该期开奖号码未提供</p>${action('该期领奖数据未提供', 'ticket-claim', true)}`}</section>${note('奖金须在48小时内点击领取，逾期作废。')}`;
  };
  function renderAnPlay() {
    const a = demoOf().anniversary;
    const nextNeed = 200 - (a.turnover % 200 || (a.turnover > 0 && a.turnover % 200 === 0 ? 200 : a.turnover % 200));
    const remainToTicket = a.turnover % 200 === 0 ? (a.tickets.length >= 3 && a.turnover >= 600 ? 0 : 200) : 200 - (a.turnover % 200);
    $('#app').innerHTML = page('累计有效流水', `
      <div class="play-wallet">
        <div><span>有效流水</span><strong>RM ${money(a.turnover)}</strong></div>
        <div class="play-progress"><div class="bar-label"><span>已获抽奖券</span><span>${a.tickets.length} 张 · 每满 RM200 得1张</span></div><progress max="600" value="${Math.min(600, a.turnover)}" aria-label="流水进度"></progress></div>
      </div>
      <p class="trial-prose">活动期间，有效投注流水每累计满 RM200 获得1张抽奖券。除4D及平台指定的特殊游戏外，其他游戏的有效投注均计入活动流水。</p>
      <button type="button" class="primary" data-action="an-add-turnover" ${a.tickets.length >= 3 ? 'disabled' : ''}>演示累计 RM200 有效流水</button>
      ${a.tickets.length ? '<button type="button" class="outline-wide" data-demo-nav="activity=anniversary&tab=2">查看我的抽奖券</button>' : ''}
      ${a.tickets.length >= 3 ? '<button type="button" class="primary" data-action="an-go-draw">演示开奖</button>' : ''}
    `, 'activity=anniversary');
    document.title = '累计有效流水 · TPOWER';
  }
  function renderAnDraw() {
    const a = demoOf().anniversary;
    const balls = a.drawDone ? a.drawNumber.split('').map(d => `<span>${d}</span>`).join('') : Array(6).fill('<span>?</span>').join('');
    const hits = a.drawDone ? a.tickets.map(no => ({ no, hit: prizeMatch(no, a.drawNumber) })) : [];
    $('#app').innerHTML = page('开奖核对', `
      <p class="demo-lead trial-prose">每张抽奖券包含一组6位数号码，以当周星期日 TOTO 6D 开奖号码为兑奖依据。号码和顺序必须一致；二至五奖按前段或后段号码匹配。以下开奖号码为演示示例，非官方结果。</p>
      <div class="number-balls" id="an-draw-balls">${balls}</div>
      ${a.drawDone ? `<p class="fine-print center trial-prose">演示开奖号码 ${a.drawNumber}</p><ul class="record-list">${hits.map(h => `<li><div><strong>${h.no}</strong></div><div class="record-right"><b>${h.hit ? 'RM ' + money(h.hit[1]) : '—'}</b><span class="status-badge">${h.hit ? h.hit[0] : '未中奖'}</span></div></li>`).join('')}</ul>${a.winAmount > 0 && !a.claimed && !a.expired ? '<button type="button" class="primary" data-action="an-go-claim">领取奖金</button><button type="button" class="outline-wide" data-action="an-expire">演示超过48小时未领取</button>' : ''}` : '<button type="button" class="primary" data-action="an-draw-confirm">开始演示开奖</button>'}
    `, 'activity=anniversary&tab=2');
    document.title = '开奖核对 · TPOWER';
  }
  function renderAnClaim() {
    const a = demoOf().anniversary;
    $('#app').innerHTML = page('领取奖金', `
      <section class="reward-feature trial-hero">
        <div class="panel-top"><span class="eyebrow">${a.prizeName || '中奖奖金'}</span><span class="status-badge">待领取 · 48小时</span></div>
        <div class="amount"><small>RM</small>${money(a.winAmount).split('.')[0]}<span>.${money(a.winAmount).split('.')[1]}</span></div>
        <p class="trial-prose">奖金必须在48小时内点击领取；超过指定时间，奖金将自动作废。</p>
      </section>
      <button type="button" class="primary" data-action="an-claim-confirm">确认领取</button>
      <button type="button" class="outline-wide" data-action="an-expire">演示超过48小时未领取</button>
    `, 'activity=anniversary&tab=2');
    document.title = '领取奖金 · TPOWER';
  }


  /* ------------ 维护补偿 ------------ */
  function mtCta(m) {
    if (!m.eligible) return ['不符资格', 'mt-eligibility', false];
    if (m.completed) return ['已领取', 'demo-done', true];
    if (m.ended) return ['未达200分，不能完成任务', 'demo-done', true];
    if (m.reached) return ['完成任务', 'mt-go-finish', false];
    if (m.joined) return ['去指定游戏', 'mt-go-play', false];
    return ['参与活动', 'mt-join', false];
  }
  window.renderMaintenanceDemo = function () {
    store().ensureBanner();
    const demo = store().load();
    const m = demo.maintenance;
    const status = !m.eligible ? ['不符资格', 'muted'] : m.completed ? ['已领取', 'muted'] : m.ended ? ['未达标', 'muted'] : m.reached ? ['已达标 · 待完成任务', ''] : m.joined ? ['已参加 · 挑战中', ''] : ['已认证 · 待参与', ''];
    const viewStep = inspect('maintenance', 3, Math.min(3, mtIndex(m) === 4 ? 3 : mtIndex(m)));
    const s = MAINT_SOURCE.steps[viewStep];
    const points = m.joined ? `<div class="wallet-pair" id="mt-balance"><div class="wallet-card trial"><span>活动分</span><strong>${money(m.points)}</strong><small>只能用于指定游戏，不能提现</small></div><div class="wallet-card main ${demo.mainWallet > 0 ? 'highlight' : ''}"><span>主钱包</span><strong>RM ${money(demo.mainWallet)}</strong><small>${m.completed ? 'RM100 现金已到账' : '完成任务后领取 RM100'}</small></div></div>${!m.completed && !m.ended ? `<div class="trial-balance"><div class="bar-label"><span>达标进度</span><span>${money(m.points)} / 200.00</span></div><progress max="200" value="${Math.min(200, m.points)}" aria-label="活动分进度"></progress></div>` : ''}` : '';
    return `${store().journeyBar()}${points}<section class="reward-feature trial-hero"><div class="panel-top"><span class="eyebrow">维护补偿 · 限参加1次</span><span class="status-badge ${status[1]}">${status[0]}</span></div><div class="amount"><small>现金 RM</small>100</div><p class="trial-prose">领取100活动分，达到200分后手动完成任务。</p></section><section class="section-panel"><div class="section-header"><h3>参与资格</h3></div>${checks(MAINT_SOURCE.eligibility)}<div class="rule-chips"><span>每人1次</span><span>每设备1次</span><span>每IP 1次</span></div>${m.eligible ? '' : '<p class="fine-print trial-prose">当前演示为不符资格：不在 2024年1月1日至2026年10月31日期间有成功充值。</p>'}</section><section class="section-panel flow-panel"><div class="section-header"><h3>活动流程</h3><span>点击步骤查看要求</span></div>${stepper(MAINT_SOURCE.steps, viewStep, 'maintenance')}<div class="step-explanation trial-prose"><div class="step-heading"><span class="step-kicker">0${viewStep + 1} / 04</span><h4>${s.heading}</h4></div><p>${s.text}</p></div></section><section class="section-panel"><div class="section-header"><h3>重要条款</h3></div>${termsList(MAINT_SOURCE.terms)}</section><section class="section-panel"><div class="section-header"><h3>可玩游戏</h3><span>仅限活动分</span></div><div class="locked-games">${icon('shield')}<div><b>${m.joined ? '已开放指定游戏' : '参加活动后开放'}</b><p class="trial-prose">截图未显示具体游戏名单。</p></div></div></section>${m.eligible && !m.joined ? '<button type="button" class="text-button trial-reset" data-action="mt-make-ineligible">演示不符资格</button>' : ''}<button type="button" class="outline-wide" data-tab="1">查看完整活动规则 ${icon('arrow')}</button>`;
  };
  function renderMtPlay() {
    const m = demoOf().maintenance;
    const game = GAMES.find(g => g.id === m.currentGame) || GAMES[0];
    const canSpin = m.joined && !m.completed && !m.ended && !m.reached && m.points > 0;
    const symbols = (m.lastSymbols || ['7', '星', '铃']).map(s => `<span>${s}</span>`).join('');
    $('#app').innerHTML = page(game.name, `
      <div class="play-wallet">
        <div><span>活动分</span><strong id="play-balance">${money(m.points)}</strong></div>
        <div class="play-progress"><div class="bar-label"><span>达标进度</span><span>${money(m.points)} / 200.00</span></div><progress max="200" value="${Math.min(200, m.points)}" aria-label="活动分进度"></progress></div>
      </div>
      <p class="trial-prose">活动分只能用于指定游戏，不能提现。活动分达到200分或以上即完成任务。</p>
      <section class="slot-machine">
        <div class="slot-window" id="slot-window">${symbols}</div>
        <p class="slot-result" id="slot-result">${m.ended ? '挑战已结束' : m.reached ? '已达到 200 分' : '按下开始，演示一局'}</p>
        <button type="button" class="primary" id="spin-btn" data-action="mt-spin" ${canSpin ? '' : 'disabled'}>${canSpin ? '开始旋转' : '暂停游戏'}</button>
      </section>
      ${m.reached ? '<button type="button" class="primary" data-action="mt-go-finish">返回完成任务</button>' : ''}
      ${m.ended ? '<section class="section-panel"><h3>未完成任务</h3><p class="trial-prose">活动分已用尽且未达到200分，不能领取 RM100 现金。每人限参加一次，演示中可重置后重新体验。</p></section>' : ''}
      ${canSpin ? '<button type="button" class="text-button trial-reset" data-action="mt-fail-path">演示未达200分（分数归零）</button>' : ''}
    `, 'activity=maintenance');
    document.title = game.name + ' · TPOWER';
  }
  function renderMtFinish() {
    const m = demoOf().maintenance;
    $('#app').innerHTML = page('完成任务', `
      <section class="reward-feature trial-hero">
        <div class="panel-top"><span class="eyebrow">现金奖励</span><span class="status-badge">已达标</span></div>
        <div class="amount"><small>RM</small>100<span>.00</span></div>
        <p class="trial-prose">返回活动页面，手动点击「完成任务」，领取 RM100 现金到本人的账户。领取现金后，剩余活动分清零。</p>
      </section>
      <button type="button" class="primary" data-action="mt-finish-confirm">完成任务并领取 RM100</button>
    `, 'activity=maintenance');
    document.title = '完成任务 · TPOWER';
  }

  window.PromoRenderDemo = function (screen) {
    store().ensureBanner();
    store().load();
    const pages = {
      'nc-claim': renderNcClaim,
      'nc-play': renderNcPlay,
      'nc-unlock': renderNcUnlock,
      'nc-wager': renderNcWager,
      'nc-done': renderNcDone,
      'ref-invite': renderRefInvite,
      'gr-play': renderGrPlay,
      'gr-claim': renderGrClaim,
      'an-play': renderAnPlay,
      'an-draw': renderAnDraw,
      'an-claim': renderAnClaim,
      'mt-play': renderMtPlay,
      'mt-finish': renderMtFinish,
      'nfc-claim': renderNfcClaim,
      'nfc-games': renderNfcGames,
      'nfc-play': renderNfcPlay,
      'nfc-redeem': renderNfcRedeem,
      'nfc-redeem-process': renderNfcRedeemProcess,
      'nfc-redeem-success': renderNfcRedeemSuccess,
      'dw-spin': renderDwSpin,
      'dw-turnover': renderDwTurnover,
      'dw-convert': renderDwConvert
    };
    if (!pages[screen]) return false;
    const demo = demoOf();
    const gates = {
      'nc-claim': () => !demo.newcomer.claimed && !demo.newcomer.abandoned,
      'nc-play': () => demo.newcomer.claimed && !demo.newcomer.abandoned,
      'nc-unlock': () => demo.newcomer.challengeDone && !demo.newcomer.deposited && !demo.newcomer.expired && !demo.newcomer.abandoned,
      'nc-wager': () => demo.newcomer.deposited && !demo.newcomer.completed,
      'nc-done': () => demo.newcomer.completed || demo.newcomer.expired || demo.newcomer.abandoned,
      'gr-play': () => demo.growth.started,
      'gr-claim': () => demo.growth.started && grClaimable(demo.growth, demo.growth.tier) > 0,
      'an-draw': () => demo.anniversary.tickets.length > 0,
      'an-claim': () => demo.anniversary.drawDone && demo.anniversary.winAmount > 0 && !demo.anniversary.claimed && !demo.anniversary.expired,
      'mt-play': () => demo.maintenance.joined && demo.maintenance.eligible,
      'mt-finish': () => demo.maintenance.reached && !demo.maintenance.completed,
      'nfc-claim': () => !demo.freeChallenge.claimed && !demo.freeChallenge.redeemed,
      'nfc-games': () => demo.freeChallenge.claimed && !demo.freeChallenge.redeemed,
      'nfc-play': () => demo.freeChallenge.claimed && !demo.freeChallenge.redeemed,
      'nfc-redeem': () => demo.freeChallenge.reachedTarget && !demo.freeChallenge.redeemed,
      'nfc-redeem-process': () => demo.freeChallenge.reachedTarget && !demo.freeChallenge.redeemed,
      'nfc-redeem-success': () => demo.freeChallenge.redeemed,
      'dw-spin': () => true,
      'dw-turnover': () => (demo.dailyWheel.bonusWallet || 0) > 0 || (demo.dailyWheel.converted || 0) > 0,
      'dw-convert': () => (demo.dailyWheel.bonusWallet || 0) > 0 && (demo.dailyWheel.turnover || 0) >= (demo.dailyWheel.turnoverNeed || 0) && demo.dailyWheel.turnoverNeed > 0
    };
    if (gates[screen] && !gates[screen]()) {
      const back = {
        nc: 'newcomer', ref: 'referral', gr: 'growth', an: 'anniversary', mt: 'maintenance', nfc: 'newcomer-free-challenge', dw: 'daily-wheel'
      }[screen.split('-')[0]];
      navigate('activity=' + back);
      return true;
    }
    pages[screen]();
    return true;
  };


  function creditReferral(demo, friend, amount, label) {
    const cap = REFERRAL_SOURCE.cap;
    const room = r2(Math.max(0, cap - (friend.unlocked || 0)));
    const add = r2(Math.min(amount, room));
    if (add <= 0) { toast('该好友邀请奖励已达最高 RM1,000'); return 0; }
    friend.unlocked = r2((friend.unlocked || 0) + add);
    demo.referral.unlocked = rfUnlockedTotal(demo.referral);
    demo.mainWallet = r2(demo.mainWallet + add);
    record('邀请好友挑战 · ' + friend.name + ' · ' + label, add, '已到账');
    return add;
  }

  window.PromoHandleAction = function (name) {
    const demo = store().load();
    const n = demo.newcomer;
    const r = demo.referral;
    const g = demo.growth;
    const a = demo.anniversary;
    const m = demo.maintenance;

    const c = demo.freeChallenge;
    const w = demo.dailyWheel;

    switch (name) {
      case 'dw-focus-deposit':
        navigate('activity=daily-wheel');
        store().later(() => { const el = document.getElementById('dw-deposit'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 80);
        return true;
      case 'dw-deposit-ok':
      case 'dw-deposit-100':
      case 'dw-deposit-50':
      case 'dw-deposit-merge':
      case 'dw-deposit-void':
        return true;
      case 'dw-next-day':
        w.day = (w.day || 1) + 1;
        w.earnedToday = 0;
        w.usedToday = 0;
        store().save();
        toast('已模拟次日 00:00，今日抽奖次数已重置');
        navigate('activity=daily-wheel');
        return true;
      case 'dw-go-spin':
        if (dwSpinsLeft(w) <= 0 && !(w.bonusWallet > 0)) { toast('请先完成单笔超过 RM100 的充值以获得抽奖次数'); navigate('activity=daily-wheel'); return true; }
        navigate('demo=dw-spin'); return true;
      case 'dw-spin':
        return true;
      case 'dw-go-turnover':
        if ((w.bonusWallet || 0) <= 0 && (w.converted || 0) <= 0) return true;
        navigate('demo=dw-turnover'); return true;
      case 'dw-bet-valid':
      case 'dw-bet-other':
        return true;
      case 'dw-accelerate': {
        if ((w.bonusWallet || 0) <= 0) return true;
        w.turnover = w.turnoverNeed;
        store().save(); toast('已按演示进度完成所需流水（非正式投注要求）'); navigate('demo=dw-turnover'); return true;
      }
      case 'dw-go-convert':
        if ((w.bonusWallet || 0) <= 0 || (w.turnover || 0) < (w.turnoverNeed || 0)) { toast('请先完成3倍有效流水'); return true; }
        navigate('demo=dw-convert'); return true;
      case 'dw-convert-confirm': {
        if ((w.bonusWallet || 0) <= 0 || (w.turnover || 0) < (w.turnoverNeed || 0)) return true;
        const amt = r2(w.bonusWallet);
        w.converted = r2((w.converted || 0) + amt);
        demo.mainWallet = r2((demo.mainWallet || 0) + amt);
        w.bonusWallet = 0;
        w.turnover = 0;
        w.turnoverNeed = 0;
        record('每日幸运大转盘RM888', amt, '已到账');
        store().save(); toast('彩金已转换为现金并转入现金钱包'); navigate('demo=records'); return true;
      }

      case 'nfc-go-claim':
        if (c.redeemed) return true;
        navigate('demo=nfc-claim'); return true;
      case 'nfc-claim-confirm':
        if (c.claimed || c.redeemed) return true;
        c.claimed = true; c.trialBalance = 100; c.spinIndex = 0; c.playMode = 'win';
        c.trialEnded = false; c.reachedTarget = false;
        store().save(); toast('已领取 RM100 试玩额度'); navigate('activity=newcomer-free-challenge'); return true;
      case 'nfc-go-play':
        if (!c.claimed || c.redeemed) return true;
        navigate('demo=nfc-games'); return true;
      case 'nfc-open-game':
        return true;
      case 'nfc-spin':
        runNfcSpin(false); return true;
      case 'nfc-fail-path':
        runNfcSpin(true); return true;
      case 'nfc-go-redeem':
        if (!c.reachedTarget || c.redeemed) return true;
        if ($('#modal') && $('#modal').open) closeModal();
        navigate('demo=nfc-redeem'); return true;
      case 'nfc-redeem-confirm':
        if (!c.reachedTarget || c.redeemed) return true;
        navigate('demo=nfc-redeem-process'); return true;

      case 'nc-go-claim':
        if (n.claimed || n.abandoned) return true;
        navigate('demo=nc-claim'); return true;
      case 'nc-claim-confirm':
        if (n.claimed || n.abandoned) return true;
        n.claimed = true; n.bonus = 88; n.turnover = 0; n.spinIndex = 0; n.playMode = 'win';
        store().save(); toast('已领取 RM88 活动金'); navigate('activity=newcomer'); return true;
      case 'nc-go-play':
        if (!n.claimed || n.abandoned || n.challengeDone) { navigate(n.challengeDone ? 'demo=nc-unlock' : 'activity=newcomer'); return true; }
        navigate('demo=nc-play'); return true;
      case 'nc-spin':
        runNcSpin(false); return true;
      case 'nc-abandon':
        n.abandoned = true; store().save(); toast('已放弃活动，不能再次参加'); navigate('demo=nc-done'); return true;
      case 'nc-go-unlock':
        if (!n.challengeDone || n.deposited || n.expired || n.abandoned) return true;
        navigate('demo=nc-unlock'); return true;
      case 'nc-unlock-confirm': {
        if (!n.challengeDone || n.deposited || n.expired || n.abandoned) return true;
        const remaining = r2(n.remaining || n.bonus);
        const deposit = r2(Math.max(10, remaining));
        const unlocked = r2(Math.min(1888, Math.min(deposit, remaining)));
        n.deposited = true;
        n.depositAmount = deposit;
        n.unlockedBonus = unlocked;
        n.walletTotal = r2(remaining + deposit + unlocked);
        n.wager12 = 0;
        n.wager12Need = r2(n.walletTotal * 12);
        n.principalNeed = r2(remaining + deposit);
        n.principalWager = 0;
        store().save();
        toast('已按1:1解锁彩金，成长彩金计划已激活');
        navigate('demo=nc-wager');
        return true;
      }
      case 'nc-expire':
        if (n.deposited || n.abandoned) return true;
        n.expired = true; store().save(); toast('48小时内未充值，解锁资格自动失效'); navigate('demo=nc-done'); return true;
      case 'nc-go-wager':
        if (!n.deposited || n.completed) return true;
        navigate('demo=nc-wager'); return true;
      case 'nc-go-principal':
        if (!n.bonusReleased || n.completed) return true;
        navigate('demo=nc-wager'); return true;
      case 'nc-wager-accelerate':
        if (!n.deposited || n.bonusReleased) return true;
        n.wager12 = n.wager12Need;
        n.bonusReleased = true;
        demo.mainWallet = r2(demo.mainWallet + n.unlockedBonus);
        record('新人专享挑战 · 解锁彩金', n.unlockedBonus, '已到账');
        store().save();
        toast('12倍流水已完成，解锁彩金已发放至真钱钱包');
        navigate('demo=nc-wager');
        return true;
      case 'nc-principal-accelerate':
        if (!n.bonusReleased || n.completed) return true;
        n.principalWager = n.principalNeed;
        n.completed = true;
        store().save();
        toast('本金1倍流水已完成');
        navigate('demo=nc-done');
        return true;

      case 'ref-go-invite':
        navigate('demo=ref-invite'); return true;
      case 'ref-copy':
        try { navigator.clipboard && navigator.clipboard.writeText(demo.referral.code); } catch {}
        toast('已复制演示邀请码'); return true;
      case 'ref-friend-kyc': {
        const i = r.friends.length;
        const f = { name: '演示好友 ' + String.fromCharCode(65 + i), account: 'user****' + (12 + i), registered: true, kyc: true, deposited: false, betUnits: 0, unlocked: 2, disqualified: false, reason: '' };
        r.friends.push(f);
        r.unlocked = rfUnlockedTotal(r);
        demo.mainWallet = r2(demo.mainWallet + 2);
        record('邀请好友挑战 · ' + f.name + ' · 实名认证', 2, '已到账');
        store().save(); toast('好友已完成实名认证，系统自动解锁 RM2.00'); navigate('activity=referral'); return true;
      }
      case 'ref-friend-nokyc': {
        const i = r.friends.length;
        r.friends.push({ name: '演示好友 ' + String.fromCharCode(65 + i), account: 'user****' + (12 + i), registered: true, kyc: false, deposited: false, betUnits: 0, unlocked: 0, disqualified: false, reason: '' });
        store().save(); toast('好友仅完成注册、未完成实名认证，邀请奖励为 RM0.00'); navigate('activity=referral'); return true;
      }
      case 'ref-friend-self':
        r.friends.push({ name: '自己的其他账号', account: demo.phone, registered: true, kyc: false, deposited: false, betUnits: 0, unlocked: 0, disqualified: true, reason: '禁止自行邀请自己的其他账号领取奖励。异常邀请关系一律取消资格。' });
        store().save(); toast('自行邀请自己的其他账号，资格已取消'); navigate('activity=referral'); return true;
      case 'ref-friend-dup':
        r.friends.push({ name: '重复实名身份', account: 'user****99', registered: true, kyc: false, deposited: false, betUnits: 0, unlocked: 0, disqualified: true, reason: '相同实名身份不得重复计算邀请人数。重复身份及刷量行为一律取消资格。' });
        store().save(); toast('相同实名身份重复邀请，资格已取消'); navigate('activity=referral'); return true;
      case 'ref-friend-deposit':
      case 'ref-friend-bet':
      case 'ref-friend-cap':
        return true;

      case 'gr-rates':
        openModal(`<div class="rate-modal"><h2>解锁比例</h2>${rateTable()}<p class="trial-prose">有效投注 × 对应游戏类型比例 = 解锁彩金。电子（老虎机）0.3%，打鱼（捕鱼）0.3%，现场（真人）0.1%，体育 0.5%。其他游戏投注不计入活动进度。已领取的成长彩金无需额外流水。</p></div>`);
        return true;
      case 'gr-first-deposit':
        if (g.started) { toast('每位会员仅限开启一次成长计划'); return true; }
        g.started = true; g.firstDeposit = GROWTH_SOURCE.depositExample; g.tier = 0;
        store().save(); toast('已完成首次有效充值 MYR 2,944，已启动首充200%彩金档位（最高 MYR 5,888.00，不限时）'); navigate('activity=growth'); return true;
      case 'gr-go-play':
        if (!g.started) { toast('请先完成首次有效充值'); return true; }
        navigate('demo=gr-play'); return true;
      case 'gr-bet-valid':
      case 'gr-bet-other':
        return true;
      case 'gr-accelerate': {
        if (!g.started || (g.expired && g.expired[g.tier])) return true;
        const cap = GROWTH_SOURCE.caps[g.tier];
        g.unlocked[g.tier] = cap;
        store().save(); toast('本档彩金已按演示进度全部解锁（非正式投注要求）'); navigate('demo=gr-play'); return true;
      }
      case 'gr-expire':
        if (!g.started || g.tier === 0) return true;
        if (g.claimed[g.tier] >= GROWTH_SOURCE.caps[g.tier]) return true;
        g.expired[g.tier] = true;
        g.daysLeft[g.tier] = 0;
        store().save(); toast('超过10天未完成，当期档位已失效，不能恢复'); navigate('activity=growth'); return true;
      case 'gr-go-claim':
        if (!g.started || grClaimable(g, g.tier) <= 0) { toast('暂无可领取彩金'); return true; }
        navigate('demo=gr-claim'); return true;
      case 'gr-claim-confirm': {
        if (g.expired && g.expired[g.tier]) { toast('已失效档位不可重复领取或重新启动'); return true; }
        const amt = grClaimable(g, g.tier);
        if (amt <= 0) return true;
        g.claimed[g.tier] = r2((g.claimed[g.tier] || 0) + amt);
        demo.mainWallet = r2(demo.mainWallet + amt);
        record('成长彩金200%扶持计划 · ' + GROWTH_SOURCE.titles[g.tier], amt, '已到账');
        if (g.claimed[g.tier] >= GROWTH_SOURCE.caps[g.tier] && g.tier < GROWTH_SOURCE.caps.length - 1) {
          g.tier += 1;
          g.daysLeft[g.tier] = 10;
        }
        store().save();
        toast('奖励已发放至现金钱包，无需额外流水');
        navigate('activity=growth');
        return true;
      }

      case 'an-go-play':
        navigate('demo=an-play'); return true;
      case 'an-add-turnover': {
        if (a.drawDone || a.tickets.length >= 3) return true;
        a.turnover = r2(a.turnover + 200);
        const no = AN_TICKETS[a.tickets.length] || String(100000 + a.tickets.length * 173).slice(0, 6);
        a.tickets.push(no);
        store().save(); toast('有效流水满 RM200，获得1张抽奖券'); navigate('demo=an-play'); return true;
      }
      case 'an-go-draw':
        if (!a.tickets.length) return true;
        navigate('demo=an-draw'); return true;
      case 'an-draw-confirm': {
        if (!a.tickets.length || a.drawDone) return true;
        a.drawDone = true;
        a.drawNumber = AN_DRAW;
        let best = 0, name = '';
        a.tickets.forEach(no => {
          const hit = prizeMatch(no, a.drawNumber);
          if (hit && hit[1] > best) { best = hit[1]; name = hit[0]; }
        });
        a.winAmount = best;
        a.prizeName = name;
        store().save();
        toast(best ? '已按演示开奖号码完成核对' : '未中奖');
        navigate('demo=an-draw');
        return true;
      }
      case 'an-go-claim':
        if (!a.drawDone || a.claimed || a.expired || a.winAmount <= 0) return true;
        navigate('demo=an-claim'); return true;
      case 'an-claim-confirm':
        if (!a.drawDone || a.claimed || a.expired || a.winAmount <= 0) return true;
        a.claimed = true;
        demo.mainWallet = r2(demo.mainWallet + a.winAmount);
        record('3周年幸运大抽奖 · ' + (a.prizeName || '奖金'), a.winAmount, '已到账');
        store().save(); toast('奖金已到账'); navigate('demo=records'); return true;
      case 'an-expire':
        if (a.claimed || !a.drawDone) return true;
        a.expired = true; store().save(); toast('超过指定时间，奖金已自动作废'); navigate('activity=anniversary&tab=2'); return true;

      case 'mt-join':
        if (!m.eligible || m.joined || m.completed) return true;
        m.joined = true; m.points = 100; m.spinIndex = 0; m.playMode = 'win'; m.ended = false; m.reached = false;
        store().save(); toast('已领取100活动分'); navigate('activity=maintenance'); return true;
      case 'mt-go-play':
        if (!m.joined) return true;
        navigate('demo=mt-play'); return true;
      case 'mt-spin':
        runMtSpin(false); return true;
      case 'mt-fail-path':
        runMtSpin(true); return true;
      case 'mt-go-finish':
        if (!m.reached || m.completed) return true;
        navigate('demo=mt-finish'); return true;
      case 'mt-finish-confirm':
        if (!m.reached || m.completed) return true;
        m.completed = true; m.points = 0;
        demo.mainWallet = r2(demo.mainWallet + 100);
        record('维护补偿 · 100分挑战', 100, '已到账');
        store().save(); toast('RM100 现金已到账，剩余活动分已清零'); navigate('demo=records'); return true;
      case 'mt-make-ineligible':
        if (m.joined || m.completed) return true;
        m.eligible = false; store().save(); toast('演示：当前账户不符资格'); refreshPromo(); return true;
      case 'mt-eligibility':
        openModal(`<div class="dialog-illustration">${icon('shield')}</div><h2>维护补偿参与资格</h2><p class="trial-prose">2024年1月1日至2026年10月31日期间有成功充值的玩家，每人、每设备、每IP限参与一次。</p><p class="trial-prose">${m.eligible ? '当前演示账户在资格期内有成功充值，可以参加。' : '当前演示为不符资格状态。'}</p>`);
        return true;

      default:
        return false;
    }
  };

  function runNcSpin() {
    const demo = store().load();
    const n = demo.newcomer;
    if (n.spinning || !n.claimed || n.challengeDone || n.abandoned || n.bonus <= 0) return;
    const step = NC_SPINS[Math.min(n.spinIndex, NC_SPINS.length - 1)];
    n.spinning = true;
    const win = document.getElementById('slot-window');
    const result = document.getElementById('slot-result');
    const btn = document.getElementById('spin-btn');
    if (btn) btn.disabled = true;
    if (result) result.textContent = '旋转中…';
    let ticks = 0;
    const timer = setInterval(() => {
      if (win) win.innerHTML = ['7', '星', '铃', 'BAR'].sort(() => Math.random() - 0.5).slice(0, 3).map(s => `<span>${s}</span>`).join('');
      ticks += 1;
      if (ticks < 6) return;
      clearInterval(timer);
      n.spinning = false;
      n.lastSymbols = step.symbols;
      n.turnover = r2(n.turnover + step.turn);
      n.bonus = r2(Math.max(0, n.bonus + step.delta));
      n.spinIndex += 1;
      if (n.turnover >= 440) {
        n.challengeDone = true;
        n.remaining = n.bonus;
        n.turnover = 440;
      }
      store().save();
      renderNcPlay();
      if (n.challengeDone) {
        toast('已完成 RM440 有效流水');
        store().later(() => openModal(`<div class="goal-celebration"><h2>流水已完成</h2><p class="trial-prose">完成后进入充值解锁阶段。以剩余余额 RM ${money(n.remaining)} 作为可解锁彩金。</p><button type="button" class="primary" data-action="nc-go-unlock">去充值解锁</button></div>`), 300);
      }
    }, 90);
  }

  function runMtSpin(forceLose) {
    const demo = store().load();
    const m = demo.maintenance;
    if (m.spinning || !m.joined || m.completed || m.ended || m.reached) return;
    if (forceLose) m.playMode = 'lose';
    const seq = m.playMode === 'lose' ? MT_LOSE : MT_WIN;
    const step = seq[Math.min(m.spinIndex, seq.length - 1)];
    m.spinning = true;
    const win = document.getElementById('slot-window');
    const result = document.getElementById('slot-result');
    const btn = document.getElementById('spin-btn');
    if (btn) btn.disabled = true;
    if (result) result.textContent = '旋转中…';
    let ticks = 0;
    const timer = setInterval(() => {
      if (win) win.innerHTML = ['7', '星', '铃', 'BAR'].sort(() => Math.random() - 0.5).slice(0, 3).map(s => `<span>${s}</span>`).join('');
      ticks += 1;
      if (ticks < 6) return;
      clearInterval(timer);
      m.spinning = false;
      m.lastSymbols = step.symbols;
      m.points = r2(Math.max(0, m.points + step.delta));
      m.spinIndex += 1;
      if (m.points >= 200) { m.reached = true; m.points = Math.max(m.points, 200); }
      else if (m.points <= 0) { m.points = 0; m.ended = true; }
      store().save();
      renderMtPlay();
      if (m.reached) {
        toast('活动分已达到200分');
        store().later(() => openModal(`<div class="goal-celebration"><h2>任务已达标</h2><p class="trial-prose">活动分达到200分或以上即完成任务。请返回活动页面，手动点击「完成任务」。</p><button type="button" class="primary" data-action="mt-go-finish">完成任务</button></div>`), 300);
      }
    }, 90);
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('button[data-action]');
    if (btn && !btn.disabled) {
      const name = btn.getAttribute('data-action');
      const demo = store().load();
      const g = demo.growth;
      const r = demo.referral;
      const fi = Number(btn.getAttribute('data-friend'));
      const friend = Number.isInteger(fi) ? r.friends[fi] : null;
      if (name === 'gr-bet-valid') {
        if (!g.started || (g.expired && g.expired[g.tier])) return;
        const game = btn.getAttribute('data-game') || '电子';
        const cap = GROWTH_SOURCE.caps[g.tier];
        const stake = GROWTH_SOURCE.demoBet;
        const rate = growthRateOf(game);
        if (!rate) return;
        const bonus = r2(stake * rate.rate);
        const add = r2(Math.min(bonus, Math.max(0, cap - (g.unlocked[g.tier] || 0))));
        g.turnover[g.tier] = r2((g.turnover[g.tier] || 0) + stake);
        g.unlocked[g.tier] = r2((g.unlocked[g.tier] || 0) + add);
        store().save();
        toast(add > 0 ? `演示${game}有效投注 MYR ${money(stake)}，按 ${rate.label} 解锁 MYR ${money(add)}` : '本档彩金已全部解锁');
        renderGrPlay();
        return;
      }
      if (name === 'gr-bet-other') {
        toast('其他游戏投注不计入活动进度');
        return;
      }
      if (name === 'ref-friend-deposit' && friend && !friend.disqualified) {
        if (!friend.kyc) { toast('需先完成实名认证'); return; }
        if (friend.deposited) { toast('该好友充值任务已完成'); return; }
        friend.deposited = true;
        creditReferral(demo, friend, 3, '累计充值RM100');
        store().save(); toast('好友累计充值 RM100，系统自动解锁 RM3.00'); refreshPromo(); return;
      }
      if (name === 'ref-friend-bet' && friend && !friend.disqualified) {
        if (!friend.kyc) { toast('需先完成实名认证'); return; }
        friend.betUnits = (friend.betUnits || 0) + 1;
        const add = creditReferral(demo, friend, 0.5, '有效投注RM1,000');
        store().save();
        if (add) toast('好友有效投注满 RM1,000，系统自动解锁 RM0.50');
        refreshPromo(); return;
      }
      if (name === 'ref-friend-cap' && friend && !friend.disqualified) {
        if (!friend.kyc) { toast('需先完成实名认证'); return; }
        const room = r2(Math.max(0, REFERRAL_SOURCE.cap - (friend.unlocked || 0)));
        if (room <= 0) { toast('该好友邀请奖励已达最高 RM1,000'); return; }
        friend.betUnits = (friend.betUnits || 0) + Math.ceil(room / 0.5);
        creditReferral(demo, friend, room, '有效投注累计至上限');
        store().save(); toast('该好友邀请奖励已达最高 RM1,000，系统自动解锁'); refreshPromo(); return;
      }
    }
    const stepBtn = e.target.closest('[data-promo-step]');
    if (stepBtn) {
      const [key, idx] = stepBtn.getAttribute('data-promo-step').split(':');
      state.promoInspect = state.promoInspect || {};
      state.promoInspect[key] = Number(idx);
      refreshPromo();
    }
  }, true);


  document.addEventListener('click', e => {
    const game = e.target.closest('[data-action="nfc-open-game"]');
    if (game && !game.disabled) {
      const demo = store().load();
      demo.freeChallenge.currentGame = game.getAttribute('data-nfc-game') || 'lucky-star';
      store().save();
      navigate('demo=nfc-play');
    }
  }, true);


  function applyWheelDeposit(kind) {
    const demo = store().load();
    const w = demo.dailyWheel;
    if (kind === 'ok') {
      if ((w.earnedToday || 0) >= 3) {
        toast('每名会员每日最多获得3次抽奖机会。');
        refreshPromo();
        return;
      }
      w.earnedToday = (w.earnedToday || 0) + 1;
      store().save();
      toast('单笔充值 RM150 已成功入账，获得1次免费抽奖机会');
      refreshPromo();
      return;
    }
    if (kind === '100') { toast('充值须超过 RM100 才可获得抽奖机会，RM100 不计入。充值不可合并计算抽奖次数。'); return; }
    if (kind === '50') { toast('充值须超过 RM100 才可获得抽奖机会。充值不可合并计算抽奖次数。'); return; }
    if (kind === 'merge') { toast('两笔各 RM80 不可合并计算抽奖次数，未获得抽奖机会。'); return; }
    if (kind === 'void') { toast('取消、退款或异常充值不产生抽奖机会。'); return; }
  }
  function runDwSpin() {
    const demo = store().load();
    const w = demo.dailyWheel;
    if (w.spinning || dwSpinsLeft(w) <= 0) return;
    const prize = DW_DEMO_PRIZES[Math.min(w.spinCount || 0, DW_DEMO_PRIZES.length - 1)] || WHEEL_SOURCE.prizes[WHEEL_SOURCE.prizes.length - 1];
    const prizeIndex = WHEEL_SOURCE.prizes.indexOf(prize);
    const from = w.lastAngle || 0;
    const target = dwTargetAngle(prizeIndex < 0 ? 0 : prizeIndex, from);
    w.spinning = true;
    store().save();
    renderDwSpin();
    const wheel = document.getElementById('lucky-wheel');
    if (wheel) {
      wheel.style.transition = 'none';
      wheel.style.transform = 'rotate(' + from + 'deg)';
      void wheel.offsetWidth;
      wheel.style.transition = 'transform ' + (DW_SPIN_MS / 1000) + 's cubic-bezier(0.12, 0.7, 0.1, 1)';
      wheel.style.transform = 'rotate(' + target + 'deg)';
    }
    const btn = document.getElementById('dw-spin-btn');
    if (btn) { btn.disabled = true; btn.textContent = '转盘转动中…'; }
    store().later(() => {
      const demo = store().load();
      const w = demo.dailyWheel;
      w.spinning = false;
      w.lastAngle = target;
      w.usedToday = (w.usedToday || 0) + 1;
      w.spinCount = (w.spinCount || 0) + 1;
      w.lastPrize = prize;
      w.bonusWallet = r2((w.bonusWallet || 0) + prize);
      w.turnoverNeed = r2((w.turnoverNeed || 0) + prize * WHEEL_SOURCE.wagerMult);
      w.history = (w.history || []).concat([{ prize, need: prize * WHEEL_SOURCE.wagerMult, day: w.day || 1 }]);
      store().save();
      renderDwSpin();
      toast('演示结果：获得 RM ' + money(prize) + '，已进入活动彩金钱包（需完成 RM ' + money(prize * WHEEL_SOURCE.wagerMult) + ' 有效流水）');
    }, DW_SPIN_MS);
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('button[data-action]');
    if (!btn || btn.disabled) return;
    const name = btn.getAttribute('data-action');
    if (name === 'dw-deposit-ok') { applyWheelDeposit('ok'); return; }
    if (name === 'dw-deposit-100') { applyWheelDeposit('100'); return; }
    if (name === 'dw-deposit-50') { applyWheelDeposit('50'); return; }
    if (name === 'dw-deposit-merge') { applyWheelDeposit('merge'); return; }
    if (name === 'dw-deposit-void') { applyWheelDeposit('void'); return; }
    if (name === 'dw-spin') { runDwSpin(); return; }
    if (name === 'dw-bet-valid' || name === 'dw-bet-other') {
      const demo = store().load();
      const w = demo.dailyWheel;
      if ((w.bonusWallet || 0) <= 0) return;
      if (name === 'dw-bet-other') { toast('流水仅限指定游戏商：FUMA、WUDI、BWG。其他游戏商投注不计入。'); return; }
      const provider = btn.getAttribute('data-provider') || '指定游戏商';
      const add = r2(Math.min(188, Math.max(0, (w.turnoverNeed || 0) - (w.turnover || 0))));
      w.turnover = r2((w.turnover || 0) + add);
      store().save();
      toast(add > 0 ? ('演示' + provider + '有效投注 RM 188.00，计入流水 RM ' + money(add)) : '所需流水已完成');
      renderDwTurnover();
    }
  }, true);

  const _renderDetail = renderDetail;
  window.renderDetail = function (p, tabIndex = 0) {
    if (p.readOnly) { renderSourceDocument(p); return; }
    store() && store().ensureBanner && store().ensureBanner();
    store() && store().load && store().load();
    const selected = Math.min(Math.max(tabIndex, 0), p.tabs.length - 1);
    const pages = {
      newcomer: window.renderNewcomerDemo,
      referral: window.renderReferralDemo,
      growth: window.renderGrowthDemo,
      anniversary: window.renderAnniversaryDemo,
      maintenance: window.renderMaintenanceDemo,
      'newcomer-trial': trial,
      'newcomer-free-challenge': window.renderFreeChallengeDemo,
      'daily-wheel': window.renderDailyWheelDemo
    };
    let body;
    if (selected === 1) body = rules(p);
    else if (selected === 2 && p.id === 'anniversary') body = window.renderAnniversaryTickets();
    else if (selected === 2) body = tickets();
    else body = (pages[p.id] || (() => ''))();
    const stickyFor = {
      'newcomer-trial': trialSticky,
      'newcomer-free-challenge': () => sticky(nfcCta(demoOf().freeChallenge)),
      'daily-wheel': () => sticky(dwCta(demoOf().dailyWheel)),
      newcomer: () => sticky(ncCta(demoOf().newcomer)),
      referral: () => sticky(rfCta(demoOf().referral)),
      growth: () => sticky(grCta(demoOf().growth)),
      anniversary: () => sticky(anCta(demoOf().anniversary)),
      maintenance: () => sticky(mtCta(demoOf().maintenance))
    };
    const stickyHtml = selected === 0 && stickyFor[p.id] ? stickyFor[p.id]() : (p.id === 'anniversary' && selected === 2 ? sticky(anCta(demoOf().anniversary)) : '');
    const hero = p.banner ? `<div class="detail-hero">${banner(p)}</div>` : '';
    const detailClass = ['newcomer-trial', 'newcomer-free-challenge', 'daily-wheel', 'newcomer', 'referral', 'growth', 'anniversary', 'maintenance'].includes(p.id) ? 'trial-detail promo-detail' : '';
    $('#app').innerHTML = `<article class="detail ${detailClass}"><button class="back-link" data-back>${icon('arrow')} 返回活动列表</button>${hero}<div class="detail-heading"><span class="badge">${p.badge}</span><h2>${p.title}</h2><p class="trial-prose">${p.secondary}</p></div><div class="activity-tabs" aria-label="活动内容">${p.tabs.map((t, i) => `<button data-tab="${i}" class="${i === selected ? 'active' : ''}" aria-pressed="${i === selected}">${t}</button>`).join('')}</div><div id="detail-content">${body}</div>${stickyHtml}<button class="support-link" data-support>需要帮助？联系客服</button>${footer()}</article>`;
    if (p.id === 'referral' && selected === 0 && $('#friend-search')) $('#friend-search').addEventListener('input', updateSearch);
  };

  const _tickets = tickets;
  window.tickets = function () { return window.renderAnniversaryTickets ? window.renderAnniversaryTickets() : _tickets(); };

  document.addEventListener('click', e => {
    const period = e.target.closest('[data-period]');
    if (period && currentRoute().get('activity') === 'anniversary') {
      // existing app.js also handles data-period; allow default
    }
  }, true);

  if (store()) store().ensureBanner();
  route();
})();
