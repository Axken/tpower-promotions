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
      const stepProg=key.match(/^第 (\d+) 步，共 (\d+) 步$/);
      if(stepProg){const labels={'zh-TW':`第 ${stepProg[1]} 步，共 ${stepProg[2]} 步`,en:`Step ${stepProg[1]} of ${stepProg[2]}`,ms:`Langkah ${stepProg[1]} daripada ${stepProg[2]}`,vi:`Bước ${stepProg[1]} / ${stepProg[2]}`,th:`ขั้นตอนที่ ${stepProg[1]} จาก ${stepProg[2]}`,id:`Langkah ${stepProg[1]} dari ${stepProg[2]}`,hi:`चरण ${stepProg[1]} / ${stepProg[2]}`};translated=labels[language];}
      const stepAll=key.match(/^共 (\d+) 步$/);
      if(stepAll){const labels={'zh-TW':`共 ${stepAll[1]} 步`,en:`${stepAll[1]} steps in total`,ms:`Jumlah ${stepAll[1]} langkah`,vi:`Tổng ${stepAll[1]} bước`,th:`ทั้งหมด ${stepAll[1]} ขั้นตอน`,id:`Total ${stepAll[1]} langkah`,hi:`कुल ${stepAll[1]} चरण`};translated=labels[language];}
      const nfcLeft=key.match(/^去指定游戏试玩。还差 RM (.+) 即可兑换。$/);
      if(nfcLeft){const labels={'zh-TW':`去指定遊戲試玩。還差 RM ${nfcLeft[1]} 即可兌換。`,en:`Play the designated games. RM ${nfcLeft[1]} more to redeem.`,ms:`Main permainan yang ditetapkan. Tinggal RM ${nfcLeft[1]} lagi untuk menebus.`,vi:`Vào game chỉ định để chơi thử. Còn thiếu RM ${nfcLeft[1]} là đổi được.`,th:`ไปเล่นเกมที่กำหนด อีก RM ${nfcLeft[1]} จะแลกได้`,id:`Main game yang ditentukan. Tinggal RM ${nfcLeft[1]} lagi untuk menebus.`,hi:`निर्धारित गेम खेलें। रिडीम करने के लिए RM ${nfcLeft[1]} और चाहिए।`};translated=labels[language];}
      const dwTurn=key.match(/^在指定游戏商投注。还差 RM (.+) 有效流水即可兑换。$/);
      if(dwTurn){const labels={'zh-TW':`在指定遊戲商投注。還差 RM ${dwTurn[1]} 有效流水即可兌換。`,en:`Bet with the designated providers. RM ${dwTurn[1]} more valid turnover to convert.`,ms:`Pertaruhan dengan penyedia yang ditetapkan. Tinggal RM ${dwTurn[1]} pusing ganti sah lagi untuk menukar.`,vi:`Cược tại nhà game chỉ định. Còn thiếu RM ${dwTurn[1]} doanh thu hợp lệ là đổi được.`,th:`เดิมพันกับผู้ให้บริการที่กำหนด อีก RM ${dwTurn[1]} เทิร์นที่ถูกต้องจะแปลงได้`,id:`Bertaruh di provider yang ditentukan. Tinggal RM ${dwTurn[1]} turnover valid lagi untuk konversi.`,hi:`निर्धारित प्रदाताओं पर दांव लगाएँ। बदलने के लिए RM ${dwTurn[1]} और मान्य टर्नओवर चाहिए।`};translated=labels[language];}
      const dwSpin=key.match(/^还有 (\d+) 次抽奖，去转动转盘。$/);
      if(dwSpin){const labels={'zh-TW':`還有 ${dwSpin[1]} 次抽獎，去轉動轉盤。`,en:`${dwSpin[1]} spin(s) left. Go spin the wheel.`,ms:`Tinggal ${dwSpin[1]} putaran. Pergi putar roda.`,vi:`Còn ${dwSpin[1]} lượt quay, hãy quay vòng.`,th:`เหลือสิทธิ์หมุน ${dwSpin[1]} ครั้ง ไปหมุนวงล้อได้`,id:`Tersisa ${dwSpin[1]} putaran. Putar rodanya.`,hi:`${dwSpin[1]} स्पिन बची हैं। पहिया घुमाएँ।`};translated=labels[language];}
      const grAmt=key.match(/^有 MYR (.+) 可领取，点下方按钮领到现金钱包。$/);
      if(grAmt){const labels={'zh-TW':`有 MYR ${grAmt[1]} 可領取，點下方按鈕領到現金錢包。`,en:`MYR ${grAmt[1]} is ready. Tap the button below to claim it into your cash wallet.`,ms:`MYR ${grAmt[1]} sedia dituntut. Ketik butang di bawah untuk menuntut ke dompet tunai anda.`,vi:`Có MYR ${grAmt[1]} có thể nhận, nhấn nút bên dưới để nhận vào ví tiền mặt.`,th:`มี MYR ${grAmt[1]} ให้รับ แตะปุ่มด้านล่างเพื่อรับเข้ากระเป๋าเงินสด`,id:`Ada MYR ${grAmt[1]} siap diklaim. Ketuk tombol di bawah untuk klaim ke dompet tunai Anda.`,hi:`MYR ${grAmt[1]} तैयार है। नीचे बटन टैप कर कैश वॉलेट में दावा करें।`};translated=labels[language];}
      const anTk=key.match(/^已有 (\d+) 张抽奖券。演示中可预览开奖兑奖。$/);
      if(anTk){const labels={'zh-TW':`已有 ${anTk[1]} 張抽獎券。演示中可預覽開獎兌獎。`,en:`You have ${anTk[1]} ticket(s). In the demo you can preview the draw.`,ms:`Anda mempunyai ${anTk[1]} tiket. Dalam demo anda boleh pratonton cabutan.`,vi:`Đã có ${anTk[1]} vé quay thưởng. Trong bản demo có thể xem trước kết quả.`,th:`มีคูปองจับรางวัล ${anTk[1]} ใบ ในเดโมดูตัวอย่างการออกรางวัลได้`,id:`Anda punya ${anTk[1]} tiket. Di demo Anda bisa pratinjau undian.`,hi:`आपके पास ${anTk[1]} टिकट हैं। डेमो में ड्रॉ का पूर्वावलोकन कर सकते हैं।`};translated=labels[language];}
      const mtLeft=key.match(/^去指定游戏使用活动分。还差 (.+) 分即可领取。$/);
      if(mtLeft){const labels={'zh-TW':`去指定遊戲使用活動分。還差 ${mtLeft[1]} 分即可領取。`,en:`Use promo points in the designated games. ${mtLeft[1]} points more to claim.`,ms:`Gunakan mata promosi dalam permainan yang ditetapkan. Tinggal ${mtLeft[1]} mata lagi untuk menuntut.`,vi:`Vào game chỉ định dùng điểm hoạt động. Còn thiếu ${mtLeft[1]} điểm là nhận được.`,th:`ไปใช้คะแนนกิจกรรมในเกมที่กำหนด อีก ${mtLeft[1]} คะแนนจะรับได้`,id:`Pakai poin promo di game yang ditentukan. Tinggal ${mtLeft[1]} poin lagi untuk klaim.`,hi:`निर्धारित गेम में प्रोमो अंक इस्तेमाल करें। दावा करने के लिए ${mtLeft[1]} अंक और चाहिए।`};translated=labels[language];}
      const fdLeft=key.match(/^在所选游戏类别投注。还差 RM (.+) 有效流水即可转换。$/);
      if(fdLeft){const labels={'zh-TW':`在所選遊戲類別投注。還差 RM ${fdLeft[1]} 有效流水即可轉換。`,en:`Bet in the selected game category. RM ${fdLeft[1]} more valid turnover to convert.`,ms:`Pertaruhan dalam kategori permainan yang dipilih. Tinggal RM ${fdLeft[1]} pusing ganti sah lagi untuk menukar.`,vi:`Cược trong danh mục game đã chọn. Còn thiếu RM ${fdLeft[1]} doanh thu hợp lệ là chuyển được.`,th:`เดิมพันในหมวดเกมที่เลือก อีก RM ${fdLeft[1]} เทิร์นที่ถูกต้องจะแปลงได้`,id:`Bertaruh di kategori game yang dipilih. Tinggal RM ${fdLeft[1]} turnover valid lagi untuk konversi.`,hi:`चुनी गई गेम श्रेणी में दांव लगाएँ। बदलने के लिए RM ${fdLeft[1]} और मान्य टर्नओवर चाहिए।`};translated=labels[language];}
      const grClaim=key.match(/^领取 MYR (.+)$/);
      if(grClaim){const labels={'zh-TW':`領取 MYR ${grClaim[1]}`,en:`Claim MYR ${grClaim[1]}`,ms:`Tuntut MYR ${grClaim[1]}`,vi:`Nhận MYR ${grClaim[1]}`,th:`รับ MYR ${grClaim[1]}`,id:`Klaim MYR ${grClaim[1]}`,hi:`MYR ${grClaim[1]} दावा करें`};translated=labels[language];}
      const anClaim=key.match(/^领取 RM (.+) 奖金$/);
      if(anClaim){const labels={'zh-TW':`領取 RM ${anClaim[1]} 獎金`,en:`Claim RM ${anClaim[1]} prize`,ms:`Tuntut hadiah RM ${anClaim[1]}`,vi:`Nhận thưởng RM ${anClaim[1]}`,th:`รับรางวัล RM ${anClaim[1]}`,id:`Klaim hadiah RM ${anClaim[1]}`,hi:`RM ${anClaim[1]} पुरस्कार दावा करें`};translated=labels[language];}

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
