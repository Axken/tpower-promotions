(()=>{
  const KEY='tpower-ui-language';
  const allowed=new Set(UI_LANGUAGES.map(x=>x[0]));
  let language='zh-CN';
  try{const saved=localStorage.getItem(KEY);if(allowed.has(saved))language=saved;}catch{}
  const originalText=new WeakMap(),originalAttrs=new WeakMap();
  const select=document.createElement('select');
  select.id='language-select';select.setAttribute('aria-label','Language / 语言');
  for(const [code,name] of UI_LANGUAGES){const option=document.createElement('option');option.value=code;option.textContent=name;option.lang=code;select.append(option);}
  select.value=language;
  const host=document.querySelector('.header-spacer');host.classList.add('language-control');host.append(select);
  const note=document.createElement('p');note.className='language-note';note.id='language-note';note.setAttribute('role','status');
  document.querySelector('#app').before(note);
  function translate(source){
    const key=source.trim(),dict=UI_DICTIONARIES[language];
    let translated=dict[key];
    if(translated===undefined&&language!=='zh-CN'){
      const count=key.match(/^(\d+) 项活动$/);
      if(count){const labels={'zh-TW':'項活動',en:'events',ms:'aktiviti',vi:'hoạt động',th:'กิจกรรม',id:'acara',hi:'कार्यक्रम'};translated=count[1]+' '+labels[language];}
      const friends=key.match(/^(\d+) 位好友$/);
      if(friends){const labels={'zh-TW':'位好友',en:'friends',ms:'rakan',vi:'bạn bè',th:'คน',id:'teman',hi:'मित्र'};translated=friends[1]+' '+labels[language];}
      const loginOk=key.match(/^上次登录：(\d+)天前（已满7天未上线）$/);
      if(loginOk){const labels={'zh-TW':`上次登錄：${loginOk[1]}天前（已滿7天未上線）`,en:`Last login: ${loginOk[1]} days ago (7-day offline requirement met)`,ms:`Log masuk terakhir: ${loginOk[1]} hari lalu (syarat 7 hari tidak atas talian dipenuhi)`,vi:`Lần đăng nhập trước: ${loginOk[1]} ngày trước (đã đủ 7 ngày không online)`,th:`เข้าสู่ระบบล่าสุด: ${loginOk[1]} วันที่แล้ว (ครบ 7 วันไม่ได้ออนไลน์)`,id:`Login terakhir: ${loginOk[1]} hari lalu (syarat 7 hari offline terpenuhi)`,hi:`अंतिम लॉगिन: ${loginOk[1]} दिन पहले (7 दिन ऑफ़लाइन पूरा)`};translated=labels[language];}
      const loginShort=key.match(/^上次登录：(\d+)天前（未满7天未上线，不符资格）$/);
      if(loginShort){const labels={'zh-TW':`上次登錄：${loginShort[1]}天前（未滿7天未上線，不符資格）`,en:`Last login: ${loginShort[1]} days ago (offline for less than 7 days, ineligible)`,ms:`Log masuk terakhir: ${loginShort[1]} hari lalu (kurang daripada 7 hari tidak atas talian, tidak layak)`,vi:`Lần đăng nhập trước: ${loginShort[1]} ngày trước (chưa đủ 7 ngày không online, không đủ điều kiện)`,th:`เข้าสู่ระบบล่าสุด: ${loginShort[1]} วันที่แล้ว (ไม่ครบ 7 วัน ไม่มีสิทธิ์)`,id:`Login terakhir: ${loginShort[1]} hari lalu (offline kurang dari 7 hari, tidak layak)`,hi:`अंतिम लॉगिन: ${loginShort[1]} दिन पहले (7 दिन से कम, अयोग्य)`};translated=labels[language];}
      const moreReload=key.match(/^可继续再存 · 已领取 (\d+) 笔$/);
      if(moreReload){const labels={'zh-TW':`可繼續再存 · 已領取 ${moreReload[1]} 筆`,en:`You can reload again · ${moreReload[1]} claimed`,ms:`Boleh reload lagi · ${moreReload[1]} dituntut`,vi:`Có thể nạp lại · đã nhận ${moreReload[1]} lần`,th:`ฝากซ้ำได้อีก · รับแล้ว ${moreReload[1]} รายการ`,id:`Bisa reload lagi · ${moreReload[1]} diklaim`,hi:`फिर रीलोड कर सकते हैं · ${moreReload[1]} दावे`};translated=labels[language];}
      const claimedReload=key.match(/^累计已领 (\d+) 笔。每日不限次数，同一演示日可继续再存。$/);
      if(claimedReload){const labels={'zh-TW':`累計已領 ${claimedReload[1]} 筆。每日不限次數，同一演示日可繼續再存。`,en:`${claimedReload[1]} claimed in total. Unlimited claims per day; you may reload again on the same demo day.`,ms:`Jumlah ${claimedReload[1]} dituntut. Tiada had tuntutan setiap hari; anda boleh reload lagi pada hari demo yang sama.`,vi:`Đã nhận tổng cộng ${claimedReload[1]} lần. Không giới hạn số lần mỗi ngày; có thể nạp lại trong cùng ngày demo.`,th:`รับไปแล้ว ${claimedReload[1]} รายการ ไม่จำกัดครั้งต่อวัน และฝากซ้ำในวันเดโมเดียวกันได้`,id:`Total ${claimedReload[1]} diklaim. Klaim harian tidak terbatas; Anda bisa reload lagi di hari demo yang sama.`,hi:`कुल ${claimedReload[1]} दावे। प्रतिदिन असीमित; उसी डेमो दिन फिर रीलोड करें।`};translated=labels[language];}
      const wheelCredit=key.match(/^单笔充值 RM(\d+) 已成功入账，获得1次免费抽奖机会$/);
      if(wheelCredit){const labels={'zh-TW':`單筆儲值 RM${wheelCredit[1]} 已成功入賬，獲得1次免費抽獎機會`,en:`Single deposit of RM${wheelCredit[1]} credited. You received 1 free spin.`,ms:`Deposit tunggal RM${wheelCredit[1]} telah dimasukkan. Anda mendapat 1 putaran percuma.`,vi:`Nạp đơn RM${wheelCredit[1]} đã vào tài khoản, nhận 1 lượt quay miễn phí.`,th:`ฝากครั้งเดียว RM${wheelCredit[1]} เข้าบัญชีแล้ว ได้รับสิทธิ์หมุนฟรี 1 ครั้ง`,id:`Deposit tunggal RM${wheelCredit[1]} berhasil masuk. Anda mendapat 1 putaran gratis.`,hi:`एकल जमा RM${wheelCredit[1]} जमा हुई। 1 मुफ्त स्पिन मिला।`};translated=labels[language];}
      const vipItems=key.match(/^可领取 · (\d+) 项$/);
      if(vipItems){const labels={'zh-TW':`可領取 · ${vipItems[1]} 項`,en:`${vipItems[1]} ready to claim`,ms:`${vipItems[1]} sedia dituntut`,vi:`${vipItems[1]} mục có thể nhận`,th:`รับได้ ${vipItems[1]} รายการ`,id:`${vipItems[1]} siap diklaim`,hi:`${vipItems[1]} दावे के लिए तैयार`};translated=labels[language];}
      const periodOn=key.match(/^第(\d+)期进行中$/);
      if(periodOn){const labels={'zh-TW':`第${periodOn[1]}期進行中`,en:`Period ${periodOn[1]} in progress`,ms:`Tempoh ${periodOn[1]} sedang berlangsung`,vi:`Kỳ ${periodOn[1]} đang diễn ra`,th:`งวดที่ ${periodOn[1]} กำลังดำเนินการ`,id:`Periode ${periodOn[1]} sedang berjalan`,hi:`अवधि ${periodOn[1]} चालू`};translated=labels[language];}
    }
    if(translated===undefined)return source;
    return source.slice(0,source.length-source.trimStart().length)+translated+source.slice(source.trimEnd().length);
  }
  function apply(){
    observer.disconnect();
    document.documentElement.lang=language;
    document.documentElement.dataset.uiLanguage=language;
    note.textContent=UI_NOTES[language];note.hidden=!UI_NOTES[language];
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    let node;
    while(node=walker.nextNode()){
      if(!node.parentElement||node.parentElement.closest('script,style,select,#language-note'))continue;
      let record=originalText.get(node);
      if(!record||node.nodeValue!==record.last)record={source:node.nodeValue,last:node.nodeValue};
      const result=translate(record.source);
      if(node.nodeValue!==result)node.nodeValue=result;
      record.last=result;originalText.set(node,record);
    }
    document.querySelectorAll('[aria-label],[placeholder],[title]').forEach(el=>{
      if(el===select||el.closest('select'))return;
      let record=originalAttrs.get(el)||{};
      for(const attr of ['aria-label','placeholder','title']){
        if(!el.hasAttribute(attr))continue;
        const value=el.getAttribute(attr);let entry=record[attr];
        if(!entry||value!==entry.last)entry={source:value,last:value};
        const translated=translate(entry.source);if(value!==translated)el.setAttribute(attr,translated);
        entry.last=translated;record[attr]=entry;
      }
      originalAttrs.set(el,record);
    });
    // Source prose is explicitly distinguished from translated interface labels.
    document.querySelectorAll('.rule-content,.step-explanation p,.detail-heading h2,.detail-heading>p,.card-title,.card-type,.banner,.trial-prose,.eligibility-list,.trial-terms,.demo-lead').forEach(el=>el.lang='zh-CN');
    if(!location.hash.includes('activity='))document.title='TPOWER · '+UI_DICTIONARIES[language]['促销活动'];
    observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','placeholder','title']});
  }
  const observer=new MutationObserver(apply);
  select.addEventListener('change',()=>{language=allowed.has(select.value)?select.value:'zh-CN';try{localStorage.setItem(KEY,language)}catch{}apply();});
  apply();
})();
