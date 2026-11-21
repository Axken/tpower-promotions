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
      const wheelCredit=key.match(/^单笔充值 MYR(\d+) 已成功入账，获得1次免费抽奖机会$/);
      if(wheelCredit){const labels={'zh-TW':`單筆儲值 MYR${wheelCredit[1]} 已成功入賬，獲得1次免費抽獎機會`,en:`Single deposit of MYR${wheelCredit[1]} credited. You received 1 free spin.`,ms:`Deposit tunggal MYR${wheelCredit[1]} telah dimasukkan. Anda mendapat 1 putaran percuma.`,vi:`Nạp đơn MYR${wheelCredit[1]} đã vào tài khoản, nhận 1 lượt quay miễn phí.`,th:`ฝากครั้งเดียว MYR${wheelCredit[1]} เข้าบัญชีแล้ว ได้รับสิทธิ์หมุนฟรี 1 ครั้ง`,id:`Deposit tunggal MYR${wheelCredit[1]} berhasil masuk. Anda mendapat 1 putaran gratis.`,hi:`एकल जमा MYR${wheelCredit[1]} जमा हुई। 1 मुफ्त स्पिन मिला।`};translated=labels[language];}
      const vipItems=key.match(/^可领取 · (\d+) 项$/);
      if(vipItems){const labels={'zh-TW':`可領取 · ${vipItems[1]} 項`,en:`${vipItems[1]} ready to claim`,ms:`${vipItems[1]} sedia dituntut`,vi:`${vipItems[1]} mục có thể nhận`,th:`รับได้ ${vipItems[1]} รายการ`,id:`${vipItems[1]} siap diklaim`,hi:`${vipItems[1]} दावे के लिए तैयार`};translated=labels[language];}
      const periodOn=key.match(/^第(\d+)期进行中$/);
      if(periodOn){const labels={'zh-TW':`第${periodOn[1]}期進行中`,en:`Period ${periodOn[1]} in progress`,ms:`Tempoh ${periodOn[1]} sedang berlangsung`,vi:`Kỳ ${periodOn[1]} đang diễn ra`,th:`งวดที่ ${periodOn[1]} กำลังดำเนินการ`,id:`Periode ${periodOn[1]} sedang berjalan`,hi:`अवधि ${periodOn[1]} चालू`};translated=labels[language];}
      const stepProg=key.match(/^第 (\d+) 步，共 (\d+) 步$/);
      if(stepProg){const labels={'zh-TW':`第 ${stepProg[1]} 步，共 ${stepProg[2]} 步`,en:`Step ${stepProg[1]} of ${stepProg[2]}`,ms:`Langkah ${stepProg[1]} daripada ${stepProg[2]}`,vi:`Bước ${stepProg[1]} / ${stepProg[2]}`,th:`ขั้นตอนที่ ${stepProg[1]} จาก ${stepProg[2]}`,id:`Langkah ${stepProg[1]} dari ${stepProg[2]}`,hi:`चरण ${stepProg[1]} / ${stepProg[2]}`};translated=labels[language];}
      const stepAll=key.match(/^共 (\d+) 步$/);
      if(stepAll){const labels={'zh-TW':`共 ${stepAll[1]} 步`,en:`${stepAll[1]} steps in total`,ms:`Jumlah ${stepAll[1]} langkah`,vi:`Tổng ${stepAll[1]} bước`,th:`ทั้งหมด ${stepAll[1]} ขั้นตอน`,id:`Total ${stepAll[1]} langkah`,hi:`कुल ${stepAll[1]} चरण`};translated=labels[language];}
      const nfcLeft=key.match(/^去指定游戏试玩。还差 MYR (.+) 即可兑换。$/);
      if(nfcLeft){const labels={'zh-TW':`去指定遊戲試玩。還差 MYR ${nfcLeft[1]} 即可兌換。`,en:`Play the designated games. MYR ${nfcLeft[1]} more to redeem.`,ms:`Main permainan yang ditetapkan. Tinggal MYR ${nfcLeft[1]} lagi untuk menebus.`,vi:`Vào game chỉ định để chơi thử. Còn thiếu MYR ${nfcLeft[1]} là đổi được.`,th:`ไปเล่นเกมที่กำหนด อีก MYR ${nfcLeft[1]} จะแลกได้`,id:`Main game yang ditentukan. Tinggal MYR ${nfcLeft[1]} lagi untuk menebus.`,hi:`निर्धारित गेम खेलें। रिडीम करने के लिए MYR ${nfcLeft[1]} और चाहिए।`};translated=labels[language];}
      const dwTurn=key.match(/^在指定游戏商投注。还差 MYR (.+) 有效流水即可兑换。$/);
      if(dwTurn){const labels={'zh-TW':`在指定遊戲商投注。還差 MYR ${dwTurn[1]} 有效流水即可兌換。`,en:`Bet with the designated providers. MYR ${dwTurn[1]} more valid turnover to convert.`,ms:`Pertaruhan dengan penyedia yang ditetapkan. Tinggal MYR ${dwTurn[1]} pusing ganti sah lagi untuk menukar.`,vi:`Cược tại nhà game chỉ định. Còn thiếu MYR ${dwTurn[1]} doanh thu hợp lệ là đổi được.`,th:`เดิมพันกับผู้ให้บริการที่กำหนด อีก MYR ${dwTurn[1]} เทิร์นที่ถูกต้องจะแปลงได้`,id:`Bertaruh di provider yang ditentukan. Tinggal MYR ${dwTurn[1]} turnover valid lagi untuk konversi.`,hi:`निर्धारित प्रदाताओं पर दांव लगाएँ। बदलने के लिए MYR ${dwTurn[1]} और मान्य टर्नओवर चाहिए।`};translated=labels[language];}
      const dwSpin=key.match(/^还有 (\d+) 次抽奖，去转动转盘。$/);
      if(dwSpin){const labels={'zh-TW':`還有 ${dwSpin[1]} 次抽獎，去轉動轉盤。`,en:`${dwSpin[1]} spin(s) left. Go spin the wheel.`,ms:`Tinggal ${dwSpin[1]} putaran. Pergi putar roda.`,vi:`Còn ${dwSpin[1]} lượt quay, hãy quay vòng.`,th:`เหลือสิทธิ์หมุน ${dwSpin[1]} ครั้ง ไปหมุนวงล้อได้`,id:`Tersisa ${dwSpin[1]} putaran. Putar rodanya.`,hi:`${dwSpin[1]} स्पिन बची हैं। पहिया घुमाएँ।`};translated=labels[language];}
      const grAmt=key.match(/^有 MYR (.+) 可领取，点下方按钮领到现金钱包。$/);
      if(grAmt){const labels={'zh-TW':`有 MYR ${grAmt[1]} 可領取，點下方按鈕領到現金錢包。`,en:`MYR ${grAmt[1]} is ready. Tap the button below to claim it into your cash wallet.`,ms:`MYR ${grAmt[1]} sedia dituntut. Ketik butang di bawah untuk menuntut ke dompet tunai anda.`,vi:`Có MYR ${grAmt[1]} có thể nhận, nhấn nút bên dưới để nhận vào ví tiền mặt.`,th:`มี MYR ${grAmt[1]} ให้รับ แตะปุ่มด้านล่างเพื่อรับเข้ากระเป๋าเงินสด`,id:`Ada MYR ${grAmt[1]} siap diklaim. Ketuk tombol di bawah untuk klaim ke dompet tunai Anda.`,hi:`MYR ${grAmt[1]} तैयार है। नीचे बटन टैप कर कैश वॉलेट में दावा करें।`};translated=labels[language];}
      const anTk=key.match(/^已有 (\d+) 张抽奖券。演示中可预览开奖兑奖。$/);
      if(anTk){const labels={'zh-TW':`已有 ${anTk[1]} 張抽獎券。演示中可預覽開獎兌獎。`,en:`You have ${anTk[1]} ticket(s). In the demo you can preview the draw.`,ms:`Anda mempunyai ${anTk[1]} tiket. Dalam demo anda boleh pratonton cabutan.`,vi:`Đã có ${anTk[1]} vé quay thưởng. Trong bản demo có thể xem trước kết quả.`,th:`มีคูปองจับรางวัล ${anTk[1]} ใบ ในเดโมดูตัวอย่างการออกรางวัลได้`,id:`Anda punya ${anTk[1]} tiket. Di demo Anda bisa pratinjau undian.`,hi:`आपके पास ${anTk[1]} टिकट हैं। डेमो में ड्रॉ का पूर्वावलोकन कर सकते हैं।`};translated=labels[language];}
      const mtLeft=key.match(/^去指定游戏使用活动分。还差 (.+) 分即可领取。$/);
      if(mtLeft){const labels={'zh-TW':`去指定遊戲使用活動分。還差 ${mtLeft[1]} 分即可領取。`,en:`Use promo points in the designated games. ${mtLeft[1]} points more to claim.`,ms:`Gunakan mata promosi dalam permainan yang ditetapkan. Tinggal ${mtLeft[1]} mata lagi untuk menuntut.`,vi:`Vào game chỉ định dùng điểm hoạt động. Còn thiếu ${mtLeft[1]} điểm là nhận được.`,th:`ไปใช้คะแนนกิจกรรมในเกมที่กำหนด อีก ${mtLeft[1]} คะแนนจะรับได้`,id:`Pakai poin promo di game yang ditentukan. Tinggal ${mtLeft[1]} poin lagi untuk klaim.`,hi:`निर्धारित गेम में प्रोमो अंक इस्तेमाल करें। दावा करने के लिए ${mtLeft[1]} अंक और चाहिए।`};translated=labels[language];}
      const fdLeft=key.match(/^在所选游戏类别投注。还差 MYR (.+) 有效流水即可转换。$/);
      if(fdLeft){const labels={'zh-TW':`在所選遊戲類別投注。還差 MYR ${fdLeft[1]} 有效流水即可轉換。`,en:`Bet in the selected game category. MYR ${fdLeft[1]} more valid turnover to convert.`,ms:`Pertaruhan dalam kategori permainan yang dipilih. Tinggal MYR ${fdLeft[1]} pusing ganti sah lagi untuk menukar.`,vi:`Cược trong danh mục game đã chọn. Còn thiếu MYR ${fdLeft[1]} doanh thu hợp lệ là chuyển được.`,th:`เดิมพันในหมวดเกมที่เลือก อีก MYR ${fdLeft[1]} เทิร์นที่ถูกต้องจะแปลงได้`,id:`Bertaruh di kategori game yang dipilih. Tinggal MYR ${fdLeft[1]} turnover valid lagi untuk konversi.`,hi:`चुनी गई गेम श्रेणी में दांव लगाएँ। बदलने के लिए MYR ${fdLeft[1]} और मान्य टर्नओवर चाहिए।`};translated=labels[language];}
      const grClaim=key.match(/^领取 MYR (.+)$/);
      if(grClaim){const labels={'zh-TW':`領取 MYR ${grClaim[1]}`,en:`Claim MYR ${grClaim[1]}`,ms:`Tuntut MYR ${grClaim[1]}`,vi:`Nhận MYR ${grClaim[1]}`,th:`รับ MYR ${grClaim[1]}`,id:`Klaim MYR ${grClaim[1]}`,hi:`MYR ${grClaim[1]} दावा करें`};translated=labels[language];}
      const anClaim=key.match(/^领取 MYR (.+) 奖金$/);
      if(anClaim){const labels={'zh-TW':`領取 MYR ${anClaim[1]} 獎金`,en:`Claim MYR ${anClaim[1]} prize`,ms:`Tuntut hadiah MYR ${anClaim[1]}`,vi:`Nhận thưởng MYR ${anClaim[1]}`,th:`รับรางวัล MYR ${anClaim[1]}`,id:`Klaim hadiah MYR ${anClaim[1]}`,hi:`MYR ${anClaim[1]} पुरस्कार दावा करें`};translated=labels[language];}

      const people=key.match(/^(\d+) 位$/);
      if(people){const labels={'zh-TW':'位',en:'people',ms:'orang',vi:'người',th:'คน',id:'orang',hi:'जन'};translated=people[1]+' '+labels[language];}
      const tickets=key.match(/^(\d+) 张 · 每满 MYR200 得1张$/);
      if(tickets){const labels={'zh-TW':`${tickets[1]} 張 · 每滿 MYR200 得1張`,en:`${tickets[1]} tickets · 1 ticket per MYR200`,ms:`${tickets[1]} tiket · 1 tiket setiap MYR200`,vi:`${tickets[1]} vé · 1 vé mỗi MYR200`,th:`${tickets[1]} ใบ · ทุก MYR200 ได้ 1 ใบ`,id:`${tickets[1]} tiket · 1 tiket per MYR200`,hi:`${tickets[1]} टिकट · प्रत्येक MYR200 पर 1 टिकट`};translated=labels[language];}
      const ticketsGot=key.match(/^已获抽奖券(\d+) 张 · 每满 MYR200 得1张$/);
      if(ticketsGot){const labels={'zh-TW':`已獲抽獎券${ticketsGot[1]} 張 · 每滿 MYR200 得1張`,en:`Tickets earned: ${ticketsGot[1]} · 1 ticket per MYR200`,ms:`Tiket diperoleh: ${ticketsGot[1]} · 1 tiket setiap MYR200`,vi:`Vé đã có: ${ticketsGot[1]} · 1 vé mỗi MYR200`,th:`ได้ตั๋วแล้ว ${ticketsGot[1]} ใบ · ทุก MYR200 ได้ 1 ใบ`,id:`Tiket didapat: ${ticketsGot[1]} · 1 tiket per MYR200`,hi:`टिकट मिले: ${ticketsGot[1]} · प्रत्येक MYR200 पर 1`};translated=labels[language];}
      const pct=key.match(/^(\d+(?:\.\d+)?)%已解锁$/);
      if(pct){const labels={'zh-TW':`${pct[1]}%已解鎖`,en:`${pct[1]}% unlocked`,ms:`${pct[1]}% dinyahkunci`,vi:`Đã mở ${pct[1]}%`,th:`ปลดล็อกแล้ว ${pct[1]}%`,id:`${pct[1]}% terbuka`,hi:`${pct[1]}% अनलॉक`};translated=labels[language];}
      const todayWheel=key.match(/^今日 (\d+)\/3 · 剩余 (\d+) · 彩金 MYR (.+)$/);
      if(todayWheel){const labels={'zh-TW':`今日 ${todayWheel[1]}/3 · 剩餘 ${todayWheel[2]} · 彩金 MYR ${todayWheel[3]}`,en:`Today ${todayWheel[1]}/3 · ${todayWheel[2]} left · Bonus MYR ${todayWheel[3]}`,ms:`Hari ini ${todayWheel[1]}/3 · tinggal ${todayWheel[2]} · Bonus MYR ${todayWheel[3]}`,vi:`Hôm nay ${todayWheel[1]}/3 · còn ${todayWheel[2]} · Thưởng MYR ${todayWheel[3]}`,th:`วันนี้ ${todayWheel[1]}/3 · เหลือ ${todayWheel[2]} · โบนัส MYR ${todayWheel[3]}`,id:`Hari ini ${todayWheel[1]}/3 · sisa ${todayWheel[2]} · Bonus MYR ${todayWheel[3]}`,hi:`आज ${todayWheel[1]}/3 · ${todayWheel[2]} शेष · बोनस MYR ${todayWheel[3]}`};translated=labels[language];}
      const remainSpin=key.match(/^剩余抽奖(\d+)\s*\/\s*3$/);
      if(remainSpin){const labels={'zh-TW':`剩餘抽獎${remainSpin[1]} / 3`,en:`Spins left ${remainSpin[1]} / 3`,ms:`Putaran tinggal ${remainSpin[1]} / 3`,vi:`Lượt còn ${remainSpin[1]} / 3`,th:`สิทธิ์เหลือ ${remainSpin[1]} / 3`,id:`Spin tersisa ${remainSpin[1]} / 3`,hi:`स्पिन शेष ${remainSpin[1]} / 3`};translated=labels[language];}
      const canSpin=key.match(/^可抽奖 · 剩余 (\d+) 次$/);
      if(canSpin){const labels={'zh-TW':`可抽獎 · 剩餘 ${canSpin[1]} 次`,en:`Ready to spin · ${canSpin[1]} left`,ms:`Boleh putar · tinggal ${canSpin[1]}`,vi:`Có thể quay · còn ${canSpin[1]} lượt`,th:`หมุนได้ · เหลือ ${canSpin[1]} ครั้ง`,id:`Bisa putar · sisa ${canSpin[1]}`,hi:`स्पिन कर सकते हैं · ${canSpin[1]} शेष`};translated=labels[language];}
      const rewardSpin=key.match(/^活动奖励可抽奖 · 剩余 (\d+) 次$/);
      if(rewardSpin){const labels={'zh-TW':`活動獎勵可抽獎 · 剩餘 ${rewardSpin[1]} 次`,en:`Reward ready to spin · ${rewardSpin[1]} left`,ms:`Ganjaran sedia diputar · tinggal ${rewardSpin[1]}`,vi:`Thưởng có thể quay · còn ${rewardSpin[1]} lượt`,th:`รางวัลพร้อมหมุน · เหลือ ${rewardSpin[1]} ครั้ง`,id:`Hadiah siap diputar · sisa ${rewardSpin[1]}`,hi:`इनाम स्पिन के लिए तैयार · ${rewardSpin[1]} शेष`};translated=labels[language];}
      const demoDay=key.match(/^第 (\d+) 个演示日(.*)$/);
      if(demoDay){
        const tail=demoDay[2];
        const tailKey=tail.replace(/^[。.\s]+/,'');
        const punct=/^[。.]/.test(tail)?(language==='zh-TW'?'。':'. '):'';
        const tailTr=dict[tailKey]!==undefined?dict[tailKey]:(dict[tail]!==undefined?dict[tail]:tailKey);
        const labels={'zh-TW':`第 ${demoDay[1]} 個演示日${tail.replace('个','個')}`,en:`Demo day ${demoDay[1]}${punct}${tailTr}`,ms:`Hari demo ${demoDay[1]}${punct}${tailTr}`,vi:`Ngày demo ${demoDay[1]}${punct}${tailTr}`,th:`วันที่เดโม ${demoDay[1]}${punct}${tailTr}`,id:`Hari demo ${demoDay[1]}${punct}${tailTr}`,hi:`डेमो दिन ${demoDay[1]}${punct}${tailTr}`};
        translated=labels[language];
      }
      const rewardDay=key.match(/^活动奖励 · 第 (\d+) 个演示日(.*)$/);
      if(rewardDay){
        const tail=rewardDay[2];
        const tailTr=tail?(dict[tail]!==undefined?dict[tail]:tail):'';
        const labels={'zh-TW':`活動獎勵 · 第 ${rewardDay[1]} 個演示日${tail}`,en:`Rewards · demo day ${rewardDay[1]}${tailTr?' '+tailTr:''}`,ms:`Ganjaran · hari demo ${rewardDay[1]}${tailTr?' '+tailTr:''}`,vi:`Thưởng · ngày demo ${rewardDay[1]}${tailTr?' '+tailTr:''}`,th:`รางวัล · วันที่เดโม ${rewardDay[1]}${tailTr?' '+tailTr:''}`,id:`Hadiah · hari demo ${rewardDay[1]}${tailTr?' '+tailTr:''}`,hi:`इनाम · डेमो दिन ${rewardDay[1]}${tailTr?' '+tailTr:''}`};
        translated=labels[language];
      }
      const viewDetail=key.match(/^查看(.+)详情$/);
      if(viewDetail){
        const title=dict[viewDetail[1]]!==undefined?dict[viewDetail[1]]:viewDetail[1];
        const labels={'zh-TW':`查看${title}詳情`,en:`View ${title} details`,ms:`Lihat butiran ${title}`,vi:`Xem chi tiết ${title}`,th:`ดูรายละเอียด ${title}`,id:`Lihat detail ${title}`,hi:`${title} विवरण देखें`};
        translated=labels[language];
      }
      const viewRules=key.match(/^查看(.+)规则说明$/);
      if(viewRules){
        const title=dict[viewRules[1]]!==undefined?dict[viewRules[1]]:viewRules[1];
        const labels={'zh-TW':`查看${title}規則說明`,en:`View ${title} rules`,ms:`Lihat peraturan ${title}`,vi:`Xem thể lệ ${title}`,th:`ดูกติกา ${title}`,id:`Lihat aturan ${title}`,hi:`${title} नियम देखें`};
        translated=labels[language];
      }
      const arrived=key.match(/^已到账至 (.+)$/);
      if(arrived){
        const dest=dict[arrived[1]]!==undefined?dict[arrived[1]]:arrived[1];
        const labels={'zh-TW':`已到賬至 ${dest}`,en:`Credited to ${dest}`,ms:`Telah masuk ke ${dest}`,vi:`Đã vào ${dest}`,th:`เข้าสู่ ${dest} แล้ว`,id:`Sudah masuk ke ${dest}`,hi:`${dest} में जमा हो गया`};
        translated=labels[language];
      }
      const unlockedMyr=key.match(/^已解锁 MYR (.+)$/);
      if(unlockedMyr){const labels={'zh-TW':`已解鎖 MYR ${unlockedMyr[1]}`,en:`Unlocked MYR ${unlockedMyr[1]}`,ms:`Dinyahkunci MYR ${unlockedMyr[1]}`,vi:`Đã mở khóa MYR ${unlockedMyr[1]}`,th:`ปลดล็อกแล้ว MYR ${unlockedMyr[1]}`,id:`Terbuka MYR ${unlockedMyr[1]}`,hi:`अनलॉक MYR ${unlockedMyr[1]}`};translated=labels[language];}
      const growthAmt=key.match(/^成长彩金 MYR (.+)$/);
      if(growthAmt){const labels={'zh-TW':`成長彩金 MYR ${growthAmt[1]}`,en:`Growth bonus MYR ${growthAmt[1]}`,ms:`Bonus pertumbuhan MYR ${growthAmt[1]}`,vi:`Thưởng tăng trưởng MYR ${growthAmt[1]}`,th:`โบนัสเติบโต MYR ${growthAmt[1]}`,id:`Bonus pertumbuhan MYR ${growthAmt[1]}`,hi:`ग्रोथ बोनस MYR ${growthAmt[1]}`};translated=labels[language];}
      const pendingUnlock=key.match(/^待解锁([0-9,\.]+)$/);
      if(pendingUnlock){const labels={'zh-TW':`待解鎖${pendingUnlock[1]}`,en:`To unlock ${pendingUnlock[1]}`,ms:`Belum dinyahkunci ${pendingUnlock[1]}`,vi:`Chờ mở ${pendingUnlock[1]}`,th:`รอปลดล็อก ${pendingUnlock[1]}`,id:`Menunggu buka ${pendingUnlock[1]}`,hi:`अनलॉक बाकी ${pendingUnlock[1]}`};translated=labels[language];}
      const pendingClaim=key.match(/^待领取([0-9,\.]+)$/);
      if(pendingClaim){const labels={'zh-TW':`待領取${pendingClaim[1]}`,en:`To claim ${pendingClaim[1]}`,ms:`Belum dituntut ${pendingClaim[1]}`,vi:`Chờ nhận ${pendingClaim[1]}`,th:`รอรับ ${pendingClaim[1]}`,id:`Menunggu klaim ${pendingClaim[1]}`,hi:`दावा बाकी ${pendingClaim[1]}`};translated=labels[language];}
      const doneSteps=key.match(/^已完成 (\d+) \/ (\d+)$/);
      if(doneSteps){const labels={'zh-TW':`已完成 ${doneSteps[1]} / ${doneSteps[2]}`,en:`Completed ${doneSteps[1]} / ${doneSteps[2]}`,ms:`Selesai ${doneSteps[1]} / ${doneSteps[2]}`,vi:`Đã xong ${doneSteps[1]} / ${doneSteps[2]}`,th:`เสร็จแล้ว ${doneSteps[1]} / ${doneSteps[2]}`,id:`Selesai ${doneSteps[1]} / ${doneSteps[2]}`,hi:`पूरा ${doneSteps[1]} / ${doneSteps[2]}`};translated=labels[language];}
      const invited=key.match(/^已邀请好友(\d+) 位$/);
      if(invited){const labels={'zh-TW':`已邀請好友${invited[1]} 位`,en:`Friends invited: ${invited[1]}`,ms:`Rakan dijemput: ${invited[1]}`,vi:`Bạn đã mời: ${invited[1]}`,th:`เพื่อนที่ชวนแล้ว: ${invited[1]}`,id:`Teman diundang: ${invited[1]}`,hi:`मित्र आमंत्रित: ${invited[1]}`};translated=labels[language];}
      const claimedAvail=key.match(/^已领取 MYR (.+) · 可领取 MYR (.+)$/);
      if(claimedAvail){const labels={'zh-TW':`已領取 MYR ${claimedAvail[1]} · 可領取 MYR ${claimedAvail[2]}`,en:`Claimed MYR ${claimedAvail[1]} · Available MYR ${claimedAvail[2]}`,ms:`Dituntut MYR ${claimedAvail[1]} · Boleh dituntut MYR ${claimedAvail[2]}`,vi:`Đã nhận MYR ${claimedAvail[1]} · Có thể nhận MYR ${claimedAvail[2]}`,th:`รับแล้ว MYR ${claimedAvail[1]} · พร้อมรับ MYR ${claimedAvail[2]}`,id:`Diklaim MYR ${claimedAvail[1]} · Bisa diklaim MYR ${claimedAvail[2]}`,hi:`दावा हुआ MYR ${claimedAvail[1]} · उपलब्ध MYR ${claimedAvail[2]}`};translated=labels[language];}
      const nextStep=key.match(/^下一步第 (\d+) 步，共 (\d+) 步(.*)$/);
      if(nextStep){
        const tail=nextStep[3];
        const tailTr=tail?(dict[tail]!==undefined?dict[tail]:tail):'';
        const labels={'zh-TW':`下一步第 ${nextStep[1]} 步，共 ${nextStep[2]} 步${tail}`,en:`Next: step ${nextStep[1]} of ${nextStep[2]}${tailTr?' · '+tailTr:''}`,ms:`Seterusnya: langkah ${nextStep[1]} daripada ${nextStep[2]}${tailTr?' · '+tailTr:''}`,vi:`Tiếp theo: bước ${nextStep[1]}/${nextStep[2]}${tailTr?' · '+tailTr:''}`,th:`ถัดไป: ขั้น ${nextStep[1]} จาก ${nextStep[2]}${tailTr?' · '+tailTr:''}`,id:`Berikutnya: langkah ${nextStep[1]} dari ${nextStep[2]}${tailTr?' · '+tailTr:''}`,hi:`अगला: चरण ${nextStep[1]}/${nextStep[2]}${tailTr?' · '+tailTr:''}`};
        translated=labels[language];
      }
      const walletPromo=key.match(/^活动彩金钱包MYR (.+)$/);
      if(walletPromo){const labels={'zh-TW':`活動彩金錢包MYR ${walletPromo[1]}`,en:`Promo bonus wallet MYR ${walletPromo[1]}`,ms:`Dompet bonus promosi MYR ${walletPromo[1]}`,vi:`Ví thưởng khuyến mãi MYR ${walletPromo[1]}`,th:`กระเป๋าโบนัสโปรโมชั่น MYR ${walletPromo[1]}`,id:`Dompet bonus promo MYR ${walletPromo[1]}`,hi:`प्रोमो बोनस वॉलेट MYR ${walletPromo[1]}`};translated=labels[language];}
      if(translated===undefined){
        const step=key.match(/^([1-6])([\u4e00-\u9fff].+)$/);
        if(step&&dict[step[2]]!==undefined)translated=step[1]+dict[step[2]];
      }

    }
    if(translated===undefined)return source;
    return source.slice(0,source.length-source.trimStart().length)+translated+source.slice(source.trimEnd().length);
  }

  const originalUnits=new WeakMap();
  const SKIP_UNIT=new Set(['SCRIPT','STYLE','SELECT','OPTION','TEXTAREA','SVG','BODY','HTML','HEAD','SECTION','ARTICLE','MAIN','NAV','UL','OL','TABLE','THEAD','TBODY','TFOOT','TR','DIALOG','FORM','ASIDE','HEADER','FOOTER','PICTURE','VIDEO','CANVAS']);
  function isUnit(el){
    if(!el||el.nodeType!==1)return false;
    if(SKIP_UNIT.has(el.tagName))return false;
    if(el.closest('script,style,select,#language-note,svg,.banner,picture'))return false;
    if(el===select||el.id==='language-select')return false;
    let hasText=false;
    for(const c of el.childNodes){
      if(c.nodeType===3){if(c.nodeValue&&c.nodeValue.trim())hasText=true;continue;}
      if(c.nodeType===1&&c.classList&&c.classList.contains('lx-num')){hasText=true;continue;}
      return false;
    }
    return hasText;
  }
  function translateUnit(el){
    if(!isUnit(el))return;
    const cur=el.textContent;
    let rec=originalUnits.get(el);
    if(!rec||cur!==rec.last)rec={source:cur,last:cur};
    const result=translate(rec.source);
    if(cur!==result){
      el.textContent=result;
      if(el.dataset&&'lxNum' in el.dataset)delete el.dataset.lxNum;
    }
    rec.last=result;
    originalUnits.set(el,rec);
  }
  function apply(){
    observer.disconnect();
    document.documentElement.lang=language;
    document.documentElement.dataset.uiLanguage=language;
    note.textContent=UI_NOTES[language]||'';
    note.hidden=!UI_NOTES[language];
    document.body.querySelectorAll('p,li,h1,h2,h3,h4,h5,h6,th,td,button,a,label,dt,dd,summary,span,small,strong,b,em,figcaption,div').forEach(translateUnit);
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    let node;
    while(node=walker.nextNode()){
      if(!node.parentElement||node.parentElement.closest('script,style,select,#language-note,svg,.banner,picture'))continue;
      if(isUnit(node.parentElement))continue;
      let record=originalText.get(node);
      if(!record||node.nodeValue!==record.last)record={source:node.nodeValue,last:node.nodeValue};
      const result=translate(record.source);
      if(node.nodeValue!==result)node.nodeValue=result;
      record.last=result;originalText.set(node,record);
    }
    document.querySelectorAll('[aria-label],[placeholder],[title],[alt]').forEach(el=>{
      if(el===select||el.closest('select'))return;
      let record=originalAttrs.get(el)||{};
      for(const attr of ['aria-label','placeholder','title','alt']){
        if(!el.hasAttribute(attr))continue;
        const value=el.getAttribute(attr);let entry=record[attr];
        if(!entry||value!==entry.last)entry={source:value,last:value};
        const translated=translate(entry.source);if(value!==translated)el.setAttribute(attr,translated);
        entry.last=translated;record[attr]=entry;
      }
      originalAttrs.set(el,record);
    });
    if(!location.hash.includes('activity='))document.title='TPOWER · '+(UI_DICTIONARIES[language]['促销活动']||'促销活动');
    else{
      const h2=document.querySelector('.detail-heading h2');
      if(h2&&h2.textContent.trim())document.title='TPOWER · '+h2.textContent.trim();
    }
    observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','placeholder','title','alt']});
  }

  const observer=new MutationObserver(apply);
  select.addEventListener('change',()=>{language=allowed.has(select.value)?select.value:'zh-CN';try{localStorage.setItem(KEY,language)}catch{}apply();});
  apply();
})();
