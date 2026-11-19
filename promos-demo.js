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
    (window.renderDetail || renderDetail)(p, Number.isFinite(tab) ? tab : 0);
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
      'daily-wheel': () => ({ labels: DW_JOURNEY, current: dwIndex(demo.dailyWheel), finished: (demo.dailyWheel.converted || 0) > 0 && (demo.dailyWheel.bonusWallet || 0) <= 0 }),
      'vip-benefits': () => ({ labels: VB_JOURNEY, current: vbIndex(demo.vipBenefits), finished: (demo.vipBenefits.history || []).length > 0 && vbPendingCount(demo.vipBenefits) === 0 }),
      'returning-member': () => ({ labels: RET_JOURNEY, current: retIndex(demo.returningMember), finished: demo.returningMember.redeemed }),
      'first-deposit-bonus': () => ({ labels: FD_JOURNEY, current: fdIndex(demo.firstDepositBonus), finished: demo.firstDepositBonus.converted }),
      'daily-reload': () => ({ labels: DR_JOURNEY, current: drIndex(demo.dailyReload), finished: (demo.dailyReload.historyCount || 0) > 0 && !demo.dailyReload.deposited })
    };
    if (map[id]) return map[id]();
    const byScreen = { nc: 'newcomer', ref: 'referral', gr: 'growth', an: 'anniversary', mt: 'maintenance', nfc: 'newcomer-free-challenge', dw: 'daily-wheel', vb: 'vip-benefits', ret: 'returning-member', fd: 'first-deposit-bonus', dr: 'daily-reload' };
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
    if (!c.claimed && retTrialTaken()) return ['不可领取（互斥）', 'nfc-blocked', false];
    if (!c.claimed) return ['领取RM100试玩额度', 'nfc-go-claim', false];
    if (c.trialEnded) return ['未达RM200，不可兑换', 'demo-done', true];
    if (c.reachedTarget) return ['兑换RM100现金', 'nfc-go-redeem', false];
    return ['去试玩', 'nfc-go-play', false];
  }
  function nfcStatus(c) {
    if (c.redeemed) return ['已领取 · 终身限领一次', 'muted'];
    if (!c.claimed && retTrialTaken()) return ['与老会员回归互斥', 'muted'];
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
    return `${store().journeyBar()}${nfcBalancePanel(c)}<section class="reward-feature trial-hero"><div class="panel-top"><span class="eyebrow">活动奖励</span><span class="status-badge ${statusCls}">${status}</span></div><div class="amount"><small>RM</small>100<span>.00</span></div><p class="trial-prose">${CHALLENGE_SOURCE.reward}</p>${path}</section><section class="section-panel"><div class="section-header"><h3>参与条件</h3></div>${checks(CHALLENGE_SOURCE.eligibility)}</section><section class="section-panel flow-panel"><div class="section-header"><h3>活动流程</h3><span>点击步骤查看要求</span></div>${stepper(CHALLENGE_SOURCE.steps, viewStep, 'newcomer-free-challenge')}<div class="step-explanation trial-prose"><div class="step-heading"><span class="step-kicker">0${viewStep + 1} / 04</span><h4>${s.heading}</h4></div><p>${s.text}</p></div></section><section class="section-panel"><div class="section-header"><h3>重要条款</h3></div>${termsList(CHALLENGE_SOURCE.terms)}</section>${nfcExclusionPanel(c)}${retTrialTaken() && !c.claimed ? '' : `<button type="button" class="outline-wide" data-action="nfc-toggle-ret">演示已领取「老会员回归，免费赢取RM188」（互斥）</button>`}<button type="button" class="outline-wide" data-tab="1">查看完整活动规则 ${icon('arrow')}</button>`;
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

  /* ------------ VIP会员专属福利 ------------ */
  const VB_JOURNEY = ['当前等级', '领取福利', '查询记录'];
  const VB_EXAMPLE = '示例 · 以统一等级表为准';

  function vbOf() {
    return demoOf().vipBenefits;
  }
  function vbRow(level) {
    return VIP_SOURCE.exampleLevels.find(l => l.level === level) || VIP_SOURCE.exampleLevels[0];
  }
  function vbName(level) {
    return vbRow(level).name;
  }
  function vbPct(rate) {
    return (Math.round(rate * 10000) / 100).toFixed(2) + '%';
  }
  function vbNext(v) {
    return VIP_SOURCE.exampleLevels.find(l => l.level === (v.pendingUpgrade || v.level) + 1) || null;
  }
  function vbCanClaimUpgrade(v) {
    return v.pendingUpgrade > 0 && !(v.claimedUpgrades || []).includes(v.pendingUpgrade);
  }
  function vbCanClaimRetention(v) {
    return v.retentionResult === 'retained' && v.claimedRetentionCycle !== v.cycle;
  }
  function vbOutstandingRebate(v) {
    return r2((v.unsettledBets || 0) * vbRow(v.level).rebate);
  }
  function vbCanClaimWeekly(v) {
    return v.claimedWeek !== v.week;
  }
  function vbCanClaimFestival(v) {
    return !!v.festivalActive && !(v.claimedFestivals || []).includes(v.festival);
  }
  function vbPendingCount(v) {
    return [vbCanClaimUpgrade(v), vbCanClaimRetention(v), vbOutstandingRebate(v) > 0, vbCanClaimWeekly(v), vbCanClaimFestival(v)].filter(Boolean).length;
  }
  function vbIndex(v) {
    const history = v.history || [];
    if (history.length && vbPendingCount(v) === 0) return 2;
    if (history.length || v.pendingUpgrade || v.retentionResult || (v.qualifyingBets || 0) > 0 || v.week > 1 || !v.festivalActive) return 1;
    return 0;
  }
  function vbCta(v) {
    if (vbCanClaimUpgrade(v)) return ['领取升级礼金', 'vb-claim-upgrade', false];
    if (vbCanClaimRetention(v)) return ['领取保级礼金', 'vb-claim-retention', false];
    if (vbOutstandingRebate(v) > 0) return ['领取返水', 'vb-claim-rebate', false];
    if (vbCanClaimWeekly(v)) return ['领取每周关怀礼金', 'vb-claim-weekly', false];
    if (vbCanClaimFestival(v)) return ['领取节日礼金', 'vb-claim-festival', false];
    return ['查看我的VIP记录', 'vb-go-records', false];
  }
  function vbStatus(v) {
    const n = vbPendingCount(v);
    if (n) return ['可领取 · ' + n + ' 项', ''];
    if ((v.history || []).length) return ['本周期权益已领取', 'muted'];
    return ['已认证 · ' + vbName(v.level), ''];
  }
  function vbExampleTag() {
    return `<span class="example-tag">${VB_EXAMPLE}</span>`;
  }
  function vbAmt(n) {
    return `RM ${money(n)}`;
  }
  function vbCredit(demo, v, title, amount, status, note) {
    const row = { title, amount, status, time: new Date().toISOString(), note: note || VB_EXAMPLE };
    v.history = v.history || [];
    v.history.unshift(row);
    if (amount > 0) demo.mainWallet = r2((demo.mainWallet || 0) + amount);
    demo.records.unshift({ id: 'vip-' + Date.now(), title: 'VIP会员专属福利 · ' + title, amount, status, time: row.time });
    store().save();
  }
  function vbRefresh() {
    const screen = currentRoute().get('demo') || '';
    if (screen.startsWith('vb-') && typeof window.PromoRenderDemo === 'function') {
      window.PromoRenderDemo(screen);
      return;
    }
    refreshPromo();
  }
  function vbExampleTable() {
    return `<section class="section-panel vip-example-panel">
      <div class="section-header"><h3>示例等级表</h3><span>演示用 · VIP1–VIP3</span></div>
      <p class="fine-print trial-prose">${VIP_SOURCE.exampleNote}</p>
      <div class="table-wrap"><table class="prize-table vip-example-table">
        <thead><tr><th>等级</th><th>升级礼金</th><th>保级礼金</th><th>返水比例</th><th>每周关怀</th><th>节日礼金</th></tr></thead>
        <tbody>${VIP_SOURCE.exampleLevels.map(l => `<tr${l.level === (vbOf().level) ? ' class="current-level"' : ''}><td>${l.name}</td><td>${vbAmt(l.upgrade)}</td><td>${vbAmt(l.retention)}</td><td>${vbPct(l.rebate)}</td><td>${vbAmt(l.weekly)}</td><td>${vbAmt(l.festival)}</td></tr>`).join('')}</tbody>
      </table></div>
      ${vbExampleTag()}
    </section>`;
  }
  function vbBenefitState(v, id) {
    if (id === 'upgrade') {
      if (vbCanClaimUpgrade(v)) return ['可领取', ''];
      if (v.pendingUpgrade) return ['该等级已领取', 'muted'];
      if (!vbNext(v)) return ['已达演示最高等级', 'muted'];
      return ['待升级后领取', ''];
    }
    if (id === 'retention') {
      if (vbCanClaimRetention(v)) return ['可领取', ''];
      if (v.retentionResult === 'failed') return ['未达保级 · 无奖励', 'muted'];
      if (v.claimedRetentionCycle === v.cycle) return ['本周期已领取', 'muted'];
      return ['待保级结果', ''];
    }
    if (id === 'rebate') {
      const amt = vbOutstandingRebate(v);
      if (amt > 0) return ['待领取 ' + vbAmt(amt), ''];
      if ((v.rebateClaimed || 0) > 0) return ['已结算部分返水', 'muted'];
      return ['待有效投注', ''];
    }
    if (id === 'weekly') {
      if (vbCanClaimWeekly(v)) return ['本周可领取', ''];
      return ['本周已领取', 'muted'];
    }
    if (id === 'festival') {
      if (!v.festivalActive) return ['不在节日期间', 'muted'];
      if (vbCanClaimFestival(v)) return ['节日期间可领取', ''];
      return ['本节日已领取', 'muted'];
    }
    return ['', ''];
  }
  function vbBenefitCards(v) {
    return `<div class="vip-benefit-grid">${VIP_SOURCE.benefits.map(b => {
      const [st, cls] = vbBenefitState(v, b.id);
      return `<button type="button" class="vip-benefit-card" data-demo-nav="demo=${b.screen}" aria-label="查看${b.title}">
        <div class="panel-top"><span class="eyebrow">${b.title}</span><span class="status-badge ${cls}">${st}</span></div>
        <p class="trial-prose">${b.text}</p>
        <span class="card-link">进入演示 ${icon('arrow')}</span>
      </button>`;
    }).join('')}</div>`;
  }
  function vbMemberBar(v) {
    const demo = demoOf();
    return `<div class="wallet-pair vip-member-bar">
      <div class="wallet-card"><span>当前等级</span><strong>${vbName(v.level)}</strong><small>演示等级 · 已登录已认证</small></div>
      <div class="wallet-card main ${demo.mainWallet > 0 ? 'highlight' : ''}"><span>主钱包</span><strong>RM ${money(demo.mainWallet)}</strong><small>权益领取后进入此钱包</small></div>
    </div>`;
  }
  function vbRecordsMarkup(v, compact) {
    const rows = (v.history || []).length
      ? `<ul class="record-list">${v.history.map(r => `<li><div><strong>${r.title}</strong><small>${store().formatRecordTime(r.time)}${r.note ? ' · ' + r.note : ''}</small></div><div class="record-right"><b>${vbAmt(r.amount)}</b><span class="status-badge">${r.status}</span></div></li>`).join('')}</ul>`
      : `<div class="compact-empty">${icon('receipt')}<h4>暂无奖励记录</h4><p class="trial-prose">领取升级礼金、保级礼金、返水、每周关怀或节日礼金后，记录将显示在这里。</p></div>`;
    return `${compact ? '' : vbMemberBar(v)}
      <section class="section-panel">
        <div class="section-header"><h3>可查询资料</h3><span>会员等级 · 有效投注 · 奖励记录</span></div>
        <ul class="kyc-summary">
          <li><span>会员等级</span><strong>${vbName(v.level)}（演示）</strong></li>
          <li><span>有效投注</span><strong>RM ${money(v.qualifyingBets || 0)}</strong></li>
          <li><span>不计入投注</span><strong>RM ${money(v.nonQualifyingBets || 0)}</strong></li>
          <li><span>已领返水</span><strong>RM ${money(v.rebateClaimed || 0)}</strong></li>
          <li><span>当前周期</span><strong>第 ${v.cycle} 个保级周期 · 第 ${v.week} 周</strong></li>
          <li><span>当前节日</span><strong>${v.festival}（示例）${v.festivalActive ? ' · 节日期间' : ' · 已结束'}</strong></li>
        </ul>
        ${vbExampleTag()}
      </section>
      <section class="section-panel">
        <div class="section-header"><h3>奖励记录</h3><span>${(v.history || []).length} 条</span></div>
        ${rows}
      </section>`;
  }
  window.renderVipBenefitsDemo = function () {
    store().ensureBanner();
    const v = store().load().vipBenefits;
    const [status, statusCls] = vbStatus(v);
    return `${store().journeyBar()}${vbMemberBar(v)}
      <section class="reward-feature trial-hero vip-hero">
        <div class="panel-top"><span class="eyebrow">活动奖励</span><span class="status-badge ${statusCls}">${status}</span></div>
        <p class="trial-prose">${VIP_SOURCE.reward}</p>
        <p class="trial-prose">${VIP_SOURCE.summary}</p>
      </section>
      <section class="section-panel">
        <div class="section-header"><h3>参与条件</h3><span>演示账户</span></div>
        ${checks(['已登录（演示会员陈美玲）', '已完成实名认证', '当前演示等级 ' + vbName(v.level) + '，享有对应VIP权益'])}
      </section>
      <section class="section-panel">
        <div class="section-header"><h3>五大专属福利</h3><span>点击卡片进入演示</span></div>
        ${vbBenefitCards(v)}
      </section>
      ${vbExampleTable()}
      <section class="section-panel">
        <div class="section-header"><h3>风控补充</h3></div>
        ${termsList(VIP_SOURCE.terms)}
      </section>
      <button type="button" class="outline-wide" data-tab="2">查看我的VIP记录 ${icon('arrow')}</button>
      <button type="button" class="outline-wide" data-tab="1">查看完整活动规则 ${icon('arrow')}</button>
      <button type="button" class="text-button trial-reset" data-action="demo-reset">重置演示</button>`;
  };
  window.renderVipRecordsPanel = function () {
    const v = store().load().vipBenefits;
    return `${store().journeyBar()}${vbRecordsMarkup(v)}
      <button type="button" class="outline-wide" data-tab="0">返回活动详情</button>
      <button type="button" class="text-button trial-reset" data-action="demo-reset">重置演示</button>`;
  };
  function renderVbUpgrade() {
    const v = vbOf();
    const next = vbNext(v);
    const canClaim = vbCanClaimUpgrade(v);
    const target = canClaim ? vbRow(v.pendingUpgrade) : null;
    const already = (v.claimedUpgrades || []).map(vbName).join('、');
    $('#app').innerHTML = page('VIP升级礼金', `
      ${vbMemberBar(v)}
      <section class="section-panel">
        <p class="trial-prose">${VIP_SOURCE.benefits[0].text}</p>
        <p class="trial-prose">升级礼金每个等级仅能领取一次。</p>
        ${vbExampleTag()}
      </section>
      <section class="section-panel">
        <div class="section-header"><h3>演示进度</h3><span>${vbName(v.level)}</span></div>
        <ul class="kyc-summary">
          <li><span>当前等级</span><strong>${vbName(v.level)}（演示）</strong></li>
          <li><span>待领取等级</span><strong>${canClaim ? vbName(v.pendingUpgrade) + ' · ' + vbAmt(target.upgrade) : '暂无'}</strong></li>
          <li><span>已领取等级</span><strong>${already || '无'}</strong></li>
        </ul>
        ${canClaim ? `<p class="fine-print trial-prose">已升级至${vbName(v.pendingUpgrade)}，可领取对应升级奖励（示例 ${vbAmt(target.upgrade)}，以统一等级表为准）。</p>` : ''}
        ${canClaim ? '<button type="button" class="primary" data-action="vb-claim-upgrade">领取升级礼金</button>' : ''}
        ${!canClaim && (v.claimedUpgrades || []).includes(v.level) && !next ? '<button type="button" class="primary" disabled>该等级升级礼金已领取</button>' : ''}
        ${!canClaim && next ? `<button type="button" class="${canClaim ? 'outline-wide' : 'primary'}" data-action="vb-simulate-upgrade">模拟升级至 ${next.name}</button>` : ''}
        ${!canClaim && !next ? '<button type="button" class="outline-wide" disabled>已达演示最高等级</button>' : ''}
        ${canClaim ? '<button type="button" class="outline-wide" data-action="vb-claim-upgrade-again">再次领取（将提示不可重复）</button>' : (v.claimedUpgrades || []).includes(v.level) ? '<button type="button" class="outline-wide" data-action="vb-claim-upgrade">再次领取（将提示不可重复）</button>' : ''}
      </section>
      ${vbExampleTable()}
    `, 'activity=vip-benefits');
    document.title = 'VIP升级礼金 · TPOWER';
  }
  function renderVbRetention() {
    const v = vbOf();
    const amt = vbRow(v.level).retention;
    const canClaim = vbCanClaimRetention(v);
    const failed = v.retentionResult === 'failed';
    const claimed = v.claimedRetentionCycle === v.cycle;
    const resultLabel = v.retentionResult === 'retained' ? '已达保级条件' : failed ? '未达保级条件' : '尚未产生结果';
    $('#app').innerHTML = page('VIP保级礼金', `
      ${vbMemberBar(v)}
      <section class="section-panel">
        <p class="trial-prose">${VIP_SOURCE.benefits[1].text}</p>
        <p class="trial-prose">保级礼金依实际保级结果发放，每周期限领一次。</p>
        ${vbExampleTag()}
      </section>
      <section class="section-panel">
        <div class="section-header"><h3>本周期结果</h3><span>第 ${v.cycle} 个演示周期</span></div>
        <ul class="kyc-summary">
          <li><span>当前等级</span><strong>${vbName(v.level)}（演示）</strong></li>
          <li><span>保级结果</span><strong>${resultLabel}</strong></li>
          <li><span>示例保级礼金</span><strong>${vbAmt(amt)}</strong></li>
        </ul>
        ${canClaim ? `<p class="fine-print trial-prose">本周期已达到保级条件，可领取保级奖励（示例 ${vbAmt(amt)}，以统一等级表为准）。</p>` : ''}
        ${failed ? '<p class="fine-print trial-prose">本周期未达到保级条件，无保级礼金。</p>' : ''}
        ${canClaim ? '<button type="button" class="primary" data-action="vb-claim-retention">领取保级礼金</button>' : ''}
        ${claimed ? '<button type="button" class="primary" disabled>本周期保级礼金已领取</button><button type="button" class="outline-wide" data-action="vb-claim-retention">再次领取（将提示不可重复）</button>' : ''}
        ${failed && !claimed ? '<button type="button" class="primary" disabled>本周期未达保级，无奖励</button>' : ''}
        ${!claimed ? '<button type="button" class="outline-wide" data-action="vb-simulate-retain">模拟保级成功</button><button type="button" class="outline-wide" data-action="vb-simulate-fail">模拟未达保级</button>' : ''}
        <button type="button" class="text-button" data-action="vb-next-cycle">模拟下一周期</button>
      </section>
    `, 'activity=vip-benefits');
    document.title = 'VIP保级礼金 · TPOWER';
  }
  function renderVbRebate() {
    const v = vbOf();
    const row = vbRow(v.level);
    const outstanding = vbOutstandingRebate(v);
    $('#app').innerHTML = page('VIP专属返水', `
      ${vbMemberBar(v)}
      <section class="section-panel">
        <p class="trial-prose">${VIP_SOURCE.benefits[2].text}</p>
        <p class="trial-prose">返水仅计算符合规则的有效投注。</p>
        ${vbExampleTag()}
      </section>
      <section class="section-panel">
        <div class="section-header"><h3>返水试算</h3><span>${vbName(v.level)} · 示例比例 ${vbPct(row.rebate)}</span></div>
        <ul class="kyc-summary">
          <li><span>有效投注</span><strong>RM ${money(v.qualifyingBets || 0)}</strong></li>
          <li><span>不计入投注</span><strong>RM ${money(v.nonQualifyingBets || 0)}</strong></li>
          <li><span>待结算有效投注</span><strong>RM ${money(v.unsettledBets || 0)}</strong></li>
          <li><span>待领取返水</span><strong>${vbAmt(outstanding)}</strong></li>
          <li><span>已领返水</span><strong>${vbAmt(v.rebateClaimed || 0)}</strong></li>
        </ul>
        <p class="fine-print trial-prose">演示按当前等级的示例返水比例计算：待结算有效投注 × ${vbPct(row.rebate)}。实际返水比例以统一等级表为准。</p>
        <div class="vip-bet-actions">
          <button type="button" class="outline-wide" data-action="vb-bet-valid">演示有效投注 RM100</button>
          <button type="button" class="outline-wide" data-action="vb-bet-other">演示无效投注 RM100</button>
        </div>
        ${outstanding > 0 ? '<button type="button" class="primary" data-action="vb-claim-rebate">领取返水</button>' : '<button type="button" class="primary" disabled>暂无可领返水</button>'}
      </section>
    `, 'activity=vip-benefits');
    document.title = 'VIP专属返水 · TPOWER';
  }
  function renderVbWeekly() {
    const v = vbOf();
    const amt = vbRow(v.level).weekly;
    const can = vbCanClaimWeekly(v);
    $('#app').innerHTML = page('VIP每周关怀礼金', `
      ${vbMemberBar(v)}
      <section class="section-panel">
        <p class="trial-prose">${VIP_SOURCE.benefits[3].text}</p>
        <p class="trial-prose">每周关怀礼金每人每周期限领一次。</p>
        ${vbExampleTag()}
      </section>
      <section class="section-panel">
        <div class="section-header"><h3>本周关怀</h3><span>第 ${v.week} 个演示周</span></div>
        <ul class="kyc-summary">
          <li><span>当前等级</span><strong>${vbName(v.level)}（演示）</strong></li>
          <li><span>领取条件</span><strong>已符合指定等级（演示）</strong></li>
          <li><span>示例关怀礼金</span><strong>${vbAmt(amt)}</strong></li>
        </ul>
        ${can ? `<button type="button" class="primary" data-action="vb-claim-weekly">领取每周关怀礼金</button>` : `<button type="button" class="primary" disabled>本周关怀礼金已领取</button><button type="button" class="outline-wide" data-action="vb-claim-weekly">再次领取（将提示不可重复）</button>`}
        <button type="button" class="text-button" data-action="vb-next-week">模拟下周</button>
      </section>
    `, 'activity=vip-benefits');
    document.title = 'VIP每周关怀礼金 · TPOWER';
  }
  function renderVbFestival() {
    const v = vbOf();
    const amt = vbRow(v.level).festival;
    const can = vbCanClaimFestival(v);
    const claimed = (v.claimedFestivals || []).includes(v.festival);
    $('#app').innerHTML = page('VIP节日礼金', `
      ${vbMemberBar(v)}
      <section class="section-panel">
        <p class="trial-prose">${VIP_SOURCE.benefits[4].text}</p>
        <p class="trial-prose">节日礼金每名符合资格的会员每个节日限领一次。</p>
        ${vbExampleTag()}
      </section>
      <section class="section-panel">
        <div class="section-header"><h3>示例节日</h3><span>${v.festival}${v.festivalActive ? ' · 节日期间' : ' · 已结束'}</span></div>
        <ul class="kyc-summary">
          <li><span>当前等级</span><strong>${vbName(v.level)}（演示）</strong></li>
          <li><span>节日名称</span><strong>${v.festival}（示例节日）</strong></li>
          <li><span>节日期间</span><strong>${v.festivalActive ? '进行中' : '已结束'}</strong></li>
          <li><span>示例节日礼金</span><strong>${vbAmt(amt)}</strong></li>
        </ul>
        ${can ? `<button type="button" class="primary" data-action="vb-claim-festival">领取节日礼金</button>` : ''}
        ${!v.festivalActive ? '<button type="button" class="primary" disabled>当前不在节日期间</button>' : ''}
        ${claimed && v.festivalActive ? '<button type="button" class="primary" disabled>本节日礼金已领取</button><button type="button" class="outline-wide" data-action="vb-claim-festival">再次领取（将提示不可重复）</button>' : ''}
        ${v.festivalActive ? '<button type="button" class="outline-wide" data-action="vb-end-festival">模拟节日结束</button>' : ''}
        <button type="button" class="text-button" data-action="vb-next-festival">模拟下一节日</button>
      </section>
    `, 'activity=vip-benefits');
    document.title = 'VIP节日礼金 · TPOWER';
  }
  function renderVbRecords() {
    const v = vbOf();
    $('#app').innerHTML = page('我的VIP记录', `
      ${vbRecordsMarkup(v, true)}
      <button type="button" class="text-button trial-reset" data-action="demo-reset">重置演示</button>
    `, 'activity=vip-benefits');
    document.title = '我的VIP记录 · TPOWER';
  }

  function handleVipAction(name, demo) {
    if (!name || !name.startsWith('vb-')) return false;
    const v = demo.vipBenefits;
    if (!v) return false;
    if (name === 'vb-go-records') { navigate('activity=vip-benefits&tab=2'); return true; }
    if (name === 'vb-go-upgrade') { navigate('demo=vb-upgrade'); return true; }
    if (name === 'vb-go-retention') { navigate('demo=vb-retention'); return true; }
    if (name === 'vb-go-rebate') { navigate('demo=vb-rebate'); return true; }
    if (name === 'vb-go-weekly') { navigate('demo=vb-weekly'); return true; }
    if (name === 'vb-go-festival') { navigate('demo=vb-festival'); return true; }

    if (name === 'vb-simulate-upgrade') {
      if (vbCanClaimUpgrade(v)) { toast('请先领取当前等级的升级礼金'); vbRefresh(); return true; }
      const next = vbNext(v);
      if (!next) { toast('已达演示最高等级（示例 VIP1–VIP3），以统一等级表为准'); vbRefresh(); return true; }
      v.level = next.level;
      v.pendingUpgrade = next.level;
      store().save();
      toast('已升级至 ' + next.name + '（演示），可领取对应升级奖励');
      vbRefresh();
      return true;
    }
    if (name === 'vb-claim-upgrade' || name === 'vb-claim-upgrade-again') {
      if (!vbCanClaimUpgrade(v)) {
        toast((v.claimedUpgrades || []).includes(v.level) || (v.claimedUpgrades || []).includes(v.pendingUpgrade)
          ? '升级礼金每个等级仅能领取一次。'
          : '请先模拟升级至更高VIP等级');
        vbRefresh();
        return true;
      }
      const row = vbRow(v.pendingUpgrade);
      v.claimedUpgrades = v.claimedUpgrades || [];
      v.claimedUpgrades.push(v.pendingUpgrade);
      v.level = v.pendingUpgrade;
      v.pendingUpgrade = 0;
      vbCredit(demo, v, 'VIP升级礼金 · ' + row.name, row.upgrade, '已到账', VB_EXAMPLE);
      toast('已领取 ' + row.name + ' 升级礼金（示例）' + vbAmt(row.upgrade) + '，以统一等级表为准');
      vbRefresh();
      return true;
    }
    if (name === 'vb-simulate-retain') {
      if (v.claimedRetentionCycle === v.cycle) { toast('保级礼金依实际保级结果发放，每周期限领一次。'); vbRefresh(); return true; }
      v.retentionResult = 'retained';
      store().save();
      toast('本周期已达到保级条件（演示）');
      vbRefresh();
      return true;
    }
    if (name === 'vb-simulate-fail') {
      if (v.claimedRetentionCycle === v.cycle) { toast('保级礼金依实际保级结果发放，每周期限领一次。'); vbRefresh(); return true; }
      v.retentionResult = 'failed';
      store().save();
      toast('本周期未达到保级条件，无保级礼金');
      vbRefresh();
      return true;
    }
    if (name === 'vb-claim-retention') {
      if (v.claimedRetentionCycle === v.cycle) { toast('保级礼金依实际保级结果发放，每周期限领一次。'); vbRefresh(); return true; }
      if (v.retentionResult === 'failed') { toast('本周期未达保级，无奖励'); vbRefresh(); return true; }
      if (v.retentionResult !== 'retained') { toast('请先模拟本周期保级结果'); vbRefresh(); return true; }
      const amt = vbRow(v.level).retention;
      v.claimedRetentionCycle = v.cycle;
      vbCredit(demo, v, 'VIP保级礼金 · 第' + v.cycle + '周期 · ' + vbName(v.level), amt, '已到账', VB_EXAMPLE);
      toast('已领取保级礼金（示例）' + vbAmt(amt) + '，以统一等级表为准');
      vbRefresh();
      return true;
    }
    if (name === 'vb-next-cycle') {
      v.cycle = (v.cycle || 1) + 1;
      v.retentionResult = null;
      store().save();
      toast('已进入第 ' + v.cycle + ' 个演示周期');
      vbRefresh();
      return true;
    }
    if (name === 'vb-bet-valid') {
      const add = VIP_SOURCE.exampleBet;
      v.qualifyingBets = r2((v.qualifyingBets || 0) + add);
      v.unsettledBets = r2((v.unsettledBets || 0) + add);
      store().save();
      toast('演示有效投注 ' + vbAmt(add) + '，计入返水计算');
      vbRefresh();
      return true;
    }
    if (name === 'vb-bet-other') {
      const add = VIP_SOURCE.exampleBet;
      v.nonQualifyingBets = r2((v.nonQualifyingBets || 0) + add);
      store().save();
      toast('返水仅计算符合规则的有效投注。该笔投注不计入。');
      vbRefresh();
      return true;
    }
    if (name === 'vb-claim-rebate') {
      const amt = vbOutstandingRebate(v);
      if (amt <= 0) { toast('暂无可领返水。返水仅计算符合规则的有效投注。'); vbRefresh(); return true; }
      v.unsettledBets = 0;
      v.rebateClaimed = r2((v.rebateClaimed || 0) + amt);
      vbCredit(demo, v, 'VIP专属返水 · ' + vbName(v.level), amt, '已到账', '按示例返水比例计算，以统一等级表为准');
      toast('已领取返水（示例）' + vbAmt(amt) + '，以统一等级表为准');
      vbRefresh();
      return true;
    }
    if (name === 'vb-claim-weekly') {
      if (v.claimedWeek === v.week) { toast('每周关怀礼金每人每周期限领一次。'); vbRefresh(); return true; }
      const amt = vbRow(v.level).weekly;
      v.claimedWeek = v.week;
      vbCredit(demo, v, 'VIP每周关怀礼金 · 第' + v.week + '周 · ' + vbName(v.level), amt, '已到账', VB_EXAMPLE);
      toast('已领取每周关怀礼金（示例）' + vbAmt(amt) + '，以统一等级表为准');
      vbRefresh();
      return true;
    }
    if (name === 'vb-next-week') {
      v.week = (v.week || 1) + 1;
      store().save();
      toast('已进入第 ' + v.week + ' 个演示周');
      vbRefresh();
      return true;
    }
    if (name === 'vb-claim-festival') {
      if (!v.festivalActive) { toast('当前不在节日期间，无法领取节日礼金。'); vbRefresh(); return true; }
      if ((v.claimedFestivals || []).includes(v.festival)) { toast('节日礼金每名符合资格的会员每个节日限领一次。'); vbRefresh(); return true; }
      const amt = vbRow(v.level).festival;
      v.claimedFestivals = v.claimedFestivals || [];
      v.claimedFestivals.push(v.festival);
      vbCredit(demo, v, 'VIP节日礼金 · ' + v.festival + '（示例节日）', amt, '已到账', VB_EXAMPLE);
      toast('已领取 ' + v.festival + ' 节日礼金（示例）' + vbAmt(amt) + '，以统一等级表为准');
      vbRefresh();
      return true;
    }
    if (name === 'vb-end-festival') {
      v.festivalActive = false;
      store().save();
      toast('演示：' + v.festival + ' 节日期间已结束');
      vbRefresh();
      return true;
    }
    if (name === 'vb-next-festival') {
      const list = VIP_SOURCE.festivals;
      const i = Math.max(0, list.indexOf(v.festival));
      v.festival = list[(i + 1) % list.length];
      v.festivalActive = true;
      store().save();
      toast('演示进入下一节日：' + v.festival + '（示例节日）');
      vbRefresh();
      return true;
    }
    return false;
  }


  /* ------------ 老会员回归，免费赢取RM188 ------------ */
  const RET_JOURNEY = ['领取', '试玩', '达标', '兑换', '到账'];
  const RET_WIN = [
    { delta: 20, symbols: ['7', '7', '7'] },
    { delta: -10, symbols: ['星', 'BAR', '7'] },
    { delta: 30, symbols: ['星', '星', '星'] },
    { delta: 20, symbols: ['铃', '铃', '铃'] },
    { delta: 20, symbols: ['7', '7', 'BAR'] },
    { delta: 20, symbols: ['7', '7', '7'] }
  ];
  const RET_LOSE = [
    { delta: -40, symbols: ['BAR', '星', '7'] },
    { delta: -40, symbols: ['铃', 'BAR', '星'] },
    { delta: -20, symbols: ['7', '星', 'BAR'] }
  ];
  const RET_GAMES = [
    { id: 'lucky-star', name: '幸运星老虎机', tag: '指定试玩', icon: 'slot' },
    { id: 'golden-spin', name: '黄金旋转', tag: '指定试玩', icon: 'crown' },
    { id: 'classic-fruit', name: '经典水果机', tag: '指定试玩', icon: 'gift' }
  ];
  function retOf() {
    return demoOf().returningMember;
  }
  function nfcTrialTaken(demo) {
    const c = (demo || demoOf()).freeChallenge || {};
    return !!(c.claimed || c.redeemed);
  }
  function retTrialTaken(demo) {
    const r = (demo || demoOf()).returningMember || {};
    return !!(r.claimed || r.redeemed);
  }
  function retEligible(r, demo) {
    demo = demo || demoOf();
    const kycOk = demo.kyc && demo.kyc.status === 'approved';
    return !!(r.deposited && kycOk);
  }
  function retIndex(r) {
    if (!r.claimed) return 0;
    if (r.redeemed) return 4;
    if (r.reachedTarget) {
      const screen = currentRoute().get('demo');
      if (screen === 'ret-redeem-success') return 4;
      if (screen === 'ret-redeem' || screen === 'ret-redeem-process') return 3;
      return 2;
    }
    return 1;
  }
  function retCta(r) {
    if (r.redeemed) return ['已领取', 'demo-done', true];
    if (nfcTrialTaken()) return ['不可领取（互斥）', 'ret-blocked', false];
    if (!retEligible(r)) return ['不符资格', 'ret-ineligible', false];
    if (!r.claimed) return ['领取RM100试玩额度', 'ret-go-claim', false];
    if (r.trialEnded) return ['未达到RM200，不可兑换', 'demo-done', true];
    if (r.reachedTarget) return ['兑换RM188现金', 'ret-go-redeem', false];
    return ['去试玩', 'ret-go-play', false];
  }
  function retStatus(r) {
    if (r.redeemed) return ['已领取 · 仅限领取一次', 'muted'];
    if (nfcTrialTaken() && !r.claimed) return ['与新人免费挑战互斥', 'muted'];
    if (!retEligible(r) && !r.claimed) return ['不符资格', 'muted'];
    if (r.trialEnded) return ['未达标 · 不可兑换', 'muted'];
    if (r.reachedTarget) return ['已达标 · 可兑换', ''];
    if (r.claimed) return ['已领取 · 试玩中', ''];
    return ['已认证 · 已充值 · 待领取', ''];
  }
  function retBalancePanel(r) {
    if (!r.claimed) return '';
    return `<div class="wallet-pair" id="ret-balance">
      <div class="wallet-card trial"><span>试玩钱包</span><strong>RM ${money(r.trialBalance)}</strong><small>${r.redeemed ? '已清零' : r.trialEnded ? '试玩已结束' : '不得直接提款、转让或充值'}</small></div>
      <div class="wallet-card main ${demoOf().mainWallet > 0 ? 'highlight' : ''}"><span>主钱包</span><strong>RM ${money(demoOf().mainWallet)}</strong><small>${r.redeemed ? 'RM188 现金已到账' : '兑换现金将进入此钱包'}</small></div>
    </div>
    <div class="trial-balance">${r.claimed && !r.redeemed && !r.trialEnded ? `<div class="bar-label"><span>试玩余额</span><span>RM ${money(r.trialBalance)} / RM 200.00</span></div><progress max="200" value="${Math.min(200, r.trialBalance)}" aria-label="试玩余额进度"></progress>` : ''}
    <p class="fine-print trial-prose">${r.redeemed ? '兑换后试玩额度自动清零。' : r.trialEnded ? '未达到RM200不可兑换奖励。' : '试玩余额达到RM200，即可兑换RM188现金奖励。未达到RM200不可兑换奖励。'}</p></div>`;
  }
  function retExclusionPanel(r) {
    const blocked = nfcTrialTaken() && !r.claimed;
    const ineligible = !retEligible(r) && !r.claimed;
    if (!blocked && !ineligible) {
      return `<section class="section-panel">
        <div class="section-header"><h3>演示资格切换</h3><span>不影响其他活动原文</span></div>
        <p class="fine-print trial-prose">当前演示为已登录、已完成实名认证、历史上有成功充值的老会员。</p>
        <button type="button" class="outline-wide" data-action="ret-toggle-deposit">演示未充值会员（不符资格）</button>
        <button type="button" class="outline-wide" data-action="ret-toggle-nfc">演示已领取「新人免费挑战赢取RM100」（互斥）</button>
      </section>`;
    }
    if (ineligible) {
      return `<section class="section-panel">
        <div class="section-header"><h3>不符资格</h3></div>
        <p class="trial-prose">历史曾经成功充值的会员均符合基本参与资格。必须完成实名认证。每位合格会员仅可领取一次。</p>
        <p class="fine-print trial-prose">当前演示账户尚未有成功充值记录，因此不符合基本参与资格。</p>
        <button type="button" class="outline-wide" data-action="ret-toggle-deposit">恢复为已充值老会员</button>
      </section>`;
    }
    return `<section class="section-panel">
      <div class="section-header"><h3>不可领取</h3><span>互斥规则</span></div>
      <p class="trial-prose">${RETURNING_SOURCE.exclusion}</p>
      <p class="fine-print trial-prose">${RETURNING_SOURCE.exclusionNote}</p>
      <button type="button" class="outline-wide" data-demo-nav="activity=newcomer-free-challenge">查看新人免费挑战赢取RM100</button>
      <button type="button" class="outline-wide" data-action="ret-toggle-nfc">取消互斥演示（清除新人挑战领取状态）</button>
    </section>`;
  }
  function nfcExclusionPanel(c) {
    if (!(retTrialTaken() && !c.claimed)) return '';
    return `<section class="section-panel">
      <div class="section-header"><h3>不可领取</h3><span>互斥规则</span></div>
      <p class="trial-prose">${RETURNING_SOURCE.exclusion}</p>
      <p class="fine-print trial-prose">${RETURNING_SOURCE.exclusionNote}</p>
      <button type="button" class="outline-wide" data-demo-nav="activity=returning-member">查看老会员回归活动</button>
      <button type="button" class="outline-wide" data-action="nfc-toggle-ret">取消互斥演示（清除老会员回归领取状态）</button>
    </section>`;
  }
  window.renderReturningMemberDemo = function () {
    store().ensureBanner();
    const r = store().load().returningMember;
    const [status, statusCls] = retStatus(r);
    const viewMap = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 4 };
    const auto = viewMap[retIndex(r)] ?? 1;
    const viewStep = inspect('returning-member', 4, auto);
    const s = RETURNING_SOURCE.steps[viewStep];
    const path = pathRow([['RM100', '免费试玩'], ['RM200', '达标余额'], ['RM188', '兑换现金']]);
    const checksList = [
      '已登录（演示会员陈美玲）',
      '已完成实名认证',
      r.deposited ? '历史上有成功充值记录' : '尚未有成功充值记录（不符资格）',
      nfcTrialTaken() && !r.claimed ? '已领取其他免费试玩奖励（互斥）' : '未领取其他免费试玩奖励'
    ];
    return `${store().journeyBar()}${retBalancePanel(r)}<section class="reward-feature trial-hero return-hero"><div class="panel-top"><span class="eyebrow">活动奖励</span><span class="status-badge ${statusCls}">${status}</span></div><div class="amount"><small>RM</small>188<span>.00</span></div><p class="trial-prose">${RETURNING_SOURCE.reward}</p>${path}</section><section class="section-panel"><div class="section-header"><h3>参与条件</h3></div>${checks(RETURNING_SOURCE.eligibility)}${checks(checksList)}</section>${retExclusionPanel(r)}<section class="section-panel flow-panel"><div class="section-header"><h3>活动流程</h3><span>点击步骤查看要求</span></div>${stepper(RETURNING_SOURCE.steps, viewStep, 'returning-member')}<div class="step-explanation trial-prose"><div class="step-heading"><span class="step-kicker">0${viewStep + 1} / 0${RETURNING_SOURCE.steps.length}</span><h4>${s.heading}</h4></div><p>${s.text}</p></div></section><section class="section-panel"><div class="section-header"><h3>重要条款</h3></div>${termsList(RETURNING_SOURCE.terms)}</section><button type="button" class="outline-wide" data-tab="1">查看完整活动规则 ${icon('arrow')}</button><button type="button" class="text-button trial-reset" data-action="demo-reset">重置演示</button>`;
  };
  function renderRetClaim() {
    $('#app').innerHTML = page('领取试玩额度', `
      <section class="reward-feature trial-hero return-hero">
        <div class="panel-top"><span class="eyebrow">活动奖励</span><span class="status-badge">待领取</span></div>
        <div class="amount"><small>RM</small>100<span>.00</span></div>
        <p class="trial-prose">免费领取RM100试玩额度。</p>
      </section>
      <section class="section-panel">
        <div class="section-header"><h3>领取前请确认</h3></div>
        ${termsList([
          '试玩额度不得直接提款、转让或充值。',
          '每位会员仅限领取一次。',
          '试玩余额达到RM200，即可兑换RM188现金奖励。',
          RETURNING_SOURCE.exclusion
        ])}
      </section>
      <button type="button" class="primary" data-action="ret-claim-confirm">确认领取</button>
    `, 'activity=returning-member');
    document.title = '领取试玩额度 · TPOWER';
  }
  function renderRetGames() {
    const r = retOf();
    $('#app').innerHTML = page('指定游戏', `
      <div class="wallet-pair compact">
        <div class="wallet-card trial"><span>试玩钱包</span><strong>RM ${money(r.trialBalance)}</strong></div>
        <div class="wallet-card"><span>达标目标</span><strong>RM 200.00</strong></div>
      </div>
      <p class="demo-lead trial-prose">在指定游戏内进行试玩。试玩额度不得直接提款、转让或充值。</p>
      <div class="game-grid">${RET_GAMES.map(g => `<button type="button" class="game-tile" data-action="ret-open-game" data-ret-game="${g.id}"><span class="game-icon">${icon(g.icon)}</span><strong>${g.name}</strong><small>${g.tag}</small></button>`).join('')}</div>
    `, 'activity=returning-member');
    document.title = '指定游戏 · TPOWER';
  }
  function renderRetPlay() {
    const r = retOf();
    const game = RET_GAMES.find(g => g.id === r.currentGame) || RET_GAMES[0];
    const over = r.trialEnded;
    const ready = r.reachedTarget && !r.redeemed;
    const canSpin = r.claimed && !over && !ready && !r.redeemed;
    const symbols = (r.lastSymbols || ['7', '星', '铃']).map(s => `<span>${s}</span>`).join('');
    $('#app').innerHTML = page(game.name, `
      <div class="play-wallet">
        <div><span>试玩钱包</span><strong id="ret-play-balance">RM ${money(r.trialBalance)}</strong></div>
        <div class="play-progress"><div class="bar-label"><span>达标进度</span><span>RM ${money(r.trialBalance)} / RM 200.00</span></div><progress max="200" value="${Math.min(200, r.trialBalance)}" aria-label="试玩余额进度"></progress></div>
      </div>
      <section class="slot-machine" aria-label="演示老虎机">
        <div class="slot-window" id="ret-slot-window">${symbols}</div>
        <p class="slot-result" id="ret-slot-result" aria-live="polite">${over ? '试玩已结束' : ready ? '已达到 RM200' : '按下开始，演示一局试玩'}</p>
        <button type="button" class="primary" id="ret-spin-btn" data-action="ret-spin" ${canSpin ? '' : 'disabled'}>${canSpin ? '开始旋转' : '暂停试玩'}</button>
      </section>
      ${ready ? '<button type="button" class="primary" data-action="ret-go-redeem">兑换RM188现金</button>' : ''}
      ${over ? `<section class="section-panel"><h3>试玩已结束</h3><p class="trial-prose">未达到RM200不可兑换奖励。</p><p class="fine-print">试玩额度已用尽。每位会员仅限领取一次，演示中可重置后重新体验。</p><button type="button" class="outline-wide" data-action="demo-reset">重置演示</button></section>` : ''}
      ${canSpin ? '<button type="button" class="text-button trial-reset" data-action="ret-fail-path">演示未达标（余额归零）</button>' : ''}
    `, 'demo=ret-games');
    document.title = game.name + ' · TPOWER';
  }
  function renderRetRedeem() {
    const r = retOf();
    const demo = demoOf();
    $('#app').innerHTML = page('兑换现金', `
      <section class="reward-feature trial-hero return-hero">
        <div class="panel-top"><span class="eyebrow">可兑换现金</span><span class="status-badge">已达标</span></div>
        <div class="amount"><small>RM</small>188<span>.00</span></div>
        <p class="trial-prose">成功达标后，兑换RM188现金奖励。</p>
      </section>
      <section class="section-panel">
        <div class="section-header"><h3>兑换说明</h3></div>
        ${termsList([
          '兑换后试玩额度自动清零。',
          '兑换的 RM188 现金将转入主钱包。',
          '每位会员仅限领取一次。'
        ])}
        <div class="wallet-pair">
          <div class="wallet-card trial"><span>试玩钱包（兑换后清零）</span><strong>RM ${money(r.trialBalance)}</strong></div>
          <div class="wallet-card main"><span>主钱包（到账后）</span><strong>RM ${money((demo.mainWallet || 0) + 188)}</strong></div>
        </div>
      </section>
      <button type="button" class="primary" data-action="ret-redeem-confirm">确认兑换</button>
    `, 'activity=returning-member');
    document.title = '兑换现金 · TPOWER';
  }
  function renderRetRedeemProcess() {
    $('#app').innerHTML = page('兑换中', `
      <section class="demo-status-card">
        <div class="demo-spinner" aria-hidden="true"></div>
        <h3>正在兑换</h3>
        <p>正在将 RM188 现金转入主钱包。</p>
      </section>
    `, 'activity=returning-member');
    document.title = '兑换中 · TPOWER';
    store().later(() => {
      const demo = store().load();
      const r = demo.returningMember;
      if (!r.reachedTarget || r.redeemed) return;
      r.redeemed = true;
      r.trialBalance = 0;
      demo.mainWallet = r2((demo.mainWallet || 0) + 188);
      record('老会员回归，免费赢取RM188', 188, '已到账');
      store().save();
      navigate('demo=ret-redeem-success');
    }, 1400);
  }
  function renderRetRedeemSuccess() {
    const demo = demoOf();
    $('#app').innerHTML = page('兑换成功', `
      <section class="demo-status-card success">
        <div class="demo-success-mark" aria-hidden="true">${icon('cash')}</div>
        <h3>兑换成功</h3>
        <p class="trial-prose">兑换后试玩额度自动清零。</p>
        <div class="wallet-pair">
          <div class="wallet-card main highlight"><span>主钱包</span><strong>RM ${money(demo.mainWallet)}</strong><small>RM188 现金已到账</small></div>
          <div class="wallet-card trial"><span>试玩钱包</span><strong>RM 0.00</strong><small>已清零</small></div>
        </div>
        <button type="button" class="primary" data-demo-nav="demo=records">查看领奖记录</button>
        <button type="button" class="outline-wide" data-demo-nav="activity=returning-member">返回活动</button>
      </section>
    `, 'activity=returning-member');
    document.title = '兑换成功 · TPOWER';
  }
  function runRetSpin(forceLose) {
    const demo = store().load();
    const r = demo.returningMember;
    if (r.spinning || !r.claimed || r.trialEnded || r.reachedTarget || r.redeemed) return;
    const path = forceLose || r.playMode === 'lose' ? RET_LOSE : RET_WIN;
    if (forceLose) { r.playMode = 'lose'; r.spinIndex = 0; }
    const step = path[Math.min(r.spinIndex, path.length - 1)];
    r.spinning = true;
    store().save();
    const btn = document.getElementById('ret-spin-btn');
    const windowEl = document.getElementById('ret-slot-window');
    const resultEl = document.getElementById('ret-slot-result');
    if (btn) { btn.disabled = true; btn.textContent = '旋转中…'; }
    if (windowEl) windowEl.classList.add('is-spinning');
    if (resultEl) resultEl.textContent = '旋转中…';
    store().later(() => {
      const demo = store().load();
      const r = demo.returningMember;
      r.spinIndex += 1;
      r.lastSymbols = step.symbols;
      r.spinning = false;
      if (forceLose) {
        r.trialBalance = 0;
        r.trialEnded = true;
      } else {
        r.trialBalance = Math.max(0, Math.min(200, r.trialBalance + step.delta));
        if (r.trialBalance >= 200) { r.trialBalance = 200; r.reachedTarget = true; }
        if (r.trialBalance <= 0) { r.trialBalance = 0; r.trialEnded = true; }
      }
      store().save();
      renderRetPlay();
      if (r.reachedTarget) {
        toast('试玩余额已达到 RM200');
        store().later(() => openModal(`<div class="goal-celebration"><div class="goal-burst" aria-hidden="true"></div><h2>恭喜达标</h2><p class="trial-prose">试玩余额达到RM200，即可兑换RM188现金奖励。</p><button type="button" class="primary" data-action="ret-go-redeem">兑换RM188现金</button></div>`), 400);
      } else if (r.trialEnded) {
        toast('未达到RM200不可兑换奖励。');
      }
    }, 900);
  }
  function defaultNfcState() {
    return { claimed: false, trialBalance: 0, trialEnded: false, reachedTarget: false, redeemed: false, playMode: 'win', spinIndex: 0, lastSymbols: ['7', '星', '铃'], spinning: false, currentGame: 'lucky-star' };
  }
  function defaultRetState() {
    return { deposited: true, claimed: false, trialBalance: 0, trialEnded: false, reachedTarget: false, redeemed: false, playMode: 'win', spinIndex: 0, lastSymbols: ['7', '星', '铃'], spinning: false, currentGame: 'lucky-star' };
  }
  function handleRetAction(name, demo) {
    if (!name || !(name.startsWith('ret-') || name === 'nfc-toggle-ret' || name === 'nfc-blocked')) return false;
    const r = demo.returningMember;
    const c = demo.freeChallenge;
    if (name === 'ret-blocked' || name === 'nfc-blocked') {
      toast(RETURNING_SOURCE.exclusion);
      return true;
    }
    if (name === 'ret-ineligible') {
      toast('历史曾经成功充值的会员均符合基本参与资格。必须完成实名认证。');
      return true;
    }
    if (name === 'ret-toggle-deposit') {
      if (r.claimed) { toast('已领取后不再改变充值资格演示'); return true; }
      r.deposited = !r.deposited;
      store().save();
      toast(r.deposited ? '已恢复为历史上有成功充值的老会员' : '已切换为未充值会员，不符合基本参与资格');
      refreshPromo();
      return true;
    }
    if (name === 'ret-toggle-nfc') {
      if (r.claimed) { toast('请先重置本活动后再切换互斥演示'); return true; }
      if (nfcTrialTaken(demo)) {
        demo.freeChallenge = defaultNfcState();
        store().save();
        toast('已清除新人免费挑战的领取状态，互斥已解除');
      } else {
        c.claimed = true;
        c.redeemed = true;
        c.trialBalance = 0;
        c.reachedTarget = true;
        c.trialEnded = false;
        store().save();
        toast('已演示领取「新人免费挑战赢取RM100」，本活动不可领取');
      }
      refreshPromo();
      return true;
    }
    if (name === 'nfc-toggle-ret') {
      if (c.claimed) { toast('请先重置本活动后再切换互斥演示'); return true; }
      if (retTrialTaken(demo)) {
        const deposited = r.deposited;
        demo.returningMember = defaultRetState();
        demo.returningMember.deposited = deposited;
        store().save();
        toast('已清除老会员回归的领取状态，互斥已解除');
      } else {
        r.claimed = true;
        r.redeemed = true;
        r.trialBalance = 0;
        r.reachedTarget = true;
        r.trialEnded = false;
        store().save();
        toast('已演示领取「老会员回归，免费赢取RM188」，本活动不可领取');
      }
      refreshPromo();
      return true;
    }
    if (name === 'ret-go-claim') {
      if (r.redeemed || r.claimed) return true;
      if (nfcTrialTaken(demo)) { toast(RETURNING_SOURCE.exclusion); refreshPromo(); return true; }
      if (!retEligible(r, demo)) { toast('历史曾经成功充值的会员均符合基本参与资格。必须完成实名认证。'); refreshPromo(); return true; }
      navigate('demo=ret-claim');
      return true;
    }
    if (name === 'ret-claim-confirm') {
      if (r.claimed || r.redeemed) return true;
      if (nfcTrialTaken(demo)) { toast(RETURNING_SOURCE.exclusion); navigate('activity=returning-member'); return true; }
      if (!retEligible(r, demo)) { toast('历史曾经成功充值的会员均符合基本参与资格。必须完成实名认证。'); navigate('activity=returning-member'); return true; }
      r.claimed = true; r.trialBalance = 100; r.spinIndex = 0; r.playMode = 'win';
      r.trialEnded = false; r.reachedTarget = false;
      store().save(); toast('已领取 RM100 试玩额度'); navigate('activity=returning-member'); return true;
    }
    if (name === 'ret-go-play') {
      if (!r.claimed || r.redeemed) return true;
      navigate('demo=ret-games'); return true;
    }
    if (name === 'ret-open-game') return true;
    if (name === 'ret-spin') { runRetSpin(false); return true; }
    if (name === 'ret-fail-path') { runRetSpin(true); return true; }
    if (name === 'ret-go-redeem') {
      if (!r.reachedTarget || r.redeemed) return true;
      if ($('#modal') && $('#modal').open) closeModal();
      navigate('demo=ret-redeem'); return true;
    }
    if (name === 'ret-redeem-confirm') {
      if (!r.reachedTarget || r.redeemed) return true;
      navigate('demo=ret-redeem-process'); return true;
    }
    return false;
  }


  /* ------------ 新人首存彩金100% ------------ */
  const FD_JOURNEY = ['选择优惠', '首次充值', '完成流水', '转换可提款', '已领取'];
  const FD_BET = 200;
  function fdOf() {
    return demoOf().firstDepositBonus;
  }
  function fdOpt(id) {
    return FIRST_DEPOSIT_SOURCE.options.find(o => o.id === id) || null;
  }
  function fdCalc(optionId, amount) {
    const opt = fdOpt(optionId);
    if (!opt) return { bonus: 0, need: 0, opt: null };
    const bonus = r2(Math.min(amount * opt.rate, opt.cap));
    const need = r2((amount + bonus) * opt.wagerMult);
    return { bonus, need, opt };
  }
  function fdIndex(f) {
    if (f.converted) return 4;
    if (f.deposited && f.turnoverNeed > 0 && (f.turnover || 0) >= f.turnoverNeed) return 3;
    if (f.deposited) return 2;
    if (f.option) return 1;
    return 0;
  }
  function fdCta(f) {
    if (f.converted) return ['已领取', 'demo-done', true];
    if (f.overlap) return ['不可领取（与其他充值活动重叠）', 'fd-overlap', false];
    if (f.deposited && f.turnoverNeed > 0 && (f.turnover || 0) >= f.turnoverNeed) return ['转换至可提款余额', 'fd-go-convert', false];
    if (f.deposited) return ['去完成有效流水', 'fd-go-turnover', false];
    if (f.option) return ['去首次充值', 'fd-go-deposit', false];
    return ['请先选择一种首存优惠', 'fd-need-option', false];
  }
  function fdStatus(f) {
    if (f.converted) return ['已领取 · 仅限一次', 'muted'];
    if (f.overlap) return ['与其他充值活动重叠', 'muted'];
    if (f.deposited && f.turnoverNeed > 0 && (f.turnover || 0) >= f.turnoverNeed) return ['流水已完成 · 可转换', ''];
    if (f.deposited) return ['待完成有效流水', ''];
    if (f.option) return ['已选择' + fdOpt(f.option).title + ' · 待首次充值', ''];
    return ['已认证 · 尚未充值', ''];
  }
  function fdWallets(f) {
    const demo = demoOf();
    const locked = f.deposited && !f.converted ? r2((f.depositAmount || 0) + (f.bonus || 0)) : 0;
    return `<div class="wallet-pair">
      <div class="wallet-card ${locked ? 'trial' : ''}"><span>活动钱包（本金+彩金）</span><strong>RM ${money(locked)}</strong><small>${f.converted ? '已转换至可提款余额' : f.deposited ? '完成流水后方可转换' : '首次充值后入账'}</small></div>
      <div class="wallet-card main ${demo.mainWallet > 0 ? 'highlight' : ''}"><span>可提款余额</span><strong>RM ${money(demo.mainWallet)}</strong><small>${f.converted ? '本金与彩金已转入' : '完成流水后转换入此余额'}</small></div>
    </div>`;
  }
  function fdOptionCards(f) {
    return `<div class="fd-option-grid">${FIRST_DEPOSIT_SOURCE.options.map(o => {
      const selected = f.option === o.id;
      const locked = f.option && f.option !== o.id;
      return `<button type="button" class="fd-option-card ${selected ? 'is-selected' : ''} ${locked ? 'is-locked' : ''}" data-action="fd-choose-${o.id}" aria-pressed="${selected}">
        <div class="panel-top"><span class="eyebrow">${o.title}</span><span class="status-badge ${selected ? '' : locked ? 'muted' : ''}">${selected ? '已选择' : locked ? '不可选择' : '可选'}</span></div>
        <div class="fd-option-rate">${o.rateLabel}</div>
        <ul class="kyc-summary">
          <li><span>最高彩金</span><strong>RM ${money(o.cap)}</strong></li>
          <li><span>流水倍数</span><strong>${o.wagerText}</strong></li>
        </ul>
        <p class="fine-print trial-prose">${locked ? '每个会员只能选择一种首存彩金。同一充值不可同时领取老虎机及真人两种优惠。' : selected ? '已锁定该优惠，另一选项不可再选。' : '选择后将锁定，不能再领取另一种优惠。'}</p>
      </button>`;
    }).join('')}</div>`;
  }
  function fdCalcTable(f) {
    if (!f.option) return '';
    const opt = fdOpt(f.option);
    return `<section class="section-panel" id="fd-deposit">
      <div class="section-header"><h3>演示首次充值</h3><span>${opt.title} · ${opt.rateLabel} · 最高 RM${opt.cap}</span></div>
      <p class="fine-print trial-prose">彩金根据实际充值金额及活动比例计算：彩金 = 充值金额 × ${opt.rateLabel}，最高 RM ${money(opt.cap)}。所需有效流水 =（本金 + 彩金）× ${opt.wagerMult}。</p>
      <div class="table-wrap"><table class="prize-table fd-calc-table">
        <thead><tr><th>充值金额</th><th>可得彩金</th><th>所需有效流水</th></tr></thead>
        <tbody>${FIRST_DEPOSIT_SOURCE.amounts.map(n => {
          const c = fdCalc(f.option, n);
          const current = f.deposited && f.depositAmount === n;
          return `<tr${current ? ' class="current-level"' : ''}><td>RM ${money(n)}</td><td>RM ${money(c.bonus)}</td><td>RM ${money(c.need)}</td></tr>`;
        }).join('')}</tbody>
      </table></div>
      ${f.deposited ? `<p class="trial-prose">已完成首次充值 RM ${money(f.depositAmount)}，获得彩金 RM ${money(f.bonus)}，所需有效流水 RM ${money(f.turnoverNeed)}。</p>` : ''}
      <div class="fd-bet-actions">${FIRST_DEPOSIT_SOURCE.amounts.map(n => `<button type="button" class="outline-wide" data-action="fd-deposit-${n}">${f.deposited ? '演示再次充值 RM' + n + '（不发放彩金）' : '演示首次充值 RM' + n}</button>`).join('')}</div>
    </section>`;
  }
  window.renderFirstDepositDemo = function () {
    store().ensureBanner();
    const f = store().load().firstDepositBonus;
    const [status, statusCls] = fdStatus(f);
    const viewStep = inspect('first-deposit-bonus', 4, fdIndex(f));
    const steps = [
      { title: '选择优惠', heading: '选择其中一个首存优惠', text: '玩家根据指定游戏类别选择其中一个首存优惠。每个会员只能选择一种首存彩金。同一充值不可同时领取老虎机及真人两种优惠。' },
      { title: '首次充值', heading: '仅限会员首次成功充值', text: '仅限会员首次成功充值。彩金根据实际充值金额及活动比例计算。' },
      { title: '完成流水', heading: '完成对应有效流水', text: '活动流水仅计算所选游戏类别的合格投注。完成对应有效流水后，方可转换至可提款余额。' },
      { title: '转换余额', heading: '转换至可提款余额', text: '完成对应有效流水后，方可转换至可提款余额。每位会员只能领取一次首存彩金。' }
    ];
    const s = steps[viewStep] || steps[0];
    return `${store().journeyBar()}${fdWallets(f)}
      <section class="reward-feature trial-hero fd-hero">
        <div class="panel-top"><span class="eyebrow">活动奖励</span><span class="status-badge ${statusCls}">${status}</span></div>
        <div class="amount"><small>最高 RM</small>300<span>.00</span></div>
        <p class="trial-prose">${FIRST_DEPOSIT_SOURCE.reward}</p>
      </section>
      <section class="section-panel">
        <div class="section-header"><h3>参与条件</h3><span>演示账户</span></div>
        ${checks(['已登录（演示会员陈美玲）', '已完成实名认证', f.deposited ? '已完成首次充值' : '尚未充值，可参与首次充值优惠', f.overlap ? '当前与其他充值活动重叠（演示）' : '未与其他充值活动重叠'])}
      </section>
      <section class="section-panel">
        <div class="section-header"><h3>首存优惠</h3><span>只能选择一种</span></div>
        ${fdOptionCards(f)}
      </section>
      ${fdCalcTable(f)}
      ${f.deposited && !f.converted ? `<section class="section-panel"><div class="section-header"><h3>流水进度</h3><span>${(f.turnoverNeed || 0) > 0 ? money(f.turnover || 0) + ' / ' + money(f.turnoverNeed) : ''}</span></div>
        <div class="bar-label"><span>有效流水（仅计${fdOpt(f.option).title}）</span><span>RM ${money(f.turnover || 0)} / RM ${money(f.turnoverNeed)}</span></div>
        <progress max="${Math.max(1, f.turnoverNeed)}" value="${Math.min(f.turnoverNeed || 0, f.turnover || 0)}" aria-label="有效流水进度"></progress>
        <p class="fine-print trial-prose">活动流水仅计算所选游戏类别的合格投注。</p>
        <button type="button" class="outline-wide" data-action="fd-go-turnover">去完成有效流水</button>
      </section>` : ''}
      <section class="section-panel">
        <div class="section-header"><h3>活动重叠</h3></div>
        <p class="trial-prose">此活动不能与其他充值活动重叠。</p>
        ${f.overlap
          ? '<button type="button" class="outline-wide" data-action="fd-toggle-overlap">取消重叠演示</button>'
          : '<button type="button" class="outline-wide" data-action="fd-toggle-overlap">演示其他充值活动进行中（重叠）</button>'}
      </section>
      <section class="section-panel flow-panel"><div class="section-header"><h3>活动流程</h3><span>点击步骤查看要求</span></div>${stepper(steps, viewStep, 'first-deposit-bonus')}<div class="step-explanation trial-prose"><div class="step-heading"><span class="step-kicker">0${viewStep + 1} / 04</span><h4>${s.heading}</h4></div><p>${s.text}</p></div></section>
      <section class="section-panel"><div class="section-header"><h3>活动规则</h3></div>${termsList(FIRST_DEPOSIT_SOURCE.rules)}</section>
      <button type="button" class="outline-wide" data-tab="1">查看完整活动规则 ${icon('arrow')}</button>
      <button type="button" class="text-button trial-reset" data-action="demo-reset">重置演示</button>`;
  };
  function renderFdTurnover() {
    const f = fdOf();
    const opt = fdOpt(f.option) || FIRST_DEPOSIT_SOURCE.options[0];
    const done = (f.turnover || 0) >= (f.turnoverNeed || 0) && f.turnoverNeed > 0;
    $('#app').innerHTML = page('完成有效流水', `
      ${fdWallets(f)}
      <section class="section-panel">
        <div class="section-header"><h3>所选优惠</h3><span>${opt.title}</span></div>
        <ul class="kyc-summary">
          <li><span>首次充值</span><strong>RM ${money(f.depositAmount)}</strong></li>
          <li><span>彩金</span><strong>RM ${money(f.bonus)}</strong></li>
          <li><span>流水倍数</span><strong>${opt.wagerText}</strong></li>
        </ul>
        <div class="bar-label"><span>有效流水（仅计${opt.title}）</span><span>RM ${money(f.turnover || 0)} / RM ${money(f.turnoverNeed)}</span></div>
        <progress max="${Math.max(1, f.turnoverNeed)}" value="${Math.min(f.turnoverNeed || 0, f.turnover || 0)}" aria-label="有效流水进度"></progress>
        <p class="fine-print trial-prose">活动流水仅计算所选游戏类别的合格投注。</p>
      </section>
      <section class="section-panel">
        <div class="section-header"><h3>演示投注</h3></div>
        <div class="fd-bet-actions">
          <button type="button" class="outline-wide" data-action="fd-bet-slots">演示老虎机投注 RM${FD_BET}</button>
          <button type="button" class="outline-wide" data-action="fd-bet-live">演示真人投注 RM${FD_BET}</button>
        </div>
        <button type="button" class="text-button" data-action="fd-accelerate">演示加速完成流水（演示用）</button>
      </section>
      ${done ? '<button type="button" class="primary" data-action="fd-go-convert">转换至可提款余额</button>' : ''}
    `, 'activity=first-deposit-bonus');
    document.title = '完成有效流水 · TPOWER';
  }
  function renderFdConvert() {
    const f = fdOf();
    const total = r2((f.depositAmount || 0) + (f.bonus || 0));
    const demo = demoOf();
    $('#app').innerHTML = page('转换至可提款余额', `
      <section class="reward-feature trial-hero fd-hero">
        <div class="panel-top"><span class="eyebrow">可转换金额</span><span class="status-badge">流水已完成</span></div>
        <div class="amount"><small>RM</small>${Math.floor(total)}<span>.${money(total).slice(-2)}</span></div>
        <p class="trial-prose">完成对应有效流水后，方可转换至可提款余额。其中本金 RM ${money(f.depositAmount)}，彩金 RM ${money(f.bonus)}。</p>
      </section>
      <section class="section-panel">
        ${termsList(['每位会员只能领取一次首存彩金。', '首存优惠不得重复领取。', '转换后本金与彩金进入可提款余额。'])}
        <div class="wallet-pair">
          <div class="wallet-card trial"><span>活动钱包（转换后清零）</span><strong>RM ${money(total)}</strong></div>
          <div class="wallet-card main"><span>可提款余额（到账后）</span><strong>RM ${money((demo.mainWallet || 0) + total)}</strong></div>
        </div>
      </section>
      <button type="button" class="primary" data-action="fd-convert-confirm">确认转换</button>
    `, 'activity=first-deposit-bonus');
    document.title = '转换至可提款余额 · TPOWER';
  }
  function handleFdAction(name, demo) {
    if (!name || !name.startsWith('fd-')) return false;
    const f = demo.firstDepositBonus;
    if (!f) return false;
    const refresh = () => {
      const screen = currentRoute().get('demo') || '';
      if (screen.startsWith('fd-') && typeof window.PromoRenderDemo === 'function') {
        window.PromoRenderDemo(screen);
        return;
      }
      refreshPromo();
    };
    if (name === 'fd-need-option') {
      toast('玩家根据指定游戏类别选择其中一个首存优惠。');
      const el = document.getElementById('fd-deposit') || document.querySelector('.fd-option-grid');
      if (el && $('#app')) $('#app').scrollTop = Math.max(0, el.closest('.section-panel') ? el.closest('.section-panel').offsetTop - 8 : el.offsetTop - 8);
      return true;
    }
    if (name === 'fd-overlap') {
      toast('此活动不能与其他充值活动重叠。');
      return true;
    }
    if (name === 'fd-toggle-overlap') {
      if (f.deposited && !f.overlap) { toast('已领取或充值后不再切换重叠演示，请先重置演示'); return true; }
      f.overlap = !f.overlap;
      store().save();
      toast(f.overlap ? '已演示其他充值活动进行中，本活动不可领取' : '已取消重叠演示');
      refresh();
      return true;
    }
    if (name === 'fd-choose-slots' || name === 'fd-choose-live') {
      const id = name === 'fd-choose-live' ? 'live' : 'slots';
      if (!fdOpt(id)) return true;
      if (f.overlap) { toast('此活动不能与其他充值活动重叠。'); return true; }
      if (f.converted || (f.deposited && f.bonus > 0)) { toast('每位会员只能领取一次首存彩金。首存优惠不得重复领取。'); return true; }
      if (f.option && f.option !== id) {
        toast('每个会员只能选择一种首存彩金。同一充值不可同时领取老虎机及真人两种优惠。');
        refresh();
        return true;
      }
      if (f.option === id) { refresh(); return true; }
      f.option = id;
      store().save();
      toast('已选择「' + fdOpt(id).title + '」首存优惠，另一种优惠已锁定');
      refresh();
      return true;
    }
    if (name === 'fd-go-deposit') {
      if (f.overlap) { toast('此活动不能与其他充值活动重叠。'); return true; }
      if (!f.option) { toast('请先选择一种首存优惠'); return true; }
      refreshPromo();
      requestAnimationFrame(() => {
        const el = document.getElementById('fd-deposit');
        if (el && $('#app')) $('#app').scrollTop = Math.max(0, el.offsetTop - 8);
      });
      return true;
    }
    if (name === 'fd-deposit-100' || name === 'fd-deposit-300' || name === 'fd-deposit-500') {
      const amount = Number(name.split('-').pop() || 0);
      if (!amount) return true;
      if (f.overlap) { toast('此活动不能与其他充值活动重叠。'); return true; }
      if (!f.option) { toast('请先选择一种首存优惠'); return true; }
      if (f.converted) { toast('每位会员只能领取一次首存彩金。首存优惠不得重复领取。'); return true; }
      if (f.deposited) {
        demo.mainWallet = r2((demo.mainWallet || 0) + amount);
        store().save();
        toast('仅限会员首次成功充值。本次充值不发放彩金。');
        refresh();
        return true;
      }
      const c = fdCalc(f.option, amount);
      f.deposited = true;
      f.depositAmount = amount;
      f.bonus = c.bonus;
      f.turnover = 0;
      f.turnoverNeed = c.need;
      store().save();
      toast('首次充值 RM ' + money(amount) + ' 成功，获得彩金 RM ' + money(c.bonus) + '，需完成有效流水 RM ' + money(c.need));
      refresh();
      return true;
    }
    if (name === 'fd-go-turnover') {
      if (!f.deposited || f.converted) return true;
      navigate('demo=fd-turnover');
      return true;
    }
    if (name === 'fd-bet-slots' || name === 'fd-bet-live') {
      if (!f.deposited || f.converted) return true;
      const cat = name === 'fd-bet-live' ? 'live' : 'slots';
      if (cat !== f.option) {
        toast('活动流水仅计算所选游戏类别的合格投注。该笔「' + (fdOpt(cat) ? fdOpt(cat).title : '其他') + '」投注不计入。');
        return true;
      }
      if ((f.turnover || 0) >= f.turnoverNeed) { toast('所需有效流水已完成'); refresh(); return true; }
      const add = r2(Math.min(FD_BET, Math.max(0, f.turnoverNeed - (f.turnover || 0))));
      f.turnover = r2((f.turnover || 0) + add);
      store().save();
      toast('演示' + fdOpt(cat).title + '有效投注 RM ' + money(FD_BET) + '，计入流水 RM ' + money(add));
      refresh();
      return true;
    }
    if (name === 'fd-accelerate') {
      if (!f.deposited || f.converted) return true;
      f.turnover = f.turnoverNeed;
      store().save();
      toast('已演示加速完成所需有效流水（演示用）');
      refresh();
      return true;
    }
    if (name === 'fd-go-convert') {
      if (!f.deposited || f.converted) return true;
      if ((f.turnover || 0) < f.turnoverNeed) { toast('请先完成对应有效流水'); navigate('demo=fd-turnover'); return true; }
      if ($('#modal') && $('#modal').open) closeModal();
      navigate('demo=fd-convert');
      return true;
    }
    if (name === 'fd-convert-confirm') {
      if (!f.deposited || f.converted) return true;
      if ((f.turnover || 0) < f.turnoverNeed) { toast('请先完成对应有效流水'); return true; }
      const total = r2((f.depositAmount || 0) + (f.bonus || 0));
      const bonus = f.bonus;
      f.converted = true;
      demo.mainWallet = r2((demo.mainWallet || 0) + total);
      record('新人首存彩金100%', bonus, '已到账');
      store().save();
      toast('已转换至可提款余额，彩金 RM ' + money(bonus) + ' 已到账');
      navigate('activity=first-deposit-bonus');
      return true;
    }
    return false;
  }


  /* ------------ 每日再存10%彩金 ------------ */
  const DR_JOURNEY = ['选择优惠', '再存充值', '完成流水', '转换可提款', '可再存'];
  const DR_BET = 200;
  function drOf() {
    return demoOf().dailyReload;
  }
  function drOpt(id) {
    return DAILY_RELOAD_SOURCE.options.find(o => o.id === id) || null;
  }
  function drCalc(optionId, amount) {
    const opt = drOpt(optionId);
    if (!opt) return { bonus: 0, need: 0, opt: null };
    const bonus = r2(Math.min(amount * opt.rate, opt.cap));
    const need = r2((amount + bonus) * opt.wagerMult);
    return { bonus, need, opt };
  }
  function drIndex(r) {
    if (r.deposited && r.turnoverNeed > 0 && (r.turnover || 0) >= r.turnoverNeed) return 3;
    if (r.deposited) return 2;
    if (r.option) return 1;
    if ((r.historyCount || 0) > 0) return 4;
    return 0;
  }
  function drCta(r) {
    if (r.overlap) return ['不可领取（与其他充值活动重叠）', 'dr-overlap', false];
    if (!r.hasFirstDeposit) return ['不符资格', 'dr-ineligible', false];
    if (r.deposited && r.turnoverNeed > 0 && (r.turnover || 0) >= r.turnoverNeed) return ['转换至可提款余额', 'dr-go-convert', false];
    if (r.deposited) return ['去完成有效流水', 'dr-go-turnover', false];
    if (r.option) return ['去再存充值', 'dr-go-deposit', false];
    return ['请先选择一种再存优惠', 'dr-need-option', false];
  }
  function drStatus(r) {
    if (r.overlap) return ['与其他充值活动重叠', 'muted'];
    if (!r.hasFirstDeposit) return ['尚未完成首次充值', 'muted'];
    if (r.deposited && r.turnoverNeed > 0 && (r.turnover || 0) >= r.turnoverNeed) return ['流水已完成 · 可转换', ''];
    if (r.deposited) return ['待完成有效流水', ''];
    if (r.option) return ['已选择' + drOpt(r.option).title + ' · 待再存', ''];
    if ((r.historyCount || 0) > 0) return ['可继续再存 · 已领取 ' + r.historyCount + ' 笔', ''];
    return ['已认证 · 已完成首次充值', ''];
  }
  function drWallets(r) {
    const demo = demoOf();
    const locked = r.deposited ? r2((r.depositAmount || 0) + (r.bonus || 0)) : 0;
    return `<div class="wallet-pair">
      <div class="wallet-card ${locked ? 'trial' : ''}"><span>活动钱包（本金+彩金）</span><strong>RM ${money(locked)}</strong><small>${r.deposited ? '完成流水后才可转换' : '符合资格的再存入账后显示'}</small></div>
      <div class="wallet-card main ${demo.mainWallet > 0 ? 'highlight' : ''}"><span>可提款余额</span><strong>RM ${money(demo.mainWallet)}</strong><small>${(r.claimedTotal || 0) > 0 ? '累计已领再存彩金 RM ' + money(r.claimedTotal) : '完成流水后转换入此余额'}</small></div>
    </div>`;
  }
  function drOptionCards(r) {
    const disabled = !r.hasFirstDeposit || r.overlap || r.deposited;
    return `<div class="fd-option-grid dr-option-grid">${DAILY_RELOAD_SOURCE.options.map(o => {
      const selected = r.option === o.id;
      const locked = r.option && r.option !== o.id;
      return `<button type="button" class="fd-option-card dr-option-card ${selected ? 'is-selected' : ''} ${locked || disabled ? 'is-locked' : ''}" data-action="dr-choose-${o.id}" aria-pressed="${selected}">
        <div class="panel-top"><span class="eyebrow">${o.title}</span><span class="status-badge ${selected ? '' : (locked || disabled) ? 'muted' : ''}">${selected ? '已选择' : locked ? '不可选择' : disabled ? '暂不可选' : '可选'}</span></div>
        <div class="fd-option-rate">${o.rateLabel}</div>
        <ul class="kyc-summary">
          <li><span>最高彩金</span><strong>RM ${money(o.cap)}</strong></li>
          <li><span>流水倍数</span><strong>${o.wagerText}</strong></li>
        </ul>
        <p class="fine-print trial-prose">${locked ? '同一笔充值只能选择一种再存优惠。' : selected ? '已锁定该笔充值的优惠，另一选项不可再选。' : '为本次再存选择一种优惠。'}</p>
      </button>`;
    }).join('')}</div>`;
  }
  function drCalcTable(r) {
    if (!r.option) return '';
    const opt = drOpt(r.option);
    return `<section class="section-panel" id="dr-deposit">
      <div class="section-header"><h3>演示再存充值</h3><span>${opt.title} · ${opt.rateLabel} · 最高 RM${opt.cap}</span></div>
      <p class="fine-print trial-prose">彩金按照实际充值金额计算：彩金 = 充值金额 × 10%，不超过 ${opt.title} 上限 RM ${money(opt.cap)}。所需有效流水 =（本金 + 彩金）× ${opt.wagerMult}。</p>
      <div class="table-wrap"><table class="prize-table fd-calc-table">
        <thead><tr><th>再存金额</th><th>可得彩金</th><th>所需有效流水</th></tr></thead>
        <tbody>${DAILY_RELOAD_SOURCE.amounts.map(n => {
          const c = drCalc(r.option, n);
          const current = r.deposited && r.depositAmount === n;
          return `<tr${current ? ' class="current-level"' : ''}><td>RM ${money(n)}</td><td>RM ${money(c.bonus)}</td><td>RM ${money(c.need)}</td></tr>`;
        }).join('')}</tbody>
      </table></div>
      ${r.deposited ? `<p class="trial-prose">本笔再存 RM ${money(r.depositAmount)} 已入账，获得彩金 RM ${money(r.bonus)}，所需有效流水 RM ${money(r.turnoverNeed)}。</p>` : ''}
      <div class="fd-bet-actions">${DAILY_RELOAD_SOURCE.amounts.map(n => `<button type="button" class="outline-wide" data-action="dr-deposit-${n}">${r.deposited ? '演示再存 RM' + n + '（不可合并）' : '演示再存 RM' + n}</button>`).join('')}</div>
      <button type="button" class="outline-wide" data-action="dr-deposit-merge">演示两笔各 RM500 合并领取（不可）</button>
      <button type="button" class="outline-wide" data-action="dr-deposit-void">演示取消或退款充值 RM1,000（不计入）</button>
    </section>`;
  }
  window.renderDailyReloadDemo = function () {
    store().ensureBanner();
    const r = store().load().dailyReload;
    const [status, statusCls] = drStatus(r);
    const viewStep = inspect('daily-reload', 4, Math.min(3, drIndex(r)));
    const steps = [
      { title: '选择优惠', heading: '为本次再存选择一种优惠', text: '同一笔充值只能选择一种再存优惠。' },
      { title: '再存充值', heading: '每日进行符合资格的再存', text: '适用于已完成首次充值的会员。每日进行符合资格的再存，即可领取10%彩金。彩金按照实际充值金额计算，不超过对应类别上限。不得将多笔充值合并领取同一笔彩金。取消、退款或异常充值不计入。' },
      { title: '完成流水', heading: '完成指定倍数的有效流水', text: '仅计算所选择游戏类别的有效投注。完成指定倍数的有效流水后，才可转换为可提款余额。' },
      { title: '转换余额', heading: '转换至可提款余额', text: '完成指定倍数的有效流水后，才可转换为可提款余额。' }
    ];
    const s = steps[viewStep] || steps[0];
    return `${store().journeyBar()}${drWallets(r)}
      <section class="reward-feature trial-hero dr-hero">
        <div class="panel-top"><span class="eyebrow">活动奖励 · 第 ${r.day || 1} 个演示日</span><span class="status-badge ${statusCls}">${status}</span></div>
        <div class="amount"><small>最高 RM</small>300<span>.00</span></div>
        <p class="trial-prose">${DAILY_RELOAD_SOURCE.reward}</p>
      </section>
      <section class="section-panel">
        <div class="section-header"><h3>参与条件</h3><span>演示账户</span></div>
        ${checks(['已登录（演示会员陈美玲）', '已完成实名认证', r.hasFirstDeposit ? '已完成首次充值' : '尚未完成首次充值（不符资格）', r.overlap ? '当前与其他充值活动重叠（演示）' : '未与其他充值活动重叠'])}
        ${!r.hasFirstDeposit ? '<p class="trial-prose">适用于已完成首次充值的会员。</p><button type="button" class="outline-wide" data-action="dr-toggle-first">恢复为已完成首次充值</button>' : '<button type="button" class="outline-wide" data-action="dr-toggle-first">演示尚未完成首次充值（不符资格）</button>'}
      </section>
      <section class="section-panel">
        <div class="section-header"><h3>再存优惠</h3><span>同一笔充值只能选一种</span></div>
        ${drOptionCards(r)}
      </section>
      ${drCalcTable(r)}
      ${r.deposited ? `<section class="section-panel"><div class="section-header"><h3>流水进度</h3><span>${money(r.turnover || 0)} / ${money(r.turnoverNeed)}</span></div>
        <div class="bar-label"><span>有效流水（仅计${drOpt(r.option).title}）</span><span>RM ${money(r.turnover || 0)} / RM ${money(r.turnoverNeed)}</span></div>
        <progress max="${Math.max(1, r.turnoverNeed)}" value="${Math.min(r.turnoverNeed || 0, r.turnover || 0)}" aria-label="有效流水进度"></progress>
        <p class="fine-print trial-prose">仅计算所选择游戏类别的有效投注。</p>
        <button type="button" class="outline-wide" data-action="dr-go-turnover">去完成有效流水</button>
      </section>` : ''}
      <section class="section-panel">
        <div class="section-header"><h3>活动重叠与演示日</h3></div>
        <p class="trial-prose">此活动不能与其他充值活动重叠。</p>
        ${r.overlap
          ? '<button type="button" class="outline-wide" data-action="dr-toggle-overlap">取消重叠演示</button>'
          : '<button type="button" class="outline-wide" data-action="dr-toggle-overlap">演示其他充值活动进行中（重叠）</button>'}
        <button type="button" class="text-button" data-action="dr-next-day">模拟次日</button>
      </section>
      <section class="section-panel flow-panel"><div class="section-header"><h3>活动流程</h3><span>点击步骤查看要求</span></div>${stepper(steps, viewStep, 'daily-reload')}<div class="step-explanation trial-prose"><div class="step-heading"><span class="step-kicker">0${viewStep + 1} / 04</span><h4>${s.heading}</h4></div><p>${s.text}</p></div></section>
      <section class="section-panel"><div class="section-header"><h3>活动规则</h3></div>${termsList(DAILY_RELOAD_SOURCE.rules)}</section>
      <button type="button" class="outline-wide" data-tab="1">查看完整活动规则 ${icon('arrow')}</button>
      <button type="button" class="text-button trial-reset" data-action="demo-reset">重置演示</button>`;
  };
  function renderDrTurnover() {
    const r = drOf();
    const opt = drOpt(r.option) || DAILY_RELOAD_SOURCE.options[0];
    const done = (r.turnover || 0) >= (r.turnoverNeed || 0) && r.turnoverNeed > 0;
    $('#app').innerHTML = page('完成有效流水', `
      ${drWallets(r)}
      <section class="section-panel">
        <div class="section-header"><h3>本笔再存</h3><span>${opt.title}</span></div>
        <ul class="kyc-summary">
          <li><span>再存金额</span><strong>RM ${money(r.depositAmount)}</strong></li>
          <li><span>彩金</span><strong>RM ${money(r.bonus)}</strong></li>
          <li><span>流水倍数</span><strong>${opt.wagerText}</strong></li>
        </ul>
        <div class="bar-label"><span>有效流水（仅计${opt.title}）</span><span>RM ${money(r.turnover || 0)} / RM ${money(r.turnoverNeed)}</span></div>
        <progress max="${Math.max(1, r.turnoverNeed)}" value="${Math.min(r.turnoverNeed || 0, r.turnover || 0)}" aria-label="有效流水进度"></progress>
        <p class="fine-print trial-prose">仅计算所选择游戏类别的有效投注。</p>
      </section>
      <section class="section-panel">
        <div class="section-header"><h3>演示投注</h3></div>
        <div class="fd-bet-actions">
          <button type="button" class="outline-wide" data-action="dr-bet-live">演示真人投注 RM${DR_BET}</button>
          <button type="button" class="outline-wide" data-action="dr-bet-slots">演示老虎机投注 RM${DR_BET}</button>
          <button type="button" class="outline-wide" data-action="dr-bet-fish">演示捕鱼投注 RM${DR_BET}</button>
        </div>
        <button type="button" class="text-button" data-action="dr-accelerate">演示加速完成流水（演示用）</button>
      </section>
      ${done ? '<button type="button" class="primary" data-action="dr-go-convert">转换至可提款余额</button>' : ''}
    `, 'activity=daily-reload');
    document.title = '完成有效流水 · TPOWER';
  }
  function renderDrConvert() {
    const r = drOf();
    const total = r2((r.depositAmount || 0) + (r.bonus || 0));
    const demo = demoOf();
    $('#app').innerHTML = page('转换至可提款余额', `
      <section class="reward-feature trial-hero dr-hero">
        <div class="panel-top"><span class="eyebrow">可转换金额</span><span class="status-badge">流水已完成</span></div>
        <div class="amount"><small>RM</small>${Math.floor(total)}<span>.${money(total).slice(-2)}</span></div>
        <p class="trial-prose">完成指定倍数的有效流水后，才可转换为可提款余额。其中本金 RM ${money(r.depositAmount)}，彩金 RM ${money(r.bonus)}。</p>
      </section>
      <section class="section-panel">
        ${termsList(['仅计算所选择游戏类别的有效投注。', '转换后本金与彩金进入可提款余额。'])}
        <div class="wallet-pair">
          <div class="wallet-card trial"><span>活动钱包（转换后清零）</span><strong>RM ${money(total)}</strong></div>
          <div class="wallet-card main"><span>可提款余额（到账后）</span><strong>RM ${money((demo.mainWallet || 0) + total)}</strong></div>
        </div>
      </section>
      <button type="button" class="primary" data-action="dr-convert-confirm">确认转换</button>
    `, 'activity=daily-reload');
    document.title = '转换至可提款余额 · TPOWER';
  }
  function handleDrAction(name, demo) {
    if (!name || !name.startsWith('dr-')) return false;
    const r = demo.dailyReload;
    if (!r) return false;
    const refresh = () => {
      const screen = currentRoute().get('demo') || '';
      if (screen.startsWith('dr-') && typeof window.PromoRenderDemo === 'function') {
        window.PromoRenderDemo(screen);
        return;
      }
      refreshPromo();
    };
    if (name === 'dr-need-option') {
      toast('请先为本次再存选择一种优惠。同一笔充值只能选择一种再存优惠。');
      return true;
    }
    if (name === 'dr-ineligible') {
      toast('适用于已完成首次充值的会员。');
      return true;
    }
    if (name === 'dr-overlap') {
      toast('此活动不能与其他充值活动重叠。');
      return true;
    }
    if (name === 'dr-toggle-first') {
      if (r.deposited) { toast('本笔再存进行中，请先重置演示再切换资格'); return true; }
      r.hasFirstDeposit = !r.hasFirstDeposit;
      if (!r.hasFirstDeposit) r.option = null;
      store().save();
      toast(r.hasFirstDeposit ? '已恢复为已完成首次充值的会员' : '已切换为尚未完成首次充值，不符合参与资格');
      refresh();
      return true;
    }
    if (name === 'dr-toggle-overlap') {
      if (r.deposited && !r.overlap) { toast('本笔再存进行中，请先重置演示再切换重叠演示'); return true; }
      r.overlap = !r.overlap;
      if (r.overlap) r.option = null;
      store().save();
      toast(r.overlap ? '已演示其他充值活动进行中，本活动不可领取' : '已取消重叠演示');
      refresh();
      return true;
    }
    if (name === 'dr-next-day') {
      r.day = (r.day || 1) + 1;
      store().save();
      toast('已进入第 ' + r.day + ' 个演示日');
      refresh();
      return true;
    }
    if (name === 'dr-choose-live' || name === 'dr-choose-slots') {
      const id = name === 'dr-choose-live' ? 'live' : 'slots';
      if (r.overlap) { toast('此活动不能与其他充值活动重叠。'); return true; }
      if (!r.hasFirstDeposit) { toast('适用于已完成首次充值的会员。'); return true; }
      if (r.deposited) { toast('同一笔充值只能选择一种再存优惠。本笔再存已入账，不能改选。'); return true; }
      if (r.option && r.option !== id) {
        toast('同一笔充值只能选择一种再存优惠。');
        refresh();
        return true;
      }
      if (r.option === id) { refresh(); return true; }
      r.option = id;
      store().save();
      toast('已选择「' + drOpt(id).title + '」再存优惠，本笔充值不能再选另一种');
      refresh();
      return true;
    }
    if (name === 'dr-go-deposit') {
      if (r.overlap) { toast('此活动不能与其他充值活动重叠。'); return true; }
      if (!r.hasFirstDeposit) { toast('适用于已完成首次充值的会员。'); return true; }
      if (!r.option) { toast('请先选择一种再存优惠'); return true; }
      refreshPromo();
      requestAnimationFrame(() => {
        const el = document.getElementById('dr-deposit');
        if (el && $('#app')) $('#app').scrollTop = Math.max(0, el.offsetTop - 8);
      });
      return true;
    }
    if (name === 'dr-deposit-500' || name === 'dr-deposit-1000' || name === 'dr-deposit-3000') {
      const amount = Number(name.split('-').pop() || 0);
      if (!amount) return true;
      if (r.overlap) { toast('此活动不能与其他充值活动重叠。'); return true; }
      if (!r.hasFirstDeposit) { toast('适用于已完成首次充值的会员。'); return true; }
      if (!r.option) { toast('请先选择一种再存优惠'); return true; }
      if (r.deposited) {
        toast('不得将多笔充值合并领取同一笔彩金。');
        refresh();
        return true;
      }
      const c = drCalc(r.option, amount);
      r.deposited = true;
      r.depositAmount = amount;
      r.bonus = c.bonus;
      r.turnover = 0;
      r.turnoverNeed = c.need;
      store().save();
      toast('再存 RM ' + money(amount) + ' 成功，获得彩金 RM ' + money(c.bonus) + '，需完成有效流水 RM ' + money(c.need));
      refresh();
      return true;
    }
    if (name === 'dr-deposit-merge') {
      toast('不得将多笔充值合并领取同一笔彩金。');
      return true;
    }
    if (name === 'dr-deposit-void') {
      toast('取消、退款或异常充值不计入。');
      return true;
    }
    if (name === 'dr-go-turnover') {
      if (!r.deposited) return true;
      navigate('demo=dr-turnover');
      return true;
    }
    if (name === 'dr-bet-live' || name === 'dr-bet-slots' || name === 'dr-bet-fish') {
      if (!r.deposited) return true;
      const cat = name === 'dr-bet-live' ? 'live' : 'slots';
      const label = name === 'dr-bet-live' ? '真人' : name === 'dr-bet-fish' ? '捕鱼' : '老虎机';
      if (cat !== r.option) {
        toast('仅计算所选择游戏类别的有效投注。该笔「' + label + '」投注不计入。');
        return true;
      }
      if ((r.turnover || 0) >= r.turnoverNeed) { toast('所需有效流水已完成'); refresh(); return true; }
      const add = r2(Math.min(DR_BET, Math.max(0, r.turnoverNeed - (r.turnover || 0))));
      r.turnover = r2((r.turnover || 0) + add);
      store().save();
      toast('演示' + label + '有效投注 RM ' + money(DR_BET) + '，计入流水 RM ' + money(add));
      refresh();
      return true;
    }
    if (name === 'dr-accelerate') {
      if (!r.deposited) return true;
      r.turnover = r.turnoverNeed;
      store().save();
      toast('已演示加速完成所需有效流水（演示用）');
      refresh();
      return true;
    }
    if (name === 'dr-go-convert') {
      if (!r.deposited) return true;
      if ((r.turnover || 0) < r.turnoverNeed) { toast('请先完成指定倍数的有效流水'); navigate('demo=dr-turnover'); return true; }
      if ($('#modal') && $('#modal').open) closeModal();
      navigate('demo=dr-convert');
      return true;
    }
    if (name === 'dr-convert-confirm') {
      if (!r.deposited) return true;
      if ((r.turnover || 0) < r.turnoverNeed) { toast('请先完成指定倍数的有效流水'); return true; }
      const total = r2((r.depositAmount || 0) + (r.bonus || 0));
      const bonus = r.bonus;
      demo.mainWallet = r2((demo.mainWallet || 0) + total);
      r.claimedTotal = r2((r.claimedTotal || 0) + bonus);
      r.historyCount = (r.historyCount || 0) + 1;
      record('每日再存10%彩金', bonus, '已到账');
      r.option = null;
      r.deposited = false;
      r.depositAmount = 0;
      r.bonus = 0;
      r.turnover = 0;
      r.turnoverNeed = 0;
      store().save();
      toast('已转换至可提款余额，彩金 RM ' + money(bonus) + ' 已到账。可继续进行符合资格的再存。');
      navigate('activity=daily-reload');
      return true;
    }
    return false;
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
      'dw-convert': renderDwConvert,
      'vb-upgrade': renderVbUpgrade,
      'vb-retention': renderVbRetention,
      'vb-rebate': renderVbRebate,
      'vb-weekly': renderVbWeekly,
      'vb-festival': renderVbFestival,
      'vb-records': renderVbRecords,
      'ret-claim': renderRetClaim,
      'ret-games': renderRetGames,
      'ret-play': renderRetPlay,
      'ret-redeem': renderRetRedeem,
      'ret-redeem-process': renderRetRedeemProcess,
      'ret-redeem-success': renderRetRedeemSuccess,
      'fd-turnover': renderFdTurnover,
      'fd-convert': renderFdConvert,
      'dr-turnover': renderDrTurnover,
      'dr-convert': renderDrConvert
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
      'nfc-claim': () => !demo.freeChallenge.claimed && !demo.freeChallenge.redeemed && !retTrialTaken(demo),
      'nfc-games': () => demo.freeChallenge.claimed && !demo.freeChallenge.redeemed,
      'nfc-play': () => demo.freeChallenge.claimed && !demo.freeChallenge.redeemed,
      'nfc-redeem': () => demo.freeChallenge.reachedTarget && !demo.freeChallenge.redeemed,
      'nfc-redeem-process': () => demo.freeChallenge.reachedTarget && !demo.freeChallenge.redeemed,
      'nfc-redeem-success': () => demo.freeChallenge.redeemed,
      'ret-claim': () => !demo.returningMember.claimed && !demo.returningMember.redeemed && retEligible(demo.returningMember, demo) && !nfcTrialTaken(demo),
      'ret-games': () => demo.returningMember.claimed && !demo.returningMember.redeemed,
      'ret-play': () => demo.returningMember.claimed && !demo.returningMember.redeemed,
      'ret-redeem': () => demo.returningMember.reachedTarget && !demo.returningMember.redeemed,
      'ret-redeem-process': () => demo.returningMember.reachedTarget && !demo.returningMember.redeemed,
      'ret-redeem-success': () => demo.returningMember.redeemed,
      'fd-turnover': () => demo.firstDepositBonus.deposited && !demo.firstDepositBonus.converted,
      'fd-convert': () => demo.firstDepositBonus.deposited && !demo.firstDepositBonus.converted && (demo.firstDepositBonus.turnover || 0) >= (demo.firstDepositBonus.turnoverNeed || 0) && demo.firstDepositBonus.turnoverNeed > 0,
      'dr-turnover': () => demo.dailyReload.deposited,
      'dr-convert': () => demo.dailyReload.deposited && (demo.dailyReload.turnover || 0) >= (demo.dailyReload.turnoverNeed || 0) && demo.dailyReload.turnoverNeed > 0,
      'dw-spin': () => true,
      'dw-turnover': () => (demo.dailyWheel.bonusWallet || 0) > 0 || (demo.dailyWheel.converted || 0) > 0,
      'dw-convert': () => (demo.dailyWheel.bonusWallet || 0) > 0 && (demo.dailyWheel.turnover || 0) >= (demo.dailyWheel.turnoverNeed || 0) && demo.dailyWheel.turnoverNeed > 0
    };
    if (gates[screen] && !gates[screen]()) {
      const back = {
        nc: 'newcomer', ref: 'referral', gr: 'growth', an: 'anniversary', mt: 'maintenance', nfc: 'newcomer-free-challenge', dw: 'daily-wheel', vb: 'vip-benefits', ret: 'returning-member', fd: 'first-deposit-bonus', dr: 'daily-reload'
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
    if (handleVipAction(name, demo)) return true;
    if (handleRetAction(name, demo)) return true;
    if (handleFdAction(name, demo)) return true;
    if (handleDrAction(name, demo)) return true;
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
        if (retTrialTaken(demo)) { toast(RETURNING_SOURCE.exclusion); navigate('activity=newcomer-free-challenge'); return true; }
        navigate('demo=nfc-claim'); return true;
      case 'nfc-claim-confirm':
        if (c.claimed || c.redeemed) return true;
        if (retTrialTaken(demo)) { toast(RETURNING_SOURCE.exclusion); navigate('activity=newcomer-free-challenge'); return true; }
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
    const retGame = e.target.closest('[data-action="ret-open-game"]');
    if (retGame && !retGame.disabled) {
      const demo = store().load();
      demo.returningMember.currentGame = retGame.getAttribute('data-ret-game') || 'lucky-star';
      store().save();
      navigate('demo=ret-play');
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
      'newcomer-free-challenge': window.renderFreeChallengeDemo,
      'daily-wheel': window.renderDailyWheelDemo,
      'vip-benefits': window.renderVipBenefitsDemo,
      'returning-member': window.renderReturningMemberDemo,
      'first-deposit-bonus': window.renderFirstDepositDemo,
      'daily-reload': window.renderDailyReloadDemo
    };
    let body;
    if (selected === 1) body = rules(p);
    else if (selected === 2 && p.id === 'anniversary') body = window.renderAnniversaryTickets();
    else if (selected === 2 && p.id === 'vip-benefits') body = window.renderVipRecordsPanel();
    else if (selected === 2) body = tickets();
    else body = (pages[p.id] || (() => ''))();
    const stickyFor = {
      'newcomer-free-challenge': () => sticky(nfcCta(demoOf().freeChallenge)),
      'daily-wheel': () => sticky(dwCta(demoOf().dailyWheel)),
      'vip-benefits': () => sticky(vbCta(demoOf().vipBenefits)),
      'returning-member': () => sticky(retCta(demoOf().returningMember)),
      'first-deposit-bonus': () => sticky(fdCta(demoOf().firstDepositBonus)),
      'daily-reload': () => sticky(drCta(demoOf().dailyReload)),
      newcomer: () => sticky(ncCta(demoOf().newcomer)),
      referral: () => sticky(rfCta(demoOf().referral)),
      growth: () => sticky(grCta(demoOf().growth)),
      anniversary: () => sticky(anCta(demoOf().anniversary)),
      maintenance: () => sticky(mtCta(demoOf().maintenance))
    };
    const stickyHtml = selected === 0 && stickyFor[p.id] ? stickyFor[p.id]() : (p.id === 'anniversary' && selected === 2 ? sticky(anCta(demoOf().anniversary)) : '');
    const hero = p.banner ? `<div class="detail-hero">${banner(p)}</div>` : '';
    const detailClass = ['newcomer-free-challenge', 'daily-wheel', 'vip-benefits', 'returning-member', 'first-deposit-bonus', 'daily-reload', 'newcomer', 'referral', 'growth', 'anniversary', 'maintenance'].includes(p.id) ? 'trial-detail promo-detail' : '';
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
