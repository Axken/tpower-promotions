(() => {
  const r2 = n => Math.round((Number(n) || 0) * 100) / 100;
  const store = () => window.DemoAPI;
  const demoOf = () => store().get();

  const NC_JOURNEY = ['领取', '流水', '解锁', '彩金流水', '完成'];
  const RF_JOURNEY = ['邀请', '成功邀请', '解锁', '领取', '到账'];
  const GR_JOURNEY = ['首充档位', '解锁彩金', '领取', '下一档', '完成'];
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
  function rfIndex(r) {
    if (r.claimedTotal > 0) return 4;
    if (r.pending > 0) return 3;
    if (r.friends.some(f => f.status === '成功邀请')) return 2;
    if (r.friends.length) return 1;
    return 0;
  }
  function grIndex(g) {
    const caps = GROWTH_SOURCE.caps;
    const claimedAll = caps.every((c, i) => g.claimed[i] >= c);
    if (claimedAll) return 4;
    if (g.tier > 0) return 3;
    const claimable = g.unlocked[g.tier] - g.claimed[g.tier];
    if (claimable > 0) return 2;
    if (g.unlocked.some(v => v > 0)) return 1;
    return 0;
  }
  function anIndex(a) {
    if (a.claimed) return 4;
    if (a.expired && a.drawDone) return 3;
    if (a.drawDone) return 3;
    if (a.tickets.length) return 1;
    if (a.turnover > 0) return 0;
    return 0;
  }
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
      referral: () => ({ labels: RF_JOURNEY, current: rfIndex(demo.referral), finished: demo.referral.claimedTotal > 0 }),
      growth: () => ({ labels: GR_JOURNEY, current: grIndex(demo.growth), finished: GROWTH_SOURCE.caps.every((c, i) => demo.growth.claimed[i] >= c) }),
      anniversary: () => ({ labels: AN_JOURNEY, current: anIndex(demo.anniversary), finished: demo.anniversary.claimed }),
      maintenance: () => ({ labels: MT_JOURNEY, current: mtIndex(demo.maintenance), finished: demo.maintenance.completed })
    };
    if (map[id]) return map[id]();
    const byScreen = { nc: 'newcomer', ref: 'referral', gr: 'growth', an: 'anniversary', mt: 'maintenance' };
    if (byScreen[prefix] && map[byScreen[prefix]]) return map[byScreen[prefix]]();
    return null;
  };

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
  function rfCta(r) {
    if (r.pending > 0) return ['领取奖励', 'ref-go-claim', false];
    if (r.claimedTotal > 0 && r.pending <= 0) return ['暂无可领取奖励', 'demo-done', true];
    return ['邀请好友', 'ref-go-invite', false];
  }
  window.renderReferralDemo = function () {
    store().ensureBanner();
    const demo = store().load();
    const r = demo.referral;
    const viewStep = inspect('referral', 3, Math.min(3, rfIndex(r) === 4 ? 3 : rfIndex(r)));
    const s = REFERRAL_SOURCE.steps[viewStep];
    const rows = r.friends.length
      ? `<ul class="record-list">${r.friends.map(f => `<li><div><strong>${f.name}</strong><small>${f.account} · ${f.status}</small></div><div class="record-right"><b>${f.amount ? 'RM ' + money(f.amount) : '—'}</b><span class="status-badge">${f.status}</span></div></li>`).join('')}</ul>`
      : `<div class="compact-empty" id="friend-empty">${icon('friends')}<h4>暂无邀请好友</h4><p>好友记录将显示在这里</p></div>`;
    return `${store().journeyBar()}<section class="reward-feature trial-hero"><div class="panel-top"><span class="eyebrow">每位成功邀请</span><span class="status-badge">${r.claimedTotal > 0 ? '已领取' : r.pending > 0 ? '待领取' : '未参加'}</span></div><div class="amount"><small>最高 RM</small>1,000</div><p class="trial-prose">${REFERRAL_SOURCE.reward}</p></section><section class="section-panel"><div class="section-header"><h3>参与说明</h3></div>${checks(REFERRAL_SOURCE.eligibility)}</section><section class="section-panel"><div class="section-header"><h3>我的邀请</h3></div>${statRow([['已邀请好友', r.friends.length + '<span> 位</span>'], ['已解锁总额', money(r.unlocked)], ['已领取总额', money(r.claimedTotal)], ['待领取', money(r.pending)]], 'four-stats')}<span class="unit-note">金额单位：MYR</span></section><section class="section-panel flow-panel"><div class="section-header"><h3>活动流程</h3><span>点击步骤查看要求</span></div>${stepper(REFERRAL_SOURCE.steps, viewStep, 'referral')}<div class="step-explanation trial-prose"><div class="step-heading"><span class="step-kicker">0${viewStep + 1} / 04</span><h4>${s.heading}</h4></div><p class="trial-prose">${s.text}</p></div></section><section class="section-panel"><div class="section-header"><h3>推荐奖励明细</h3><span>${r.friends.length} 位好友</span></div>${rows}<div class="total-line"><span>可领取金额</span><strong>MYR ${money(r.pending)}</strong></div><p class="fine-print trial-prose">截图未包含有效邀请的判定标准、解锁条件、奖励档位、流水要求及领取期限。演示中「成功邀请」按页面展示的最高奖励 RM1,000 记入待领取，正式金额以平台为准。</p></section><section class="section-panel"><div class="section-header"><h3>重要条款</h3></div>${termsList(REFERRAL_SOURCE.terms)}</section><button type="button" class="outline-wide" data-tab="1">查看活动说明 ${icon('arrow')}</button>`;
  };
  function renderRefInvite() {
    const r = demoOf().referral;
    $('#app').innerHTML = page('邀请好友', `
      <p class="demo-lead trial-prose">每位成功邀请最高可获得 MYR 1,000.00 邀请奖励。截图未提供专属邀请链接与有效邀请门槛，预览不生成或发送邀请，仅在本机展示演示邀请码。</p>
      <section class="section-panel invite-code-card">
        <div class="section-header"><h3>演示邀请码</h3></div>
        <p class="invite-code" id="invite-code">${r.code}</p>
        <button type="button" class="outline-wide" data-action="ref-copy">复制邀请码</button>
      </section>
      <button type="button" class="primary" data-action="ref-friend-success">演示一位好友成功加入</button>
      <button type="button" class="outline-wide" data-action="ref-friend-fail">演示邀请未成功</button>
    `, 'activity=referral');
    document.title = '邀请好友 · TPOWER';
  }
  function renderRefClaim() {
    const r = demoOf().referral;
    $('#app').innerHTML = page('领取邀请奖励', `
      <section class="reward-feature trial-hero">
        <div class="panel-top"><span class="eyebrow">待领取</span><span class="status-badge">已解锁</span></div>
        <div class="amount"><small>RM</small>${money(r.pending).split('.')[0]}<span>.${money(r.pending).split('.')[1]}</span></div>
        <p class="trial-prose">已解锁且未领取的奖励可在活动页领取。演示按页面展示的最高奖励入账，正式金额以平台为准。</p>
      </section>
      <button type="button" class="primary" data-action="ref-claim-confirm">确认领取</button>
    `, 'activity=referral');
    document.title = '领取邀请奖励 · TPOWER';
  }

  /* ------------ 成长彩金 ------------ */
  function grClaimable(g, i) { return r2(Math.max(0, (g.unlocked[i] || 0) - (g.claimed[i] || 0))); }
  function grCta(g) {
    const caps = GROWTH_SOURCE.caps;
    if (caps.every((c, i) => g.claimed[i] >= c)) return ['已完成全部档位', 'demo-done', true];
    if (grClaimable(g, g.tier) > 0) return ['领取已解锁彩金', 'gr-go-claim', false];
    return ['去解锁彩金', 'gr-go-play', false];
  }
  function growthLevelStatus(g, i) {
    const cap = GROWTH_SOURCE.caps[i];
    if (g.claimed[i] >= cap) return '已完成';
    if (i === g.tier) return '进行中 · 不限时';
    if (i > g.tier) return '等待当前档位完成后自动激活';
    return '已结束';
  }
  window.renderGrowthDemo = function () {
    store().ensureBanner();
    const demo = store().load();
    const g = demo.growth;
    const cap = GROWTH_SOURCE.caps[g.tier];
    const title = GROWTH_SOURCE.titles[g.tier];
    const unlocked = g.unlocked[g.tier];
    const claimed = g.claimed[g.tier];
    const left = r2(cap - unlocked);
    const claimable = grClaimable(g, g.tier);
    const pct = cap ? Math.floor((unlocked / cap) * 100) : 0;
    const viewStep = inspect('growth', 3, Math.min(3, grIndex(g) === 4 ? 3 : grIndex(g)));
    const s = GROWTH_SOURCE.steps[viewStep];
    const levels = GROWTH_SOURCE.titles.map((t, i) => `<details class="level-card" ${i === g.tier ? 'open' : ''}><summary><span class="level-icon">${icon('gift')}</span><span class="level-title"><b>${t}</b><small>成长彩金 MYR ${money(GROWTH_SOURCE.caps[i])}</small></span><span class="level-status ${i === g.tier ? 'current' : ''}">${growthLevelStatus(g, i)}</span>${icon('arrow')}</summary><div class="level-content"><div class="bar-label"><span>已解锁 MYR ${money(g.unlocked[i])}</span><span>MYR ${money(GROWTH_SOURCE.caps[i])}</span></div><progress max="${GROWTH_SOURCE.caps[i]}" value="${Math.min(GROWTH_SOURCE.caps[i], g.unlocked[i])}" aria-label="${t}解锁进度"></progress><p class="fine-print">已领取 MYR ${money(g.claimed[i])} · 可领取 MYR ${money(grClaimable(g, i))}</p>${i === g.tier && claimable <= 0 && g.claimed[i] < cap ? `<p class="fine-print center trial-prose">可领取金额为 MYR 0.00，需先按比例解锁。</p>` : ''}</div></details>`).join('');
    return `${store().journeyBar()}<section class="section-panel growth-overview"><div class="section-header"><h3>当前档位 · ${title}</h3></div><div class="growth-main"><div><span class="eyebrow">${g.tier === 0 ? '首充200% · 最高彩金' : title + ' · 最高彩金'}</span><div class="growth-amount"><small>RM</small> ${money(cap).replace('.00', '')}<span>.00</span></div><span class="status-badge">${growthLevelStatus(g, g.tier)}</span></div><div class="progress-ring" role="img" aria-label="解锁进度${pct}%"><div><b>${pct}<span>%</span></b><small>解锁进度</small></div></div></div>${statRow([['可领取', '<em>' + money(claimable) + '</em>'], ['已领取', money(g.claimed.reduce((a, b) => a + b, 0))], ['待解锁', money(left)]])}<span class="unit-note">金额单位：MYR</span></section><section class="section-panel"><div class="section-header"><h3>参与说明</h3></div>${checks(GROWTH_SOURCE.eligibility)}</section><section class="section-panel flow-panel"><div class="section-header"><h3>活动流程</h3><span>点击步骤查看要求</span></div>${stepper(GROWTH_SOURCE.steps, viewStep, 'growth')}<div class="step-explanation trial-prose"><div class="step-heading"><span class="step-kicker">0${viewStep + 1} / 04</span><h4>${s.heading}</h4></div><p>${s.text}</p></div></section><div class="section-header outside"><h3>活动档位</h3><span>已完成 ${g.claimed.filter((v, i) => v >= GROWTH_SOURCE.caps[i]).length} / 5</span></div><section class="level-list">${levels}</section><section class="section-panel"><div class="section-header"><h3>解锁比例</h3><span>首充档位截图</span></div>${rateTable()}<p class="fine-print trial-prose">这些比例来自当前首充档位截图，其他档位的比例截图未展开。演示暂按已展示的比例计算，正式比例以平台为准。</p></section><section class="section-panel"><div class="section-header"><h3>重要条款</h3></div>${termsList(GROWTH_SOURCE.terms)}</section><button type="button" class="outline-wide" data-tab="1">查看活动说明 ${icon('arrow')}</button>`;
  };
  function renderGrPlay() {
    const g = demoOf().growth;
    const cap = GROWTH_SOURCE.caps[g.tier];
    const claimable = grClaimable(g, g.tier);
    $('#app').innerHTML = page('解锁彩金', `
      <div class="play-wallet">
        <div><span>${GROWTH_SOURCE.titles[g.tier]} 已解锁</span><strong>RM ${money(g.unlocked[g.tier])} / ${money(cap)}</strong></div>
        <div class="play-progress"><div class="bar-label"><span>可领取</span><span>RM ${money(claimable)}</span></div><progress max="${cap}" value="${Math.min(cap, g.unlocked[g.tier])}" aria-label="解锁进度"></progress></div>
      </div>
      <p class="trial-prose">截图当前首充档位显示的解锁比例：电子0.3%；打鱼0.3%；现场0.1%；体育0.5%。</p>
      <div class="rate-actions">${GROWTH_SOURCE.rates.map(([name, rate, label]) => `<button type="button" class="outline-wide" data-action="gr-bet" data-type="${name}" data-stake="10000">演示${name}投注 RM10,000（${label} → RM ${money(10000 * rate)}）</button>`).join('')}</div>
      <button type="button" class="primary" data-action="gr-accelerate">演示加速解锁当前档位</button>
      <p class="fine-print trial-prose">「演示加速」仅用于预览领奖流程，不是官方解锁速度或投注要求。各档位充值门槛、最低领取金额及提现规则，截图没有完整展示。</p>
      ${claimable > 0 ? '<button type="button" class="primary" data-action="gr-go-claim">领取已解锁彩金</button>' : ''}
    `, 'activity=growth');
    document.title = '解锁彩金 · TPOWER';
  }
  function renderGrClaim() {
    const g = demoOf().growth;
    const amt = grClaimable(g, g.tier);
    $('#app').innerHTML = page('领取彩金', `
      <section class="reward-feature trial-hero">
        <div class="panel-top"><span class="eyebrow">${GROWTH_SOURCE.titles[g.tier]} 可领取</span><span class="status-badge">已解锁</span></div>
        <div class="amount"><small>RM</small>${money(amt).split('.')[0]}<span>.${money(amt).split('.')[1] || '00'}</span></div>
        <p class="trial-prose">已解锁的彩金可在当前档位领取。截图没有完整展示最低领取金额及提现规则，演示将已解锁金额记入主钱包，不增设额外门槛。</p>
      </section>
      <button type="button" class="primary" data-action="gr-claim-confirm" ${amt > 0 ? '' : 'disabled'}>确认领取</button>
    `, 'activity=growth');
    document.title = '领取彩金 · TPOWER';
  }

  /* ------------ 周年抽奖 ------------ */
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
      'ref-claim': renderRefClaim,
      'gr-play': renderGrPlay,
      'gr-claim': renderGrClaim,
      'an-play': renderAnPlay,
      'an-draw': renderAnDraw,
      'an-claim': renderAnClaim,
      'mt-play': renderMtPlay,
      'mt-finish': renderMtFinish
    };
    if (!pages[screen]) return false;
    const demo = demoOf();
    const gates = {
      'nc-claim': () => !demo.newcomer.claimed && !demo.newcomer.abandoned,
      'nc-play': () => demo.newcomer.claimed && !demo.newcomer.abandoned,
      'nc-unlock': () => demo.newcomer.challengeDone && !demo.newcomer.deposited && !demo.newcomer.expired && !demo.newcomer.abandoned,
      'nc-wager': () => demo.newcomer.deposited && !demo.newcomer.completed,
      'nc-done': () => demo.newcomer.completed || demo.newcomer.expired || demo.newcomer.abandoned,
      'ref-claim': () => demo.referral.pending > 0,
      'gr-claim': () => grClaimable(demo.growth, demo.growth.tier) > 0,
      'an-draw': () => demo.anniversary.tickets.length > 0,
      'an-claim': () => demo.anniversary.drawDone && demo.anniversary.winAmount > 0 && !demo.anniversary.claimed && !demo.anniversary.expired,
      'mt-play': () => demo.maintenance.joined && demo.maintenance.eligible,
      'mt-finish': () => demo.maintenance.reached && !demo.maintenance.completed
    };
    if (gates[screen] && !gates[screen]()) {
      const back = {
        nc: 'newcomer', ref: 'referral', gr: 'growth', an: 'anniversary', mt: 'maintenance'
      }[screen.split('-')[0]];
      navigate('activity=' + back);
      return true;
    }
    pages[screen]();
    return true;
  };

  window.PromoHandleAction = function (name) {
    const demo = store().load();
    const n = demo.newcomer;
    const r = demo.referral;
    const g = demo.growth;
    const a = demo.anniversary;
    const m = demo.maintenance;

    switch (name) {
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
        try { navigator.clipboard && navigator.clipboard.writeText(r.code); } catch {}
        toast('已复制演示邀请码'); return true;
      case 'ref-friend-success': {
        r.friends.push({ name: '演示好友 ' + String.fromCharCode(65 + r.friends.length), account: 'user****' + (12 + r.friends.length), status: '成功邀请', amount: 1000 });
        r.unlocked = r2(r.unlocked + 1000);
        r.pending = r2(r.pending + 1000);
        store().save(); toast('一位好友已成功加入，待领取 RM1,000.00（按最高可获奖励演示）'); navigate('activity=referral'); return true;
      }
      case 'ref-friend-fail':
        r.friends.push({ name: '演示好友 ' + String.fromCharCode(65 + r.friends.length), account: 'user****' + (12 + r.friends.length), status: '未成功', amount: 0 });
        store().save(); toast('该次邀请未成功，奖励未解锁'); navigate('activity=referral'); return true;
      case 'ref-go-claim':
        if (r.pending <= 0) { toast('暂无可领取奖励'); return true; }
        navigate('demo=ref-claim'); return true;
      case 'ref-claim-confirm': {
        if (r.pending <= 0) return true;
        const amt = r.pending;
        r.claimedTotal = r2(r.claimedTotal + amt);
        r.pending = 0;
        demo.mainWallet = r2(demo.mainWallet + amt);
        record('邀请好友奖励', amt, '已到账');
        store().save(); toast('邀请奖励已到账'); navigate('demo=records'); return true;
      }

      case 'gr-go-play':
        navigate('demo=gr-play'); return true;
      case 'gr-bet':
        return true; // handled via data-type click
      case 'gr-accelerate': {
        const cap = GROWTH_SOURCE.caps[g.tier];
        g.lastUnlock = r2(cap - g.unlocked[g.tier]);
        g.unlocked[g.tier] = cap;
        store().save(); toast('当前档位已演示加速解锁（非正式解锁速度）'); navigate('demo=gr-play'); return true;
      }
      case 'gr-go-claim':
        if (grClaimable(g, g.tier) <= 0) { toast('暂无可领取彩金'); return true; }
        navigate('demo=gr-claim'); return true;
      case 'gr-claim-confirm': {
        const amt = grClaimable(g, g.tier);
        if (amt <= 0) return true;
        g.claimed[g.tier] = r2(g.claimed[g.tier] + amt);
        demo.mainWallet = r2(demo.mainWallet + amt);
        record('成长彩金计划 · ' + GROWTH_SOURCE.titles[g.tier], amt, '已到账');
        if (g.claimed[g.tier] >= GROWTH_SOURCE.caps[g.tier] && g.tier < 4) g.tier += 1;
        store().save();
        toast('彩金已记入主钱包');
        navigate('activity=growth');
        return true;
      }

      case 'an-go-play':
        navigate('demo=an-play'); return true;
      case 'an-add-turnover': {
        if (a.tickets.length >= 3) return true;
        a.turnover = r2(a.turnover + 200);
        const no = AN_TICKETS[a.tickets.length] || String(100000 + a.tickets.length * 173).slice(0, 6);
        a.tickets.push(no);
        store().save(); toast('有效流水满 RM200，获得1张抽奖券'); navigate('demo=an-play'); return true;
      }
      case 'an-go-draw':
        if (!a.tickets.length) return true;
        navigate('demo=an-draw'); return true;
      case 'an-draw-confirm': {
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
    const bet = e.target.closest('[data-action="gr-bet"]');
    if (bet) {
      const demo = store().load();
      const g = demo.growth;
      const type = bet.getAttribute('data-type');
      const stake = Number(bet.getAttribute('data-stake') || 0);
      const rateRow = GROWTH_SOURCE.rates.find(x => x[0] === type);
      if (!rateRow || !stake) return;
      const cap = GROWTH_SOURCE.caps[g.tier];
      const add = r2(Math.min(stake * rateRow[1], cap - g.unlocked[g.tier]));
      g.unlocked[g.tier] = r2(g.unlocked[g.tier] + add);
      g.lastUnlock = add;
      g.lastRate = rateRow[2];
      g.lastStake = stake;
      store().save();
      toast(`演示${type}投注 RM ${money(stake)}，按 ${rateRow[2]} 解锁 RM ${money(add)}`);
      renderGrPlay();
      return;
    }
    const stepBtn = e.target.closest('[data-promo-step]');
    if (stepBtn) {
      const [key, idx] = stepBtn.getAttribute('data-promo-step').split(':');
      state.promoInspect = state.promoInspect || {};
      state.promoInspect[key] = Number(idx);
      refreshPromo();
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
      'newcomer-trial': trial
    };
    let body;
    if (selected === 1) body = rules(p);
    else if (selected === 2 && p.id === 'anniversary') body = window.renderAnniversaryTickets();
    else if (selected === 2) body = tickets();
    else body = (pages[p.id] || (() => ''))();
    const stickyFor = {
      'newcomer-trial': trialSticky,
      newcomer: () => sticky(ncCta(demoOf().newcomer)),
      referral: () => sticky(rfCta(demoOf().referral)),
      growth: () => sticky(grCta(demoOf().growth)),
      anniversary: () => sticky(anCta(demoOf().anniversary)),
      maintenance: () => sticky(mtCta(demoOf().maintenance))
    };
    const stickyHtml = selected === 0 && stickyFor[p.id] ? stickyFor[p.id]() : (p.id === 'anniversary' && selected === 2 ? sticky(anCta(demoOf().anniversary)) : '');
    const hero = p.banner ? `<div class="detail-hero">${banner(p)}</div>` : '';
    const detailClass = ['newcomer-trial', 'newcomer', 'referral', 'growth', 'anniversary', 'maintenance'].includes(p.id) ? 'trial-detail promo-detail' : '';
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
