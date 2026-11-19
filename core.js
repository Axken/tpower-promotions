/* Shared demo core: member state, wallets, compatibility, eligibility, CTA, demo panel. */
(function () {
  const MYT = 'Asia/Kuala_Lumpur';
  const UNWIRED = '当前为演示，未连接真实功能';
  const DEPOSIT_PROMOS = ['first-deposit-bonus', 'daily-reload'];

  function r2(n) { return Math.round((Number(n) || 0) * 100) / 100; }
  function moneyNum(n) {
    return r2(n).toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function rm(n) { return 'RM' + moneyNum(n); }

  function nowMYT(date) {
    const d = date ? new Date(date) : new Date();
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: MYT, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    }).formatToParts(d).reduce((a, p) => { a[p.type] = p.value; return a; }, {});
    return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`;
  }
  function labelMYT(s) { return (s || nowMYT()) + '（马来西亚时间）'; }
  function nextMidnightMYT() {
    const stamp = nowMYT();
    const [date] = stamp.split(' ');
    // next calendar day 00:00 in displayed MYT clock (string only)
    const [y, m, d] = date.split('-').map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d, 16, 0, 0)); // 00:00 MYT = 16:00 previous UTC
    dt.setUTCDate(dt.getUTCDate() + 1);
    return labelMYT(nowMYT(dt)).replace(/ \d{2}:\d{2}:\d{2}/, ' 00:00:00');
  }

  const PROMO_META = {
    'newcomer-free-challenge': { title: '新人免费挑战赢取RM100', kind: 'trial' },
    'daily-wheel': { title: '每日幸运大转盘RM888', kind: 'deposit-spin' },
    'vip-benefits': { title: 'VIP会员专属福利', kind: 'vip' },
    'newcomer': { title: '新人专享挑战', kind: 'newcomer' },
    'referral': { title: '邀请好友挑战，赚取高达RM1,000', kind: 'invite' },
    'growth': { title: '成长彩金200%扶持计划', kind: 'deposit-growth' },
    'anniversary': { title: '3周年幸运大抽奖', kind: 'draw' },
    'maintenance': { title: '维护补偿 · 100分挑战', kind: 'compensation' },
    'returning-member': { title: '老会员回归，免费赢取RM188', kind: 'trial' },
    'first-deposit-bonus': { title: '新人首存彩金', kind: 'deposit-bonus' },
    'daily-reload': { title: '每日再存10%彩金', kind: 'deposit-bonus' }
  };

  /* Official relations only. Everything else is 待确认 and must not be auto-enforced. */
  const COMPAT = {
    exclusive: [
      {
        a: 'first-deposit-bonus', b: 'daily-reload', official: true,
        reason: '此活动不能与其他充值活动重叠。',
        recover: '待确认：完成或取消后，另一充值优惠何时恢复资格。'
      },
      {
        a: 'returning-member', b: 'newcomer-free-challenge', official: true,
        reason: '此活动与新人免费体验礼互斥，不允许同一会员重复领取两种免费试玩奖励。演示中该规则适用于「新人免费挑战赢取RM100」。',
        recover: '待确认：若尚未兑换即取消，另一活动是否恢复资格。已领取则为终身互斥。'
      }
    ],
    compatible: [
      {
        a: 'newcomer', b: 'growth', official: true, sameDeposit: true,
        reason: '此充值会同时激活成长彩金计划奖励。'
      }
    ],
    pendingExclusive: [
      { a: 'first-deposit-bonus', b: 'growth', note: '首存原文为「不能与其他充值活动重叠」，成长计划是否属于重叠范围待确认。' },
      { a: 'first-deposit-bonus', b: 'daily-wheel', note: '首存原文为「不能与其他充值活动重叠」，每日转盘是否属于重叠范围待确认。' },
      { a: 'first-deposit-bonus', b: 'newcomer', note: '首存原文为「不能与其他充值活动重叠」，新人专享挑战的解锁充值是否属于重叠范围待确认。' },
      { a: 'daily-reload', b: 'growth', note: '再存原文为「不能与其他充值活动重叠」，成长计划是否属于重叠范围待确认。' },
      { a: 'daily-reload', b: 'daily-wheel', note: '再存原文为「不能与其他充值活动重叠」，每日转盘是否属于重叠范围待确认。' },
      { a: 'daily-reload', b: 'newcomer', note: '再存原文为「不能与其他充值活动重叠」，新人专享挑战的解锁充值是否属于重叠范围待确认。' }
    ],
    depositTriggers: [
      { promo: 'first-deposit-bonus', official: true, text: '仅限会员首次成功充值，且不能与其他充值活动重叠。' },
      { promo: 'daily-reload', official: true, text: '已完成首次充值后的符合资格再存，且不能与其他充值活动重叠。' },
      { promo: 'daily-wheel', official: true, text: '每成功充值一笔超过RM100，获得1次抽奖（每日最多3次，不可合并）。是否可与其他充值优惠同时触发待确认。' },
      { promo: 'newcomer', official: true, text: '完成 RM440 流水后，48小时内最低 RM10 的一次充值按1:1解锁彩金，并同时激活成长彩金计划。' },
      { promo: 'growth', official: true, text: '新会员完成首次有效充值后系统自动启动；新人专享挑战的解锁充值会同时激活本计划。' }
    ],
    betCounts: [
      { promo: 'first-deposit-bonus', official: true, text: '仅计算所选游戏类别（老虎机或真人）的合格投注。' },
      { promo: 'daily-reload', official: true, text: '仅计算所选择游戏类别（真人或老虎机、捕鱼）的有效投注。' },
      { promo: 'daily-wheel', official: true, text: '流水仅限指定游戏商：FUMA、WUDI、BWG。' },
      { promo: 'growth', official: true, text: '电子 0.3%、打鱼 0.3%、现场 0.1%、体育 0.5%；其他游戏不计入。免费试玩、未解锁彩金及其他活动金产生的投注不计入。' },
      { promo: 'anniversary', official: true, text: '除4D及平台指定的特殊游戏外，其他游戏的有效投注均计入。' },
      { promo: 'newcomer', official: true, text: '只能在指定的真人现场游戏和老虎机中进行。具体游戏商名单待确认。' }
    ],
    pendingBetShare: '同一笔有效投注是否可同时计入多个活动，原文未说明，待确认。'
  };

  const PENDING_RULES = [
    { activity: '每日再存10%彩金', items: [
      '每日领取次数（原文仅写「每日进行符合资格的再存」，未写每日限领一次或可领多次）。',
      '彩金上限按每笔计算还是按每日累计计算（原文列有类别最高彩金 RM100 / RM300，未说明是否每日累计）。',
      '跨日仍未完成流水或尚未转换时，活动如何处理。'
    ]},
    { activity: '每日幸运大转盘RM888', items: [
      '充值门槛按原文实现为「超过RM100」（大于 RM100）。是否应为「满RM100」（大于等于）请确认。',
      '每日 00:00（按马来西亚时间展示）重置后，未使用的抽奖次数如何处理（作废或保留）。'
    ]},
    { activity: '成长彩金200%扶持计划', items: [
      '后续档位的开启充值门槛（原文或页面未列明）。'
    ]},
    { activity: '3周年幸运大抽奖', items: [
      '一张券同时符合多个奖项时的计奖方式。',
      '奖金的流水要求及提款条件。',
      '「每周日晚上7:00截止」的时区按马来西亚时间展示，请确认。'
    ]},
    { activity: 'VIP会员专属福利', items: [
      '正式等级门槛、保级周期、奖励金额、返水比例及提款条件。演示数值仅为示例，不能当成正式规则。'
    ]},
    { activity: '老会员回归，免费赢取RM188', items: [
      '是否要求会员一定天数未活跃。原文为「历史曾经成功充值的会员」并须完成实名认证，未写未活跃天数。'
    ]},
    { activity: '维护补偿 · 100分挑战', items: [
      '适用游戏名单（原文仅写「指定游戏」，截图未列出名单）。'
    ]},
    { activity: '新人专享挑战', items: [
      '指定游戏商名单（原文写明截图未列出）。'
    ]},
    { activity: '新人免费挑战赢取RM100 / 老会员回归', items: [
      '指定试玩游戏名单（原文仅写指定游戏）。'
    ]},
    { activity: '活动叠加', items: [
      '「不能与其他充值活动重叠」是否包括成长计划、每日转盘、以及新人专享挑战的解锁充值。',
      '同一笔有效投注是否可同时计入多个活动。',
      '取消或完成活动后，互斥或重叠的其他活动何时恢复资格（除原文已写明的终身限领、放弃后不能再参加）。'
    ]},
    { activity: '活动期限', items: [
      '多数活动未提供总活动起止日期或领取期限；页面以「待确认」展示，不自行设定。'
    ]}
  ];

  function defaultMember() {
    return {
      loggedIn: true,
      kycApproved: true,
      hasFirstDeposit: false,
      firstDepositAt: '',
      day: 1,
      forceFail: false,
      processing: null,
      expired: {},
      overlapDemo: false,
      maintInWindow: null,
      wallets: { cash: 0, activity: 0, withdrawable: 0 }
    };
  }

  function demo() {
    return window.DemoAPI ? window.DemoAPI.load() : null;
  }
  function save() {
    if (window.DemoAPI) window.DemoAPI.save();
  }
  function memberOf(d) {
    d = d || demo();
    if (!d.member) d.member = defaultMember();
    if (!d.member.wallets) d.member.wallets = { cash: 0, activity: 0, withdrawable: 0 };
    return d.member;
  }

  function inferHasFirstDeposit(d) {
    const m = memberOf(d);
    if (m.hasFirstDeposit) return true;
    if (d.firstDepositBonus && (d.firstDepositBonus.deposited || d.firstDepositBonus.converted)) return true;
    if (d.growth && (d.growth.started || d.growth.firstDeposit > 0)) return true;
    if (d.newcomer && d.newcomer.deposited) return true;
    return false;
  }

  function syncShared(d) {
    d = d || demo();
    const m = memberOf(d);
    if (inferHasFirstDeposit(d)) m.hasFirstDeposit = true;
    const sum = r2((m.wallets.cash || 0) + (m.wallets.withdrawable || 0));
    const mw = r2(d.mainWallet || 0);
    if (!m.wallets._migrated && mw && !sum) {
      m.wallets.withdrawable = mw;
      m.wallets._migrated = true;
    } else if (mw > sum + 0.001) {
      m.wallets.withdrawable = r2((m.wallets.withdrawable || 0) + (mw - sum));
    }
    d.mainWallet = r2((m.wallets.withdrawable || 0) + (m.wallets.cash || 0));
    if (d.dailyReload) d.dailyReload.hasFirstDeposit = !!m.hasFirstDeposit;
    if (d.kyc && m.kycApproved) d.kyc.status = 'approved';
    if (d.kyc && !m.kycApproved && d.kyc.status === 'approved') d.kyc.status = 'pending';
    return d;
  }

  function kycOk(d) {
    const m = memberOf(d);
    if (!m.kycApproved) return false;
    const k = (d || demo()).kyc || {};
    return k.status === 'approved' || m.kycApproved;
  }

  function promoTitle(id) { return (PROMO_META[id] && PROMO_META[id].title) || id; }

  function pairKey(a, b) { return [a, b].sort().join('|'); }

  function officialConflict(id, d) {
    d = d || demo();
    const m = memberOf(d);
    if ((id === 'first-deposit-bonus' || id === 'daily-reload') && m.overlapDemo) {
      return { withId: 'overlap-demo', reason: '此活动不能与其他充值活动重叠。', official: true };
    }
    const otherActive = {};
    otherActive['first-deposit-bonus'] = !!(d.firstDepositBonus && d.firstDepositBonus.deposited && !d.firstDepositBonus.converted);
    otherActive['daily-reload'] = !!(d.dailyReload && d.dailyReload.deposited);
    otherActive['newcomer-free-challenge'] = !!(d.freeChallenge && (d.freeChallenge.claimed || d.freeChallenge.redeemed));
    otherActive['returning-member'] = !!(d.returningMember && (d.returningMember.claimed || d.returningMember.redeemed));
    for (const row of COMPAT.exclusive) {
      if (row.a !== id && row.b !== id) continue;
      const other = row.a === id ? row.b : row.a;
      if (otherActive[other]) return { withId: other, reason: row.reason, official: true };
    }
    return null;
  }

  function isExpired(id, d) {
    const m = memberOf(d);
    return !!(m.expired && m.expired[id]);
  }

  function eligibility(id, d) {
    d = d || demo();
    const m = memberOf(d);
    if (id === 'first-deposit-bonus') {
      if (m.hasFirstDeposit && !(d.firstDepositBonus && (d.firstDepositBonus.deposited || d.firstDepositBonus.converted))) {
        return { ok: false, reason: '仅限会员首次成功充值。' };
      }
    }
    if (id === 'daily-reload') {
      if (!m.hasFirstDeposit) return { ok: false, reason: '适用于已完成首次充值的会员。' };
    }
    if (id === 'growth') {
      if (!m.hasFirstDeposit && !(d.growth && d.growth.started)) {
        return { ok: false, reason: '新会员完成首次有效充值后，系统自动启动首充200%彩金档位。' };
      }
    }
    if (id === 'newcomer-free-challenge') {
      /* Official: 新注册会员, KYC, once — no extra invented filters */
    }
    if (id === 'returning-member') {
      if (!m.hasFirstDeposit) return { ok: false, reason: '历史曾经成功充值的会员均符合基本参与资格。当前演示尚未完成首次充值。' };
    }
    if (id === 'maintenance') {
      if (m.maintInWindow === false) return { ok: false, reason: '需为 2024年1月1日至2026年10月31日期间有成功充值的玩家。当前演示未满足该窗口。' };
      if (m.maintInWindow !== true) {
        if (!m.hasFirstDeposit) return { ok: false, reason: '需为 2024年1月1日至2026年10月31日期间有成功充值的玩家。当前演示尚未完成首次充值。' };
        return { ok: false, reason: '需为 2024年1月1日至2026年10月31日期间有成功充值的玩家。演示中充值日期是否落在该窗口待确认。', pending: true, consult: true };
      }
    }
    if (id === 'newcomer') {
      /* 每位新会员只能参加一次 — if abandoned or completed, handled in phase */
    }
    return { ok: true };
  }

  function phaseOf(id, d) {
    d = d || demo();
    const m = memberOf(d);
    if (id === 'first-deposit-bonus') {
      const f = d.firstDepositBonus || {};
      if (f.converted) return { key: 'completed', label: '已完成' };
      if (m.processing && m.processing.promoId === id) return { key: m.processing.status === 'failed' ? 'failed' : 'processing', label: m.processing.status === 'failed' ? '发放失败' : '发放处理中' };
      if (f.deposited && (f.turnover || 0) >= (f.turnoverNeed || 0) && f.turnoverNeed > 0) return { key: 'reached', label: '已达标' };
      if (f.deposited) return { key: 'in-progress', label: '活动进行中' };
      if (f.option && f.pendingAmount) return { key: 'wait-deposit', label: '等待充值' };
      if (f.option) return { key: 'wait-deposit', label: '等待充值' };
      return { key: 'need-option', label: '尚未选择优惠' };
    }
    if (id === 'daily-reload') {
      const r = d.dailyReload || {};
      if (m.processing && m.processing.promoId === id) return { key: m.processing.status === 'failed' ? 'failed' : 'processing', label: m.processing.status === 'failed' ? '发放失败' : '发放处理中' };
      if (r.deposited && (r.turnover || 0) >= (r.turnoverNeed || 0) && r.turnoverNeed > 0) return { key: 'reached', label: '已达标' };
      if (r.deposited) return { key: 'in-progress', label: '活动进行中' };
      if (r.option && r.pendingAmount) return { key: 'wait-deposit', label: '等待充值' };
      if (r.option) return { key: 'wait-deposit', label: '等待充值' };
      if ((r.historyCount || 0) > 0) return { key: 'need-option', label: '尚未选择优惠', note: '可继续再存（每日领取次数待确认）' };
      return { key: 'need-option', label: '尚未选择优惠' };
    }
    if (id === 'newcomer-free-challenge') {
      const f = d.freeChallenge || {};
      if (f.redeemed) return { key: 'completed', label: '已完成' };
      if (m.processing && m.processing.promoId === id) return { key: m.processing.status === 'failed' ? 'failed' : 'processing', label: m.processing.status === 'failed' ? '发放失败' : '发放处理中' };
      if (f.claimed && f.reachedTarget) return { key: 'reached', label: '已达标' };
      if (f.claimed) return { key: 'in-progress', label: '活动进行中' };
      return { key: 'eligible', label: '符合条件' };
    }
    if (id === 'returning-member') {
      const r = d.returningMember || {};
      if (r.redeemed) return { key: 'completed', label: '已完成' };
      if (m.processing && m.processing.promoId === id) return { key: m.processing.status === 'failed' ? 'failed' : 'processing', label: m.processing.status === 'failed' ? '发放失败' : '发放处理中' };
      if (r.claimed && r.reachedTarget) return { key: 'reached', label: '已达标' };
      if (r.claimed) return { key: 'in-progress', label: '活动进行中' };
      return { key: 'eligible', label: '符合条件' };
    }
    if (id === 'daily-wheel') {
      const w = d.dailyWheel || {};
      if (m.processing && m.processing.promoId === id) return { key: m.processing.status === 'failed' ? 'failed' : 'processing', label: m.processing.status === 'failed' ? '发放失败' : '发放处理中' };
      if ((w.bonusWallet || 0) > 0 && (w.turnover || 0) >= (w.turnoverNeed || 0) && w.turnoverNeed > 0) return { key: 'reached', label: '已达标' };
      if ((w.bonusWallet || 0) > 0) return { key: 'in-progress', label: '活动进行中' };
      const left = Math.max(0, (w.earnedToday || 0) - (w.usedToday || 0));
      if (left > 0) return { key: 'in-progress', label: '活动进行中' };
      if ((w.earnedToday || 0) >= 3) return { key: 'eligible', label: '今日次数已达上限' };
      return { key: 'wait-deposit', label: '等待充值' };
    }
    if (id === 'growth') {
      const g = d.growth || {};
      if (g.claimed && g.claimed.every((v, i) => v >= (GROWTH_SOURCE.caps[i] || 0) || g.expired[i])) return { key: 'completed', label: '已完成' };
      const claimable = (g.unlocked || []).some((u, i) => u > (g.claimed[i] || 0) && !g.expired[i]);
      if (claimable) return { key: 'reached', label: '已达标' };
      if (g.started || m.hasFirstDeposit) return { key: 'in-progress', label: '活动进行中' };
      return { key: 'wait-deposit', label: '等待充值' };
    }
    if (id === 'newcomer') {
      const n = d.newcomer || {};
      if (n.completed) return { key: 'completed', label: '已完成' };
      if (n.abandoned) return { key: 'ineligible', label: '已放弃', reason: '可主动放弃活动，但不能再次参加。' };
      if (n.expired) return { key: 'expired', label: '已过期', reason: '须在48小时内完成充值；逾期未充值，解锁资格自动失效。' };
      if (m.processing && m.processing.promoId === id) return { key: m.processing.status === 'failed' ? 'failed' : 'processing', label: m.processing.status === 'failed' ? '发放失败' : '发放处理中' };
      if (n.deposited && n.bonusReleased && n.principalNeed && (n.principalWager || 0) >= n.principalNeed) return { key: 'reached', label: '已达标' };
      if (n.claimed && n.challengeDone && !n.deposited) return { key: 'wait-deposit', label: '等待充值' };
      if (n.claimed) return { key: 'in-progress', label: '活动进行中' };
      return { key: 'eligible', label: '符合条件' };
    }
    if (id === 'referral') {
      const r = d.referral || {};
      if ((r.friends || []).length) return { key: 'in-progress', label: '活动进行中' };
      return { key: 'eligible', label: '符合条件' };
    }
    if (id === 'anniversary') {
      const a = d.anniversary || {};
      if (a.claimed) return { key: 'completed', label: '已完成' };
      if (a.expired) return { key: 'expired', label: '已过期', reason: '奖金必须在48小时内点击领取；超过指定时间，奖金将自动作废。' };
      if (m.processing && m.processing.promoId === id) return { key: m.processing.status === 'failed' ? 'failed' : 'processing', label: m.processing.status === 'failed' ? '发放失败' : '发放处理中' };
      if (a.drawDone && a.winAmount > 0 && !a.claimed) return { key: 'reached', label: '已达标' };
      if ((a.tickets || []).length || a.turnover > 0) return { key: 'in-progress', label: '活动进行中' };
      return { key: 'eligible', label: '符合条件' };
    }
    if (id === 'maintenance') {
      const mt = d.maintenance || {};
      if (mt.completed) return { key: 'completed', label: '已完成' };
      if (m.processing && m.processing.promoId === id) return { key: m.processing.status === 'failed' ? 'failed' : 'processing', label: m.processing.status === 'failed' ? '发放失败' : '发放处理中' };
      if (mt.reached) return { key: 'reached', label: '已达标' };
      if (mt.joined) return { key: 'in-progress', label: '活动进行中' };
      return { key: 'eligible', label: '符合条件' };
    }
    if (id === 'vip-benefits') {
      return { key: 'eligible', label: '符合条件' };
    }
    return { key: 'eligible', label: '符合条件' };
  }

  function resolve(id, d) {
    d = d || demo();
    const m = memberOf(d);
    const title = promoTitle(id);

    if (!m.loggedIn) {
      return { key: 'logged-out', label: '未登录', cta: '登录后查看资格', action: 'core-login', enabled: true, reason: '请先登录后再查看本活动资格。' };
    }
    if (!kycOk(d)) {
      return { key: 'no-kyc', label: '未实名认证', cta: '去实名认证', action: 'core-kyc', enabled: true, reason: '必须完成实名认证后才能参与。' };
    }
    if (isExpired(id, d) && !(phaseOf(id, d).key === 'completed')) {
      const ex = m.expired[id] || {};
      return { key: 'expired', label: '已过期', cta: ex.reason || '活动已过期', action: '', enabled: false, reason: (ex.reason || '活动已过期') + (ex.at ? ' 失效时间：' + labelMYT(ex.at) : '') };
    }
    const conflict = officialConflict(id, d);
    const ph0 = phaseOf(id, d);
    if (conflict && ph0.key !== 'completed') {
      return { key: 'conflict', label: '活动冲突', cta: '查看当前进行中的活动', action: 'core-conflicts', enabled: true, reason: conflict.reason, withId: conflict.withId };
    }
    const el = eligibility(id, d);
    const started = ['in-progress', 'reached', 'processing', 'failed', 'completed', 'wait-deposit'].includes(ph0.key);
    if (!el.ok && !started) {
      return { key: 'ineligible', label: '不符合条件', cta: el.reason, action: el.consult ? 'core-consult' : '', enabled: false, reason: el.reason, pending: el.pending, consult: el.consult };
    }

    const ph = ph0;
    if (ph.key === 'processing') {
      return { key: 'processing', label: '发放处理中', cta: '正在处理，请勿重复操作', action: '', enabled: false, reason: '正在处理，请勿重复操作。' };
    }
    if (ph.key === 'failed') {
      return { key: 'failed', label: '发放失败', cta: '重新操作', action: 'core-retry', enabled: true, reason: '上次发放处理失败，可重新操作。' };
    }
    if (ph.key === 'expired') {
      return { key: 'expired', label: '已过期', cta: ph.reason || '已过期', action: '', enabled: false, reason: ph.reason };
    }
    if (ph.key === 'completed') {
      return { key: 'completed', label: '已完成', cta: '查看领取记录', action: 'core-records', enabled: true, reason: '' };
    }
    if (ph.key === 'reached') {
      const convertIds = ['first-deposit-bonus', 'daily-reload', 'daily-wheel'];
      return { key: 'reached', label: '已达标', cta: convertIds.includes(id) ? '转换余额' : '领取奖励', action: 'core-claim-' + id, enabled: true };
    }
    if (ph.key === 'in-progress') {
      const games = ['newcomer-free-challenge', 'returning-member', 'newcomer', 'maintenance', 'growth', 'daily-wheel', 'first-deposit-bonus', 'daily-reload'].includes(id);
      return { key: 'in-progress', label: '活动进行中', cta: games ? '查看进度' : '查看进度', action: 'core-progress-' + id, enabled: true };
    }
    if (ph.key === 'wait-deposit') {
      return { key: 'wait-deposit', label: '等待充值', cta: '去充值', action: 'core-deposit-' + id, enabled: true };
    }
    if (ph.key === 'need-option') {
      return { key: 'need-option', label: '尚未选择优惠', cta: '请选择优惠类别', action: 'core-choose-' + id, enabled: true };
    }
    if (ph.key === 'ineligible') {
      return { key: 'ineligible', label: ph.label, cta: ph.reason, action: '', enabled: false, reason: ph.reason };
    }
    const claimIds = ['newcomer-free-challenge', 'returning-member', 'newcomer'];
    return { key: 'eligible', label: '符合条件', cta: claimIds.includes(id) ? '领取活动金' : '参与活动', action: 'core-join-' + id, enabled: true };
  }

  function ctaButton(st) {
    const reason = st.reason ? `<p class="cta-reason">${esc(st.reason)}</p>` : '';
    if (!st.action || !st.enabled) {
      return `${reason}<button type="button" class="primary" data-action="${st.action || 'core-disabled'}" ${st.enabled ? '' : 'aria-disabled="true"'} data-disabled-reason="${esc(st.reason || st.cta)}">${esc(st.cta)}</button>`;
    }
    return `${reason}<button type="button" class="primary" data-action="${st.action}">${esc(st.cta)}</button>`;
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function walletPanel(d) {
    d = syncShared(d || demo());
    const w = memberOf(d).wallets;
    return `<div class="wallet-triple">
      <div class="wallet-card"><span>活动钱包</span><strong>${rm(w.activity)}</strong></div>
      <div class="wallet-card"><span>现金钱包</span><strong>${rm(w.cash)}</strong></div>
      <div class="wallet-card main ${w.withdrawable > 0 ? 'highlight' : ''}"><span>可提款余额</span><strong>${rm(w.withdrawable)}</strong></div>
    </div>`;
  }

  function convertBreakdown({ outAmount, activityBefore, activityAfter, cashBefore, cashAfter, note }) {
    return `<section class="section-panel convert-breakdown">
      <div class="section-header"><h3>转换明细</h3></div>
      <ul class="kyc-summary">
        <li><span>本次转出金额</span><strong>${rm(outAmount)}</strong></li>
        <li><span>活动钱包</span><strong>${rm(activityBefore)} → ${rm(activityAfter)}</strong></li>
        <li><span>现金钱包</span><strong>${rm(cashBefore)} → ${rm(cashAfter)}</strong></li>
      </ul>
      ${note ? `<p class="fine-print">${esc(note)}</p>` : ''}
    </section>`;
  }

  function statusPanel(id, extraChecks) {
    const d = demo();
    const m = memberOf(d);
    const st = resolve(id, d);
    const checks = [
      m.loggedIn ? '已登录（演示会员陈美玲）' : '未登录',
      kycOk(d) ? '已完成实名认证' : '未实名认证',
      m.hasFirstDeposit ? '已完成首次充值' : '尚未完成首次充值',
      ...(extraChecks || [])
    ];
    return `<section class="section-panel status-panel" id="my-status">
      <div class="section-header"><h3>我的参与资格与当前状态</h3><span class="status-badge">${esc(st.label)}</span></div>
      <ul class="check-list">${checks.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
      ${st.reason ? `<p class="status-reason">${esc(st.reason)}</p>` : ''}
      ${st.consult ? `<button type="button" class="outline-wide" data-action="core-consult">资格咨询</button>` : ''}
    </section>`;
  }

  function conditionsBlock(rows) {
    return `<section class="section-panel key-conditions" id="key-conditions">
      <div class="section-header"><h3>关键参与条件</h3><span>参与前请阅读</span></div>
      <dl class="condition-list">${rows.map(r => `<div class="condition-row ${r.pending ? 'is-pending' : ''}"><dt>${esc(r.label)}</dt><dd>${esc(r.value)}${r.pending ? '<span class="pending-tag">待确认</span>' : ''}</dd></div>`).join('')}</dl>
    </section>`;
  }

  function rulesBlock(htmlOrList) {
    const inner = Array.isArray(htmlOrList)
      ? `<ol class="rule-ol">${htmlOrList.map(x => `<li>${esc(x)}</li>`).join('')}</ol>`
      : htmlOrList;
    return `<section class="section-panel rules-fold">
      <details class="full-rules"><summary>完整活动规则</summary><div class="rules-inner">${inner}</div></details>
    </section>`;
  }

  function supportEntry() {
    return `<button type="button" class="support-link" data-support>需要帮助？联系客服</button>`;
  }

  function demoPanelButtons(currentId) {
    const d = demo();
    const m = memberOf(d);
    const failOn = m.forceFail ? '关闭强制失败' : '下一次领取/转换强制失败';
    const kyc = kycOk(d) ? '取消实名认证' : '完成实名认证';
    const fd = m.hasFirstDeposit ? '清除首次充值标记' : '标记已完成首次充值';
    const login = m.loggedIn ? '退出登录' : '演示登录';
    return `
            <button type="button" class="outline-wide" data-action="core-login-toggle">${login}</button>
            <button type="button" class="outline-wide" data-action="core-kyc">${kyc}</button>
            <button type="button" class="outline-wide" data-action="core-toggle-first">${fd}</button>
            <button type="button" class="outline-wide" data-action="core-sim-deposit-50">模拟充值 RM50</button>
            <button type="button" class="outline-wide" data-action="core-sim-deposit-100">模拟充值 RM100</button>
            <button type="button" class="outline-wide" data-action="core-sim-deposit-150">模拟充值 RM150（超过RM100）</button>
            <button type="button" class="outline-wide" data-action="core-sim-deposit-1000">模拟充值 RM1,000</button>
            <button type="button" class="outline-wide" data-action="core-next-day">模拟次日</button>
            <button type="button" class="outline-wide" data-action="core-force-fail">${failOn}</button>
            <button type="button" class="outline-wide" data-action="core-expire">${currentId ? '使当前活动过期' : '过期（请先打开活动）'}</button>
            <button type="button" class="outline-wide" data-action="core-overlap-toggle">${m.overlapDemo ? '取消「与其他充值活动重叠」演示' : '演示与其他充值活动重叠'}</button>
            <button type="button" class="outline-wide" data-action="core-maint-window">${m.maintInWindow === true ? '取消维护窗口期充值标记' : '标记为窗口期内已充值（维护补偿）'}</button>
            <button type="button" class="outline-wide" data-action="core-compat">查看活动兼容表</button>
            <button type="button" class="outline-wide" data-action="core-pending">查看待确认规则</button>
            <button type="button" class="text-button" data-action="demo-reset">重置演示</button>`;
  }

  function currentActivityId() {
    try {
      return (typeof currentRoute === 'function' && currentRoute().get('activity')) || '';
    } catch (e) { return ''; }
  }

  function ensureDemoSheet() {
    if (!document.getElementById('demo-sheet-backdrop')) {
      const bd = document.createElement('div');
      bd.id = 'demo-sheet-backdrop';
      bd.className = 'demo-sheet-backdrop';
      bd.hidden = true;
      bd.addEventListener('click', closeDemoSheet);
      document.body.appendChild(bd);
    }
    if (!document.getElementById('demo-sheet')) {
      const el = document.createElement('div');
      el.id = 'demo-sheet';
      el.className = 'demo-sheet';
      el.hidden = true;
      el.setAttribute('role', 'dialog');
      el.setAttribute('aria-label', '演示控制');
      document.body.appendChild(el);
    }
  }

  function fillDemoSheet() {
    ensureDemoSheet();
    const currentId = currentActivityId();
    const m = memberOf(demo());
    const el = document.getElementById('demo-sheet');
    el.innerHTML = `<div class="sheet-handle"></div>
      <h3>演示控制</h3>
      <div class="demo-panel" id="demo-controls">
        <div class="demo-panel-body">
          <p class="fine-print">以下仅为演示开关，不会连接真实充值、游戏、提款或发奖接口。</p>
          <div class="demo-actions">${demoPanelButtons(currentId)}</div>
          <p class="fine-print">演示日：第 ${m.day || 1} 日 · 当前时间 ${labelMYT()}</p>
          <button type="button" class="primary" data-action="core-close-demo">完成</button>
        </div>
      </div>`;
  }

  function openDemoSheet() {
    fillDemoSheet();
    document.getElementById('demo-sheet').hidden = false;
    document.getElementById('demo-sheet-backdrop').hidden = false;
    document.body.classList.add('demo-sheet-open');
  }

  function closeDemoSheet() {
    const el = document.getElementById('demo-sheet');
    const bd = document.getElementById('demo-sheet-backdrop');
    if (el) el.hidden = true;
    if (bd) bd.hidden = true;
    document.body.classList.remove('demo-sheet-open');
  }

  function isDemoSheetOpen() {
    const el = document.getElementById('demo-sheet');
    return !!(el && !el.hidden);
  }

  function syncHasCta() {
    const has = !!document.querySelector('#app .unified-cta, #app .trial-cta-slot, #app .action-bar');
    document.body.classList.toggle('has-cta', has);
  }

  function demoPanel(currentId) {
    return `<section class="demo-panel" id="demo-controls-inline">
      <details>
        <summary>演示控制</summary>
        <div class="demo-panel-body">
          <p class="fine-print">以下仅为演示开关，不会连接真实充值、游戏、提款或发奖接口。</p>
          <div class="demo-actions">${demoPanelButtons(currentId)}</div>
        </div>
      </details>
    </section>`;
  }


  function rewardCard({ state, maxLabel, maxAmount, actualLabel, actualAmount, progressText, doneAmount, doneAt }) {
    if (state === 'completed') {
      return `<section class="reward-feature reward-hero is-done">
        <div class="panel-top"><span class="eyebrow">活动已完成</span><span class="status-badge">已到账</span></div>
        <div class="amount">${rm(doneAmount)}</div>
        <p>实际到账金额 ${rm(doneAmount)}${doneAt ? ' · ' + labelMYT(doneAt) : ''}</p>
        <button type="button" class="text-button" data-action="core-records">查看领取记录</button>
      </section>`;
    }
    if (state === 'in-progress' || state === 'reached' || state === 'wait-deposit' || state === 'processing' || state === 'failed') {
      return `<section class="reward-feature reward-hero is-active">
        <div class="panel-top"><span class="eyebrow">${esc(actualLabel || '本次实际彩金')}</span></div>
        <div class="amount">${rm(actualAmount)}</div>
        ${progressText ? `<p>${esc(progressText)}</p>` : ''}
      </section>`;
    }
    return `<section class="reward-feature reward-hero">
      <div class="panel-top"><span class="eyebrow">${esc(maxLabel || '最高奖励')}</span></div>
      <div class="amount">${typeof maxAmount === 'number' ? rm(maxAmount) : esc(maxAmount)}</div>
    </section>`;
  }

  function listRewardLine(id, d) {
    d = d || demo();
    const st = resolve(id, d);
    if (st.key === 'completed') {
      const rec = ((d.records || []).find(r => (r.title || r.name || '').includes(promoTitle(id).slice(0, 6))) || {});
      const amt = rec.amount != null ? rm(rec.amount) : '已到账';
      return `已完成 · ${amt}`;
    }
    if (id === 'first-deposit-bonus' && d.firstDepositBonus && d.firstDepositBonus.deposited && !d.firstDepositBonus.converted) {
      const f = d.firstDepositBonus;
      return `进行中 · 彩金 ${rm(f.bonus)} · 流水 ${rm(f.turnover || 0)} / ${rm(f.turnoverNeed || 0)}`;
    }
    if (id === 'daily-reload' && d.dailyReload && d.dailyReload.deposited) {
      const r = d.dailyReload;
      return `进行中 · 彩金 ${rm(r.bonus)} · 流水 ${rm(r.turnover || 0)} / ${rm(r.turnoverNeed || 0)}`;
    }
    if (id === 'daily-wheel') {
      return '单笔充值超过RM100可获1次抽奖，每日最多3次，最高赢取RM888';
    }
    return null;
  }

  function toastUnwired(extra) {
    if (typeof toast === 'function') toast(extra ? extra + ' ' + UNWIRED : UNWIRED);
    else if (window.toast) window.toast(UNWIRED);
  }

  function applySimDeposit(amount, d) {
    d = d || demo();
    const m = memberOf(d);
    const n = r2(amount);
    m.wallets.cash = r2((m.wallets.cash || 0) + n);
    m.hasFirstDeposit = true;
    if (!m.firstDepositAt) m.firstDepositAt = nowMYT();
    const w = d.dailyWheel || {};
    let spinNote = '';
    if (n > 100) {
      if ((w.earnedToday || 0) >= 3) spinNote = '今日抽奖次数已达上限，本次充值不再增加次数。';
      else {
        w.earnedToday = (w.earnedToday || 0) + 1;
        spinNote = '单笔充值超过RM100，获得1次抽奖机会。';
      }
    } else {
      spinNote = '充值未超过RM100，不获得抽奖次数。';
    }
    d.dailyWheel = w;
    if (!d.growth.started) {
      d.growth.started = true;
      d.growth.firstDeposit = n;
    }
    syncShared(d);
    save();
    return spinNote;
  }

  function creditActivity(amount, d) {
    const m = memberOf(d);
    m.wallets.activity = r2((m.wallets.activity || 0) + r2(amount));
    syncShared(d);
  }
  function takeActivity(amount, d) {
    const m = memberOf(d);
    const take = r2(Math.min(m.wallets.activity || 0, amount));
    m.wallets.activity = r2((m.wallets.activity || 0) - take);
    return take;
  }
  function creditWithdrawable(amount, d) {
    const m = memberOf(d);
    m.wallets.withdrawable = r2((m.wallets.withdrawable || 0) + r2(amount));
    syncShared(d);
  }
  function creditCash(amount, d) {
    const m = memberOf(d);
    m.wallets.cash = r2((m.wallets.cash || 0) + r2(amount));
    syncShared(d);
  }

  function addRecord(title, amount, status) {
    if (window.DemoAPI && window.DemoAPI.addRecord) {
      window.DemoAPI.addRecord({ title, amount, status, time: nowMYT(), timeLabel: labelMYT() });
      return;
    }
    const d = demo();
    d.records = d.records || [];
    d.records.unshift({ title, amount, status, time: nowMYT(), timeLabel: labelMYT() });
    save();
  }

  function beginProcess(promoId, actionKey, onSuccess) {
    const d = demo();
    const m = memberOf(d);
    if (m.processing && m.processing.status === 'pending') {
      if (typeof toast === 'function') toast('正在处理，请勿重复操作。');
      return;
    }
    if (m.forceFail) {
      m.processing = { promoId, action: actionKey, status: 'failed' };
      m.forceFail = false;
      save();
      if (typeof toast === 'function') toast('发放处理失败，请重新操作。');
      refreshAll();
      return;
    }
    m.processing = { promoId, action: actionKey, status: 'pending' };
    save();
    refreshAll();
    setTimeout(() => {
      const cur = demo();
      const mm = memberOf(cur);
      if (!mm.processing || mm.processing.status !== 'pending') return;
      mm.processing = null;
      save();
      onSuccess();
    }, 700);
  }

  function refreshAll() {
    if (typeof route === 'function') {
      const y = $('#app') ? $('#app').scrollTop : 0;
      route();
      if ($('#app')) $('#app').scrollTop = y;
    } else if (window.DemoAPI) {
      location.reload();
    }
    if (isDemoSheetOpen()) fillDemoSheet();
    syncHasCta();
  }

  function handleCoreAction(name) {
    if (!name || !name.startsWith('core-')) return false;
    const d = demo();
    const m = memberOf(d);
    const currentId = currentActivityId();

    if (name === 'core-open-demo') { openDemoSheet(); return true; }
    if (name === 'core-close-demo') { closeDemoSheet(); return true; }

    if (name === 'core-disabled') {
      const reason = document.querySelector('[data-action="core-disabled"]') && document.querySelector('[data-action="core-disabled"]').getAttribute('data-disabled-reason');
      if (typeof toast === 'function') toast(reason || '当前不可操作。');
      return true;
    }
    if (name === 'core-login' || name === 'core-login-toggle') {
      if (name === 'core-login' && !m.loggedIn) m.loggedIn = true;
      else if (name === 'core-login-toggle') m.loggedIn = !m.loggedIn;
      else m.loggedIn = true;
      save();
      if (typeof toast === 'function') toast(m.loggedIn ? '已登录演示账户' : '已退出登录');
      refreshAll();
      return true;
    }
    if (name === 'core-kyc') {
      m.kycApproved = !kycOk(d);
      if (d.kyc) d.kyc.status = m.kycApproved ? 'approved' : 'pending';
      save();
      if (typeof toast === 'function') toast(m.kycApproved ? '已完成实名认证（演示）' : '已取消实名认证（演示）');
      refreshAll();
      return true;
    }
    if (name === 'core-toggle-first') {
      m.hasFirstDeposit = !m.hasFirstDeposit;
      if (m.hasFirstDeposit && !m.firstDepositAt) m.firstDepositAt = nowMYT();
      if (!m.hasFirstDeposit) m.firstDepositAt = '';
      syncShared(d); save();
      if (typeof toast === 'function') toast(m.hasFirstDeposit ? '已标记完成首次充值' : '已清除首次充值标记');
      refreshAll();
      return true;
    }
    if (name.indexOf('core-sim-deposit-') === 0) {
      const amount = Number(name.split('core-sim-deposit-')[1]);
      const note = applySimDeposit(amount, d);
      if (typeof toast === 'function') toast('已模拟充值 ' + rm(amount) + '。' + note);
      refreshAll();
      return true;
    }
    if (name === 'core-next-day') {
      m.day = (m.day || 1) + 1;
      if (d.dailyWheel) {
        d.dailyWheel.earnedToday = 0;
        d.dailyWheel.usedToday = 0;
      }
      if (d.dailyReload) d.dailyReload.day = (d.dailyReload.day || 1) + 1;
      save();
      if (typeof toast === 'function') toast('已进入第 ' + m.day + ' 个演示日（马来西亚时间 00:00 重置展示）。未使用抽奖次数如何处理待确认，本次按次数重置为 0。');
      refreshAll();
      return true;
    }
    if (name === 'core-force-fail') {
      m.forceFail = !m.forceFail;
      save();
      if (typeof toast === 'function') toast(m.forceFail ? '已开启：下一次领取或转换将失败' : '已关闭强制失败');
      refreshAll();
      return true;
    }
    if (name === 'core-expire') {
      if (!currentId) { if (typeof toast === 'function') toast('请先打开一个活动'); return true; }
      if (m.expired[currentId]) delete m.expired[currentId];
      else m.expired[currentId] = { at: nowMYT(), reason: '演示已将该活动设为过期。正式失效规则待确认。' };
      save();
      if (typeof toast === 'function') toast(m.expired[currentId] ? '已将当前活动设为过期（演示）' : '已取消过期演示');
      refreshAll();
      return true;
    }
    if (name === 'core-overlap-toggle') {
      m.overlapDemo = !m.overlapDemo;
      save();
      if (typeof toast === 'function') toast(m.overlapDemo ? '已演示与其他充值活动重叠' : '已取消重叠演示');
      refreshAll();
      return true;
    }
    if (name === 'core-maint-window') {
      m.maintInWindow = m.maintInWindow === true ? null : true;
      if (m.maintInWindow) m.hasFirstDeposit = true;
      save();
      if (typeof toast === 'function') toast(m.maintInWindow ? '已标记为窗口期内已充值' : '已取消窗口期标记');
      refreshAll();
      return true;
    }
    if (name === 'core-records') { closeDemoSheet(); navigate('demo=records'); return true; }
    if (name === 'core-compat') { closeDemoSheet(); navigate('demo=compat'); return true; }
    if (name === 'core-pending') { closeDemoSheet(); navigate('demo=pending'); return true; }
    if (name === 'core-conflicts') { closeDemoSheet(); navigate('demo=compat'); return true; }
    if (name === 'core-consult') { toastUnwired('资格咨询。'); return true; }
    if (name === 'core-retry') {
      const p = m.processing;
      m.processing = null;
      save();
      if (p && p.action && p.action.indexOf('core-') === 0) return handleCoreAction(p.action);
      if (typeof toast === 'function') toast('请再次点击主按钮重新操作');
      refreshAll();
      return true;
    }
    return false;
  }

  function renderCompatPage() {
    const rows = [];
    const ids = Object.keys(PROMO_META);
    const ex = new Map();
    COMPAT.exclusive.forEach(r => ex.set(pairKey(r.a, r.b), r));
    const ok = new Map();
    COMPAT.compatible.forEach(r => ok.set(pairKey(r.a, r.b), r));
    const pend = new Map();
    COMPAT.pendingExclusive.forEach(r => pend.set(pairKey(r.a, r.b), r));
    let table = '<div class="table-wrap compat-table-desktop"><table class="prize-table compat-table"><thead><tr><th>活动</th>';
    ids.forEach(id => { table += `<th>${esc(promoTitle(id))}</th>`; });
    table += '</tr></thead><tbody>';
    ids.forEach(a => {
      table += `<tr><th>${esc(promoTitle(a))}</th>`;
      ids.forEach(b => {
        if (a === b) { table += '<td class="same">—</td>'; return; }
        const k = pairKey(a, b);
        if (ex.has(k)) table += '<td class="ex">互斥</td>';
        else if (ok.has(k)) table += '<td class="ok">可同时</td>';
        else if (pend.has(k)) table += '<td class="pend">待确认</td>';
        else table += '<td class="pend">待确认</td>';
      });
      table += '</tr>';
    });
    table += '</tbody></table></div>';
    const officialList = COMPAT.exclusive.map(r => `<article class="compat-card"><div class="compat-top"><strong>${esc(promoTitle(r.a))} 与 ${esc(promoTitle(r.b))}</strong><span class="tag">互斥</span></div><p>${esc(r.reason)}</p><p class="fine-print">恢复资格：${esc(r.recover)}</p></article>`).join('');
    const compatList = COMPAT.compatible.map(r => `<article class="compat-card"><div class="compat-top"><strong>${esc(promoTitle(r.a))} 与 ${esc(promoTitle(r.b))}</strong><span class="tag ok">可同时</span></div><p>${esc(r.reason)}</p></article>`).join('');
    const dep = COMPAT.depositTriggers.map(r => `<article class="compat-card"><div class="compat-top"><strong>${esc(promoTitle(r.promo))}</strong></div><p>${esc(r.text)}</p></article>`).join('');
    const bets = COMPAT.betCounts.map(r => `<article class="compat-card"><div class="compat-top"><strong>${esc(promoTitle(r.promo))}</strong></div><p>${esc(r.text)}</p></article>`).join('')
      + `<article class="compat-card"><p>${esc(COMPAT.pendingBetShare)}</p></article>`;
    $('#app').innerHTML = (window.DemoAPI && window.DemoAPI.demoPage ? window.DemoAPI.demoPage('活动兼容表', `
      <p>只把原文写明的关系标为「互斥」或「可同时」，其余一律为待确认，前台不会按待确认项自动拦截。</p>
      ${table}
      <section class="section-panel"><div class="section-header"><h3>原文写明的互斥</h3></div>${officialList}</section>
      <section class="section-panel"><div class="section-header"><h3>原文写明可同时触发</h3></div>${compatList}</section>
      <section class="section-panel"><div class="section-header"><h3>同一笔充值可以触发哪些奖励</h3></div>${dep}</section>
      <section class="section-panel"><div class="section-header"><h3>同一笔有效投注可以计入哪些活动</h3></div>${bets}</section>
    `, 'category=all') : `<article class="detail"><h2>活动兼容表</h2>${table}</article>`);
    document.title = '活动兼容表 · TPOWER';
  }

  function renderPendingPage() {
    const blocks = PENDING_RULES.map(g => `<section class="section-panel"><div class="section-header"><h3>${esc(g.activity)}</h3></div><ul class="trial-terms">${g.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul></section>`).join('');
    $('#app').innerHTML = (window.DemoAPI && window.DemoAPI.demoPage ? window.DemoAPI.demoPage('待确认业务规则', `
      <p>以下规则涉及金额、次数、期限、资格或计奖方式，但活动原文未写明。演示不自行设定，仅作待确认清单。</p>
      ${blocks}
    `, 'category=all') : `<article class="detail"><h2>待确认业务规则</h2>${blocks}</article>`);
    document.title = '待确认业务规则 · TPOWER';
  }

  window.DemoCore = {
    MYT, UNWIRED, COMPAT, PENDING_RULES, PROMO_META,
    r2, rm, moneyNum, nowMYT, labelMYT, nextMidnightMYT, esc,
    defaultMember, memberOf, syncShared, inferHasFirstDeposit, kycOk,
    resolve, ctaButton, officialConflict, eligibility, phaseOf,
    walletPanel, convertBreakdown, statusPanel, conditionsBlock, rulesBlock,
    supportEntry, demoPanel, rewardCard, listRewardLine,
    toastUnwired, applySimDeposit, creditActivity, takeActivity,
    creditWithdrawable, creditCash, addRecord, beginProcess, refreshAll,
    handleCoreAction, renderCompatPage, renderPendingPage, promoTitle, pairKey,
    openDemoSheet, closeDemoSheet, fillDemoSheet, isDemoSheetOpen, syncHasCta
  };

  /* Hook money display helper without breaking RM ${money()} legacy. */
  window.rm = rm;
})();
