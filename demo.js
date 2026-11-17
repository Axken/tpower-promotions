(() => {
  const DEMO_KEY = 'tpower-trial-demo-v1';
  const JOURNEY = ['注册', '实名', '领取', '试玩', '达标', '兑换', '到账'];
  const WIN_SPINS = [
    { delta: 20, symbols: ['7', '7', '7'] },
    { delta: -10, symbols: ['星', 'BAR', '7'] },
    { delta: 30, symbols: ['星', '星', '星'] },
    { delta: 20, symbols: ['铃', '铃', '铃'] },
    { delta: 20, symbols: ['7', '7', 'BAR'] },
    { delta: 20, symbols: ['7', '7', '7'] }
  ];
  const LOSE_SPINS = [
    { delta: -40, symbols: ['BAR', '星', '7'] },
    { delta: -40, symbols: ['铃', 'BAR', '星'] },
    { delta: -20, symbols: ['7', '星', 'BAR'] }
  ];
  const GAMES = [
    { id: 'lucky-star', name: '幸运星老虎机', tag: '指定试玩', icon: 'slot' },
    { id: 'golden-spin', name: '黄金旋转', tag: '指定试玩', icon: 'crown' },
    { id: 'classic-fruit', name: '经典水果机', tag: '指定试玩', icon: 'gift' }
  ];

  function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function defaultDemo() {
    return {
      phone: '012-3456789',
      otp: '',
      otpSent: false,
      loggedIn: false,
      kyc: { status: 'none', name: '陈美玲', idType: 'ic', idNumber: '990101-14-1234', idFront: false, idBack: false, selfie: false },
      claimed: false,
      trialBalance: 0,
      trialEnded: false,
      reachedTarget: false,
      redeemed: false,
      mainWallet: 0,
      records: [],
      spinIndex: 0,
      playMode: 'win',
      currentGame: 'lucky-star',
      spinning: false,
      lastSymbols: ['7', '星', '铃']
    };
  }
  function loadDemo() {
    try {
      const raw = localStorage.getItem(DEMO_KEY);
      if (!raw) return defaultDemo();
      const parsed = JSON.parse(raw);
      parsed.kyc = Object.assign(defaultDemo().kyc, parsed.kyc || {});
      return Object.assign(defaultDemo(), parsed, { spinning: false });
    } catch {
      return defaultDemo();
    }
  }
  function saveDemo() {
    try {
      const copy = Object.assign({}, demo, { spinning: false });
      localStorage.setItem(DEMO_KEY, JSON.stringify(copy));
    } catch {}
  }
  let demo = loadDemo();
  let demoTimer = 0;
  const later = (fn, ms) => { clearTimeout(demoTimer); demoTimer = setTimeout(fn, ms); };

  function journeyIndex() {
    if (!demo.loggedIn) return 0;
    if (demo.kyc.status !== 'approved') return 1;
    if (!demo.claimed) return 2;
    if (demo.redeemed) return 6;
    if (demo.reachedTarget) {
      const screen = currentRoute().get('demo');
      if (screen === 'redeem-success') return 6;
      if (screen === 'redeem' || screen === 'redeem-process') return 5;
      return 4;
    }
    return 3;
  }
  function journeyBar() {
    const current = journeyIndex();
    const finished = demo.redeemed;
    return `<ol class="journey-steps" aria-label="演示流程">${JOURNEY.map((label, i) => `<li class="${i < current || (finished && i === current) ? 'done' : ''} ${i === current ? 'current' : ''}"><b>${i < current || (finished && i === current) ? '✓' : i + 1}</b><span>${label}</span></li>`).join('')}</ol>`;
  }
  function demoPage(title, body, backHash) {
    const back = backHash != null
      ? `<button type="button" class="back-link" data-demo-nav="${esc(backHash)}">${icon('arrow')} 返回</button>`
      : '';
    return `<article class="demo-screen">${back}${journeyBar()}<div class="demo-heading"><span class="demo-badge">演示模式</span><h2>${title}</h2></div>${body}</article>`;
  }

  window.toast = function toast(message) {
    let el = document.getElementById('demo-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'demo-toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), 2400);
  };

  function ensureBanner() {
    if (document.getElementById('demo-banner')) return;
    const bar = document.createElement('div');
    bar.id = 'demo-banner';
    bar.className = 'demo-banner';
    bar.innerHTML = '<span class="demo-badge">演示模式</span><span class="demo-banner-text">完整领奖流程预览，不连接真实账户</span><button type="button" class="text-button" data-action="demo-reset">重置演示</button>';
    const shell = document.querySelector('.site-shell');
    const app = document.getElementById('app');
    if (shell && app) shell.insertBefore(bar, app);
  }

  function renderRegister() {
    const sent = demo.otpSent;
    $('#app').innerHTML = demoPage('注册 / 登录', `
      <p class="demo-lead">完成注册及实名认证后，即可领取试玩额度。演示账号已预填，按步骤继续即可。</p>
      <form class="demo-form" data-demo-form="register">
        <label>手机号码<input id="demo-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" value="${esc(demo.phone)}" placeholder="请输入手机号码"></label>
        <button type="button" class="outline-wide" data-action="demo-otp">${sent ? '重新获取验证码' : '获取验证码'}</button>
        <label id="otp-field" ${sent ? '' : 'hidden'}>验证码<input id="demo-otp" name="otp" type="text" inputmode="numeric" maxlength="6" value="${esc(demo.otp)}" placeholder="请输入验证码"></label>
        <button type="submit" class="primary" id="register-submit" ${sent ? '' : 'disabled'}>注册</button>
      </form>
      <p class="fine-print center trial-prose">仅限新注册会员。同一手机号、真实姓名或设备仅限领取一次。</p>
    `, 'activity=newcomer-trial');
    document.title = '注册 / 登录 · TPOWER';
  }

  function uploadSlot(key, label) {
    const on = demo.kyc[key];
    return `<button type="button" class="upload-slot ${on ? 'is-uploaded' : ''}" data-action="demo-upload" data-upload="${key}" aria-pressed="${on}"><span class="upload-preview">${icon(on ? 'shield' : 'image')}</span><span>${on ? '已上传（演示）' : label}</span></button>`;
  }

  function renderKyc() {
    const k = demo.kyc;
    $('#app').innerHTML = demoPage('实名认证', `
      <p class="demo-lead trial-prose">必须完成实名认证（KYC）。</p>
      <form class="demo-form" data-demo-form="kyc">
        <label>真实姓名<input id="kyc-name" name="name" type="text" value="${esc(k.name)}" placeholder="请输入真实姓名" autocomplete="name"></label>
        <label>证件类型<select id="kyc-type" name="idType"><option value="ic"${k.idType === 'ic' ? ' selected' : ''}>身份证</option><option value="passport"${k.idType === 'passport' ? ' selected' : ''}>护照</option></select></label>
        <label>证件号码<input id="kyc-id" name="idNumber" type="text" value="${esc(k.idNumber)}" placeholder="请输入证件号码"></label>
        <div class="upload-grid" aria-label="证件上传">
          ${uploadSlot('idFront', '上传证件正面')}
          ${uploadSlot('idBack', '上传证件反面')}
          ${uploadSlot('selfie', '上传手持自拍照')}
        </div>
        <p class="fine-print">点击上传栏即可模拟选择演示图片，不会读取你的相册或摄像头。</p>
        <button type="submit" class="primary">提交认证</button>
      </form>
    `, 'activity=newcomer-trial');
    document.title = '实名认证 · TPOWER';
  }

  function renderKycReview() {
    $('#app').innerHTML = demoPage('审核中', `
      <section class="demo-status-card">
        <div class="demo-spinner" aria-hidden="true"></div>
        <h3>资料审核中</h3>
        <p>正在核对姓名与证件信息，请稍候。</p>
      </section>
    `, 'demo=kyc');
    document.title = '审核中 · TPOWER';
    later(() => {
      demo.kyc.status = 'approved';
      saveDemo();
      navigate('demo=kyc-success');
    }, 1600);
  }

  function renderKycSuccess() {
    $('#app').innerHTML = demoPage('认证成功', `
      <section class="demo-status-card success">
        <div class="demo-success-mark" aria-hidden="true">${icon('shield')}</div>
        <h3>认证成功</h3>
        <p>你已完成实名认证，可以返回活动领取试玩额度。</p>
        <ul class="kyc-summary">
          <li><span>姓名</span><strong>${esc(demo.kyc.name)}</strong></li>
          <li><span>证件</span><strong>${esc(demo.kyc.idNumber)}</strong></li>
          <li><span>状态</span><strong>已认证</strong></li>
        </ul>
        <button type="button" class="primary" data-demo-nav="activity=newcomer-trial">返回活动领取额度</button>
      </section>
    `);
    document.title = '认证成功 · TPOWER';
  }

  function renderClaim() {
    $('#app').innerHTML = demoPage('领取试玩额度', `
      <section class="reward-feature trial-hero">
        <div class="panel-top"><span class="eyebrow">活动奖励</span><span class="status-badge">待领取</span></div>
        <div class="amount"><small>RM</small>100<span>.00</span></div>
        <p class="trial-prose">免费领取RM100试玩额度。</p>
      </section>
      <section class="section-panel">
        <div class="section-header"><h3>领取前请确认</h3></div>
        <ul class="trial-terms trial-prose">
          <li>试玩额度不可直接充值、转账或提款。</li>
          <li>每位符合资格的会员终身限领一次。</li>
          <li>试玩余额达到RM200，即可兑换RM100现金奖励。</li>
        </ul>
      </section>
      <button type="button" class="primary" data-action="demo-claim-confirm">确认领取</button>
    `, 'activity=newcomer-trial');
    document.title = '领取试玩额度 · TPOWER';
  }

  function renderGames() {
    $('#app').innerHTML = demoPage('指定游戏', `
      <div class="wallet-pair compact">
        <div class="wallet-card trial"><span>试玩钱包</span><strong>RM ${money(demo.trialBalance)}</strong></div>
        <div class="wallet-card"><span>达标目标</span><strong>RM 200.00</strong></div>
      </div>
      <p class="demo-lead trial-prose">在指定游戏中进行试玩。试玩额度不可直接充值、转账或提款。</p>
      <div class="game-grid">${GAMES.map(g => `<button type="button" class="game-tile" data-action="demo-open-game" data-game="${g.id}"><span class="game-icon">${icon(g.icon)}</span><strong>${g.name}</strong><small>${g.tag}</small></button>`).join('')}</div>
    `, 'activity=newcomer-trial');
    document.title = '指定游戏 · TPOWER';
  }

  function renderPlay() {
    const game = GAMES.find(g => g.id === demo.currentGame) || GAMES[0];
    const over = demo.trialEnded;
    const ready = demo.reachedTarget && !demo.redeemed;
    const canSpin = demo.claimed && !over && !ready && !demo.redeemed;
    const symbols = (demo.lastSymbols || ['7', '星', '铃']).map(s => `<span>${s}</span>`).join('');
    $('#app').innerHTML = demoPage(game.name, `
      <div class="play-wallet">
        <div><span>试玩钱包</span><strong id="play-balance">RM ${money(demo.trialBalance)}</strong></div>
        <div class="play-progress"><div class="bar-label"><span>达标进度</span><span id="play-target">RM ${money(demo.trialBalance)} / RM 200.00</span></div><progress id="play-bar" max="200" value="${Math.min(200, demo.trialBalance)}" aria-label="试玩余额进度"></progress></div>
      </div>
      <section class="slot-machine" aria-label="演示老虎机">
        <div class="slot-window" id="slot-window">${symbols}</div>
        <p class="slot-result" id="slot-result" aria-live="polite">${over ? '试玩已结束' : ready ? '已达到 RM200' : '按下开始，演示一局试玩'}</p>
        <button type="button" class="primary" id="spin-btn" data-action="demo-spin" ${canSpin ? '' : 'disabled'}>${canSpin ? '开始旋转' : '暂停试玩'}</button>
      </section>
      ${ready ? '<button type="button" class="primary" data-action="demo-go-redeem">兑换RM100现金</button>' : ''}
      ${over ? `<section class="section-panel"><h3>试玩已结束</h3><p class="trial-prose">未达RM200目标，不可兑换部分奖励。</p><p class="fine-print">试玩额度已用尽。每位符合资格的会员终身限领一次，演示中可重置后重新体验。</p><button type="button" class="outline-wide" data-action="demo-reset">重置演示</button></section>` : ''}
      ${canSpin ? '<button type="button" class="text-button trial-reset" data-action="demo-fail-path">演示未达标（余额归零）</button>' : ''}
    `, 'demo=games');
    document.title = game.name + ' · TPOWER';
  }

  function renderRedeem() {
    $('#app').innerHTML = demoPage('兑换现金', `
      <section class="reward-feature trial-hero">
        <div class="panel-top"><span class="eyebrow">可兑换现金</span><span class="status-badge">已达标</span></div>
        <div class="amount"><small>RM</small>100<span>.00</span></div>
        <p class="trial-prose">试玩余额达到RM200，即可兑换RM100现金奖励。</p>
      </section>
      <section class="section-panel">
        <div class="section-header"><h3>兑换说明</h3></div>
        <ul class="trial-terms trial-prose">
          <li>达标兑换后，试玩额度及剩余试玩余额自动清零。</li>
          <li>兑换的 RM100 现金将转入主钱包。</li>
          <li>每位符合资格的会员终身限领一次。</li>
        </ul>
        <div class="wallet-pair">
          <div class="wallet-card trial"><span>试玩钱包（兑换后清零）</span><strong>RM ${money(demo.trialBalance)}</strong></div>
          <div class="wallet-card main"><span>主钱包（到账后）</span><strong>RM ${money(demo.mainWallet + 100)}</strong></div>
        </div>
      </section>
      <button type="button" class="primary" data-action="demo-redeem-confirm">确认兑换</button>
    `, 'activity=newcomer-trial');
    document.title = '兑换现金 · TPOWER';
  }

  function renderRedeemProcess() {
    $('#app').innerHTML = demoPage('兑换中', `
      <section class="demo-status-card">
        <div class="demo-spinner" aria-hidden="true"></div>
        <h3>正在兑换</h3>
        <p>正在将 RM100 现金转入主钱包。</p>
      </section>
    `);
    document.title = '兑换中 · TPOWER';
    later(() => {
      const now = new Date();
      demo.redeemed = true;
      demo.trialBalance = 0;
      demo.mainWallet = 100;
      demo.records.unshift({
        id: 'trial-cash-' + now.getTime(),
        title: '新人免费体验礼',
        amount: 100,
        status: '已到账',
        time: now.toISOString()
      });
      saveDemo();
      navigate('demo=redeem-success');
    }, 1400);
  }

  function renderRedeemSuccess() {
    $('#app').innerHTML = demoPage('兑换成功', `
      <section class="demo-status-card success">
        <div class="demo-success-mark" aria-hidden="true">${icon('cash')}</div>
        <h3>兑换成功</h3>
        <p class="trial-prose">达标兑换后，试玩额度及剩余试玩余额自动清零。</p>
        <div class="wallet-pair">
          <div class="wallet-card main highlight"><span>主钱包</span><strong>RM ${money(demo.mainWallet)}</strong><small>RM100 现金已到账</small></div>
          <div class="wallet-card trial"><span>试玩钱包</span><strong>RM 0.00</strong><small>已清零</small></div>
        </div>
        <button type="button" class="primary" data-demo-nav="demo=records">查看领奖记录</button>
        <button type="button" class="outline-wide" data-demo-nav="activity=newcomer-trial">返回活动</button>
      </section>
    `);
    document.title = '兑换成功 · TPOWER';
  }

  function formatRecordTime(iso) {
    try {
      return new Date(iso).toLocaleString('zh-CN', { timeZone: 'Asia/Kuala_Lumpur', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    } catch {
      return iso;
    }
  }

  function renderRecords() {
    const rows = demo.records.length
      ? `<ul class="record-list">${demo.records.map(r => `<li><div><strong>${esc(r.title)}</strong><small>${formatRecordTime(r.time)}</small></div><div class="record-right"><b>RM ${money(r.amount)}</b><span class="status-badge">${esc(r.status)}</span></div></li>`).join('')}</ul>`
      : `<div class="compact-empty">${icon('receipt')}<h4>暂无领奖记录</h4><p>完成新人免费体验礼兑换后，记录将显示在这里。</p></div>`;
    $('#app').innerHTML = demoPage('领奖记录', `${rows}<p class="fine-print center">演示记录仅保存在本机浏览器中。</p>`, 'activity=newcomer-trial');
    document.title = '领奖记录 · TPOWER';
  }

  function renderAccount() {
    const kycLabel = demo.kyc.status === 'approved' ? '已认证' : demo.loggedIn ? '未认证' : '未登录';
    $('#app').innerHTML = demoPage('我的账户', `
      <section class="account-card">
        <div class="account-avatar">${icon('user')}</div>
        <div>
          <strong>${demo.loggedIn ? esc(demo.kyc.name || '演示会员') : '游客'}</strong>
          <p>${demo.loggedIn ? esc(demo.phone) : '登录后可体验完整领奖流程'}</p>
        </div>
        <span class="status-badge ${demo.kyc.status === 'approved' ? '' : 'muted'}">${kycLabel}</span>
      </section>
      <div class="wallet-pair">
        <div class="wallet-card main ${demo.mainWallet > 0 ? 'highlight' : ''}"><span>主钱包</span><strong>RM ${money(demo.mainWallet)}</strong></div>
        <div class="wallet-card trial"><span>试玩钱包</span><strong>RM ${money(demo.trialBalance)}</strong></div>
      </div>
      <section class="section-panel">
        <div class="section-header"><h3>账户状态</h3><span class="demo-badge">演示模式</span></div>
        <ul class="kyc-summary">
          <li><span>登录</span><strong>${demo.loggedIn ? '已登录' : '未登录'}</strong></li>
          <li><span>实名认证</span><strong>${kycLabel}</strong></li>
          <li><span>体验礼</span><strong>${demo.redeemed ? '已领取' : demo.claimed ? '进行中' : '未参加'}</strong></li>
        </ul>
      </section>
      ${demo.loggedIn ? '' : '<button type="button" class="primary" data-demo-nav="demo=register">注册 / 登录</button>'}
      <button type="button" class="outline-wide" data-action="demo-reset">重置演示</button>
    `, 'category=all');
    document.title = '我的账户 · TPOWER';
  }

  window.renderDemo = function renderDemo(screen) {
    ensureBanner();
    clearTimeout(demoTimer);
    demo = loadDemo();
    const gate = {
      claim: () => demo.loggedIn && demo.kyc.status === 'approved' && !demo.claimed && !demo.redeemed,
      games: () => demo.claimed && !demo.redeemed,
      play: () => demo.claimed && !demo.redeemed,
      redeem: () => demo.reachedTarget && !demo.redeemed,
      'redeem-process': () => demo.reachedTarget && !demo.redeemed,
      'redeem-success': () => demo.redeemed,
      kyc: () => demo.loggedIn && demo.kyc.status !== 'approved',
      'kyc-review': () => demo.loggedIn,
      'kyc-success': () => demo.kyc.status === 'approved'
    };
    if (gate[screen] && !gate[screen]()) {
      navigate('activity=newcomer-trial');
      return;
    }
    const pages = {
      register: renderRegister,
      kyc: renderKyc,
      'kyc-review': renderKycReview,
      'kyc-success': renderKycSuccess,
      claim: renderClaim,
      games: renderGames,
      play: renderPlay,
      redeem: renderRedeem,
      'redeem-process': renderRedeemProcess,
      'redeem-success': renderRedeemSuccess,
      records: renderRecords,
      account: renderAccount
    };
    if (pages[screen]) pages[screen]();
    else navigate('activity=newcomer-trial');
    $('#app').scrollTo(0, 0);
  };

  function trialCurrentAction() {
    if (!demo.loggedIn) return ['注册并开始演示', 'demo-start', false];
    if (demo.kyc.status !== 'approved') return ['去实名认证', 'demo-go-kyc', false];
    if (demo.redeemed) return ['已领取', 'demo-done', true];
    if (!demo.claimed) return ['领取RM100试玩额度', 'demo-go-claim', false];
    if (demo.trialEnded) return ['未达RM200，不可兑换', 'demo-done', true];
    if (demo.reachedTarget) return ['兑换RM100现金', 'demo-go-redeem', false];
    return ['去试玩', 'demo-go-play', false];
  }

  window.trialStatus = function () {
    if (demo.redeemed) return ['已领取 · 终身限领一次', 'muted'];
    if (demo.trialEnded) return ['未达标 · 不可兑换', 'muted'];
    if (demo.reachedTarget) return ['已达标 · 可兑换', ''];
    if (demo.claimed) return ['已领取 · 试玩中', ''];
    if (demo.kyc.status === 'approved') return ['已认证 · 待领取', ''];
    if (demo.loggedIn) return ['已注册 · 待实名', ''];
    return ['未参与 · 演示模式', 'muted'];
  };
  window.trialAction = trialCurrentAction;
  window.trialSticky = function () {
    const [label, name, disabled] = trialCurrentAction();
    return `<div class="trial-cta-slot">${action(label, name, disabled)}</div>`;
  };
  window.trialCard = function (p) {
    return `<button class="promo-card trial-list-card" data-promo="${p.id}" aria-label="查看${p.title}详情"><div class="trial-card-hero"><span class="trial-card-tag">新人体验</span><p class="trial-card-summary trial-prose">${p.summary}</p><div class="trial-path" aria-hidden="true"><div><strong>RM100</strong><span>免费试玩</span></div><span class="trial-path-arrow"></span><div><strong>RM200</strong><span>达标余额</span></div><span class="trial-path-arrow"></span><div><strong>RM100</strong><span>兑换现金</span></div></div></div><div class="card-footer"><div><div class="card-title">${p.title}</div><div class="card-type">${p.summary}</div></div><span class="card-link">查看详情 ${icon('arrow')}</span></div></button>`;
  };
  window.trialBalancePanel = function () {
    if (!demo.claimed) return '';
    return `<div class="wallet-pair" id="trial-balance">
      <div class="wallet-card trial"><span>试玩钱包</span><strong>RM ${money(demo.trialBalance)}</strong><small>${demo.redeemed ? '已清零' : demo.trialEnded ? '试玩已结束' : '不可充值、转账或提款'}</small></div>
      <div class="wallet-card main ${demo.mainWallet > 0 ? 'highlight' : ''}"><span>主钱包</span><strong>RM ${money(demo.mainWallet)}</strong><small>${demo.redeemed ? 'RM100 现金已到账' : '兑换现金将进入此钱包'}</small></div>
    </div>
    <div class="trial-balance">${demo.claimed && !demo.redeemed && !demo.trialEnded ? `<div class="bar-label"><span>试玩余额</span><span>RM ${money(demo.trialBalance)} / RM 200.00</span></div><progress max="200" value="${Math.min(200, demo.trialBalance)}" aria-label="试玩余额进度"></progress>` : ''}
    <p class="fine-print trial-prose">${demo.redeemed ? '达标兑换后，试玩额度及剩余试玩余额自动清零。' : demo.trialEnded ? '未达RM200目标，不可兑换部分奖励。' : '试玩余额达到RM200，即可兑换RM100现金奖励。未达RM200目标，不可兑换部分奖励。'}</p></div>`;
  };
  window.trial = function () {
    ensureBanner();
    demo = loadDemo();
    const [status, statusCls] = trialStatus();
    const stage = journeyIndex();
    const viewMap = { 0: 0, 1: 0, 2: 1, 3: 2, 4: 3, 5: 3, 6: 3 };
    const auto = viewMap[stage] ?? 0;
    const viewStep = Number.isInteger(state.trial && state.trial.inspect) ? Math.max(0, Math.min(3, state.trial.inspect)) : auto;
    const s = TRIAL_SOURCE.steps[viewStep];
    const path = `<div class="trial-path" aria-label="活动奖励"><div><strong>RM100</strong><span>免费试玩</span></div><span class="trial-path-arrow" aria-hidden="true"></span><div><strong>RM200</strong><span>达标余额</span></div><span class="trial-path-arrow" aria-hidden="true"></span><div><strong>RM100</strong><span>兑换现金</span></div></div>`;
    const checks = `<ul class="eligibility-list trial-prose">${TRIAL_SOURCE.eligibility.map(item => `<li><span class="eligibility-mark" aria-hidden="true"></span><span>${item}</span></li>`).join('')}</ul>`;
    const stepper = `<div class="flow-steps trial-steps" aria-label="活动流程">${TRIAL_SOURCE.steps.map((st, i) => `<button type="button" data-trial-step="${i}" aria-pressed="${viewStep === i}" class="${viewStep === i ? 'active' : ''}${i < viewStep ? ' done' : ''}"><b>${i < viewStep ? '✓' : i + 1}</b><span>${st.title}</span></button>`).join('')}</div>`;
    return `${journeyBar()}${trialBalancePanel()}<section class="reward-feature trial-hero"><div class="panel-top"><span class="eyebrow">活动奖励</span><span class="status-badge ${statusCls}">${status}</span></div><div class="amount"><small>RM</small>100<span>.00</span></div><p class="trial-prose">${TRIAL_SOURCE.reward}</p>${path}</section><section class="section-panel"><div class="section-header"><h3>参与条件</h3></div>${checks}</section><section class="section-panel flow-panel"><div class="section-header"><h3>活动流程</h3><span>点击步骤查看要求</span></div>${stepper}<div class="step-explanation trial-prose" id="trial-step-explanation" aria-live="polite"><div class="step-heading"><span class="step-kicker">0${viewStep + 1} / 04</span><h4>${s.heading}</h4></div><p>${s.text}</p></div></section><section class="section-panel"><div class="section-header"><h3>重要条款</h3></div><ul class="trial-terms trial-prose">${TRIAL_SOURCE.terms.map(item => `<li>${item}</li>`).join('')}</ul></section><button type="button" class="outline-wide" data-tab="1">查看完整活动规则 ${icon('arrow')}</button>`;
  };
  window.refreshTrial = function () {
    const y = $('#app').scrollTop;
    const p = PROMOS.find(x => x.id === 'newcomer-trial');
    const tab = Number(currentRoute().get('tab') || 0);
    renderDetail(p, Number.isFinite(tab) ? tab : 0);
    $('#app').scrollTo(0, y);
  };

  function readForm() {
    const phone = $('#demo-phone');
    const otp = $('#demo-otp');
    const name = $('#kyc-name');
    const idType = $('#kyc-type');
    const idNumber = $('#kyc-id');
    if (phone) demo.phone = phone.value.trim();
    if (otp) demo.otp = otp.value.trim();
    if (name) demo.kyc.name = name.value.trim();
    if (idType) demo.kyc.idType = idType.value;
    if (idNumber) demo.kyc.idNumber = idNumber.value.trim();
  }

  function resetDemo(silent) {
    clearTimeout(demoTimer);
    demo = defaultDemo();
    saveDemo();
    if ($('#modal') && $('#modal').open) closeModal();
    if (!silent) toast('演示已重置');
    navigate('activity=newcomer-trial');
  }

  function showGoalModal() {
    openModal(`<div class="goal-celebration"><div class="goal-burst" aria-hidden="true"></div><h2>恭喜达标</h2><p class="trial-prose">试玩余额达到RM200，即可兑换RM100现金奖励。</p><button type="button" class="primary" data-action="demo-go-redeem">兑换RM100现金</button></div>`);
  }

  function runSpin(forceLose) {
    if (demo.spinning || !demo.claimed || demo.trialEnded || demo.reachedTarget || demo.redeemed) return;
    const path = forceLose || demo.playMode === 'lose' ? LOSE_SPINS : WIN_SPINS;
    if (forceLose) {
      demo.playMode = 'lose';
      demo.spinIndex = 0;
    }
    const step = path[Math.min(demo.spinIndex, path.length - 1)];
    demo.spinning = true;
    const btn = document.getElementById('spin-btn');
    const windowEl = document.getElementById('slot-window');
    const resultEl = document.getElementById('slot-result');
    if (btn) { btn.disabled = true; btn.textContent = '旋转中…'; }
    if (windowEl) windowEl.classList.add('is-spinning');
    if (resultEl) resultEl.textContent = '旋转中…';
    later(() => {
      demo.spinIndex += 1;
      demo.trialBalance = Math.max(0, Math.min(200, demo.trialBalance + step.delta));
      demo.lastSymbols = step.symbols;
      demo.spinning = false;
      if (demo.trialBalance >= 200) {
        demo.trialBalance = 200;
        demo.reachedTarget = true;
      }
      if (demo.trialBalance <= 0) {
        demo.trialBalance = 0;
        demo.trialEnded = true;
      }
      saveDemo();
      renderPlay();
      if (demo.reachedTarget) {
        toast('试玩余额已达到 RM200');
        later(showGoalModal, 400);
      } else if (demo.trialEnded) {
        toast('未达RM200目标，不可兑换部分奖励。');
      }
    }, 900);
  }

  window.handleDemoAction = function handleDemoAction(name) {
    ensureBanner();
    demo = loadDemo();
    switch (name) {
      case 'demo-start':
        navigate('demo=register');
        break;
      case 'demo-otp': {
        readForm();
        if (!demo.phone) { toast('请先填写手机号码'); return; }
        demo.otpSent = true;
        demo.otp = '123456';
        saveDemo();
        const field = document.getElementById('otp-field');
        const input = document.getElementById('demo-otp');
        const submit = document.getElementById('register-submit');
        if (field) field.hidden = false;
        if (input) input.value = '123456';
        if (submit) submit.disabled = false;
        toast('验证码已发送（演示码 123456）');
        break;
      }
      case 'demo-register':
        readForm();
        if (!demo.otpSent) { toast('请先获取验证码'); return; }
        if (!demo.phone) { toast('请填写手机号码'); return; }
        if (demo.otp !== '123456') { toast('验证码不正确，演示码为 123456'); return; }
        demo.loggedIn = true;
        saveDemo();
        toast('注册成功');
        navigate('demo=kyc');
        break;
      case 'demo-go-kyc':
        if (!demo.loggedIn) return navigate('demo=register');
        navigate('demo=kyc');
        break;
      case 'demo-upload':
        break;
      case 'demo-kyc-submit':
        readForm();
        if (!demo.kyc.name || !demo.kyc.idNumber) { toast('请填写姓名和证件号码'); return; }
        if (!demo.kyc.idFront || !demo.kyc.idBack || !demo.kyc.selfie) { toast('请先上传证件正反面和手持自拍照'); return; }
        demo.kyc.status = 'reviewing';
        saveDemo();
        navigate('demo=kyc-review');
        break;
      case 'demo-go-claim':
        if (demo.redeemed) return;
        if (!demo.loggedIn) return navigate('demo=register');
        if (demo.kyc.status !== 'approved') return navigate('demo=kyc');
        navigate('demo=claim');
        break;
      case 'demo-claim-confirm':
        if (demo.claimed || demo.redeemed) return;
        if (demo.kyc.status !== 'approved') return navigate('demo=kyc');
        demo.claimed = true;
        demo.trialBalance = 100;
        demo.spinIndex = 0;
        demo.playMode = 'win';
        demo.trialEnded = false;
        demo.reachedTarget = false;
        saveDemo();
        toast('已领取 RM100 试玩额度');
        navigate('activity=newcomer-trial');
        break;
      case 'demo-go-play':
        if (!demo.claimed || demo.redeemed) return;
        navigate('demo=games');
        break;
      case 'demo-open-game':
        break;
      case 'demo-spin':
        runSpin(false);
        break;
      case 'demo-fail-path':
        runSpin(true);
        break;
      case 'demo-go-redeem':
        if (!demo.reachedTarget || demo.redeemed) return;
        if ($('#modal') && $('#modal').open) closeModal();
        navigate('demo=redeem');
        break;
      case 'demo-redeem-confirm':
        if (!demo.reachedTarget || demo.redeemed) return;
        navigate('demo=redeem-process');
        break;
      case 'demo-reset':
        openModal(`<div class="dialog-illustration">${icon('shield')}</div><h2>重置演示</h2><p>将清除本机演示进度，包括登录、实名、钱包和领奖记录。</p><button type="button" class="primary" data-action="demo-reset-confirm">确认重置</button><button type="button" class="outline-wide" data-close>取消</button>`);
        break;
      case 'demo-reset-confirm':
        resetDemo(false);
        break;
      case 'demo-done':
        break;
      default:
        break;
    }
  };

  document.addEventListener('click', e => {
    const nav = e.target.closest('[data-demo-nav]');
    if (nav) {
      e.preventDefault();
      navigate(nav.getAttribute('data-demo-nav'));
      return;
    }
    const upload = e.target.closest('[data-action="demo-upload"]');
    if (upload) {
      const key = upload.getAttribute('data-upload');
      if (key && key in demo.kyc) {
        demo.kyc[key] = !demo.kyc[key];
        saveDemo();
        renderKyc();
      }
      return;
    }
    const game = e.target.closest('[data-action="demo-open-game"]');
    if (game) {
      demo.currentGame = game.getAttribute('data-game') || 'lucky-star';
      saveDemo();
      navigate('demo=play');
    }
  });

  document.addEventListener('submit', e => {
    const form = e.target.closest('[data-demo-form]');
    if (!form) return;
    e.preventDefault();
    if (form.getAttribute('data-demo-form') === 'register') handleDemoAction('demo-register');
    if (form.getAttribute('data-demo-form') === 'kyc') handleDemoAction('demo-kyc-submit');
  });

  document.addEventListener('change', e => {
    if (e.target.closest('.demo-form')) readForm();
  });

  const _handleAction = handleAction;
  handleAction = function (name) {
    if (name && (name.startsWith('demo-') || name.startsWith('trial-'))) return handleDemoAction(name);
    return _handleAction(name);
  };

  const _route = route;
  route = function () {
    if ($('#modal') && $('#modal').open) closeModal();
    clearTimeout(demoTimer);
    const params = currentRoute();
    let id = params.get('activity');
    if (id === 'newcomer-trial-notes') id = 'newcomer-trial';
    const screen = params.get('demo');
    if (screen) {
      renderDemo(screen);
      return;
    }
    _route();
    ensureBanner();
  };
  window.removeEventListener('hashchange', _route);
  window.addEventListener('hashchange', route);

  $('#records').onclick = () => navigate('demo=records');

  const _origClick = document.addEventListener;
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-nav="account"]');
    if (!b || b.disabled) return;
    e.stopImmediatePropagation();
    navigate('demo=account');
  }, true);


  document.addEventListener('click', e => {
    const stepBtn = e.target.closest('[data-trial-step]');
    if (stepBtn && !stepBtn.disabled) {
      e.stopImmediatePropagation();
      state.trial.inspect = Number(stepBtn.dataset.trialStep);
      refreshTrial();
    }
  }, true);

  ensureBanner();
  route();
})();
