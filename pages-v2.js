/* Unified detail pages, list cards, and action routing for the v2 overhaul. */
(function () {
  const C = () => window.DemoCore;
  const store = () => window.DemoAPI;
  function D() { return store().load(); }
  function $(s) { return document.querySelector(s); }

  const BANNER_IMG = { new: 'original-promotions.jpeg', invite: 'original-promotions.jpeg', growth: 'promotion-design.png', anniversary: 'anniversary-source.jpeg', maintenance: 'maintenance-source.jpeg' };

  function keyRows(id) {
    const pending = '待确认';
    const overlapFd = '此活动不能与其他充值活动重叠。与成长计划、每日转盘、新人专享挑战解锁充值是否重叠待确认。';
    const map = {
      'first-deposit-bonus': [
        { label: '适用会员', value: '仅限会员首次成功充值，每位会员只能领取一次首存彩金。' },
        { label: '充值条件', value: '首次成功充值。' },
        { label: '奖励比例及上限', value: '老虎机 100%，最高 RM300；真人 50%，最高 RM300。' },
        { label: '流水计算方式', value: '老虎机：本金+彩金x12；真人：本金+彩金x25。仅计算所选游戏类别的合格投注。' },
        { label: '适用游戏', value: '按所选类别：老虎机或真人。' },
        { label: '活动期限及领取期限', value: pending, pending: true },
        { label: '是否可同时参加', value: overlapFd }
      ],
      'daily-reload': [
        { label: '适用会员', value: '适用于已完成首次充值的会员。' },
        { label: '充值条件', value: '每日进行符合资格的再存。取消、退款或异常充值不计入。不得将多笔充值合并领取同一笔彩金。' },
        { label: '奖励比例及上限', value: '再存 10%。真人最高彩金 RM100；老虎机、捕鱼最高彩金 RM300。每日领取次数、上限按每笔还是每日累计，待确认。', pending: true },
        { label: '流水计算方式', value: '真人：本金+彩金x12；老虎机、捕鱼：本金+彩金x8。仅计算所选游戏类别的有效投注。' },
        { label: '适用游戏', value: '按所选类别：真人或老虎机、捕鱼。' },
        { label: '活动期限及领取期限', value: '跨日未完成时如何处理待确认。', pending: true },
        { label: '是否可同时参加', value: overlapFd }
      ],
      'daily-wheel': [
        { label: '适用会员', value: '成功充值的会员。' },
        { label: '充值条件', value: '每成功充值一笔超过RM100，获得1次免费抽奖；不可合并；每日最多3次。取消、退款或异常充值不产生次数。' },
        { label: '奖励比例及上限', value: '每日最多3次免费抽奖，最高赢取RM888。每次必定获得其中一档奖金。' },
        { label: '流水计算方式', value: '彩金须完成3倍有效流水后才可转换为现金。例如抽中RM188，需完成RM564有效流水。' },
        { label: '适用游戏', value: '流水仅限指定游戏商：FUMA、WUDI、BWG。' },
        { label: '活动期限及领取期限', value: '每日抽奖次数于 00:00（马来西亚时间）重置。未使用次数如何处理待确认。', pending: true },
        { label: '是否可同时参加', value: '是否可与其他充值优惠同时参加待确认。', pending: true }
      ],
      'growth': [
        { label: '适用会员', value: '新会员完成首次有效充值。每位会员仅限开启一次成长计划。' },
        { label: '充值条件', value: '首次有效充值后自动启动。后续档位开启充值门槛待确认。', pending: true },
        { label: '奖励比例及上限', value: '首充 200% 最高 RM5,888.00（不限时）。后续档位：Lv1 RM1,888；Lv2 RM5,888；Lv3 RM8,888；Lv4 RM18,888，各限10天。' },
        { label: '流水计算方式', value: '有效投注 × 对应比例 = 解锁彩金。例如：电子投注 RM1,000 × 0.3% = RM3.00。已领取的成长彩金无需额外流水。' },
        { label: '适用游戏', value: '电子（老虎机）0.3%、打鱼（捕鱼）0.3%、现场（真人）0.1%、体育 0.5%。其他游戏不计入。' },
        { label: '活动期限及领取期限', value: '首充档位不限时；后续每个档位有效期为10天，逾期失效且不能恢复。' },
        { label: '是否可同时参加', value: '新人专享挑战的解锁充值会同时激活本计划。与首存／再存是否重叠待确认。', pending: true }
      ],
      'newcomer': [
        { label: '适用会员', value: '每位新会员只能参加一次。必须完成 KYC；相同真实姓名与手机号码不能重复参与。' },
        { label: '充值条件', value: '完成 RM440 流水后，须在48小时内完成充值，最低 RM10；只有一次充值解锁机会。' },
        { label: '奖励比例及上限', value: '实名认证领取 RM88 活动金。充值按1:1解锁，最高 RM1,888。' },
        { label: '流水计算方式', value: '第一阶段 RM88 × 5 = RM440。解锁后钱包总额须完成12倍有效流水；本金再完成1倍流水后可申请提款。' },
        { label: '适用游戏', value: '只能在指定的真人现场游戏和老虎机中进行。具体游戏商名单待确认。', pending: true },
        { label: '活动期限及领取期限', value: '解锁充值须在48小时内完成，逾期资格自动失效。' },
        { label: '是否可同时参加', value: '此充值会同时激活成长彩金计划奖励。' }
      ],
      'newcomer-free-challenge': [
        { label: '适用会员', value: '仅限新注册会员，须完成实名认证。同一手机号、真实姓名或设备仅限领取一次。终身限领一次。' },
        { label: '充值条件', value: '领取试玩额度，无需充值。' },
        { label: '奖励比例及上限', value: '免费领取 RM100 试玩额度（活动金）。试玩余额达到 RM200，兑换 RM100 现金。未达标不可兑换部分奖励。' },
        { label: '流水计算方式', value: '原文未另设兑换后流水，按达标兑换规则执行。' },
        { label: '适用游戏', value: '在指定游戏中试玩。具体名单待确认。', pending: true },
        { label: '活动期限及领取期限', value: pending, pending: true },
        { label: '是否可同时参加', value: '与「老会员回归，免费赢取RM188」互斥，不允许同一会员重复领取两种免费试玩奖励。' }
      ],
      'returning-member': [
        { label: '适用会员', value: '曾成功充值的会员（历史曾经成功充值），必须完成实名认证，仅可领取一次。是否要求一定天数未活跃待确认。', pending: true },
        { label: '充值条件', value: '领取试玩额度，无需再充值。' },
        { label: '奖励比例及上限', value: '免费 RM100 试玩额度，试玩余额达到 RM200 后兑换 RM188 现金。未达到 RM200 不可兑换。' },
        { label: '流水计算方式', value: '原文未另设兑换后流水，按达标兑换规则执行。' },
        { label: '适用游戏', value: '在指定游戏内试玩。具体名单待确认。', pending: true },
        { label: '活动期限及领取期限', value: pending, pending: true },
        { label: '是否可同时参加', value: '与新人免费体验礼互斥（演示适用于「新人免费挑战赢取RM100」）。' }
      ],
      'referral': [
        { label: '适用会员', value: '分享专属邀请链接或邀请码的会员。每名新会员只能绑定一名邀请人。' },
        { label: '充值条件', value: '好友累计成功充值 RM100 可额外解锁 RM3。充值任务仅计算真实入账金额。' },
        { label: '奖励比例及上限', value: '每成功邀请一名合格好友，邀请奖励总额最高 RM1,000。KYC 解锁 RM2；累计充值 RM100 解锁 RM3；之后每累计 RM1,000 有效投注解锁 RM0.50。' },
        { label: '流水计算方式', value: '投注奖励仅计算好友本人的合格有效投注。' },
        { label: '适用游戏', value: pending, pending: true },
        { label: '活动期限及领取期限', value: pending, pending: true },
        { label: '是否可同时参加', value: '与其他活动是否可同时参加待确认。', pending: true }
      ],
      'anniversary': [
        { label: '适用会员', value: '活动期间产生有效投注的会员。' },
        { label: '充值条件', value: '不要求单独充值；按有效投注累计抽奖券。' },
        { label: '奖励比例及上限', value: '头奖 RM100,000；二奖 RM3,000；三奖 RM300；四奖 RM30；五奖 RM4。' },
        { label: '流水计算方式', value: '有效投注流水每累计满 RM200 获得1张抽奖券。奖金流水及提款条件待确认。一张券同时符合多个奖项时的计奖方式待确认。', pending: true },
        { label: '适用游戏', value: '除4D及平台指定的特殊游戏外，其他游戏的有效投注均计入。' },
        { label: '活动期限及领取期限', value: '每周日晚上7:00截止（按马来西亚时间展示，时区待确认）。第3期：2026-11-15 19:00:00 至 2026-11-22 18:59:59；开奖参考日期 2026-11-22。奖金须在48小时内领取。', pending: true },
        { label: '是否可同时参加', value: pending, pending: true }
      ],
      'vip-benefits': [
        { label: '适用会员', value: 'VIP 会员。正式等级门槛待确认。', pending: true },
        { label: '充值条件', value: '正式保级与升级条件待确认。以下金额仅为示例。', pending: true },
        { label: '奖励比例及上限', value: '会员等级越高，享有对应VIP权益。正式彩金、返水比例及提款规则另设统一等级表，待确认。', pending: true },
        { label: '流水计算方式', value: '返水仅计算符合规则的有效投注。正式规则待确认。', pending: true },
        { label: '适用游戏', value: pending, pending: true },
        { label: '活动期限及领取期限', value: '升级礼金每个等级仅能领取一次；保级礼金每周期限领一次；每周关怀礼金每周期限领一次；节日礼金每个节日限领一次。周期长度待确认。', pending: true },
        { label: '是否可同时参加', value: pending, pending: true }
      ],
      'maintenance': [
        { label: '适用会员', value: '2024年1月1日至2026年10月31日期间有成功充值的玩家，每人、每设备、每IP限参加一次。' },
        { label: '充值条件', value: '须在上述期间有成功充值。' },
        { label: '奖励比例及上限', value: '领取 100 活动分，达到 200 分后手动领取 RM100 现金。' },
        { label: '流水计算方式', value: 'RM100 奖励可用于本人账号游戏投注，也可直接申请取款。' },
        { label: '适用游戏', value: '活动分只能用于指定游戏。具体名单待确认。', pending: true },
        { label: '活动期限及领取期限', value: '充值窗口为 2024年1月1日至2026年10月31日。领取期限待确认。', pending: true },
        { label: '是否可同时参加', value: pending, pending: true }
      ]
    };
    return map[id] || [];
  }

  function journeyMini(labels, current, finished) {
    return `<div class="journey-mini" aria-label="活动流程">${labels.map((lb, i) => {
      const cls = finished || i < current ? 'is-done' : (i === current ? 'is-on' : '');
      return `<span class="${cls}">${C().esc(lb)}</span>`;
    }).join('')}</div>`;
  }

  function oneLine(p, d) {
    const id = p.id;
    const line = C().listRewardLine(id, d);
    if (line) return line;
    return p.secondary || p.summary || p.badge;
  }

  function paint(p, opts) {
    const core = C();
    const d = D();
    core.syncShared(d);
    const st = core.resolve(p.id, d);
    const head = `<header class="detail-head">
      <span class="badge">${core.esc(p.badge || p.tag || '')}</span>
      <h2>${core.esc(p.title)}</h2>
      <p class="detail-reward-line">${core.esc(oneLine(p, d))}</p>
    </header>`;
    const miniHero = p.banner ? `<div class="detail-hero-mini"><img src="assets/${BANNER_IMG[p.banner] || 'original-promotions.jpeg'}" alt=""></div>` : '';
    const body = [
      head,
      miniHero,
      core.walletPanel(d),
      core.statusPanel(p.id, opts.extraChecks),
      `<section class="section-panel action-panel" id="need-action"><div class="section-header"><h3>当前需要操作的内容</h3></div>${opts.actionHtml || '<p>请根据下方主按钮继续。</p>'}</section>`,
      opts.progressHtml ? `<section class="section-panel" id="task-progress"><div class="section-header"><h3>奖励或任务进度</h3></div>${opts.progressHtml}</section>` : '',
      core.conditionsBlock(keyRows(p.id)),
      core.rulesBlock(opts.rules || []),
      core.supportEntry(),
      core.demoPanel(p.id)
    ].join('');
    const cta = `<div class="unified-cta trial-cta-slot">${core.ctaButton(st)}</div>`;
    $('#app').innerHTML = `<article class="detail unified-detail trial-detail promo-detail">${'<button class="back-link" data-back>' + icon('arrow') + ' 返回活动列表</button>'}${body}${cta}<p class="preview-note">TPOWER · 活动页面交互预览<br>当前为演示，未连接真实充值、游戏、提款或发奖接口</p></article>`;
    document.title = p.title + ' · TPOWER';
  }

  function fdCalc(optionId, amount) {
    const opt = FIRST_DEPOSIT_SOURCE.options.find(o => o.id === optionId);
    if (!opt) return { bonus: 0, need: 0, opt: null };
    const bonus = C().r2(Math.min(amount * opt.rate, opt.cap));
    const need = C().r2((amount + bonus) * opt.wagerMult);
    return { bonus, need, opt };
  }
  function drCalc(optionId, amount) {
    const opt = DAILY_RELOAD_SOURCE.options.find(o => o.id === optionId);
    if (!opt) return { bonus: 0, need: 0, opt: null };
    const bonus = C().r2(Math.min(amount * opt.rate, opt.cap));
    const need = C().r2((amount + bonus) * opt.wagerMult);
    return { bonus, need, opt };
  }

  function renderFirstDeposit(p) {
    const d = D();
    const f = d.firstDepositBonus;
    const core = C();
    const ph = core.phaseOf(p.id, d);
    const labels = ['选择优惠', '确认并充值', '完成流水', '转换可提款'];
    let current = 0;
    if (f.converted) current = 3;
    else if (f.deposited && f.turnoverNeed && f.turnover >= f.turnoverNeed) current = 3;
    else if (f.deposited) current = 2;
    else if (f.option) current = 1;
    const finished = !!f.converted;

    let action = journeyMini(labels, current, finished);
    if (f.converted) {
      action += `<div class="done-box"><h4>活动已完成</h4><p>已转换至可提款余额。本金 ${core.rm(f.depositAmount)}，彩金 ${core.rm(f.bonus)}，到账时间 ${core.labelMYT(f.claimedAt)}。</p></div>`;
    } else {
      action += `<p>请选择「老虎机 100%」或「真人 50%」。充值前可切换；成功完成演示充值后才锁定优惠。</p>`;
      action += `<div class="option-grid">${FIRST_DEPOSIT_SOURCE.options.map(o => {
        const selected = f.option === o.id;
        const locked = f.deposited && f.option && f.option !== o.id;
        return `<button type="button" class="option-card ${selected ? 'is-selected' : ''}" data-action="fd-choose-${o.id}" ${locked ? 'disabled' : ''}>
          <div class="panel-top"><span class="eyebrow">${core.esc(o.title)} ${o.rateLabel}</span><span>${selected ? '已选择' : (f.deposited ? '已锁定另一优惠' : '可选择')}</span></div>
          <div class="rate">${o.rateLabel}</div>
          <ul class="kyc-summary"><li><span>最高彩金</span><strong>${core.rm(o.cap)}</strong></li><li><span>流水倍数</span><strong>${o.wagerText}</strong></li></ul>
        </button>`;
      }).join('')}</div>`;
      if (f.option) {
        const opt = FIRST_DEPOSIT_SOURCE.options.find(o => o.id === f.option);
        action += `<div class="table-wrap" style="margin-top:12px"><table class="prize-table"><thead><tr><th>充值金额</th><th>可得彩金</th><th>所需有效流水</th></tr></thead><tbody>${
          FIRST_DEPOSIT_SOURCE.amounts.map(n => {
            const c = fdCalc(f.option, n);
            return `<tr><td>${core.rm(n)}</td><td>${core.rm(c.bonus)}</td><td>${core.rm(c.need)}</td></tr>`;
          }).join('')
        }</tbody></table></div>
        <p class="fine-print">已按「${opt.title} ${opt.rateLabel}、上限 ${core.rm(opt.cap)}、${opt.wagerText}」计算示例。</p>
        ${f.deposited ? `<p>已完成首次充值 ${core.rm(f.depositAmount)}，彩金 ${core.rm(f.bonus)}，优惠已锁定。</p>` : `<div class="fd-bet-actions">${FIRST_DEPOSIT_SOURCE.amounts.map(n => `<button type="button" class="outline-wide" data-action="fd-confirm-${n}">确认参与并充值 ${core.rm(n)}</button>`).join('')}</div>`}`;
      }
    }

    let progress = '';
    if (f.converted) {
      progress = `<p>实际到账 ${core.rm((f.depositAmount || 0) + (f.bonus || 0))}（本金 ${core.rm(f.depositAmount)} + 彩金 ${core.rm(f.bonus)}）。</p><button type="button" class="text-button" data-action="core-records">查看领取记录</button>`;
    } else if (f.deposited) {
      progress = `<div class="bar-label"><span>有效流水（仅计${FIRST_DEPOSIT_SOURCE.options.find(o => o.id === f.option).title}）</span><span>${core.rm(f.turnover || 0)} / ${core.rm(f.turnoverNeed)}</span></div>
        <progress max="${Math.max(1, f.turnoverNeed)}" value="${Math.min(f.turnoverNeed, f.turnover || 0)}"></progress>
        <div class="fd-bet-actions">
          <button type="button" class="outline-wide" data-action="fd-bet-slots">演示老虎机投注 RM200</button>
          <button type="button" class="outline-wide" data-action="fd-bet-live">演示真人投注 RM200</button>
          <button type="button" class="text-button" data-action="fd-accelerate">演示加速完成流水（演示用）</button>
        </div>`;
    } else {
      progress = core.rewardCard({ state: 'idle', maxLabel: '最高奖励', maxAmount: 300 });
    }
    if (f.deposited && !f.converted) {
      progress = core.rewardCard({ state: 'in-progress', actualLabel: '本次实际彩金', actualAmount: f.bonus, progressText: `流水 ${core.rm(f.turnover || 0)} / ${core.rm(f.turnoverNeed)}` }) + progress;
    }
    if (f.converted) {
      progress = core.rewardCard({ state: 'completed', doneAmount: (f.depositAmount || 0) + (f.bonus || 0), doneAt: f.claimedAt }) + progress;
    }

    paint(p, { actionHtml: action, progressHtml: progress, rules: FIRST_DEPOSIT_SOURCE.rules });
  }

  function renderDailyReload(p) {
    const d = D();
    const r = d.dailyReload;
    const core = C();
    const labels = ['选择优惠', '再存充值', '完成流水', '转换可提款'];
    let current = 0;
    if (r.deposited && r.turnoverNeed && (r.turnover || 0) >= r.turnoverNeed) current = 3;
    else if (r.deposited) current = 2;
    else if (r.option) current = 1;
    let action = journeyMini(labels, current, false);
    action += `<p>每日领取次数、彩金上限按每笔还是每日累计、跨日未完成如何处理，均为待确认。演示不设每日限领一次。</p>`;
    action += `<div class="option-grid">${DAILY_RELOAD_SOURCE.options.map(o => {
      const selected = r.option === o.id;
      const locked = r.deposited && r.option && r.option !== o.id;
      return `<button type="button" class="option-card ${selected ? 'is-selected' : ''}" data-action="dr-choose-${o.id}" ${locked ? 'disabled' : ''}>
        <div class="panel-top"><span class="eyebrow">${core.esc(o.title)} ${o.rateLabel}</span><span>${selected ? '已选择' : (r.deposited ? '本笔已锁定' : '可选择')}</span></div>
        <div class="rate">${o.rateLabel}</div>
        <ul class="kyc-summary"><li><span>最高彩金</span><strong>${core.rm(o.cap)}</strong></li><li><span>流水倍数</span><strong>${o.wagerText}</strong></li></ul>
      </button>`;
    }).join('')}</div>`;
    if (r.option) {
      const opt = DAILY_RELOAD_SOURCE.options.find(o => o.id === r.option);
      action += `<div class="table-wrap" style="margin-top:12px"><table class="prize-table"><thead><tr><th>再存金额</th><th>可得彩金</th><th>所需有效流水</th></tr></thead><tbody>${
        DAILY_RELOAD_SOURCE.amounts.map(n => {
          const c = drCalc(r.option, n);
          return `<tr><td>${core.rm(n)}</td><td>${core.rm(c.bonus)}</td><td>${core.rm(c.need)}</td></tr>`;
        }).join('')
      }</tbody></table></div>
      ${r.deposited ? `<p>本笔再存 ${core.rm(r.depositAmount)} 已入账，彩金 ${core.rm(r.bonus)}。</p>` : `<div class="fd-bet-actions">${DAILY_RELOAD_SOURCE.amounts.map(n => `<button type="button" class="outline-wide" data-action="dr-confirm-${n}">确认参与并再存 ${core.rm(n)}</button>`).join('')}</div>`}
      <button type="button" class="outline-wide" data-action="dr-deposit-merge">演示两笔合并领取（不可）</button>
      <button type="button" class="outline-wide" data-action="dr-deposit-void">演示取消或退款充值（不计入）</button>`;
    }

    let progress = '';
    if (r.deposited) {
      progress = core.rewardCard({ state: 'in-progress', actualLabel: '本次实际彩金', actualAmount: r.bonus, progressText: `流水 ${core.rm(r.turnover || 0)} / ${core.rm(r.turnoverNeed)}` });
      progress += `<div class="bar-label"><span>有效流水（仅计${DAILY_RELOAD_SOURCE.options.find(o => o.id === r.option).title}）</span><span>${core.rm(r.turnover || 0)} / ${core.rm(r.turnoverNeed)}</span></div>
        <progress max="${Math.max(1, r.turnoverNeed)}" value="${Math.min(r.turnoverNeed, r.turnover || 0)}"></progress>
        <div class="fd-bet-actions">
          <button type="button" class="outline-wide" data-action="dr-bet-live">演示真人投注 RM200</button>
          <button type="button" class="outline-wide" data-action="dr-bet-slots">演示老虎机投注 RM200</button>
          <button type="button" class="outline-wide" data-action="dr-bet-fish">演示捕鱼投注 RM200</button>
          <button type="button" class="text-button" data-action="dr-accelerate">演示加速完成流水（演示用）</button>
        </div>`;
    } else {
      progress = core.rewardCard({ state: (r.historyCount ? 'in-progress' : 'idle'), maxLabel: '最高奖励', maxAmount: 300, actualLabel: '累计已领再存彩金', actualAmount: r.claimedTotal || 0, progressText: r.historyCount ? `已领取 ${r.historyCount} 笔` : '' });
    }
    paint(p, { actionHtml: action, progressHtml: progress, rules: DAILY_RELOAD_SOURCE.rules });
  }

  function renderWheel(p) {
    const d = D();
    const w = d.dailyWheel;
    const core = C();
    const left = Math.max(0, (w.earnedToday || 0) - (w.usedToday || 0));
    const action = `<p>每成功充值一笔<strong>超过RM100</strong>（须大于 RM100，不等于满 RM100）获得 1 次抽奖。充值不可合并。今日已获得 ${w.earnedToday || 0} / 3 次，剩余 ${left} 次。重置时间：${core.nextMidnightMYT()}。未使用次数如何处理待确认。</p>
      <div class="fd-bet-actions">
        <button type="button" class="outline-wide" data-action="dw-deposit-ok">演示充值 RM150（超过RM100，获得1次）</button>
        <button type="button" class="outline-wide" data-action="dw-deposit-100">演示充值 RM100（未超过，不获得次数）</button>
        <button type="button" class="outline-wide" data-action="dw-deposit-50">演示充值 RM50（未超过，不获得次数）</button>
        ${left > 0 ? '<button type="button" class="outline-wide" data-action="dw-spin">转动转盘</button>' : ''}
      </div>`;
    let progress = core.rewardCard({
      state: (w.bonusWallet ? 'in-progress' : 'idle'),
      maxLabel: '最高奖励', maxAmount: 888,
      actualLabel: '活动彩金', actualAmount: w.bonusWallet || 0,
      progressText: w.turnoverNeed ? `流水 ${core.rm(w.turnover || 0)} / ${core.rm(w.turnoverNeed)}` : ''
    });
    progress += `<ul class="kyc-summary"><li><span>今日已获得次数</span><strong>${w.earnedToday || 0} / 3</strong></li><li><span>剩余次数</span><strong>${left}</strong></li><li><span>重置时间</span><strong>${core.nextMidnightMYT()}</strong></li></ul>`;
    if ((w.bonusWallet || 0) > 0) {
      progress += `<div class="bar-label"><span>有效流水（FUMA、WUDI、BWG）</span><span>${core.rm(w.turnover || 0)} / ${core.rm(w.turnoverNeed || 0)}</span></div>
        <progress max="${Math.max(1, w.turnoverNeed || 1)}" value="${Math.min(w.turnoverNeed || 0, w.turnover || 0)}"></progress>
        <button type="button" class="text-button" data-action="dw-accelerate">演示加速完成流水（演示用）</button>`;
    }
    paint(p, { actionHtml: action, progressHtml: progress, rules: (WHEEL_SOURCE.eligibility || []).concat(WHEEL_SOURCE.terms || []) });
  }

  function renderGrowth(p) {
    const d = D();
    const g = d.growth;
    const core = C();
    const titles = GROWTH_SOURCE.titles;
    const caps = GROWTH_SOURCE.caps;
    const action = `<p>首充档位<strong>不限时</strong>；后续档位各限 <strong>10 天</strong>。解锁示例：电子投注 ${core.rm(1000)} × 0.3% = ${core.rm(3)}。</p>
      ${g.started || d.member.hasFirstDeposit ? '<button type="button" class="outline-wide" data-action="gr-bet-valid">演示电子投注 RM10,000</button><button type="button" class="outline-wide" data-action="gr-go-claim">立即领取已解锁彩金</button>' : '<p>完成首次有效充值后自动启动。可在演示控制中模拟充值。</p>'}`;
    const rows = titles.map((t, i) => {
      const unlocked = (g.unlocked && g.unlocked[i]) || 0;
      const claimed = (g.claimed && g.claimed[i]) || 0;
      const claimable = Math.max(0, unlocked - claimed);
      const left = Math.max(0, caps[i] - unlocked);
      const limit = i === 0 ? '不限时' : ((g.daysLeft && g.daysLeft[i] != null) ? `剩余 ${g.daysLeft[i]} 天` : '限10天');
      const expired = g.expired && g.expired[i];
      const current = (g.tier || 0) === i ? '（当前档位）' : '';
      return `<tr class="${(g.tier || 0) === i ? 'current-level' : ''}"><td>${t}${current}</td><td>${core.rm(caps[i])}</td><td>${core.rm(unlocked)}</td><td>${core.rm(claimed)}</td><td>${core.rm(claimable)}</td><td>${core.rm(left)}</td><td>${expired ? '已失效' : limit}</td></tr>`;
    }).join('');
    const progress = `<div class="table-wrap"><table class="prize-table"><thead><tr><th>档位</th><th>上限</th><th>已解锁</th><th>已领取</th><th>可领取</th><th>剩余金额</th><th>期限</th></tr></thead><tbody>${rows}</tbody></table></div>
      <p class="fine-print">后续档位开启充值门槛待确认。演示数值按已公布档位上限与比例计算。</p>`;
    paint(p, { actionHtml: action, progressHtml: progress, rules: GROWTH_SOURCE.terms });
  }

  function renderNewcomer88(p) {
    const d = D();
    const n = d.newcomer;
    const core = C();
    const action = n.claimed
      ? `<p>已领取 RM88 <strong>活动金</strong>。请先完成 RM88 × 5 = RM440 有效流水，再于 48 小时内最低充值 RM10，按 1:1 解锁，最高 RM1,888。</p>
         ${n.challengeDone && !n.deposited ? '<button type="button" class="outline-wide" data-action="nc-go-unlock">去充值解锁</button>' : ''}
         ${!n.challengeDone ? '<button type="button" class="outline-wide" data-action="nc-go-play">去完成 RM440 流水</button>' : ''}`
      : `<p>领取前请了解：RM88 是<strong>活动金</strong>，只能用于指定游戏。后续须完成 RM440 流水，并在 48 小时内充值解锁彩金；解锁后钱包总额 12 倍流水，本金再 1 倍流水。</p>
         <button type="button" class="outline-wide" data-action="nc-go-claim">领取 RM88 活动金</button>`;
    const progress = `<ul class="kyc-summary">
        <li><span>本金</span><strong>${core.rm(n.depositAmount || 0)}</strong></li>
        <li><span>活动金</span><strong>${core.rm(n.claimed ? 88 : 0)}</strong></li>
        <li><span>已解锁彩金</span><strong>${core.rm(n.unlockedBonus || 0)}</strong></li>
        <li><span>可提款余额</span><strong>${core.rm((d.member.wallets || {}).withdrawable || 0)}</strong></li>
      </ul>
      ${n.claimed ? `<div class="bar-label"><span>第一阶段流水</span><span>${core.rm(n.turnover || 0)} / ${core.rm(440)}</span></div><progress max="440" value="${Math.min(440, n.turnover || 0)}"></progress>` : ''}`;
    paint(p, { actionHtml: action, progressHtml: progress, rules: NEWCOMER_SOURCE.terms });
  }

  function renderNfc(p) {
    const d = D();
    const f = d.freeChallenge;
    const core = C();
    const action = f.redeemed
      ? `<div class="done-box"><h4>活动已完成</h4><p>已兑换 RM100 现金并到账。</p></div>`
      : (f.claimed
        ? `<p>已领取 RM100 <strong>活动金</strong>（试玩额度）。试玩余额达到 RM200 方可兑换 RM100 现金。</p>
           <button type="button" class="outline-wide" data-action="nfc-go-play">去试玩</button>`
        : `<p>领取前请了解：RM100 为活动金／试玩额度，不可直接提款。达标后兑换 RM100 现金，未达 RM200 不可兑换部分奖励。</p>
           <button type="button" class="outline-wide" data-action="nfc-go-claim">领取 RM100 活动金</button>`);
    const progress = `<ul class="kyc-summary">
        <li><span>活动金（试玩）</span><strong>${core.rm(f.trialBalance || 0)}</strong></li>
        <li><span>目标余额</span><strong>${core.rm(200)}</strong></li>
        <li><span>可提款余额</span><strong>${core.rm((d.member.wallets || {}).withdrawable || 0)}</strong></li>
      </ul>`;
    paint(p, { actionHtml: action, progressHtml: progress, rules: CHALLENGE_SOURCE.terms });
  }

  function renderReturning(p) {
    const d = D();
    const r = d.returningMember;
    const core = C();
    const action = r.redeemed
      ? `<div class="done-box"><h4>活动已完成</h4><p>已兑换 RM188 现金并到账。</p></div>`
      : (r.claimed
        ? `<p>已领取 RM100 试玩额度。试玩余额达到 RM200 后兑换 RM188 现金。</p><button type="button" class="outline-wide" data-action="ret-go-play">去试玩</button>`
        : `<p>本活动面向<strong>曾成功充值的会员</strong>，须完成实名认证，仅可领取一次。是否要求一定天数未活跃待确认。</p>
           <button type="button" class="outline-wide" data-action="ret-go-claim">领取 RM100 试玩额度</button>`);
    const progress = `<ul class="kyc-summary">
        <li><span>试玩余额</span><strong>${core.rm(r.trialBalance || 0)}</strong></li>
        <li><span>目标余额</span><strong>${core.rm(200)}</strong></li>
        <li><span>可提款余额</span><strong>${core.rm((d.member.wallets || {}).withdrawable || 0)}</strong></li>
      </ul>`;
    paint(p, { actionHtml: action, progressHtml: progress, rules: RETURNING_SOURCE.terms });
  }

  function maskName(name) {
    const s = String(name || '');
    if (s.length <= 1) return '*';
    return s[0] + '*'.repeat(Math.min(2, s.length - 1)) + (s.length > 3 ? s.slice(-1) : '');
  }
  function maskPhone(p) {
    const s = String(p || '');
    if (s.length < 4) return '****';
    return s.slice(0, 3) + '-****' + s.slice(-3);
  }

  function renderReferral(p) {
    const d = D();
    const r = d.referral;
    const core = C();
    const friends = r.friends || [];
    const action = `<p>RM1,000 是<strong>每位合格好友的累计奖励上限</strong>，不是所有好友合计上限。</p>
      <button type="button" class="outline-wide" data-action="ref-friend-kyc">演示添加合格好友</button>
      <button type="button" class="outline-wide" data-action="ref-friend-kyc">演示好友完成实名</button>
      <button type="button" class="outline-wide" data-action="ref-friend-deposit">演示好友累计充值 RM100</button>
      <button type="button" class="outline-wide" data-action="ref-friend-bet">演示好友有效投注 RM1,000</button>`;
    const rows = friends.length ? friends.map(f => {
      const next = f.disqualified ? '—' : (!f.kyc ? '下一项：完成实名认证 RM2' : (!f.deposited ? '下一项：累计充值 RM100，解锁 RM3' : '下一项：每累计有效投注 RM1,000，解锁 RM0.50'));
      return `<tr><td class="masked">${core.esc(maskName(f.name))}</td><td class="masked">${core.esc(maskPhone(f.account))}</td><td>${f.disqualified ? '已取消资格' : (f.kyc ? '已实名' : '未实名')} / ${f.deposited ? '已达充值' : '未达充值'} / ${f.betUnits || 0} 单位</td><td>${core.rm(f.unlocked || 0)}</td><td>${next}</td><td>${core.rm(1000)}</td></tr>`;
    }).join('') : '<tr><td colspan="6">暂无好友记录</td></tr>';
    const progress = `<div class="table-wrap"><table class="prize-table"><thead><tr><th>好友</th><th>账号</th><th>任务进度</th><th>已到账奖励</th><th>下一项奖励</th><th>累计上限</th></tr></thead><tbody>${rows}</tbody></table></div>
      <p class="fine-print">好友姓名与账号已做部分隐藏。</p>`;
    paint(p, { actionHtml: action, progressHtml: progress, rules: REFERRAL_SOURCE.terms });
  }

  function renderAnniversary(p) {
    const d = D();
    const a = d.anniversary;
    const core = C();
    const action = `<ul class="kyc-summary">
        <li><span>期号</span><strong>第3期</strong></li>
        <li><span>截止时间</span><strong>2026-11-22 18:59:59（马来西亚时间）</strong></li>
        <li><span>开奖时间</span><strong>2026-11-22（马来西亚时间，参考 TOTO 6D）</strong></li>
        <li><span>领奖期限</span><strong>开奖后 48 小时内点击领取</strong></li>
        <li><span>中奖结果</span><strong>${a.drawDone ? (a.winAmount ? (a.prizeName || '已中奖') + ' ' + core.rm(a.winAmount) : '未中奖') : '尚未开奖'}</strong></li>
      </ul>
      <p class="fine-print">一张券同时符合多个奖项时的计奖方式待确认。奖金流水及提款条件待确认。</p>
      <button type="button" class="outline-wide" data-action="an-add-turnover">演示有效投注 RM200（获得1张券）</button>
      <button type="button" class="outline-wide" data-action="an-go-draw">演示开奖</button>`;
    const progress = `<p>已累计流水 ${core.rm(a.turnover || 0)}，抽奖券 ${(a.tickets || []).length} 张。</p>
      ${(a.tickets || []).length ? `<div class="table-wrap"><table class="prize-table"><thead><tr><th>券号</th><th>6位号码</th></tr></thead><tbody>${a.tickets.map((t, i) => `<tr><td>${i + 1}</td><td>${core.esc(t.number || t || '')}</td></tr>`).join('')}</tbody></table></div>` : ''}`;
    paint(p, { actionHtml: action, progressHtml: progress, rules: DRAW_SOURCE.terms.concat(DRAW_SOURCE.eligibility) });
  }

  function renderVip(p) {
    const core = C();
    const action = `<p>正式等级门槛、保级周期、奖励及领取条件<strong>待确认</strong>。下表为演示用<strong>示例</strong>，不能当成正式规则。</p>
      <p class="fine-print">${VIP_SOURCE.exampleNote}</p>
      <div class="table-wrap"><table class="prize-table"><thead><tr><th>等级（示例）</th><th>升级礼金（示例）</th><th>保级礼金（示例）</th><th>返水（示例）</th><th>每周关怀（示例）</th><th>节日礼金（示例）</th></tr></thead><tbody>${
        VIP_SOURCE.exampleLevels.map(l => `<tr><td>${l.name}</td><td>${core.rm(l.upgrade)}</td><td>${core.rm(l.retention)}</td><td>${(l.rebate * 100).toFixed(1)}%</td><td>${core.rm(l.weekly)}</td><td>${core.rm(l.festival)}</td></tr>`).join('')
      }</tbody></table></div>
      <div class="fd-bet-actions">${VIP_SOURCE.benefits.map(b => `<button type="button" class="outline-wide" data-action="vb-go-${b.id}">${core.esc(b.title)}</button>`).join('')}</div>`;
    const d = D();
    const v = d.vipBenefits || {};
    const progress = `<p>可查询记录（示例数据）。</p><button type="button" class="text-button" data-action="core-records">查看领取记录</button>`;
    paint(p, { actionHtml: action, progressHtml: progress, rules: VIP_SOURCE.terms });
  }

  function renderMaint(p) {
    const d = D();
    const mt = d.maintenance;
    const core = C();
    const el = core.eligibility(p.id, d);
    const action = !el.ok
      ? `<p>${core.esc(el.reason)}</p><button type="button" class="outline-wide" data-action="core-consult">资格咨询</button>`
      : (mt.completed
        ? `<div class="done-box"><h4>活动已完成</h4><p>已领取 RM100 现金。</p></div>`
        : (mt.joined
          ? `<p>已领取 100 活动分。请在指定游戏中挑战至 200 分。适用游戏名单待确认。</p>
             <button type="button" class="outline-wide" data-action="mt-go-play">去挑战</button>`
          : `<p>点击参与活动即可领取 100 活动分。适用游戏名单待确认。</p>
             <button type="button" class="outline-wide" data-action="mt-join">参与活动</button>`));
    const progress = `<ul class="kyc-summary"><li><span>活动分</span><strong>${mt.points || 0} / 200</strong></li></ul>
      <progress max="200" value="${Math.min(200, mt.points || 0)}"></progress>`;
    paint(p, { actionHtml: action, progressHtml: progress, rules: MAINT_SOURCE.terms.concat(MAINT_SOURCE.eligibility) });
  }

  const RENDERERS = {
    'first-deposit-bonus': renderFirstDeposit,
    'daily-reload': renderDailyReload,
    'daily-wheel': renderWheel,
    'growth': renderGrowth,
    'newcomer': renderNewcomer88,
    'newcomer-free-challenge': renderNfc,
    'returning-member': renderReturning,
    'referral': renderReferral,
    'anniversary': renderAnniversary,
    'vip-benefits': renderVip,
    'maintenance': renderMaint
  };

  function renderUnifiedDetail(p, tabIndex) {
    C().syncShared(D());
    const view = (typeof currentRoute === 'function' && currentRoute().get('view')) || '';
    if (RENDERERS[p.id]) {
      RENDERERS[p.id](p);
      return;
    }
    paint(p, { actionHtml: '<p>请使用主按钮继续。</p>', progressHtml: '', rules: [] });
  }

  /* Confirm participation modal */
  function openConfirm(kind, optionId, amount) {
    const core = C();
    const calc = kind === 'fd' ? fdCalc(optionId, amount) : drCalc(optionId, amount);
    const opt = calc.opt;
    const limits = kind === 'fd'
      ? ['每位会员只能领取一次首存彩金。', '每个会员只能选择一种首存彩金。成功完成演示充值后锁定。', '此活动不能与其他充值活动重叠。', '同一充值不可同时领取老虎机及真人两种优惠。']
      : ['同一笔充值只能选择一种再存优惠。', '不得将多笔充值合并领取同一笔彩金。', '取消、退款或异常充值不计入。', '此活动不能与其他充值活动重叠。', '每日领取次数及跨日处理待确认。'];
    const action = kind + '-deposit-' + amount;
    openModal(`<div class="dialog-illustration">${icon('cash')}</div>
      <h2>确认参与</h2>
      <ul class="kyc-summary">
        <li><span>所选类别</span><strong>${core.esc(opt.title)} ${opt.rateLabel}</strong></li>
        <li><span>充值金额</span><strong>${core.rm(amount)}</strong></li>
        <li><span>可得彩金</span><strong>${core.rm(calc.bonus)}</strong></li>
        <li><span>流水要求</span><strong>${core.rm(calc.need)}（${opt.wagerText}）</strong></li>
      </ul>
      <ul class="trial-terms">${limits.map(x => `<li>${core.esc(x)}</li>`).join('')}</ul>
      <button class="primary" data-action="${action}">确认并完成演示充值</button>
      <button class="outline-wide" data-close>取消</button>`);
  }

  function afterDepositLockAndCredit(kind, amount) {
    const d = D();
    const core = C();
    const m = core.memberOf(d);
    if (kind === 'fd') {
      const f = d.firstDepositBonus;
      const c = fdCalc(f.option, amount);
      f.deposited = true;
      f.depositAmount = amount;
      f.bonus = c.bonus;
      f.turnover = 0;
      f.turnoverNeed = c.need;
      m.hasFirstDeposit = true;
      if (!m.firstDepositAt) m.firstDepositAt = core.nowMYT();
      core.creditActivity(amount + c.bonus, d);
    } else {
      const r = d.dailyReload;
      const c = drCalc(r.option, amount);
      r.deposited = true;
      r.depositAmount = amount;
      r.bonus = c.bonus;
      r.turnover = 0;
      r.turnoverNeed = c.need;
      core.creditActivity(amount + c.bonus, d);
    }
    core.syncShared(d);
    store().save();
    if (typeof closeModal === 'function' && $('#modal') && $('#modal').open) closeModal();
    if (typeof toast === 'function') toast('演示充值成功，优惠已锁定。彩金 ' + core.rm(kind === 'fd' ? d.firstDepositBonus.bonus : d.dailyReload.bonus));
    core.refreshAll();
  }

  function showConvert(kind) {
    const d = D();
    const core = C();
    const m = core.memberOf(d);
    const rec = kind === 'fd' ? d.firstDepositBonus : d.dailyReload;
    const eligible = core.r2((rec.depositAmount || 0) + (rec.bonus || 0));
    /* transferable = current activity wallet amount that belongs to this promo, capped at eligible remaining */
    const out = core.r2(Math.min(m.wallets.activity || 0, eligible));
    const actB = m.wallets.activity || 0;
    const cashB = (m.wallets.cash || 0) + (m.wallets.withdrawable || 0);
    const html = `<section class="reward-feature"><div class="panel-top"><span class="eyebrow">可转换金额</span></div><div class="amount">${core.rm(out)}</div>
      <p>转换金额以当时符合规则的可转余额为准（活动钱包中本笔可转部分 ${core.rm(out)}），不是固定套用初始本金加彩金以外的数额。</p></section>
      ${core.convertBreakdown({ outAmount: out, activityBefore: actB, activityAfter: core.r2(actB - out), cashBefore: cashB, cashAfter: core.r2(cashB + out), note: '现金钱包此处含可提款余额，到账记入可提款余额。' })}
      <button type="button" class="primary" data-action="${kind}-convert-confirm">确认转换</button>`;
    const back = 'activity=' + (kind === 'fd' ? 'first-deposit-bonus' : 'daily-reload');
    $('#app').innerHTML = `<article class="detail unified-detail"><button class="back-link" data-back>${icon('arrow')} 返回活动</button>
      <header class="detail-head"><h2>转换至可提款余额</h2></header>
      ${html}
      <p class="preview-note">当前为演示，未连接真实充值、游戏、提款或发奖接口</p></article>`;
    document.querySelectorAll('[data-back]').forEach(b => { /* default data-back goes to category; override below */ });
    document.title = '转换至可提款余额 · TPOWER';
    const backBtn = document.querySelector('.unified-detail [data-back]');
    if (backBtn) {
      backBtn.addEventListener('click', ev => { ev.preventDefault(); ev.stopImmediatePropagation(); navigate(back); }, true);
    }
  }

  function doConvert(kind) {
    const d = D();
    const core = C();
    const rec = kind === 'fd' ? d.firstDepositBonus : d.dailyReload;
    if (rec.converted || (kind === 'dr' && !rec.deposited)) {
      if (typeof toast === 'function') toast('已转换，请勿重复操作。');
      navigate('demo=records');
      return;
    }
    if ((rec.turnover || 0) < rec.turnoverNeed) {
      if (typeof toast === 'function') toast('请先完成指定倍数的有效流水');
      return;
    }
    const eligible = core.r2((rec.depositAmount || 0) + (rec.bonus || 0));
    core.beginProcess(kind === 'fd' ? 'first-deposit-bonus' : 'daily-reload', kind + '-convert-confirm', () => {
      const dd = D();
      const mm = core.memberOf(dd);
      const rec2 = kind === 'fd' ? dd.firstDepositBonus : dd.dailyReload;
      const out = core.r2(Math.min(mm.wallets.activity || 0, (rec2.depositAmount || 0) + (rec2.bonus || 0)));
      core.takeActivity(out, dd);
      core.creditWithdrawable(out, dd);
      if (kind === 'fd') {
        rec2.converted = true;
        rec2.claimedAt = core.nowMYT();
        core.addRecord('新人首存彩金', rec2.bonus, '已到账');
      } else {
        rec2.claimedTotal = core.r2((rec2.claimedTotal || 0) + rec2.bonus);
        rec2.historyCount = (rec2.historyCount || 0) + 1;
        rec2.claimedAt = core.nowMYT();
        core.addRecord('每日再存10%彩金', rec2.bonus, '已到账');
        rec2.option = null;
        rec2.deposited = false;
        rec2.depositAmount = 0;
        rec2.bonus = 0;
        rec2.turnover = 0;
        rec2.turnoverNeed = 0;
      }
      store().save();
      if (typeof toast === 'function') toast('已转换至可提款余额 ' + core.rm(out));
      navigate(kind === 'fd' ? 'activity=first-deposit-bonus' : 'activity=daily-reload');
    });
  }

  function handleV2(name) {
    if (!name) return false;
    if (C().handleCoreAction(name)) return true;

    if (/^fd-confirm-\d+$/.test(name)) {
      const d = D();
      const st = C().resolve('first-deposit-bonus', d);
      if (st.key === 'logged-out' || st.key === 'no-kyc' || st.key === 'ineligible' || st.key === 'conflict' || st.key === 'expired') {
        if (typeof toast === 'function') toast(st.reason || st.cta);
        return true;
      }
      if (!d.firstDepositBonus.option) { if (typeof toast === 'function') toast('请先选择优惠类别'); return true; }
      if (d.firstDepositBonus.deposited) { if (typeof toast === 'function') toast('首存优惠不得重复领取。'); return true; }
      openConfirm('fd', d.firstDepositBonus.option, Number(name.split('-').pop()));
      return true;
    }
    if (/^dr-confirm-\d+$/.test(name)) {
      const d = D();
      const st = C().resolve('daily-reload', d);
      if (['logged-out', 'no-kyc', 'ineligible', 'conflict', 'expired'].includes(st.key)) {
        if (typeof toast === 'function') toast(st.reason || st.cta);
        return true;
      }
      if (!d.dailyReload.option) { if (typeof toast === 'function') toast('请先选择优惠类别'); return true; }
      if (d.dailyReload.deposited) { if (typeof toast === 'function') toast('不得将多笔充值合并领取同一笔彩金。'); return true; }
      openConfirm('dr', d.dailyReload.option, Number(name.split('-').pop()));
      return true;
    }

    /* Route primary CTA */
    if (name.indexOf('core-join-') === 0 || name.indexOf('core-choose-') === 0 || name.indexOf('core-deposit-') === 0 || name.indexOf('core-progress-') === 0) {
      const el = document.getElementById('need-action') || document.getElementById('task-progress');
      if (el && $('#app')) $('#app').scrollTop = Math.max(0, el.offsetTop - 8);
      return true;
    }
    if (name === 'core-claim-first-deposit-bonus' || name === 'fd-go-convert') { showConvert('fd'); return true; }
    if (name === 'core-claim-daily-reload' || name === 'dr-go-convert') { showConvert('dr'); return true; }
    if (name === 'fd-convert-confirm') { doConvert('fd'); return true; }
    if (name === 'dr-convert-confirm') { doConvert('dr'); return true; }

    /* Allow switching first-deposit option before deposit */
    if (name === 'fd-choose-slots' || name === 'fd-choose-live') {
      const d = D();
      const f = d.firstDepositBonus;
      const st = C().resolve('first-deposit-bonus', d);
      if (['logged-out', 'no-kyc', 'ineligible', 'conflict', 'expired'].includes(st.key)) {
        if (typeof toast === 'function') toast(st.reason || st.cta);
        return true;
      }
      if (f.deposited) { if (typeof toast === 'function') toast('成功完成演示充值后优惠已锁定，不能再改选。'); return true; }
      f.option = name === 'fd-choose-slots' ? 'slots' : 'live';
      store().save();
      if (typeof toast === 'function') toast('已选择「' + (f.option === 'slots' ? '老虎机 100%' : '真人 50%') + '」，充值前仍可切换。');
      C().refreshAll();
      return true;
    }
    if (name === 'dr-choose-live' || name === 'dr-choose-slots') {
      const d = D();
      const r = d.dailyReload;
      const st = C().resolve('daily-reload', d);
      if (['logged-out', 'no-kyc', 'ineligible', 'conflict', 'expired'].includes(st.key)) {
        if (typeof toast === 'function') toast(st.reason || st.cta);
        return true;
      }
      if (r.deposited && r.option && r.option !== (name === 'dr-choose-live' ? 'live' : 'slots')) {
        if (typeof toast === 'function') toast('同一笔充值只能选择一种再存优惠。');
        return true;
      }
      if (!r.deposited) {
        r.option = name === 'dr-choose-live' ? 'live' : 'slots';
        store().save();
        if (typeof toast === 'function') toast('已选择「' + (r.option === 'live' ? '真人' : '老虎机、捕鱼') + '」，本笔充值确认前可改选。');
        C().refreshAll();
        return true;
      }
    }

    if (/^fd-deposit-\d+$/.test(name)) {
      const d = D();
      if (!d.firstDepositBonus.option) return true;
      if (d.firstDepositBonus.deposited) { if (typeof toast === 'function') toast('首存优惠不得重复领取。'); return true; }
      afterDepositLockAndCredit('fd', Number(name.split('-').pop()));
      return true;
    }
    if (/^dr-deposit-\d+$/.test(name)) {
      const d = D();
      if (!d.dailyReload.option) return true;
      if (d.dailyReload.deposited) { if (typeof toast === 'function') toast('不得将多笔充值合并领取同一笔彩金。'); return true; }
      afterDepositLockAndCredit('dr', Number(name.split('-').pop()));
      return true;
    }

    return false;
  }

  /* List cards */
  window.renderPromoListCard = function (p) {
    const core = C();
    const d = store() ? D() : { member: core.defaultMember(), records: [], dailyWheel: {}, firstDepositBonus: {}, dailyReload: {} };
    if (store()) core.syncShared(d);
    const stateLine = store() ? (core.listRewardLine(p.id, d) || p.summary) : p.summary;
    const img = p.banner ? BANNER_IMG[p.banner] : null;
    return `<button class="promo-card trial-list-card" data-promo="${p.id}" aria-label="查看${core.esc(p.title)}详情">
      <div class="card-banner">${img ? `<img src="assets/${img}" alt="">` : ''}
        <div class="card-overlay"><span class="tag">${core.esc(p.tag || p.badge || '')}</span><strong>${core.esc(p.title)}</strong><span class="sub">${core.esc(p.id === 'daily-wheel' ? '单笔充值超过RM100可获1次抽奖，每日最多3次，最高赢取RM888' : (p.summary || ''))}</span></div>
      </div>
      <div class="card-footer"><div>
        <div class="card-title">${core.esc(p.title)}</div>
        <div class="card-type">${core.esc(p.id === 'daily-wheel' ? '单笔充值超过RM100可获1次抽奖，每日最多3次，最高赢取RM888' : (stateLine || p.summary))}</div>
        ${store() && stateLine && stateLine !== p.summary && p.id !== 'daily-wheel' ? `<span class="card-state">${core.esc(stateLine)}</span>` : ''}
      </div><span class="card-link">查看详情 ${icon('arrow')}</span></div>
    </button>`;
  };

  /* Override renderDetail and hook actions / extra routes */
  const _rd = window.renderDetail;
  window.renderDetail = function (p, tabIndex) {
    if (!p) return _rd && _rd(p, tabIndex);
    if (p.readOnly) return _rd(p, tabIndex);
    renderUnifiedDetail(p, tabIndex);
  };

  const _promoHandle = window.PromoHandleAction;
  window.PromoHandleAction = function (name, demo) {
    if (handleV2(name)) return true;
    if (_promoHandle && _promoHandle(name, demo)) return true;
    return false;
  };

  const _promoRender = window.PromoRenderDemo;
  window.PromoRenderDemo = function (screen, demo) {
    if (screen === 'compat') { C().renderCompatPage(); return true; }
    if (screen === 'pending') { C().renderPendingPage(); return true; }
    if (screen === 'fd-convert') { showConvert('fd'); return true; }
    if (screen === 'dr-convert') { showConvert('dr'); return true; }
    if (_promoRender) return _promoRender(screen, demo);
    return false;
  };

  /* Patch support / notifications / unused features */
  const _support = window.support || support;
  window.support = function () {
    if (typeof simpleModal === 'function') {
      simpleModal('联系客服', '<p>当前为演示，未连接真实功能</p><p class="subnote">活动资格与未展示细则，请通过正式平台客服咨询。</p>', 'chat');
    } else C().toastUnwired();
  };
  if (typeof support === 'function' && support !== window.support) {
    /* global function binding: reassign if possible */
    try { support = window.support; } catch (e) {}
  }

  /* Prefix hook: also catch core- in demo handleAction regex by wrapping handleDemoAction */
  const _hda = window.handleDemoAction;
  if (_hda) {
    window.handleDemoAction = function (name) {
      if (handleV2(name)) return;
      return _hda(name);
    };
  }

  if (window.DemoAPI && window.DemoCore) {
    const _save = window.DemoAPI.save;
    window.DemoAPI.save = function () {
      try { window.DemoCore.syncShared(window.DemoAPI.get && window.DemoAPI.get()); } catch (e) {}
      return _save();
    };
    try { window.DemoCore.syncShared(window.DemoAPI.load()); } catch (e) {}
  }
  /* Re-render once all overrides are in place. */
  if (typeof route === 'function') route();
})();

