// Interface translations. Promotional artwork and source rule prose are unchanged.
const UI_LANGUAGES=[['zh-CN','简体中文','简体'],['zh-TW','繁體中文','繁體'],['en','English','English'],['ms','Bahasa Melayu','Melayu'],['vi','Tiếng Việt','Tiếng Việt'],['th','ภาษาไทย','ไทย'],['id','Bahasa Indonesia','Indonesia'],['hi','हिन्दी (Hindi)','हिन्दी']];
// Columns: source, Traditional Chinese, English, Malay, Vietnamese, Thai, Indonesian, Hindi.
const UI_TRANSLATION_ROWS=`促销活动|促銷活動|Promotions|Promosi|Ưu đãi|โปรโมชั่น|Promosi|प्रमोशन
领奖记录|領獎紀錄|History|Rekod|Lịch sử|ประวัติ|Riwayat|इतिहास
全部活动|全部活動|All events|Semua|Tất cả|ทั้งหมด|Semua|सभी
新人豪礼|新人豪禮|New members|Ahli baharu|Thành viên mới|สมาชิกใหม่|Anggota baru|नए सदस्य
充值加码|充值加碼|Deposit offers|Tawaran deposit|Ưu đãi nạp|โปรฝากเงิน|Promo deposit|जमा ऑफ़र
惊喜福利|驚喜福利|Special offers|Istimewa|Ưu đãi đặc biệt|สิทธิพิเศษ|Penawaran spesial|विशेष ऑफ़र
VIP尊享|VIP尊享|VIP benefits|Faedah VIP|Đặc quyền VIP|สิทธิ์ VIP|Manfaat VIP|VIP लाभ
邀友赚礼|邀友賺禮|Referrals|Rujukan|Giới thiệu bạn|แนะนำเพื่อน|Referensi|रेफ़रल
暂无活动|暫無活動|No events yet|Belum ada aktiviti|Chưa có hoạt động|ยังไม่มีกิจกรรม|Belum ada acara|अभी कोई कार्यक्रम नहीं
查看详情|查看詳情|View details|Lihat butiran|Xem chi tiết|ดูรายละเอียด|Lihat detail|विवरण देखें
返回活动列表|返回活動列表|Back to events|Kembali ke aktiviti|Về danh sách|กลับไปที่กิจกรรม|Kembali ke acara|कार्यक्रमों पर वापस
活动详情|活動詳情|Details|Butiran|Chi tiết|รายละเอียด|Detail|विवरण
活动规则|活動規則|Rules|Peraturan|Thể lệ|กติกา|Aturan|नियम
活动说明|活動說明|Information|Maklumat|Thông tin|ข้อมูล|Informasi|जानकारी
我的邀请|我的邀請|My referrals|Rujukan saya|Bạn đã mời|การแนะนำของฉัน|Referensi saya|मेरे रेफ़रल
成长进度|成長進度|Progress|Kemajuan|Tiến độ|ความคืบหน้า|Progres|प्रगति
我的抽奖券|我的抽獎券|My tickets|Tiket saya|Vé của tôi|ตั๋วของฉัน|Tiket saya|मेरे टिकट
首页|首頁|Home|Utama|Trang chủ|หน้าหลัก|Beranda|होम
通知|通知|Notifications|Notifikasi|Thông báo|การแจ้งเตือน|Notifikasi|सूचनाएँ
邀请好友|邀請好友|Invite friends|Jemput rakan|Mời bạn bè|เชิญเพื่อน|Undang teman|मित्रों को आमंत्रित करें
客服|客服|Support|Bantuan|Hỗ trợ|ฝ่ายบริการ|Bantuan|सहायता
我的|我的|Account|Akaun|Tài khoản|บัญชี|Akun|खाता
我的账户|我的帳戶|My account|Akaun saya|Tài khoản của tôi|บัญชีของฉัน|Akun saya|मेरा खाता
联系客服|聯絡客服|Contact support|Hubungi bantuan|Liên hệ hỗ trợ|ติดต่อฝ่ายบริการ|Hubungi bantuan|सहायता से संपर्क करें
需要帮助？联系客服|需要協助？聯絡客服|Need help? Contact support|Perlukan bantuan? Hubungi kami|Cần giúp? Liên hệ hỗ trợ|ต้องการความช่วยเหลือ? ติดต่อเรา|Butuh bantuan? Hubungi kami|मदद चाहिए? संपर्क करें
我知道了|我知道了|Got it|Faham|Đã hiểu|เข้าใจแล้ว|Mengerti|समझ गया
关闭弹窗|關閉視窗|Close dialog|Tutup dialog|Đóng hộp thoại|ปิดหน้าต่าง|Tutup dialog|विंडो बंद करें
搜索好友账号|搜尋好友帳號|Search friend account|Cari akaun rakan|Tìm tài khoản bạn bè|ค้นหาบัญชีเพื่อน|Cari akun teman|मित्र का खाता खोजें
清空搜索|清空搜尋|Clear search|Kosongkan carian|Xóa tìm kiếm|ล้างการค้นหา|Hapus pencarian|खोज साफ़ करें
暂无邀请好友|暫無邀請好友|No referrals yet|Belum ada rujukan|Chưa mời bạn bè|ยังไม่มีการแนะนำ|Belum ada referensi|अभी कोई रेफ़रल नहीं
没有匹配的好友|沒有符合的好友|No matching friends|Tiada rakan sepadan|Không tìm thấy bạn|ไม่พบเพื่อนที่ตรงกัน|Tidak ada teman yang cocok|कोई मेल खाता मित्र नहीं
好友记录将显示在这里|好友紀錄將顯示在這裡|Friend records will appear here|Rekod rakan dipaparkan di sini|Hồ sơ bạn bè sẽ hiển thị ở đây|ข้อมูลเพื่อนจะแสดงที่นี่|Data teman akan muncul di sini|मित्रों के रिकॉर्ड यहाँ दिखेंगे
截图示例 · 非实时账户|截圖範例 · 非即時帳戶|Screenshot example · Not live|Contoh tangkap layar · Bukan masa nyata|Ví dụ ảnh chụp · Không trực tiếp|ตัวอย่างภาพหน้าจอ · ไม่ใช่ข้อมูลสด|Contoh tangkapan layar · Bukan data langsung|स्क्रीनशॉट उदाहरण · लाइव नहीं
按原截图整理|依原截圖整理|Based on source screenshots|Berdasarkan tangkap layar|Theo ảnh chụp gốc|อ้างอิงภาพหน้าจอต้นฉบับ|Berdasarkan tangkapan layar|मूल स्क्रीनशॉट पर आधारित
金额单位：MYR|金額單位：MYR|Currency: MYR|Mata wang: MYR|Đơn vị: MYR|สกุลเงิน: MYR|Mata uang: MYR|मुद्रा: MYR
已邀请好友|已邀請好友|Friends invited|Rakan dijemput|Bạn đã mời|เพื่อนที่เชิญแล้ว|Teman diundang|आमंत्रित मित्र
已解锁总额|已解鎖總額|Total unlocked|Jumlah dibuka|Tổng đã mở khóa|ยอดปลดล็อกทั้งหมด|Total terbuka|कुल अनलॉक
已领取总额|已領取總額|Total claimed|Jumlah dituntut|Tổng đã nhận|ยอดรับแล้วทั้งหมด|Total diklaim|कुल प्राप्त
待领取|待領取|To claim|Belum dituntut|Chờ nhận|รอรับ|Belum diklaim|प्राप्त करना बाकी
可领取金额|可領取金額|Available amount|Jumlah tersedia|Số tiền có thể nhận|ยอดที่รับได้|Jumlah tersedia|उपलब्ध राशि
推荐奖励明细|推薦獎勵明細|Referral details|Butiran rujukan|Chi tiết giới thiệu|รายละเอียดการแนะนำ|Detail referensi|रेफ़रल विवरण
暂无可领取奖励|暫無可領取獎勵|No rewards available|Tiada ganjaran tersedia|Chưa có thưởng để nhận|ยังไม่มีรางวัลให้รับ|Belum ada hadiah tersedia|कोई पुरस्कार उपलब्ध नहीं
查看活动说明|查看活動說明|View information|Lihat maklumat|Xem thông tin|ดูข้อมูล|Lihat informasi|जानकारी देखें
查看完整活动规则|查看完整活動規則|View full rules|Lihat peraturan penuh|Xem toàn bộ thể lệ|ดูกติกาทั้งหมด|Lihat aturan lengkap|पूरे नियम देखें
查看说明|查看說明|View explanation|Lihat penjelasan|Xem giải thích|ดูคำอธิบาย|Lihat penjelasan|स्पष्टीकरण देखें
活动档位|活動檔位|Tiers|Tahap|Cấp độ|ระดับ|Tingkat|स्तर
解锁进度|解鎖進度|Unlock progress|Kemajuan buka kunci|Tiến độ mở khóa|ความคืบหน้าการปลดล็อก|Progres pembukaan|अनलॉक प्रगति
可领取|可領取|Available|Tersedia|Có thể nhận|รับได้|Tersedia|उपलब्ध
已领取|已領取|Claimed|Dituntut|Đã nhận|รับแล้ว|Diklaim|प्राप्त
待解锁|待解鎖|Locked|Terkunci|Chưa mở khóa|ยังไม่ปลดล็อก|Terkunci|लॉक
解锁比例|解鎖比例|Unlock rates|Kadar buka kunci|Tỷ lệ mở khóa|อัตราปลดล็อก|Rasio pembukaan|अनलॉक दर
解锁比例说明|解鎖比例說明|About unlock rates|Tentang kadar buka kunci|Thông tin tỷ lệ mở khóa|เกี่ยวกับอัตราปลดล็อก|Tentang rasio pembukaan|अनलॉक दर का विवरण
进行中|進行中|In progress|Sedang berjalan|Đang diễn ra|กำลังดำเนินการ|Berlangsung|जारी है
已达标 · 待激活|已達標 · 待啟用|Qualified · Pending|Layak · Menunggu|Đạt yêu cầu · Chờ kích hoạt|ผ่านเกณฑ์ · รอเปิดใช้งาน|Memenuhi syarat · Menunggu|पात्र · सक्रियण बाकी
进行中 · 不限时|進行中 · 不限時|In progress · No time limit|Berjalan · Tiada had masa|Đang diễn ra · Không giới hạn|กำลังดำเนินการ · ไม่จำกัดเวลา|Berlangsung · Tanpa batas waktu|जारी · समय सीमा नहीं
暂无可领取彩金|暫無可領取彩金|No bonus available|Tiada bonus tersedia|Chưa có tiền thưởng để nhận|ยังไม่มีโบนัสให้รับ|Belum ada bonus tersedia|कोई बोनस उपलब्ध नहीं
活动开始|活動開始|Starts|Mula|Bắt đầu|เริ่ม|Mulai|शुरू
活动结束|活動結束|Ends|Tamat|Kết thúc|สิ้นสุด|Berakhir|समाप्त
开奖参考|開獎參考|Draw reference|Rujukan cabutan|Tham chiếu kết quả|ข้อมูลอ้างอิงผลรางวัล|Referensi undian|ड्रॉ संदर्भ
查看参考说明|查看參考說明|View reference|Lihat rujukan|Xem tham chiếu|ดูข้อมูลอ้างอิง|Lihat referensi|संदर्भ देखें
奖项一览|獎項一覽|Prize overview|Senarai hadiah|Danh sách giải|รายการรางวัล|Daftar hadiah|पुरस्कार सूची
奖项|獎項|Prize|Hadiah|Giải thưởng|รางวัล|Hadiah|पुरस्कार
中奖要求|中獎要求|Match requirement|Syarat padanan|Điều kiện trúng|เงื่อนไขการถูกรางวัล|Syarat kecocokan|मिलान की शर्त
奖金（RM）|獎金（RM）|Prize (RM)|Hadiah (RM)|Tiền thưởng (RM)|รางวัล (RM)|Hadiah (RM)|पुरस्कार (RM)
抽奖券数|抽獎券數|Tickets|Tiket|Số vé|จำนวนตั๋ว|Jumlah tiket|टिकट
中奖总额|中獎總額|Total winnings|Jumlah kemenangan|Tổng trúng thưởng|ยอดรางวัลรวม|Total kemenangan|कुल जीत
未领取奖额|未領取獎額|Unclaimed amount|Jumlah belum dituntut|Số tiền chưa nhận|ยอดที่ยังไม่ได้รับ|Jumlah belum diklaim|अप्राप्त राशि
暂无可领取奖金|暫無可領取獎金|No prize available|Tiada hadiah tersedia|Chưa có giải để nhận|ยังไม่มีรางวัลให้รับ|Belum ada hadiah tersedia|कोई पुरस्कार उपलब्ध नहीं
查看抽奖券|查看抽獎券|View tickets|Lihat tiket|Xem vé|ดูตั๋ว|Lihat tiket|टिकट देखें
查看中奖规则|查看中獎規則|View prize rules|Lihat peraturan hadiah|Xem thể lệ trúng thưởng|ดูกติการางวัล|Lihat aturan hadiah|पुरस्कार नियम देखें
没有抽奖券|沒有抽獎券|No tickets|Tiada tiket|Không có vé|ไม่มีตั๋ว|Tidak ada tiket|कोई टिकट नहीं
参与资格|參與資格|Eligibility|Kelayakan|Điều kiện tham gia|คุณสมบัติ|Kelayakan|पात्रता
查看参与资格|查看參與資格|Check eligibility|Semak kelayakan|Xem điều kiện|ดูคุณสมบัติ|Lihat kelayakan|पात्रता देखें
活动流程|活動流程|Process|Proses|Quy trình|ขั้นตอน|Alur|प्रक्रिया
参与活动|參與活動|Join event|Sertai aktiviti|Tham gia|เข้าร่วมกิจกรรม|Ikuti acara|भाग लें
可玩游戏|可玩遊戲|Available games|Permainan tersedia|Trò chơi khả dụng|เกมที่เปิดให้เล่น|Permainan tersedia|उपलब्ध गेम
不符资格 · 截图状态|不符資格 · 截圖狀態|Ineligible · Screenshot|Tidak layak · Tangkap layar|Không đủ điều kiện · Ảnh chụp|ไม่ผ่านเกณฑ์ · ภาพหน้าจอ|Tidak memenuhi syarat · Tangkapan layar|अपात्र · स्क्रीनशॉट
未参与 · 截图状态|未參與 · 截圖狀態|Not joined · Screenshot|Belum sertai · Tangkap layar|Chưa tham gia · Ảnh chụp|ยังไม่เข้าร่วม · ภาพหน้าจอ|Belum bergabung · Tangkapan layar|भाग नहीं लिया · स्क्रीनशॉट
点击步骤查看要求|點擊步驟查看要求|Tap a step for details|Tekan langkah untuk butiran|Chạm bước để xem chi tiết|แตะขั้นตอนเพื่อดูรายละเอียด|Ketuk langkah untuk detail|विवरण के लिए चरण टैप करें
活动余额|活動餘額|Event balance|Baki aktiviti|Số dư hoạt động|ยอดกิจกรรม|Saldo acara|कार्यक्रम शेष
充值金额|充值金額|Deposit amount|Jumlah deposit|Số tiền nạp|จำนวนเงินฝาก|Jumlah deposit|जमा राशि
领取|領取|Claim|Tuntut|Nhận|รับ|Klaim|प्राप्त करें
挑战|挑戰|Challenge|Cabaran|Thử thách|ภารกิจ|Tantangan|चुनौती
解锁|解鎖|Unlock|Buka kunci|Mở khóa|ปลดล็อก|Buka|अनलॉक
彩金|彩金|Bonus|Bonus|Tiền thưởng|โบนัส|Bonus|बोनस
完成|完成|Complete|Selesai|Hoàn thành|เสร็จสิ้น|Selesai|पूर्ण
首充|首充|First deposit|Deposit pertama|Nạp lần đầu|ฝากครั้งแรก|Deposit pertama|पहली जमा
电子|電子|Slots|Slot|Slot|สล็อต|Slot|स्लॉट
打鱼|捕魚|Fishing|Memancing|Bắn cá|ยิงปลา|Tembak ikan|फ़िशिंग
现场|現場|Live|Langsung|Trực tiếp|สด|Langsung|लाइव
体育|體育|Sports|Sukan|Thể thao|กีฬา|Olahraga|खेल
头奖|頭獎|First prize|Hadiah pertama|Giải nhất|รางวัลที่ 1|Hadiah pertama|प्रथम पुरस्कार
二奖|二獎|Second prize|Hadiah kedua|Giải nhì|รางวัลที่ 2|Hadiah kedua|द्वितीय पुरस्कार
三奖|三獎|Third prize|Hadiah ketiga|Giải ba|รางวัลที่ 3|Hadiah ketiga|तृतीय पुरस्कार
四奖|四獎|Fourth prize|Hadiah keempat|Giải tư|รางวัลที่ 4|Hadiah keempat|चतुर्थ पुरस्कार
五奖|五獎|Fifth prize|Hadiah kelima|Giải năm|รางวัลที่ 5|Hadiah kelima|पाँचवाँ पुरस्कार
暂无可展示的通知。|暫無可顯示的通知。|No notifications to display.|Tiada notifikasi untuk dipaparkan.|Chưa có thông báo.|ไม่มีการแจ้งเตือน|Tidak ada notifikasi.|कोई सूचना नहीं है।
暂未提供逐笔领奖记录。|尚未提供逐筆領獎紀錄。|Individual claim records are not provided.|Rekod tuntutan individu belum disediakan.|Chưa có lịch sử nhận thưởng chi tiết.|ยังไม่มีข้อมูลการรับรางวัลรายรายการ|Riwayat klaim per transaksi belum tersedia.|अलग-अलग प्राप्ति रिकॉर्ड उपलब्ध नहीं हैं।
TPOWER · 活动页面交互预览|TPOWER · 活動頁面互動預覽|TPOWER · Interactive preview|TPOWER · Pratonton interaktif|TPOWER · Bản xem thử tương tác|TPOWER · ตัวอย่างแบบโต้ตอบ|TPOWER · Pratinjau interaktif|TPOWER · इंटरैक्टिव पूर्वावलोकन
内容依据提供的14张截图整理，未连接真实账户或领奖接口|內容依據提供的14張截圖整理，未連接真實帳戶或領獎介面|Based on 14 screenshots. No live account or claim connection.|Berdasarkan 14 tangkap layar. Tiada sambungan akaun atau tuntutan sebenar.|Theo 14 ảnh chụp. Không kết nối tài khoản hay nhận thưởng thật.|อ้างอิงจากภาพหน้าจอ 14 ภาพ ไม่เชื่อมต่อบัญชีหรือการรับรางวัลจริง|Berdasarkan 14 tangkapan layar. Tidak terhubung ke akun atau klaim nyata.|14 स्क्रीनशॉट पर आधारित। वास्तविक खाते या पुरस्कार से जुड़ा नहीं।
活动分类|活動分類|Event categories|Kategori aktiviti|Danh mục hoạt động|หมวดหมู่กิจกรรม|Kategori acara|कार्यक्रम श्रेणियाँ
活动列表|活動列表|Event list|Senarai aktiviti|Danh sách hoạt động|รายการกิจกรรม|Daftar acara|कार्यक्रम सूची
活动内容|活動內容|Event content|Kandungan aktiviti|Nội dung hoạt động|เนื้อหากิจกรรม|Konten acara|कार्यक्रम सामग्री
底部菜单|底部選單|Bottom navigation|Navigasi bawah|Điều hướng dưới|เมนูด้านล่าง|Navigasi bawah|निचला नेविगेशन
立即领取活动金|立即領取活動金|Claim activity credit|Tuntut kredit aktiviti|Nhận điểm hoạt động|รับเครดิตกิจกรรม|Klaim kredit acara|कार्यक्रम क्रेडिट प्राप्त करें
查看成长彩金计划|查看成長彩金計畫|View growth plan|Lihat pelan pertumbuhan|Xem kế hoạch tăng trưởng|ดูแผนการเติบโต|Lihat rencana pertumbuhan|विकास योजना देखें
领取前请确认|領取前請確認|Confirm before claiming|Sahkan sebelum menuntut|Xác nhận trước khi nhận|ยืนยันก่อนรับ|Konfirmasi sebelum klaim|प्राप्त करने से पहले पुष्टि करें
活动奖励|活動獎勵|Reward|Ganjaran|Phần thưởng|รางวัล|Hadiah|पुरस्कार
参与条件|參與條件|Eligibility|Syarat|Điều kiện|เงื่อนไข|Syarat|पात्रता
重要条款|重要條款|Important terms|Terma penting|Điều khoản quan trọng|ข้อกำหนดสำคัญ|Ketentuan penting|महत्वपूर्ण शर्तें
按活动原文整理|按活動原文整理|Based on official rules|Berdasarkan peraturan rasmi|Theo thể lệ gốc|อ้างอิงกติกาอย่างเป็นทางการ|Berdasarkan aturan resmi|आधिकारिक नियमों पर आधारित
去实名认证|去實名認證|Complete verification|Sahkan identiti|Xác minh danh tính|ยืนยันตัวตน|Verifikasi identitas|सत्यापन पूरा करें
已完成实名认证|已完成實名認證|Verification completed|Pengesahan selesai|Đã xác minh|ยืนยันแล้ว|Verifikasi selesai|सत्यापन पूरा हुआ
领取RM100试玩额度|領取RM100試玩額度|Claim RM100 trial credit|Tuntut kredit cuba RM100|Nhận hạn mức thử RM100|รับเครดิตทดลอง RM100|Klaim kredit uji coba RM100|RM100 ट्रायल क्रेडिट प्राप्त करें
去试玩|去試玩|Start playing|Mula bermain|Đi chơi thử|ไปทดลองเล่น|Mulai bermain|खेलना शुरू करें
兑换RM100现金|兌換RM100現金|Redeem RM100 cash|Tebus tunai RM100|Đổi RM100 tiền mặt|แลกเงินสด RM100|Tukar tunai RM100|RM100 नकद रिडीम करें
已兑换|已兌換|Redeemed|Telah ditebus|Đã đổi|แลกแล้ว|Sudah ditukar|रिडीम हो गया
确认领取|確認領取|Confirm claim|Sahkan tuntutan|Xác nhận nhận|ยืนยันการรับ|Konfirmasi klaim|दावा की पुष्टि करें
确认兑换|確認兌換|Confirm redeem|Sahkan tebusan|Xác nhận đổi|ยืนยันการแลก|Konfirmasi penukaran|रिडीम की पुष्टि करें
兑换确认|兌換確認|Confirm redeem|Sahkan tebusan|Xác nhận đổi|ยืนยันการแลก|Konfirmasi penukaran|रिडीम की पुष्टि
取消|取消|Cancel|Batal|Hủy|ยกเลิก|Batal|रद्द करें
重置演示|重置演示|Reset demo|Set semula demo|Đặt lại bản xem trước|รีเซ็ตเดโม|Reset demo|डेमो रीसेट करें
模拟试玩 +RM100|模擬試玩 +RM100|Simulate play +RM100|Simulasi main +RM100|Mô phỏng chơi +RM100|จำลองการเล่น +RM100|Simulasi main +RM100|खेल सिमुलेट करें +RM100
试玩余额|試玩餘額|Trial balance|Baki cubaan|Số dư thử|ยอดทดลองเล่น|Saldo uji coba|ट्रायल बैलेंस
达标目标 RM200|達標目標 RM200|Target RM200|Sasaran RM200|Mục tiêu RM200|เป้าหมาย RM200|Target RM200|लक्ष्य RM200
预览演示|預覽演示|Demo preview|Pratonton demo|Bản xem trước|เดโมตัวอย่าง|Pratinjau demo|डेमो पूर्वावलोकन
免费试玩|免費試玩|Free trial|Cuba percuma|Chơi thử miễn phí|ทดลองเล่นฟรี|Uji coba gratis|मुफ़्त ट्रायल
达标余额|達標餘額|Target balance|Baki sasaran|Số dư mục tiêu|ยอดเป้าหมาย|Saldo target|लक्ष्य बैलेंस
兑换现金|兌換現金|Redeem cash|Tebus tunai|Đổi tiền mặt|แลกเงินสด|Tukar tunai|नकद रिडीम
实名认证|實名認證|Verification|Pengesahan|Xác minh|ยืนยันตัวตน|Verifikasi|सत्यापन
领取额度|領取額度|Claim credit|Tuntut kredit|Nhận hạn mức|รับเครดิต|Klaim kredit|क्रेडिट प्राप्त करें
新人体验|新人體驗|New member trial|Cuba ahli baharu|Trải nghiệm thành viên mới|ทดลองสมาชิกใหม่|Uji coba anggota baru|नए सदस्य ट्रायल
请先完成实名认证，并领取RM100试玩额度。|請先完成實名認證，並領取RM100試玩額度。|Complete verification first, then claim the RM100 trial credit.|Sahkan identiti dahulu, kemudian tuntut kredit cuba RM100.|Hãy xác minh trước, rồi nhận hạn mức thử RM100.|กรุณายืนยันตัวตนแล้วรับเครดิตทดลอง RM100 ก่อน|Selesaikan verifikasi dulu, lalu klaim kredit uji coba RM100.|पहले सत्यापन पूरा करें, फिर RM100 ट्रायल क्रेडिट प्राप्त करें।
已达到 RM200，可以兑换 RM100 现金。|已達到 RM200，可以兌換 RM100 現金。|RM200 reached. You can redeem RM100 cash.|Telah capai RM200. Anda boleh tebus tunai RM100.|Đã đạt RM200, có thể đổi RM100 tiền mặt.|ถึง RM200 แล้ว สามารถแลกเงินสด RM100 ได้|Sudah mencapai RM200, dapat menukar tunai RM100.|RM200 पूरा हुआ। आप RM100 नकद रिडीम कर सकते हैं।
预览演示 · 非实时账户|預覽演示 · 非即時帳戶|Demo preview · Not a live account|Pratonton demo · Bukan akaun langsung|Bản xem trước · Không phải tài khoản thật|เดโมตัวอย่าง · ไม่ใช่บัญชีจริง|Pratinjau demo · Bukan akun nyata|डेमो पूर्वावलोकन · लाइव खाता नहीं
未参与 · 预览状态|未參與 · 預覽狀態|Not joined · Preview|Belum sertai · Pratonton|Chưa tham gia · Xem trước|ยังไม่เข้าร่วม · ตัวอย่าง|Belum ikut · Pratinjau|शामिल नहीं · पूर्वावलोकन
已领取 · 试玩中|已領取 · 試玩中|Claimed · In play|Telah dituntut · Sedang main|Đã nhận · Đang chơi|รับแล้ว · กำลังเล่น|Sudah diklaim · Sedang bermain|प्राप्त · खेल जारी
可兑换|可兌換|Ready to redeem|Boleh ditebus|Có thể đổi|พร้อมแลก|Siap ditukar|रिडीम के लिए तैयार
已兑换 · 预览状态|已兌換 · 預覽狀態|Redeemed · Preview|Telah ditebus · Pratonton|Đã đổi · Xem trước|แลกแล้ว · ตัวอย่าง|Sudah ditukar · Pratinjau|रिडीम · पूर्वावलोकन
预览不会验证真实身份或注册状态。|預覽不會驗證真實身分或註冊狀態。|This preview does not verify identity or registration.|Pratonton ini tidak mengesahkan identiti atau pendaftaran.|Bản xem trước không xác minh danh tính hoặc đăng ký.|เดโมนี้จะไม่ตรวจสอบตัวตนหรือการสมัคร|Pratinjau ini tidak memverifikasi identitas atau pendaftaran.|यह पूर्वावलोकन पहचान या पंजीकरण सत्यापित नहीं करता।
这里只展示领取确认界面，不验证账户、不发放试玩额度。|這裡只展示領取確認介面，不驗證帳戶、不發放試玩額度。|This is only a claim confirmation screen. No account is verified and no trial credit is issued.|Ini hanya skrin pengesahan tuntutan. Akaun tidak disahkan dan kredit cubaan tidak dikeluarkan.|Đây chỉ là màn hình xác nhận nhận thưởng, không xác minh tài khoản và không cấp hạn mức thử.|นี่เป็นเพียงหน้ายืนยันการรับ ไม่มีการตรวจสอบบัญชีและไม่มีการให้เครดิตทดลอง|Ini hanya layar konfirmasi klaim. Akun tidak diverifikasi dan kredit uji coba tidak diberikan.|यह केवल दावा पुष्टि स्क्रीन है। खाते का सत्यापन नहीं होता और ट्रायल क्रेडिट नहीं दिया जाता।
指定游戏名单请通过正式平台客服咨询。预览不进入真实游戏，可使用页面中的模拟试玩查看进度。|指定遊戲名單請透過正式平台客服諮詢。預覽不進入真實遊戲，可使用頁面中的模擬試玩查看進度。|Ask official support for the designated game list. This preview does not open real games; use Simulate play on the page to view progress.|Tanya khidmat rasmi untuk senarai permainan. Pratonton ini tidak membuka permainan sebenar; guna Simulasi main untuk melihat kemajuan.|Hãy hỏi hỗ trợ chính thức về danh sách trò chơi chỉ định. Bản xem trước không mở trò chơi thật; dùng Mô phỏng chơi trên trang để xem tiến độ.|สอบถามฝ่ายบริการทางการสำหรับรายชื่อเกมที่กำหนด เดโมนี้จะไม่เปิดเกมจริง ใช้การจำลองการเล่นในหน้าเพื่อดูความคืบหน้า|Tanyakan ke bantuan resmi untuk daftar permainan yang ditentukan. Pratinjau ini tidak membuka permainan nyata; gunakan Simulasi main di halaman untuk melihat progres.|निर्धारित खेल सूची के लिए आधिकारिक सहायता से पूछें। यह पूर्वावलोकन असली खेल नहीं खोलता; प्रगति देखने के लिए पेज पर सिमुलेट का उपयोग करें।
这里只展示兑换确认界面，不会发放现金到真实账户。|這裡只展示兌換確認介面，不會發放現金到真實帳戶。|This is only a redeem confirmation screen. No cash is paid to a real account.|Ini hanya skrin pengesahan tebusan. Tiada tunai dibayar ke akaun sebenar.|Đây chỉ là màn hình xác nhận đổi thưởng, không chi tiền vào tài khoản thật.|นี่เป็นเพียงหน้ายืนยันการแลก จะไม่มีการโอนเงินเข้าบัญชีจริง|Ini hanya layar konfirmasi penukaran. Tidak ada uang tunai yang dikirim ke akun nyata.|यह केवल रिडीम पुष्टि स्क्रीन है। वास्तविक खाते में नकद नहीं दिया जाता।
注册并开始演示|註冊並開始演示|Sign up to start demo|Daftar untuk mula demo|Đăng ký để xem demo|สมัครเพื่อเริ่มเดโม|Daftar untuk mulai demo|डेमो शुरू करने के लिए साइन अप करें
注册 / 登录|註冊 / 登入|Register / Log in|Daftar / Log masuk|Đăng ký / Đăng nhập|สมัคร / เข้าสู่ระบบ|Daftar / Masuk|पंजीकरण / लॉग इन
获取验证码|獲取驗證碼|Get code|Dapatkan kod|Lấy mã|รับรหัส|Dapatkan kode|कोड प्राप्त करें
重新获取验证码|重新獲取驗證碼|Resend code|Hantar semula kod|Gửi lại mã|ส่งรหัสอีกครั้ง|Kirim ulang kode|कोड फिर भेजें
注册|註冊|Register|Daftar|Đăng ký|สมัคร|Daftar|पंजीकरण
手机号码|手機號碼|Phone number|Nombor telefon|Số điện thoại|เบอร์โทรศัพท์|Nomor telepon|फ़ोन नंबर
验证码|驗證碼|Verification code|Kod pengesahan|Mã xác minh|รหัสยืนยัน|Kode verifikasi|सत्यापन कोड
真实姓名|真實姓名|Full name|Nama penuh|Họ và tên|ชื่อ-นามสกุล|Nama lengkap|पूरा नाम
证件类型|證件類型|ID type|Jenis ID|Loại giấy tờ|ประเภทเอกสาร|Jenis identitas|पहचान प्रकार
身份证|身份證|National ID|Kad pengenalan|CMND|บัตรประชาชน|KTP|राष्ट्रीय पहचान पत्र
护照|護照|Passport|Pasport|Hộ chiếu|หนังสือเดินทาง|Paspor|पासपोर्ट
证件号码|證件號碼|ID number|Nombor ID|Số giấy tờ|เลขเอกสาร|Nomor identitas|पहचान संख्या
上传证件正面|上傳證件正面|Upload ID front|Muat naik depan ID|Tải mặt trước|อัปโหลดหน้าเอกสาร|Unggah sisi depan|पहचान पत्र सामने अपलोड करें
上传证件反面|上傳證件反面|Upload ID back|Muat naik belakang ID|Tải mặt sau|อัปโหลดด้านหลัง|Unggah sisi belakang|पहचान पत्र पीछे अपलोड करें
上传手持自拍照|上傳手持自拍照|Upload a handheld selfie|Muat naik swafoto|Tải ảnh selfie cầm giấy tờ|อัปโหลดเซลฟีถือเอกสาร|Unggah selfie dengan dokumen|सेल्फी अपलोड करें
已上传（演示）|已上傳（演示）|Uploaded (demo)|Telah dimuat naik (demo)|Đã tải lên (demo)|อัปโหลดแล้ว (เดโม)|Sudah diunggah (demo)|अपलोड हो गया (डेमो)
提交认证|提交認證|Submit verification|Hantar pengesahan|Gửi xác minh|ส่งการยืนยัน|Kirim verifikasi|सत्यापन जमा करें
资料审核中|資料審核中|Under review|Sedang disemak|Đang xét duyệt|กำลังตรวจสอบ|Sedang ditinjau|समीक्षा जारी है
认证成功|認證成功|Verified|Pengesahan berjaya|Xác minh thành công|ยืนยันสำเร็จ|Verifikasi berhasil|सत्यापन सफल
已认证|已認證|Verified|Telah disahkan|Đã xác minh|ยืนยันแล้ว|Terverifikasi|सत्यापित
返回活动领取额度|返回活動領取額度|Back to claim credit|Kembali untuk tuntut kredit|Về trang nhận hạn mức|กลับไปรับเครดิต|Kembali klaim kredit|क्रेडिट प्राप्त करने के लिए वापस जाएँ
已领取 RM100 试玩额度|已領取 RM100 試玩額度|RM100 trial credit added|Kredit cubaan RM100 ditambah|Đã nhận hạn mức thử RM100|ได้รับเครดิตทดลอง RM100 แล้ว|Kredit uji coba RM100 ditambahkan|RM100 ट्रायल क्रेडिट जुड़ गया
试玩钱包|試玩錢包|Trial wallet|Dompet cubaan|Ví thử|กระเป๋าทดลองเล่น|Dompet uji coba|ट्रायल वॉलेट
主钱包|主錢包|Cash wallet|Dompet tunai|Ví chính|กระเป๋าเงินหลัก|Dompet utama|मुख्य वॉलेट
指定游戏|指定遊戲|Designated games|Permainan ditetapkan|Trò chơi chỉ định|เกมที่กำหนด|Permainan yang ditentukan|निर्धारित खेल
指定试玩|指定試玩|Trial only|Cuba sahaja|Chỉ chơi thử|ทดลองเล่นเท่านั้น|Hanya uji coba|केवल ट्रायल
开始旋转|開始旋轉|Spin|Putar|Quay|หมุน|Putar|स्पिन
恭喜达标|恭喜達標|Target reached|Sasaran tercapai|Đã đạt mục tiêu|ถึงเป้าหมายแล้ว|Target tercapai|लक्ष्य पूरा
兑换成功|兌換成功|Redeemed successfully|Tebusan berjaya|Đổi thành công|แลกสำเร็จ|Penukaran berhasil|रिडीम सफल
已到账|已到賬|Credited|Telah dikreditkan|Đã vào tài khoản|เข้าบัญชีแล้ว|Sudah masuk|जमा हो गया
确认重置|確認重置|Confirm reset|Sahkan set semula|Xác nhận đặt lại|ยืนยันรีเซ็ต|Konfirmasi reset|रीसेट की पुष्टि करें
演示模式|演示模式|Demo mode|Mod demo|Chế độ demo|โหมดเดโม|Mode demo|डेमो मोड
查看领奖记录|查看領獎紀錄|View history|Lihat rekod|Xem lịch sử|ดูประวัติ|Lihat riwayat|इतिहास देखें
返回活动|返回活動|Back to event|Kembali ke aktiviti|Về hoạt động|กลับไปที่กิจกรรม|Kembali ke acara|कार्यक्रम पर वापस
演示未达标（余额归零）|演示未達標（餘額歸零）|Demo miss target (balance to 0)|Demo tidak capai sasaran (baki 0)|Demo không đạt mục tiêu (về 0)|เดโมไม่ถึงเป้า (ยอดเป็น 0)|Demo gagal target (saldo 0)|डेमो लक्ष्य पूरा नहीं (शेष 0)
完整领奖流程预览，不连接真实账户|完整領獎流程預覽，不連接真實帳戶|Preview of the full reward journey. No live account is connected.|Pratonton perjalanan ganjaran penuh. Tiada akaun langsung.|Xem trước toàn bộ quy trình nhận thưởng, không kết nối tài khoản thật.|ตัวอย่างขั้นตอนรับรางวัลแบบเต็ม ไม่เชื่อมบัญชีจริง|Pratinjau alur hadiah lengkap. Tidak terhubung ke akun nyata.|पूरी इनाम यात्रा का पूर्वावलोकन। कोई लाइव खाता नहीं जुड़ा है।
领取RM88活动金|領取RM88活動金|Claim RM88 credit|Tuntut kredit RM88|Nhận hạn mức RM88|รับเครดิต RM88|Klaim kredit RM88|RM88 क्रेडिट प्राप्त करें
确认领取|確認領取|Confirm claim|Sahkan tuntutan|Xác nhận nhận|ยืนยันการรับ|Konfirmasi klaim|दावा की पुष्टि करें
去完成流水|去完成流水|Complete turnover|Selesaikan pusing ganti|Hoàn thành doanh thu|ทำเทิร์นให้ครบ|Selesaikan turnover|टर्नओवर पूरा करें
去充值解锁|去充值解鎖|Deposit to unlock|Deposit untuk buka|Nạp để mở khóa|ฝากเพื่อปลดล็อก|Deposit untuk buka|जमा करके अनलॉक करें
去完成12倍流水|去完成12倍流水|Complete 12x turnover|Selesaikan 12x pusing ganti|Hoàn thành 12 lần doanh thu|ทำเทิร์น 12 เท่า|Selesaikan turnover 12x|12x टर्नओवर पूरा करें
去完成本金流水|去完成本金流水|Complete principal turnover|Selesaikan pusing ganti prinsipal|Hoàn thành doanh thu gốc|ทำเทิร์นเงินต้น|Selesaikan turnover modal|मूल टर्नओवर पूरा करें
演示加速完成流水|演示加速完成流水|Demo: finish turnover|Demo: selesaikan pusing ganti|Demo: hoàn thành doanh thu|เดโม: ทำเทิร์นให้เสร็จ|Demo: selesaikan turnover|डेमो: टर्नओवर पूरा करें
已完成|已完成|Completed|Selesai|Đã hoàn tất|เสร็จแล้ว|Selesai|पूर्ण
解锁资格已失效|解鎖資格已失效|Unlock expired|Kelayakan buka tamat|Tư cách mở khóa hết hạn|สิทธิ์ปลดล็อกหมดอายุ|Kelayakan buka kedaluwarsa|अनलॉक अवधि समाप्त
已放弃，不能再次参加|已放棄，不能再次參加|Given up, cannot rejoin|Telah berhenti, tidak boleh sertai semula|Đã từ bỏ, không thể tham gia lại|สละสิทธิ์ เข้าร่วมอีกไม่ได้|Sudah mundur, tidak bisa ikut lagi|छोड़ दिया, दोबारा शामिल नहीं हो सकते
邀请好友|邀請好友|Invite friends|Jemput rakan|Mời bạn bè|เชิญเพื่อน|Undang teman|मित्रों को आमंत्रित करें
领取奖励|領取獎勵|Claim reward|Tuntut ganjaran|Nhận thưởng|รับรางวัล|Klaim hadiah|इनाम प्राप्त करें
暂无可领取奖励|暫無可領取獎勵|Nothing to claim|Tiada ganjaran|Không có thưởng để nhận|ยังไม่มีรางวัลให้รับ|Tidak ada hadiah|कोई दावा नहीं
复制邀请码|複製邀請碼|Copy invite code|Salin kod jemputan|Sao chép mã mời|คัดลอกรหัสเชิญ|Salin kode undangan|इनवाइट कोड कॉपी करें
演示一位好友成功加入|演示一位好友成功加入|Demo: friend joined|Demo: rakan berjaya sertai|Demo: bạn đã tham gia|เดโม: เพื่อนเข้าร่วมสำเร็จ|Demo: teman berhasil bergabung|डेमो: मित्र शामिल हुए
演示邀请未成功|演示邀請未成功|Demo: invite unsuccessful|Demo: jemputan tidak berjaya|Demo: lời mời không thành công|เดโม: คำเชิญไม่สำเร็จ|Demo: undangan tidak berhasil|डेमो: आमंत्रण असफल
去解锁彩金|去解鎖彩金|Unlock bonus|Buka bonus|Mở khóa thưởng|ปลดล็อกโบนัส|Buka bonus|बोनस अनलॉक करें
领取已解锁彩金|領取已解鎖彩金|Claim unlocked bonus|Tuntut bonus terbuka|Nhận thưởng đã mở khóa|รับโบนัสที่ปลดล็อก|Klaim bonus terbuka|अनलॉक बोनस प्राप्त करें
演示加速解锁当前档位|演示加速解鎖當前檔位|Demo: finish this tier|Demo: selesaikan peringkat ini|Demo: hoàn tất cấp hiện tại|เดโม: ปลดล็อกระดับนี้ให้ครบ|Demo: selesaikan tingkat ini|डेमो: यह स्तर पूरा करें
去累计有效流水|去累計有效流水|Accrue valid turnover|Kumpul pusing ganti sah|Tích lũy doanh thu hợp lệ|สะสมเทิร์นที่มีผล|Kumpulkan turnover valid|मान्य टर्नओवर जोड़ें
演示开奖|演示開獎|Demo draw|Demo cabutan|Demo quay thưởng|เดโมออกรางวัล|Demo undian|डेमो ड्रॉ
领取奖金|領取獎金|Claim prize|Tuntut hadiah|Nhận tiền thưởng|รับเงินรางวัล|Klaim hadiah|पुरस्कार प्राप्त करें
奖金已作废|獎金已作廢|Prize voided|Hadiah batal|Tiền thưởng đã hết hạn|รางวัลหมดอายุ|Hadiah hangus|पुरस्कार रद्द
我的抽奖券|我的抽獎券|My tickets|Tiket saya|Vé của tôi|ตั๋วของฉัน|Tiket saya|मेरे टिकट
参与活动|參與活動|Join event|Sertai aktiviti|Tham gia|เข้าร่วมกิจกรรม|Ikuti acara|कार्यक्रम में शामिल हों
去指定游戏|去指定遊戲|Go to games|Pergi ke permainan|Đến trò chơi chỉ định|ไปที่เกมที่กำหนด|Ke permainan|निर्धारित खेल पर जाएँ
完成任务|完成任務|Complete task|Selesaikan tugasan|Hoàn thành nhiệm vụ|ทำภารกิจให้สำเร็จ|Selesaikan tugas|कार्य पूरा करें
不符资格|不符資格|Not eligible|Tidak layak|Không đủ điều kiện|ไม่มีคุณสมบัติ|Tidak memenuhi syarat|अयोग्य
演示不符资格|演示不符資格|Demo: not eligible|Demo: tidak layak|Demo: không đủ điều kiện|เดโม: ไม่มีคุณสมบัติ|Demo: tidak memenuhi syarat|डेमो: अयोग्य
重置演示|重置演示|Reset demo|Tetapkan semula demo|Đặt lại bản demo|รีเซ็ตเดโม|Reset demo|डेमो रीसेट करें
查看领奖记录|查看領獎紀錄|View history|Lihat rekod|Xem lịch sử|ดูประวัติ|Lihat riwayat|इतिहास देखें
分享邀请码|分享邀請碼|Share invite code|Kongsi kod jemputan|Chia sẻ mã mời|แชร์รหัสเชิญ|Bagikan kode undangan|इनवाइट कोड साझा करें
继续邀请好友|繼續邀請好友|Invite more friends|Jemput lagi rakan|Tiếp tục mời bạn|เชิญเพื่อนต่อ|Undang teman lagi|और मित्रों को आमंत्रित करें
立即领取|立即領取|Claim now|Tuntut sekarang|Nhận ngay|รับทันที|Klaim sekarang|अभी प्राप्त करें
演示首次充值 RM100|演示首次儲值 RM100|Demo first deposit RM100|Demo deposit pertama RM100|Demo nạp lần đầu RM100|เดโมฝากครั้งแรก RM100|Demo deposit pertama RM100|डेमो पहली जमा RM100
去累计有效投注|去累計有效投注|Accrue valid bets|Kumpul pertaruhan sah|Tích lũy cược hợp lệ|สะสมเดิมพันที่มีผล|Kumpulkan taruhan valid|मान्य दांव जोड़ें
演示开奖|演示開獎|Demo draw|Demo cabutan|Demo quay thưởng|เดโมออกรางวัล|Demo undian|डेमो ड्रॉ
奖金已自动到账|獎金已自動到帳|Prize auto-paid|Hadiah dibayar automatik|Tiền thưởng đã vào ví|เงินรางวัลเข้าบัญชีอัตโนมัติ|Hadiah otomatis masuk|पुरस्कार स्वतः जमा
未中奖|未中獎|No winning ticket|Tidak menang|Không trúng thưởng|ไม่ถูกรางวัล|Tidak menang|कोई जीत नहीं
当期档位已失效|當期檔位已失效|This tier expired|Peringkat ini tamat|Cấp hiện tại đã hết hạn|ระดับนี้หมดอายุ|Tingkat ini kedaluwarsa|यह स्तर समाप्त
已完成全部档位|已完成全部檔位|All tiers completed|Semua peringkat selesai|Đã hoàn tất mọi cấp|ครบทุกระดับ|Semua tingkat selesai|सभी स्तर पूरे
我的记录|我的記錄|My records|Rekod saya|Hồ sơ của tôi|บันทึกของฉัน|Catatan saya|मेरे रिकॉर्ड
查看我的VIP记录|查看我的VIP記錄|View my VIP records|Lihat rekod VIP saya|Xem hồ sơ VIP của tôi|ดูบันทึก VIP ของฉัน|Lihat catatan VIP saya|मेरे VIP रिकॉर्ड देखें
模拟升级|模擬升級|Simulate upgrade|Simulasi naik taraf|Mô phỏng nâng cấp|จำลองการอัปเกรด|Simulasikan peningkatan|अपग्रेड सिमुलेट करें
领取升级礼金|領取升級禮金|Claim upgrade bonus|Tuntut bonus naik taraf|Nhận thưởng nâng cấp|รับโบนัสอัปเกรด|Klaim bonus peningkatan|अपग्रेड बोनस प्राप्त करें
该等级升级礼金已领取|該等級升級禮金已領取|Upgrade bonus already claimed|Bonus naik taraf telah dituntut|Thưởng nâng cấp đã nhận|รับโบนัสอัปเกรดแล้ว|Bonus peningkatan sudah diklaim|अपग्रेड बोनस पहले ही मिल चुका है
请先模拟升级|請先模擬升級|Simulate an upgrade first|Simulasikan naik taraf dahulu|Hãy mô phỏng nâng cấp trước|จำลองการอัปเกรดก่อน|Simulasikan peningkatan dulu|पहले अपग्रेड सिमुलेट करें
已达演示最高等级|已達演示最高等級|Highest demo level reached|Tahap demo tertinggi dicapai|Đã tới cấp demo cao nhất|ถึงระดับเดโมสูงสุดแล้ว|Tingkat demo tertinggi tercapai|उच्चतम डेमो स्तर पहुँच गया
模拟升级至 VIP2|模擬升級至 VIP2|Simulate upgrade to VIP2|Simulasi naik taraf ke VIP2|Mô phỏng nâng lên VIP2|จำลองอัปเกรดเป็น VIP2|Simulasikan peningkatan ke VIP2|VIP2 पर अपग्रेड सिमुलेट करें
模拟升级至 VIP3|模擬升級至 VIP3|Simulate upgrade to VIP3|Simulasi naik taraf ke VIP3|Mô phỏng nâng lên VIP3|จำลองอัปเกรดเป็น VIP3|Simulasikan peningkatan ke VIP3|VIP3 पर अपग्रेड सिमुलेट करें
再次领取（将提示不可重复）|再次領取（將提示不可重複）|Claim again (will be blocked)|Tuntut lagi (akan disekat)|Nhận lại (sẽ bị chặn)|รับอีกครั้ง (จะถูกบล็อก)|Klaim lagi (akan diblokir)|फिर से प्राप्त करें (रोका जाएगा)
模拟保级成功|模擬保級成功|Simulate successful retention|Simulasi berjaya kekal tahap|Mô phỏng giữ hạng thành công|จำลองการรักษาระดับสำเร็จ|Simulasikan retensi berhasil|रिटेंशन सफल सिमुलेट करें
模拟未达保级|模擬未達保級|Simulate failed retention|Simulasi gagal kekal tahap|Mô phỏng không giữ được hạng|จำลองการรักษาระดับไม่สำเร็จ|Simulasikan retensi gagal|रिटेंशन असफल सिमुलेट करें
领取保级礼金|領取保級禮金|Claim retention bonus|Tuntut bonus kekal tahap|Nhận thưởng giữ hạng|รับโบนัสรักษาระดับ|Klaim bonus retensi|रिटेंशन बोनस प्राप्त करें
本周期保级礼金已领取|本週期保級禮金已領取|Retention bonus already claimed|Bonus kekal tahap telah dituntut|Thưởng giữ hạng đã nhận|รับโบนัสรักษาระดับแล้ว|Bonus retensi sudah diklaim|रिटेंशन बोनस पहले ही मिल चुका है
本周期未达保级，无奖励|本週期未達保級，無獎勵|Retention failed, no reward|Gagal kekal tahap, tiada ganjaran|Không giữ hạng, không có thưởng|รักษาระดับไม่สำเร็จ ไม่มีรางวัล|Retensi gagal, tidak ada hadiah|रिटेंशन असफल, कोई पुरस्कार नहीं
模拟下一周期|模擬下一週期|Simulate next cycle|Simulasi kitaran seterusnya|Mô phỏng chu kỳ tiếp theo|จำลองรอบถัดไป|Simulasikan siklus berikutnya|अगला चक्र सिमुलेट करें
演示有效投注 RM100|演示有效投注 RM100|Demo qualifying bet RM100|Demo pertaruhan sah RM100|Demo cược hợp lệ RM100|เดโมเดิมพันที่มีผล RM100|Demo taruhan valid RM100|डेमो मान्य दांव RM100
演示无效投注 RM100|演示無效投注 RM100|Demo non-qualifying bet RM100|Demo pertaruhan tidak sah RM100|Demo cược không hợp lệ RM100|เดโมเดิมพันที่ไม่มีผล RM100|Demo taruhan tidak valid RM100|डेमो अमान्य दांव RM100
领取返水|領取返水|Claim rebate|Tuntut rebat|Nhận hoàn trả|รับรีเบต|Klaim rebate|रिबेट प्राप्त करें
暂无可领返水|暫無可領返水|No rebate to claim|Tiada rebat untuk dituntut|Chưa có hoàn trả để nhận|ยังไม่มีรีเบตให้รับ|Belum ada rebate|कोई रिबेट उपलब्ध नहीं
领取每周关怀礼金|領取每週關懷禮金|Claim weekly care bonus|Tuntut bonus jagaan mingguan|Nhận quà quan tâm hàng tuần|รับโบนัสดูแลรายสัปดาห์|Klaim bonus perhatian mingguan|साप्ताहिक केयर बोनस प्राप्त करें
本周关怀礼金已领取|本週關懷禮金已領取|Weekly care already claimed|Bonus jagaan mingguan telah dituntut|Quà quan tâm tuần này đã nhận|รับโบนัสรายสัปดาห์แล้ว|Bonus mingguan sudah diklaim|साप्ताहिक बोनस पहले ही मिल चुका है
模拟下周|模擬下週|Simulate next week|Simulasi minggu seterusnya|Mô phỏng tuần sau|จำลองสัปดาห์ถัดไป|Simulasikan minggu berikutnya|अगला सप्ताह सिमुलेट करें
领取节日礼金|領取節日禮金|Claim festival bonus|Tuntut bonus perayaan|Nhận thưởng lễ hội|รับโบนัสเทศกาล|Klaim bonus festival|त्योहार बोनस प्राप्त करें
本节日礼金已领取|本節日禮金已領取|Festival bonus already claimed|Bonus perayaan telah dituntut|Thưởng lễ hội đã nhận|รับโบนัสเทศกาลนี้แล้ว|Bonus festival sudah diklaim|त्योहार बोनस पहले ही मिल चुका है
当前不在节日期间|當前不在節日期間|Festival period has ended|Bukan dalam tempoh perayaan|Không trong thời gian lễ hội|ไม่อยู่ในช่วงเทศกาล|Tidak dalam periode festival|त्योहार अवधि में नहीं
模拟节日结束|模擬節日結束|Simulate festival end|Simulasi tamat perayaan|Mô phỏng kết thúc lễ hội|จำลองสิ้นสุดเทศกาล|Simulasikan akhir festival|त्योहार समाप्ति सिमुलेट करें
模拟下一节日|模擬下一節日|Simulate next festival|Simulasi perayaan seterusnya|Mô phỏng lễ hội tiếp theo|จำลองเทศกาลถัดไป|Simulasikan festival berikutnya|अगला त्योहार सिमुलेट करें
查看五大专属福利|查看五大專屬福利|View five VIP benefits|Lihat lima faedah VIP|Xem năm đặc quyền VIP|ดูสิทธิ์ VIP ทั้งห้า|Lihat lima manfaat VIP|पाँच VIP लाभ देखें
进入演示|進入演示|Open demo|Buka demo|Vào bản demo|เข้าเดโม|Buka demo|डेमो खोलें
示例等级表|示例等級表|Example level table|Jadual tahap contoh|Bảng cấp mẫu|ตารางระดับตัวอย่าง|Tabel tingkat contoh|उदाहरण स्तर तालिका
可查询资料|可查詢資料|Queryable records|Rekod boleh ditanya|Hồ sơ có thể tra cứu|ข้อมูลที่ตรวจสอบได้|Catatan yang dapat dicek|जाँच योग्य रिकॉर्ड
奖励记录|獎勵記錄|Reward history|Rekod ganjaran|Lịch sử thưởng|ประวัติรางวัล|Riwayat hadiah|पुरस्कार इतिहास
五大专属福利|五大專屬福利|Five exclusive benefits|Lima faedah eksklusif|Năm đặc quyền độc quyền|สิทธิพิเศษห้าอย่าง|Lima manfaat eksklusif|पाँच विशेष लाभ
VIP专属|VIP專屬|VIP exclusive|Eksklusif VIP|Đặc quyền VIP|สิทธิ์ VIP|Eksklusif VIP|VIP विशेष
风控补充|風控補充|Risk-control notes|Nota kawalan risiko|Bổ sung kiểm soát rủi ro|หมายเหตุควบคุมความเสี่ยง|Catatan pengendalian risiko|जोखिम नियंत्रण नोट
老会员回归|老會員回歸|Returning members|Ahli kembali|Thành viên cũ trở lại|สมาชิกเก่ากลับมา|Anggota lama kembali|वापस आए सदस्य
兑换RM188现金|兌換RM188現金|Redeem RM188 cash|Tebus tunai RM188|Đổi RM188 tiền mặt|แลกเงินสด RM188|Tukar tunai RM188|RM188 नकद रिडीम करें
演示未充值会员（不符资格）|演示未儲值會員（不符資格）|Demo: never deposited (ineligible)|Demo: belum deposit (tidak layak)|Demo: chưa từng nạp (không đủ điều kiện)|เดโม: ไม่เคยฝาก (ไม่มีคุณสมบัติ)|Demo: belum pernah deposit (tidak memenuhi syarat)|डेमो: कभी जमा नहीं (अयोग्य)
恢复为已充值老会员|恢復為已儲值老會員|Restore deposited returning member|Pulihkan ahli kembali yang pernah deposit|Khôi phục thành viên cũ đã nạp|คืนเป็นสมาชิกเก่าที่เคยฝาก|Pulihkan anggota lama yang pernah deposit|जमा किए हुए वापस आए सदस्य को पुनर्स्थापित करें
演示已领取「新人免费挑战赢取RM100」（互斥）|演示已領取「新人免費挑戰贏取RM100」（互斥）|Demo: claimed newcomer free challenge (exclusive)|Demo: telah tuntut cabaran baharu (saling eksklusif)|Demo: đã nhận thử thách tân thủ (loại trừ lẫn nhau)|เดโม: รับความท้าทายสมาชิกใหม่แล้ว (ใช้ร่วมกันไม่ได้)|Demo: sudah klaim tantangan anggota baru (saling eksklusif)|डेमो: न्यूकमर चुनौती प्राप्त (परस्पर अनन्य)
取消互斥演示（清除新人挑战领取状态）|取消互斥演示（清除新人挑戰領取狀態）|Undo exclusion (clear newcomer claim)|Batalkan eksklusif (kosongkan tuntutan baharu)|Hủy loại trừ (xóa trạng thái nhận tân thủ)|ยกเลิกการกันสิทธิ์ (ล้างสถานะสมาชิกใหม่)|Batalkan eksklusif (hapus klaim anggota baru)|अनन्यता हटाएँ (न्यूकमर दावा साफ़ करें)
演示已领取「老会员回归，免费赢取RM188」（互斥）|演示已領取「老會員回歸，免費贏取RM188」（互斥）|Demo: claimed returning-member offer (exclusive)|Demo: telah tuntut tawaran ahli kembali (saling eksklusif)|Demo: đã nhận ưu đãi thành viên cũ (loại trừ lẫn nhau)|เดโม: รับข้อเสนอสมาชิกเก่าแล้ว (ใช้ร่วมกันไม่ได้)|Demo: sudah klaim penawaran anggota lama (saling eksklusif)|डेमो: रिटर्निंग ऑफ़र प्राप्त (परस्पर अनन्य)
取消互斥演示（清除老会员回归领取状态）|取消互斥演示（清除老會員回歸領取狀態）|Undo exclusion (clear returning-member claim)|Batalkan eksklusif (kosongkan tuntutan ahli kembali)|Hủy loại trừ (xóa trạng thái thành viên cũ)|ยกเลิกการกันสิทธิ์ (ล้างสถานะสมาชิกเก่า)|Batalkan eksklusif (hapus klaim anggota lama)|अनन्यता हटाएँ (वापसी दावा साफ़ करें)
不可领取（互斥）|不可領取（互斥）|Cannot claim (exclusive)|Tidak boleh dituntut (saling eksklusif)|Không thể nhận (loại trừ lẫn nhau)|รับไม่ได้ (ใช้ร่วมกันไม่ได้)|Tidak dapat diklaim (saling eksklusif)|प्राप्त नहीं कर सकते (परस्पर अनन्य)
未达到RM200，不可兑换|未達到RM200，不可兌換|Below RM200, cannot redeem|Belum RM200, tidak boleh ditebus|Chưa đạt RM200, không đổi được|ยังไม่ถึง RM200 แลกไม่ได้|Belum RM200, tidak dapat ditukar|RM200 से कम, रिडीम नहीं
查看新人免费挑战赢取RM100|查看新人免費挑戰贏取RM100|View newcomer free challenge|Lihat cabaran percuma ahli baharu|Xem thử thách miễn phí tân thủ|ดูความท้าทายฟรีสมาชิกใหม่|Lihat tantangan gratis anggota baru|न्यूकमर फ्री चैलेंज देखें
查看老会员回归活动|查看老會員回歸活動|View returning-member event|Lihat aktiviti ahli kembali|Xem sự kiện thành viên cũ trở lại|ดูกิจกรรมสมาชิกเก่ากลับมา|Lihat acara anggota lama kembali|वापस आए सदस्य कार्यक्रम देखें
首存彩金|首存彩金|First-deposit bonus|Bonus deposit pertama|Thưởng nạp lần đầu|โบนัสฝากครั้งแรก|Bonus deposit pertama|पहली जमा बोनस
请先选择一种首存优惠|請先選擇一種首存優惠|Choose one first-deposit offer first|Sila pilih satu tawaran deposit pertama|Hãy chọn một ưu đãi nạp lần đầu|เลือกข้อเสนอฝากครั้งแรกก่อน|Pilih satu penawaran deposit pertama|पहले एक फर्स्ट-डिपॉजिट ऑफर चुनें
去首次充值|去首次儲值|Go to first deposit|Pergi ke deposit pertama|Đến nạp lần đầu|ไปฝากครั้งแรก|Ke deposit pertama|पहली जमा पर जाएँ
去完成有效流水|去完成有效流水|Complete valid turnover|Selesaikan pusing ganti sah|Hoàn thành doanh thu hợp lệ|ทำเทิร์นที่มีผลให้ครบ|Selesaikan turnover valid|मान्य टर्नओवर पूरा करें
转换至可提款余额|轉換至可提款餘額|Convert to withdrawable balance|Tukar kepada baki boleh dikeluarkan|Chuyển sang số dư có thể rút|แปลงเป็นยอดถอนได้|Ubah ke saldo yang bisa ditarik|निकासी योग्य शेष में बदलें
确认转换|確認轉換|Confirm conversion|Sahkan penukaran|Xác nhận chuyển|ยืนยันการแปลง|Konfirmasi konversi|रूपांतरण की पुष्टि करें
演示首次充值 RM300|演示首次儲值 RM300|Demo first deposit RM300|Demo deposit pertama RM300|Demo nạp lần đầu RM300|เดโมฝากครั้งแรก RM300|Demo deposit pertama RM300|डेमो पहली जमा RM300
演示首次充值 RM500|演示首次儲值 RM500|Demo first deposit RM500|Demo deposit pertama RM500|Demo nạp lần đầu RM500|เดโมฝากครั้งแรก RM500|Demo deposit pertama RM500|डेमो पहली जमा RM500
演示再次充值 RM100（不发放彩金）|演示再次儲值 RM100（不發放彩金）|Demo another deposit RM100 (no bonus)|Demo deposit semula RM100 (tiada bonus)|Demo nạp thêm RM100 (không thưởng)|เดโมฝากอีก RM100 (ไม่มีโบนัส)|Demo deposit lagi RM100 (tanpa bonus)|डेमो फिर जमा RM100 (कोई बोनस नहीं)
演示再次充值 RM300（不发放彩金）|演示再次儲值 RM300（不發放彩金）|Demo another deposit RM300 (no bonus)|Demo deposit semula RM300 (tiada bonus)|Demo nạp thêm RM300 (không thưởng)|เดโมฝากอีก RM300 (ไม่มีโบนัส)|Demo deposit lagi RM300 (tanpa bonus)|डेमो फिर जमा RM300 (कोई बोनस नहीं)
演示再次充值 RM500（不发放彩金）|演示再次儲值 RM500（不發放彩金）|Demo another deposit RM500 (no bonus)|Demo deposit semula RM500 (tiada bonus)|Demo nạp thêm RM500 (không thưởng)|เดโมฝากอีก RM500 (ไม่มีโบนัส)|Demo deposit lagi RM500 (tanpa bonus)|डेमो फिर जमा RM500 (कोई बोनस नहीं)
演示老虎机投注 RM200|演示老虎機投注 RM200|Demo slots bet RM200|Demo pertaruhan slot RM200|Demo cược slots RM200|เดโมเดิมพันสล็อต RM200|Demo taruhan slot RM200|डेमो स्लॉट दांव RM200
演示真人投注 RM200|演示真人投注 RM200|Demo live bet RM200|Demo pertaruhan live RM200|Demo cược live RM200|เดโมเดิมพันไลฟ์ RM200|Demo taruhan live RM200|डेमो लाइव दांव RM200
演示加速完成流水（演示用）|演示加速完成流水（演示用）|Demo: finish turnover (demo only)|Demo: selesaikan pusing ganti (demo)|Demo: hoàn tất doanh thu (bản demo)|เดโม: ทำเทิร์นให้ครบ (สำหรับเดโม)|Demo: selesaikan turnover (hanya demo)|डेमो: टर्नओवर पूरा करें (केवल डेमो)
演示其他充值活动进行中（重叠）|演示其他儲值活動進行中（重疊）|Demo: another deposit promo is active (overlap)|Demo: promo deposit lain sedang aktif (bertindih)|Demo: ưu đãi nạp khác đang diễn ra (trùng)|เดโม: โปรฝากอื่นกำลังใช้ (ทับซ้อน)|Demo: promo deposit lain sedang aktif (tumpang tindih)|डेमो: अन्य जमा प्रोमो सक्रिय (ओवरलैप)
取消重叠演示|取消重疊演示|Undo overlap demo|Batalkan demo bertindih|Hủy demo trùng ưu đãi|ยกเลิกเดโมทับซ้อน|Batalkan demo tumpang tindih|ओवरलैप डेमो हटाएँ
不可领取（与其他充值活动重叠）|不可領取（與其他儲值活動重疊）|Cannot claim (overlaps another deposit promo)|Tidak boleh dituntut (bertindih dengan promo deposit lain)|Không thể nhận (trùng ưu đãi nạp khác)|รับไม่ได้ (ทับกับโปรฝากอื่น)|Tidak dapat diklaim (tumpang tindih promo deposit lain)|प्राप्त नहीं कर सकते (अन्य जमा प्रोमो से ओवरलैप)
每日再存10%彩金|每日再存10%彩金|Daily reload 10% bonus|Bonus reload harian 10%|Thưởng nạp lại hàng ngày 10%|โบนัสฝากซ้ำรายวัน 10%|Bonus reload harian 10%|दैनिक रीलोड 10% बोनस
每日再存额外领取10%，最高RM300|每日再存額外領取10%，最高RM300|Daily reload bonus 10%, up to RM300|Bonus reload harian 10%, maksima RM300|Thưởng nạp lại hàng ngày 10%, tối đa RM300|โบนัสฝากซ้ำรายวัน 10% สูงสุด RM300|Bonus reload harian 10%, maks. RM300|दैनिक रीलोड बोनस 10%, अधिकतम RM300
每日再存 · 最高 RM300|每日再存 · 最高 RM300|Daily reload · up to RM300|Reload harian · maks. RM300|Nạp lại hằng ngày · tối đa RM300|ฝากซ้ำรายวัน · สูงสุด RM300|Reload harian · maks. RM300|दैनिक रीलोड · अधिकतम RM300
每日再存|每日再存|Daily reload|Reload harian|Nạp lại hằng ngày|ฝากซ้ำรายวัน|Reload harian|दैनिक रीलोड
真人|真人|Live casino|Kasino langsung|Casino live|คาสิโนสด|Kasino live|लाइव कैसीनो
老虎机、捕鱼|老虎機、捕魚|Slots and fishing|Slot dan meriam ikan|Slots và bắn cá|สล็อตและยิงปลา|Slot dan tembak ikan|स्लॉट और फिशिंग
再存优惠|再存優惠|Reload offers|Tawaran reload|Ưu đãi nạp lại|ข้อเสนอฝากซ้ำ|Penawaran reload|रीलोड ऑफ़र
同一笔充值只能选一种|同一筆儲值只能選一種|Only one offer per deposit|Hanya satu tawaran setiap deposit|Mỗi lần nạp chỉ chọn một ưu đãi|ฝากแต่ละครั้งเลือกได้เพียงข้อเดียว|Setiap deposit hanya satu penawaran|प्रति जमा केवल एक ऑफ़र
为本次再存选择一种优惠|為本次再存選擇一種優惠|Choose one offer for this reload|Pilih satu tawaran untuk reload ini|Chọn một ưu đãi cho lần nạp lại này|เลือกข้อเสนอหนึ่งรายการสำหรับการฝากซ้ำนี้|Pilih satu penawaran untuk reload ini|इस रीलोड के लिए एक ऑफ़र चुनें
已锁定该笔充值的优惠，另一选项不可再选。|已鎖定該筆儲值的優惠，另一選項不可再選。|This deposit's offer is locked; the other option cannot be chosen.|Tawaran deposit ini dikunci; pilihan lain tidak boleh dipilih.|Ưu đãi lần nạp này đã khóa, không thể chọn mục kia.|ข้อเสนอของรายการฝากนี้ถูกล็อก เลือกอีกตัวเลือกไม่ได้|Penawaran deposit ini terkunci; opsi lain tidak bisa dipilih.|इस जमा का ऑफ़र लॉक है; दूसरा विकल्प नहीं चुन सकते।
演示再存充值|演示再存儲值|Demo reload deposit|Demo deposit reload|Demo nạp lại|เดโมฝากซ้ำ|Demo deposit reload|डेमो रीलोड जमा
演示再存 RM500|演示再存 RM500|Demo reload RM500|Demo reload RM500|Demo nạp lại RM500|เดโมฝากซ้ำ RM500|Demo reload RM500|डेमो रीलोड RM500
演示再存 RM1000|演示再存 RM1000|Demo reload RM1000|Demo reload RM1000|Demo nạp lại RM1000|เดโมฝากซ้ำ RM1000|Demo reload RM1000|डेमो रीलोड RM1000
演示再存 RM3000|演示再存 RM3000|Demo reload RM3000|Demo reload RM3000|Demo nạp lại RM3000|เดโมฝากซ้ำ RM3000|Demo reload RM3000|डेमो रीलोड RM3000
演示再存 RM500（不可合并）|演示再存 RM500（不可合併）|Demo reload RM500 (cannot combine)|Demo reload RM500 (tidak boleh digabung)|Demo nạp lại RM500 (không gộp)|เดโมฝากซ้ำ RM500 (รวมไม่ได้)|Demo reload RM500 (tidak bisa digabung)|डेमो रीलोड RM500 (जोड़ नहीं सकते)
演示再存 RM1000（不可合并）|演示再存 RM1000（不可合併）|Demo reload RM1000 (cannot combine)|Demo reload RM1000 (tidak boleh digabung)|Demo nạp lại RM1000 (không gộp)|เดโมฝากซ้ำ RM1000 (รวมไม่ได้)|Demo reload RM1000 (tidak bisa digabung)|डेमो रीलोड RM1000 (जोड़ नहीं सकते)
演示再存 RM3000（不可合并）|演示再存 RM3000（不可合併）|Demo reload RM3000 (cannot combine)|Demo reload RM3000 (tidak boleh digabung)|Demo nạp lại RM3000 (không gộp)|เดโมฝากซ้ำ RM3000 (รวมไม่ได้)|Demo reload RM3000 (tidak bisa digabung)|डेमो रीलोड RM3000 (जोड़ नहीं सकते)
演示两笔各 RM500 合并领取（不可）|演示兩筆各 RM500 合併領取（不可）|Demo combining two RM500 deposits (not allowed)|Demo gabung dua deposit RM500 (tidak dibenarkan)|Demo gộp hai lần nạp RM500 (không được)|เดโมรวมสองรายการฝาก RM500 (ไม่ได้)|Demo gabung dua deposit RM500 (tidak boleh)|दो RM500 जमा जोड़कर दावा (अनुमत नहीं)
演示取消或退款充值 RM1,000（不计入）|演示取消或退款儲值 RM1,000（不計入）|Demo cancelled or refunded deposit RM1,000 (does not count)|Demo deposit RM1,000 dibatalkan atau dipulangkan (tidak dikira)|Demo nạp RM1,000 bị hủy hoặc hoàn (không tính)|เดโมฝาก RM1,000 ที่ยกเลิกหรือคืนเงิน (ไม่นับ)|Demo deposit RM1,000 dibatalkan atau refund (tidak dihitung)|डेमो रद्द/रिफंड जमा RM1,000 (गिनती नहीं)
去再存充值|去再存儲值|Go to reload deposit|Pergi ke deposit reload|Đến nạp lại|ไปฝากซ้ำ|Ke deposit reload|रीलोड जमा पर जाएँ
请先选择一种再存优惠|請先選擇一種再存優惠|Choose one reload offer first|Sila pilih satu tawaran reload|Hãy chọn một ưu đãi nạp lại|เลือกข้อเสนอฝากซ้ำก่อน|Pilih satu penawaran reload dulu|पहले एक रीलोड ऑफ़र चुनें
演示尚未完成首次充值（不符资格）|演示尚未完成首次儲值（不符資格）|Demo: first deposit not completed (ineligible)|Demo: belum selesai deposit pertama (tidak layak)|Demo: chưa hoàn tất nạp lần đầu (không đủ điều kiện)|เดโม: ยังไม่ฝากครั้งแรก (ไม่มีสิทธิ์)|Demo: belum selesai deposit pertama (tidak layak)|डेमो: पहली जमा अधूरी (अयोग्य)
恢复为已完成首次充值|恢復為已完成首次儲值|Restore first deposit completed|Pulihkan status deposit pertama selesai|Khôi phục đã hoàn tất nạp lần đầu|คืนเป็นสถานะฝากครั้งแรกแล้ว|Pulihkan deposit pertama selesai|पहली जमा पूर्ण स्थिति पुनर्स्थापित करें
模拟次日|模擬次日|Simulate next day|Simulasi hari seterusnya|Mô phỏng ngày hôm sau|จำลองวันถัดไป|Simulasikan hari berikutnya|अगला दिन सिमुलेट करें
已认证 · 已完成首次充值|已認證 · 已完成首次儲值|Verified · first deposit completed|Disahkan · deposit pertama selesai|Đã xác minh · đã nạp lần đầu|ยืนยันแล้ว · ฝากครั้งแรกแล้ว|Terverifikasi · deposit pertama selesai|सत्यापित · पहली जमा पूर्ण
尚未完成首次充值（不符资格）|尚未完成首次儲值（不符資格）|First deposit not completed (ineligible)|Belum selesai deposit pertama (tidak layak)|Chưa hoàn tất nạp lần đầu (không đủ điều kiện)|ยังไม่ฝากครั้งแรก (ไม่มีสิทธิ์)|Belum selesai deposit pertama (tidak layak)|पहली जमा अधूरी (अयोग्य)
当前与其他充值活动重叠（演示）|當前與其他儲值活動重疊（演示）|Currently overlaps another deposit promo (demo)|Sedang bertindih dengan promo deposit lain (demo)|Đang trùng ưu đãi nạp khác (demo)|กำลังทับซ้อนโปรฝากอื่น (เดโม)|Sedang tumpang tindih promo deposit lain (demo)|अन्य जमा प्रमो से ओवरलैप (डेमो)
未与其他充值活动重叠|未與其他儲值活動重疊|Not overlapping another deposit promo|Tidak bertindih dengan promo deposit lain|Không trùng ưu đãi nạp khác|ไม่ทับซ้อนโปรฝากอื่น|Tidak tumpang tindih promo deposit lain|अन्य जमा प्रमो से ओवरलैप नहीं
流水已完成 · 可转换|流水已完成 · 可轉換|Turnover complete · ready to convert|Pusing ganti selesai · sedia ditukar|Doanh thu đã đủ · có thể chuyển|เทิร์นครบ · พร้อมแปลง|Turnover selesai · siap dikonversi|टर्नओवर पूरा · रूपांतरण योग्य
待完成有效流水|待完成有效流水|Valid turnover pending|Pusing ganti sah belum selesai|Chưa hoàn thành doanh thu hợp lệ|รอทำเทิร์นที่มีผล|Turnover valid belum selesai|मान्य टर्नओवर बाकी
可继续再存|可繼續再存|Reload available again|Boleh reload semula|Có thể nạp lại tiếp|ฝากซ้ำได้อีก|Bisa reload lagi|फिर रीलोड किया जा सकता है
活动钱包（本金+彩金）|活動錢包（本金+彩金）|Promo wallet (stake + bonus)|Dompet aktiviti (pokok + bonus)|Ví sự kiện (gốc + thưởng)|กระเป๋ากิจกรรม (เงินต้น+โบนัส)|Dompet promo (pokok + bonus)|प्रोमो वॉलेट (मूलधन + बोनस)
完成流水后才可转换|完成流水後才可轉換|Convertible only after turnover|Boleh ditukar selepas pusing ganti|Chỉ chuyển sau khi đủ doanh thu|แปลงได้เมื่อทำเทิร์นครบ|Bisa dikonversi setelah turnover|टर्नओवर के बाद ही रूपांतरण
符合资格的再存入账后显示|符合資格的再存入帳後顯示|Shown after a qualifying reload posts|Dipaparkan selepas reload layak masuk|Hiện sau khi nạp lại đủ điều kiện vào tài khoản|แสดงเมื่อฝากซ้ำที่มีสิทธิ์เข้าบัญชี|Tampil setelah reload memenuhi syarat masuk|योग्य रीलोड जमा होने पर दिखेगा
累计已领再存彩金|累計已領再存彩金|Reload bonus claimed in total|Jumlah bonus reload dituntut|Tổng thưởng nạp lại đã nhận|โบนัสฝากซ้ำที่รับแล้วรวม|Total bonus reload diklaim|कुल दावा किया रीलोड बोनस
完成流水后转换入此余额|完成流水後轉換入此餘額|Converted here after turnover|Ditukar ke sini selepas pusing ganti|Chuyển vào số dư này sau doanh thu|แปลงเข้ายอดนี้เมื่อทำเทิร์นครบ|Dikonversi ke sini setelah turnover|टर्नओवर बाद यहाँ रूपांतरित
再存金额|再存金額|Reload amount|Jumlah reload|Số tiền nạp lại|ยอดฝากซ้ำ|Jumlah reload|रीलोड राशि
可得彩金|可得彩金|Bonus amount|Jumlah bonus|Số thưởng nhận được|โบนัสที่ได้รับ|Jumlah bonus|बोनस राशि
所需有效流水|所需有效流水|Required valid turnover|Pusing ganti sah diperlukan|Doanh thu hợp lệ cần đạt|เทิร์นที่มีผลที่ต้องทำ|Turnover valid yang dibutuhkan|आवश्यक मान्य टर्नओवर
演示捕鱼投注 RM200|演示捕魚投注 RM200|Demo fishing bet RM200|Demo pertaruhan meriam ikan RM200|Demo cược bắn cá RM200|เดโมเดิมพันยิงปลา RM200|Demo taruhan tembak ikan RM200|डेमो फिशिंग दांव RM200
可转换金额|可轉換金額|Amount convertible|Jumlah boleh ditukar|Số tiền có thể chuyển|ยอดที่แปลงได้|Jumlah yang bisa dikonversi|रूपांतरण योग्य राशि
流水已完成|流水已完成|Turnover complete|Pusing ganti selesai|Doanh thu đã đủ|เทิร์นครบแล้ว|Turnover selesai|टर्नओवर पूरा
活动钱包（转换后清零）|活動錢包（轉換後清零）|Promo wallet (cleared after conversion)|Dompet aktiviti (dikosongkan selepas tukar)|Ví sự kiện (xóa sau khi chuyển)|กระเป๋ากิจกรรม (เคลียร์หลังแปลง)|Dompet promo (dikosongkan setelah konversi)|प्रोमो वॉलेट (रूपांतरण बाद खाली)
可提款余额（到账后）|可提款餘額（到賬後）|Withdrawable balance (after credit)|Baki boleh dikeluarkan (selepas masuk)|Số dư có thể rút (sau khi vào)|ยอดถอนได้ (หลังเข้าบัญชี)|Saldo yang bisa ditarik (setelah masuk)|निकासी योग्य शेष (जमा के बाद)
活动重叠与演示日|活動重疊與演示日|Overlap and demo day|Bertindih dan hari demo|Trùng ưu đãi và ngày demo|ทับซ้อนและวันเดโม|Tumpang tindih dan hari demo|ओवरलैप और डेमो दिन
演示账户|演示賬戶|Demo account|Akaun demo|Tài khoản demo|บัญชีเดโม|Akun demo|डेमो खाता
有效流水（仅计真人）|有效流水（僅計真人）|Valid turnover (live only)|Pusing ganti sah (live sahaja)|Doanh thu hợp lệ (chỉ live)|เทิร์นที่มีผล (นับเฉพาะไลฟ์)|Turnover valid (hanya live)|मान्य टर्नओवर (केवल लाइव)
有效流水（仅计老虎机、捕鱼）|有效流水（僅計老虎機、捕魚）|Valid turnover (slots and fishing only)|Pusing ganti sah (slot dan meriam ikan sahaja)|Doanh thu hợp lệ (chỉ slots và bắn cá)|เทิร์นที่มีผล (นับเฉพาะสล็อตและยิงปลา)|Turnover valid (hanya slot dan tembak ikan)|मान्य टर्नओवर (केवल स्लॉट और फिशिंग)
本笔再存|本筆再存|This reload|Reload ini|Lần nạp lại này|การฝากซ้ำนี้|Reload ini|यह रीलोड
再存活动钱包|再存活動錢包|Reload promo wallet|Dompet aktiviti reload|Ví sự kiện nạp lại|กระเป๋ากิจกรรมฝากซ้ำ|Dompet promo reload|रीलोड प्रोमो वॉलेट
每日再存 · 不限次数|每日再存 · 不限次數|Daily reload · unlimited claims|Reload harian · tiada had tuntutan|Nạp lại hằng ngày · không giới hạn lần|ฝากซ้ำรายวัน · ไม่จำกัดครั้ง|Reload harian · tanpa batas klaim|दैनिक रीलोड · असीमित दावे
每日再存额外领取10%，按单笔再存计算，最高按类别上限（最高RM300）。每日不限次数。|每日再存額外領取10%，按單筆再存計算，最高按類別上限（最高RM300）。每日不限次數。|Daily reload 10% bonus, capped per deposit by category (up to RM300). Unlimited claims per day.|Bonus reload harian 10%, had setiap deposit mengikut kategori (maks. RM300). Tiada had tuntutan setiap hari.|Thưởng nạp lại 10% mỗi ngày, trần theo từng lần nạp và loại game (tối đa RM300). Không giới hạn số lần trong ngày.|โบนัสฝากซ้ำ 10% คิดรายรายการตามเพดานหมวด (สูงสุด RM300) ไม่จำกัดครั้งต่อวัน|Bonus reload harian 10%, batas per deposit sesuai kategori (maks. RM300). Klaim harian tidak terbatas.|दैनिक रीलोड 10% बोनस, जमा/श्रेणी की सीमा (अधिकतम RM300)। प्रतिदिन असीमित दावे।
每日进行符合资格的再存，即可领取10%彩金。每日不限领取次数，每笔符合资格的再存均可单独领取。|每日進行符合資格的再存，即可領取10%彩金。每日不限領取次數，每筆符合資格的再存均可單獨領取。|A 10% bonus is given on each qualifying reload. There is no daily claim limit; each qualifying deposit can be claimed separately.|Bonus 10% diberikan untuk setiap reload yang layak. Tiada had tuntutan harian; setiap deposit yang layak boleh dituntut berasingan.|Mỗi lần nạp lại đủ điều kiện được thưởng 10%. Không giới hạn số lần mỗi ngày; từng khoản nạp đủ điều kiện được nhận riêng.|ฝากซ้ำที่เข้าเงื่อนไขได้รับโบนัส 10% ไม่จำกัดครั้งต่อวัน และแต่ละรายการที่เข้าเงื่อนไขรับแยกกัน|Reload yang memenuhi syarat mendapat bonus 10%. Tidak ada batas klaim harian; setiap deposit yang memenuhi syarat diklaim terpisah.|योग्य रीलोड पर 10% बोनस। प्रतिदिन कोई सीमा नहीं; हर योग्य जमा अलग दावा।
彩金按照实际充值金额计算，不超过对应类别上限（按单笔再存计算：真人最高RM100，老虎机、捕鱼最高RM300）。|彩金按照實際儲值金額計算，不超過對應類別上限（按單筆再存計算：真人最高RM100，老虎機、捕魚最高RM300）。|Bonus is calculated from the actual deposit amount, capped per deposit by category (live up to RM100; slots and fishing up to RM300).|Bonus dikira daripada jumlah deposit sebenar, dengan had setiap deposit mengikut kategori (live maks. RM100; slot dan meriam ikan maks. RM300).|Tiền thưởng tính theo số tiền nạp thực tế, không vượt trần từng lần theo loại (live tối đa RM100; slots và bắn cá tối đa RM300).|โบนัสคิดจากยอดฝากจริง ไม่เกินเพดานรายรายการตามหมวด (ไลฟ์สูงสุด RM100 สล็อตและยิงปลาสูงสุด RM300)|Bonus dihitung dari jumlah deposit aktual, dibatasi per deposit sesuai kategori (live maks. RM100; slot dan tembak ikan maks. RM300).|बोनस वास्तविक जमा पर, प्रति जमा श्रेणी सीमा (लाइव RM100; स्लॉट/फिशिंग RM300)।
每日不限领取次数。完成本笔转换后，可在同一演示日继续再存；也可使用「模拟次日」查看跨日流程。|每日不限領取次數。完成本筆轉換後，可在同一演示日繼續再存；也可使用「模擬次日」查看跨日流程。|Unlimited claims per day. After converting this reload, you can reload again on the same demo day, or use “Simulate next day” to preview the next day.|Tiada had tuntutan setiap hari. Selepas menukar reload ini, anda boleh reload lagi pada hari demo yang sama, atau guna “Simulasi hari berikutnya”.|Không giới hạn số lần mỗi ngày. Sau khi chuyển khoản này, bạn có thể nạp lại trong cùng ngày demo, hoặc dùng “Mô phỏng ngày hôm sau”.|ไม่จำกัดครั้งต่อวัน หลังแปลงรายการนี้สามารถฝากซ้ำในวันเดโมเดียวกัน หรือใช้ “จำลองวันถัดไป”|Klaim harian tidak terbatas. Setelah konversi reload ini, Anda bisa reload lagi di hari demo yang sama, atau gunakan “Simulasikan hari berikutnya”.|प्रतिदिन असीमित दावे। रूपांतरण के बाद उसी डेमो दिन फिर रीलोड करें, या “अगला दिन सिमुलेट करें”।
单笔充值满RM100或以上获得1次抽奖，次数每日更新，彩金需完成3倍流水后转现金。|單筆儲值滿RM100或以上獲得1次抽獎，次數每日更新，彩金需完成3倍流水後轉現金。|One spin for each single deposit of RM100 or more. Spins refresh daily. Bonus converts to cash after 3x valid turnover.|Satu putaran untuk setiap deposit tunggal RM100 atau lebih. Putaran dikemas kini setiap hari. Bonus ditukar kepada tunai selepas 3x pusing ganti sah.|Mỗi lần nạp đơn từ RM100 trở lên được 1 lượt quay. Lượt quay làm mới mỗi ngày. Thưởng đổi ra tiền mặt sau 3 lần doanh thu hợp lệ.|ฝากครั้งเดียวครบ RM100 ขึ้นไปได้ 1 ครั้ง หมุนรีเซ็ตทุกวัน โบนัสแปลงเป็นเงินสดหลังเทิร์น 3 เท่า|Satu putaran untuk setiap deposit tunggal RM100 atau lebih. Putaran disegarkan setiap hari. Bonus dikonversi ke tunai setelah turnover 3x.|प्रत्येक एकल जमा RM100+ पर एक स्पिन। स्पिन प्रतिदिन रीफ़्रेश। 3 गुना टर्नओवर के बाद नकद।
每成功充值一笔满RM100或以上，即可获得1次免费抽奖机会。|每成功儲值一筆滿RM100或以上，即可獲得1次免費抽獎機會。|Each successful single deposit of RM100 or more grants 1 free spin.|Setiap deposit tunggal yang berjaya sebanyak RM100 atau lebih memberi 1 putaran percuma.|Mỗi lần nạp đơn thành công từ RM100 trở lên được 1 lượt quay miễn phí.|ฝากครั้งเดียวสำเร็จครบ RM100 ขึ้นไป รับสิทธิ์หมุนฟรี 1 ครั้ง|Setiap deposit tunggal berhasil sebesar RM100 atau lebih memberi 1 putaran gratis.|हर सफल एकल जमा RM100+ पर 1 मुफ्त स्पिन।
未使用的抽奖次数不结转至次日，每日抽奖次数于00:00更新。|未使用的抽獎次數不結轉至次日，每日抽獎次數於00:00更新。|Unused spins do not carry over. Daily spin counts refresh at 00:00.|Putaran yang tidak digunakan tidak dibawa ke hari berikutnya. Kiraan putaran harian dikemas kini pada 00:00.|Lượt quay chưa dùng không chuyển sang ngày hôm sau. Số lượt trong ngày làm mới lúc 00:00.|สิทธิ์หมุนที่ยังไม่ใช้ไม่ย้ายวัน รีเซ็ตทุกวันเวลา 00:00|Putaran yang tidak terpakai tidak dibawa ke hari berikutnya. Hitungan harian disegarkan pukul 00:00.|अप्रयुक्त स्पिन अगले दिन नहीं जाते। दैनिक गिनती 00:00 पर रीफ़्रेश।
单笔充值满RM100或以上获得抽奖|單筆儲值滿RM100或以上獲得抽獎|A single deposit of RM100 or more earns a spin|Deposit tunggal RM100 atau lebih memberi putaran|Nạp đơn từ RM100 trở lên được lượt quay|ฝากครั้งเดียวครบ RM100 ขึ้นไปได้รับสิทธิ์หมุน|Deposit tunggal RM100 atau lebih mendapat putaran|RM100+ की एकल जमा पर स्पिन
每日最多3次抽奖，次数每日更新|每日最多3次抽獎，次數每日更新|Up to 3 spins per day, refreshed daily|Maksimum 3 putaran sehari, dikemas kini setiap hari|Tối đa 3 lượt quay mỗi ngày, làm mới hằng ngày|วันละไม่เกิน 3 ครั้ง รีเซ็ตทุกวัน|Maksimal 3 putaran per hari, disegarkan setiap hari|प्रतिदिन अधिकतम 3 स्पिन, प्रतिदिन रीफ़्रेश
演示充值 RM150（满RM100或以上，获得1次）|演示儲值 RM150（滿RM100或以上，獲得1次）|Demo deposit RM150 (RM100 or more, 1 spin)|Demo deposit RM150 (RM100 atau lebih, 1 putaran)|Demo nạp RM150 (RM100 trở lên, 1 lượt)|เดโมฝาก RM150 (ครบ RM100 ขึ้นไป ได้ 1 ครั้ง)|Demo deposit RM150 (RM100 atau lebih, 1 putaran)|डेमो जमा RM150 (RM100+, 1 स्पिन)
演示充值 RM100（满RM100，获得1次）|演示儲值 RM100（滿RM100，獲得1次）|Demo deposit RM100 (meets RM100, 1 spin)|Demo deposit RM100 (cukup RM100, 1 putaran)|Demo nạp RM100 (đủ RM100, 1 lượt)|เดโมฝาก RM100 (ครบ RM100 ได้ 1 ครั้ง)|Demo deposit RM100 (mencapai RM100, 1 putaran)|डेमो जमा RM100 (RM100 पूरा, 1 स्पिन)
演示充值 RM50（未满RM100，不获得次数）|演示儲值 RM50（未滿RM100，不獲得次數）|Demo deposit RM50 (below RM100, no spin)|Demo deposit RM50 (kurang daripada RM100, tiada putaran)|Demo nạp RM50 (dưới RM100, không có lượt)|เดโมฝาก RM50 (ไม่ครบ RM100 ไม่ได้สิทธิ์)|Demo deposit RM50 (kurang dari RM100, tidak ada putaran)|डेमो जमा RM50 (RM100 से कम, कोई स्पिन नहीं)
单笔充值须满 RM100 或以上才可获得抽奖机会。充值不可合并计算抽奖次数。|單筆儲值須滿 RM100 或以上才可獲得抽獎機會。儲值不可合併計算抽獎次數。|A single deposit must be RM100 or more to earn a spin. Deposits cannot be combined.|Deposit tunggal mestilah RM100 atau lebih untuk mendapat putaran. Deposit tidak boleh digabung.|Nạp đơn phải từ RM100 trở lên mới được lượt quay. Không cộng dồn nhiều lần nạp.|ต้องฝากครั้งเดียวครบ RM100 ขึ้นไปจึงได้สิทธิ์หมุน รวมหลายรายการไม่ได้|Deposit tunggal harus RM100 atau lebih untuk mendapat putaran. Deposit tidak bisa digabung.|स्पिन के लिए एकल जमा RM100+ होनी चाहिए। जमा जोड़कर नहीं गिने जाते।
请先完成单笔满 RM100 或以上的充值以获得抽奖次数|請先完成單筆滿 RM100 或以上的儲值以獲得抽獎次數|Complete a single deposit of RM100 or more to get spins first|Sila lengkapkan deposit tunggal RM100 atau lebih untuk mendapat putaran|Hãy hoàn tất một lần nạp từ RM100 trở lên để nhận lượt quay|ฝากครั้งเดียวครบ RM100 ขึ้นไปเพื่อรับสิทธิ์หมุนก่อน|Selesaikan deposit tunggal RM100 atau lebih untuk mendapat putaran|पहले RM100+ की एकल जमा पूरी करें
已模拟次日 00:00，今日抽奖次数已更新，未使用次数不结转|已模擬次日 00:00，今日抽獎次數已更新，未使用次數不結轉|Simulated next day 00:00. Today’s spins have refreshed; unused spins did not carry over.|Disimulasikan hari berikutnya 00:00. Putaran hari ini telah dikemas kini; putaran yang tidak digunakan tidak dibawa.|Đã mô phỏng 00:00 ngày hôm sau. Lượt quay hôm nay đã làm mới; lượt chưa dùng không được chuyển.|จำลอง 00:00 วันถัดไป สิทธิ์หมุนวันนี้รีเซ็ตแล้ว ของที่ยังไม่ใช้ไม่ย้ายไป|Hari berikutnya 00:00 disimulasikan. Putaran hari ini disegarkan; yang tidak terpakai tidak dibawa.|अगला दिन 00:00 सिमुलेट। आज के स्पिन रीफ़्रेश; अप्रयुक्त नहीं गए।
每成功充值一笔满RM100或以上，即可获得1次免费抽奖机会。充值不可合并计算抽奖次数。未使用次数不结转至次日。|每成功儲值一筆滿RM100或以上，即可獲得1次免費抽獎機會。儲值不可合併計算抽獎次數。未使用次數不結轉至次日。|Each successful single deposit of RM100 or more grants 1 free spin. Deposits cannot be combined. Unused spins do not carry over.|Setiap deposit tunggal berjaya RM100 atau lebih memberi 1 putaran percuma. Deposit tidak boleh digabung. Putaran tidak digunakan tidak dibawa ke hari berikutnya.|Mỗi lần nạp đơn thành công từ RM100 trở lên được 1 lượt quay miễn phí. Không cộng dồn. Lượt chưa dùng không chuyển sang ngày hôm sau.|ฝากครั้งเดียวสำเร็จครบ RM100 ขึ้นไปได้สิทธิ์หมุนฟรี 1 ครั้ง รวมรายการไม่ได้ สิทธิ์ที่ยังไม่ใช้ไม่ย้ายวัน|Setiap deposit tunggal berhasil RM100 atau lebih memberi 1 putaran gratis. Deposit tidak bisa digabung. Putaran tak terpakai tidak dibawa ke hari berikutnya.|हर सफल एकल जमा RM100+ पर 1 मुफ्त स्पिन। जमा नहीं जोड़े जाते। अप्रयुक्त स्पिन नहीं जाते।
须连续7天或以上未上线。|須連續7天或以上未上線。|Requires being offline for 7 consecutive days or more.|Perlu tidak log masuk selama 7 hari berturut-turut atau lebih.|Cần không đăng nhập liên tục từ 7 ngày trở lên.|ต้องออฟไลน์ติดต่อกัน 7 วันขึ้นไป|Harus tidak masuk selama 7 hari berturut-turut atau lebih.|लगातार 7+ दिन ऑफ़लाइन होना आवश्यक।
须连续7天或以上未上线，方可参与本活动。|須連續7天或以上未上線，方可參與本活動。|You must have been offline for 7 consecutive days or more to join this promo.|Anda mestilah tidak log masuk selama 7 hari berturut-turut atau lebih untuk menyertai promosi ini.|Phải không đăng nhập liên tục từ 7 ngày trở lên mới được tham gia ưu đãi này.|ต้องออฟไลน์ติดต่อกัน 7 วันขึ้นไปจึงร่วมโปรนี้ได้|Anda harus tidak masuk selama 7 hari berturut-turut atau lebih untuk ikut promo ini.|इस ऑफ़र में शामिल होने के लिए 7+ दिन ऑफ़लाइन होना आवश्यक।
上次登录：8天前（已满7天未上线）|上次登錄：8天前（已滿7天未上線）|Last login: 8 days ago (7-day offline requirement met)|Log masuk terakhir: 8 hari lalu (syarat 7 hari tidak atas talian dipenuhi)|Lần đăng nhập trước: 8 ngày trước (đã đủ 7 ngày không online)|เข้าสู่ระบบล่าสุด: 8 วันที่แล้ว (ครบ 7 วันไม่ได้ออนไลน์)|Login terakhir: 8 hari lalu (syarat 7 hari offline terpenuhi)|अंतिम लॉगिन: 8 दिन पहले (7 दिन ऑफ़लाइन पूरा)
上次登录：3天前（未满7天未上线，不符资格）|上次登錄：3天前（未滿7天未上線，不符資格）|Last login: 3 days ago (offline for less than 7 days, ineligible)|Log masuk terakhir: 3 hari lalu (kurang daripada 7 hari tidak atas talian, tidak layak)|Lần đăng nhập trước: 3 ngày trước (chưa đủ 7 ngày không online, không đủ điều kiện)|เข้าสู่ระบบล่าสุด: 3 วันที่แล้ว (ไม่ครบ 7 วัน ไม่มีสิทธิ์)|Login terakhir: 3 hari lalu (offline kurang dari 7 hari, tidak layak)|अंतिम लॉगिन: 3 दिन पहले (7 दिन से कम, अयोग्य)
已认证 · 已充值 · 已满7天未上线|已認證 · 已儲值 · 已滿7天未上線|Verified · deposited · offline for 7 days|Disahkan · telah deposit · 7 hari tidak atas talian|Đã xác minh · đã nạp · đủ 7 ngày không online|ยืนยันแล้ว · ฝากแล้ว · ออฟไลน์ครบ 7 วัน|Terverifikasi · sudah deposit · 7 hari offline|सत्यापित · जमा हो चुका · 7 दिन ऑफ़लाइन
演示上次登录不足7天（不符资格）|演示上次登錄不足7天（不符資格）|Demo: last login less than 7 days ago (ineligible)|Demo: log masuk terakhir kurang daripada 7 hari (tidak layak)|Demo: lần đăng nhập trước chưa đủ 7 ngày (không đủ điều kiện)|เดโม: เข้าสู่ระบบล่าสุดไม่ครบ 7 วัน (ไม่มีสิทธิ์)|Demo: login terakhir kurang dari 7 hari (tidak layak)|डेमो: अंतिम लॉगिन 7 दिन से कम (अयोग्य)
恢复为上次登录：8天前|恢復為上次登錄：8天前|Restore last login: 8 days ago|Pulihkan log masuk terakhir: 8 hari lalu|Khôi phục lần đăng nhập trước: 8 ngày trước|คืนค่าเข้าสู่ระบบล่าสุด: 8 วันที่แล้ว|Pulihkan login terakhir: 8 hari lalu|अंतिम लॉगिन बहाल करें: 8 दिन पहले
已恢复为上次登录：8天前（已满7天未上线）|已恢復為上次登錄：8天前（已滿7天未上線）|Restored last login to 8 days ago (7-day offline requirement met)|Log masuk terakhir dipulihkan kepada 8 hari lalu (syarat 7 hari dipenuhi)|Đã khôi phục lần đăng nhập trước thành 8 ngày trước (đã đủ 7 ngày)|คืนค่าเข้าสู่ระบบล่าสุดเป็น 8 วันที่แล้ว (ครบ 7 วัน)|Login terakhir dipulihkan ke 8 hari lalu (syarat 7 hari terpenuhi)|अंतिम लॉगिन 8 दिन पहले बहाल (7 दिन पूरा)
已切换为上次登录：3天前（未满7天未上线，不符资格）|已切換為上次登錄：3天前（未滿7天未上線，不符資格）|Switched last login to 3 days ago (offline for less than 7 days, ineligible)|Log masuk terakhir ditukar kepada 3 hari lalu (kurang daripada 7 hari, tidak layak)|Đã đổi lần đăng nhập trước thành 3 ngày trước (chưa đủ 7 ngày, không đủ điều kiện)|เปลี่ยนเข้าสู่ระบบล่าสุดเป็น 3 วันที่แล้ว (ไม่ครบ 7 วัน ไม่มีสิทธิ์)|Login terakhir diubah ke 3 hari lalu (kurang dari 7 hari, tidak layak)|अंतिम लॉगिन 3 दिन पहले किया (7 दिन से कम, अयोग्य)
已领取后不再改变登录间隔演示|已領取後不再改變登錄間隔演示|Login-interval demo cannot be changed after claiming|Demo selang log masuk tidak boleh diubah selepas menuntut|Không thể đổi khoảng thời gian đăng nhập sau khi đã nhận|หลังรับแล้วไม่สามารถเปลี่ยนระยะห่างการเข้าสู่ระบบได้|Demo interval login tidak bisa diubah setelah klaim|दावा करने के बाद लॉगिन अंतराल डेमो नहीं बदल सकता
须为历史上曾经成功充值、已完成实名认证，且连续7天或以上未上线的老会员。|須為歷史上曾經成功儲值、已完成實名認證，且連續7天或以上未上線的老會員。|Must be a returning member who has deposited before, completed verification, and been offline for 7 consecutive days or more.|Mesti ahli kembali yang pernah deposit, selesai pengesahan, dan tidak log masuk selama 7 hari berturut-turut atau lebih.|Phải là thành viên cũ đã từng nạp thành công, hoàn tất xác minh, và không đăng nhập liên tục từ 7 ngày trở lên.|ต้องเป็นสมาชิกเก่าที่เคยฝากสำเร็จ ยืนยันตัวตนแล้ว และออฟไลน์ติดต่อกัน 7 วันขึ้นไป|Harus anggota lama yang pernah deposit, selesai verifikasi, dan tidak masuk 7 hari berturut-turut atau lebih.|पहले जमा, सत्यापन पूरा, और 7+ दिन ऑफ़लाइन वाले रिटर्निंग सदस्य होने चाहिए।
须为历史上曾经成功充值、已完成实名认证，且连续7天或以上未上线的老会员。每位合格会员仅可领取一次。|須為歷史上曾經成功儲值、已完成實名認證，且連續7天或以上未上線的老會員。每位合格會員僅可領取一次。|Must be a returning member who has deposited before, completed verification, and been offline for 7 consecutive days or more. Each eligible member may claim once only.|Mesti ahli kembali yang pernah deposit, selesai pengesahan, dan tidak log masuk selama 7 hari atau lebih. Setiap ahli yang layak hanya boleh menuntut sekali.|Phải là thành viên cũ đã từng nạp, hoàn tất xác minh và không đăng nhập từ 7 ngày trở lên. Mỗi hội viên đủ điều kiện chỉ được nhận một lần.|ต้องเป็นสมาชิกเก่าที่เคยฝาก ยืนยันตัวตน และออฟไลน์ 7 วันขึ้นไป สมาชิกที่มีสิทธิ์รับได้เพียงครั้งเดียว|Harus anggota lama yang pernah deposit, terverifikasi, dan offline 7 hari atau lebih. Setiap anggota yang layak hanya bisa klaim sekali.|पहले जमा, सत्यापित और 7+ दिन ऑफ़लाइन रिटर्निंग सदस्य। योग्य सदस्य केवल एक बार दावा कर सकते हैं।
当前演示为已登录、已完成实名认证、历史上有成功充值，且上次登录为8天前（已满7天未上线）的老会员。|當前演示為已登錄、已完成實名認證、歷史上有成功儲值，且上次登錄為8天前（已滿7天未上線）的老會員。|This demo member is signed in, verified, has a previous successful deposit, and last logged in 8 days ago (7-day offline requirement met).|Ahli demo ini telah log masuk, disahkan, pernah deposit berjaya, dan log masuk terakhir 8 hari lalu (syarat 7 hari dipenuhi).|Tài khoản demo đã đăng nhập, xác minh, từng nạp thành công, và lần đăng nhập trước là 8 ngày trước (đã đủ 7 ngày).|เดโมนี้ล็อกอินแล้ว ยืนยันตัวตนแล้ว เคยฝากสำเร็จ และเข้าสู่ระบบล่าสุด 8 วันที่แล้ว (ครบ 7 วัน)|Anggota demo ini sudah masuk, terverifikasi, pernah deposit berhasil, dan login terakhir 8 hari lalu (syarat 7 hari terpenuhi).|यह डेमो सदस्य लॉगिन, सत्यापित, पहले जमा कर चुका है, और 8 दिन पहले लॉगिन किया (7 दिन पूरा)।
当前演示上次登录为3天前，未满连续7天未上线。|當前演示上次登錄為3天前，未滿連續7天未上線。|In this demo, the last login was 3 days ago, which is less than 7 consecutive days offline.|Dalam demo ini, log masuk terakhir ialah 3 hari lalu, kurang daripada 7 hari berturut-turut tidak atas talian.|Trong bản demo này, lần đăng nhập trước là 3 ngày trước, chưa đủ 7 ngày không online liên tục.|ในเดโมนี้เข้าสู่ระบบล่าสุด 3 วันที่แล้ว ซึ่งไม่ครบ 7 วันติดต่อกัน|Dalam demo ini, login terakhir 3 hari lalu, kurang dari 7 hari offline berturut-turut.|इस डेमो में अंतिम लॉगिन 3 दिन पहले था, जो 7 दिन से कम है।
邀请奖励已发放|邀請獎勵已發放|Referral reward issued|Ganjaran rujukan telah dikeluarkan|Thưởng giới thiệu đã được cấp|จ่ายรางวัลแนะนำแล้ว|Hadiah referral telah diberikan|रेफ़रल इनाम जारी
该好友累计已解锁|該好友累計已解鎖|Unlocked from this friend|Telah dinyahkunci daripada rakan ini|Đã mở khóa từ bạn này|ปลดล็อกจากเพื่อนคนนี้แล้ว|Telah dibuka dari teman ini|इस मित्र से अनलॉक
实名认证。系统自动解锁对应邀请奖励。|實名認證。系統自動解鎖對應邀請獎勵。|Identity verified. The matching referral reward was unlocked automatically.|Pengesahan identiti selesai. Ganjaran rujukan dipadankan telah dinyahkunci secara automatik.|Đã xác minh danh tính. Phần thưởng giới thiệu tương ứng được mở khóa tự động.|ยืนยันตัวตนแล้ว ระบบปลดล็อกรางวัลแนะนำให้อัตโนมัติ|Identitas terverifikasi. Hadiah referral yang sesuai dibuka otomatis.|पहचान सत्यापित। संबंधित रेफ़रल इनाम अपने आप अनलॉक।
累计充值RM100。系统自动解锁对应邀请奖励。|累計儲值RM100。系統自動解鎖對應邀請獎勵。|Cumulative deposits reached RM100. The matching referral reward was unlocked automatically.|Deposit terkumpul mencecah RM100. Ganjaran rujukan dipadankan telah dinyahkunci secara automatik.|Nạp tích lũy đạt RM100. Phần thưởng giới thiệu tương ứng được mở khóa tự động.|ยอดฝากสะสมครบ RM100 ระบบปลดล็อกรางวัลแนะนำให้อัตโนมัติ|Deposit kumulatif mencapai RM100. Hadiah referral yang sesuai dibuka otomatis.|संचयी जमा RM100। संबंधित रेफ़रल इनाम अपने आप अनलॉक।
有效投注RM1,000。系统自动解锁对应邀请奖励。|有效投注RM1,000。系統自動解鎖對應邀請獎勵。|Valid bets reached RM1,000. The matching referral reward was unlocked automatically.|Pertaruhan sah mencecah RM1,000. Ganjaran rujukan dipadankan telah dinyahkunci secara automatik.|Cược hợp lệ đạt RM1,000. Phần thưởng giới thiệu tương ứng được mở khóa tự động.|เดิมพันที่มีผลครบ RM1,000 ระบบปลดล็อกรางวัลแนะนำให้อัตโนมัติ|Taruhan valid mencapai RM1,000. Hadiah referral yang sesuai dibuka otomatis.|मान्य दांव RM1,000। संबंधित रेफ़रल इनाम अपने आप अनलॉक।
有效投注累计至上限。系统自动解锁对应邀请奖励。|有效投注累計至上限。系統自動解鎖對應邀請獎勵。|Valid bets have reached this friend’s reward cap. The remaining referral reward was unlocked automatically.|Pertaruhan sah telah mencapai had ganjaran rakan ini. Baki ganjaran rujukan telah dinyahkunci secara automatik.|Cược hợp lệ đã đạt trần thưởng của bạn này. Phần thưởng giới thiệu còn lại được mở khóa tự động.|เดิมพันที่มีผลครบเพดานรางวัลของเพื่อนคนนี้ ระบบปลดล็อกรางวัลที่เหลือให้อัตโนมัติ|Taruhan valid mencapai batas hadiah teman ini. Sisa hadiah referral dibuka otomatis.|मान्य दांव इस मित्र की सीमा तक पहुँचे। शेष रेफ़रल इनाम अनलॉक।
邀请好友挑战|邀請好友挑戰|Invite-friends challenge|Cabaran jemput rakan|Thử thách mời bạn|ความท้าทายชวนเพื่อน|Tantangan undang teman|मित्र आमंत्रण चुनौती
已认证 · 待领取|已認證 · 待領取|Verified · ready to claim|Disahkan · sedia dituntut|Đã xác minh · chờ nhận|ยืนยันแล้ว · พร้อมรับ|Terverifikasi · siap diklaim|सत्यापित · दावे के लिए तैयार
已认证 · 待充值|已認證 · 待儲值|Verified · pending deposit|Disahkan · menunggu deposit|Đã xác minh · chờ nạp|ยืนยันแล้ว · รอฝาก|Terverifikasi · menunggu deposit|सत्यापित · जमा बाकी
已认证 · 待参与|已認證 · 待參與|Verified · ready to join|Disahkan · sedia menyertai|Đã xác minh · chờ tham gia|ยืนยันแล้ว · พร้อมร่วม|Terverifikasi · siap ikut|सत्यापित · शामिल होने को तैयार
已认证 · 尚未充值|已認證 · 尚未儲值|Verified · no deposit yet|Disahkan · belum deposit|Đã xác minh · chưa nạp|ยืนยันแล้ว · ยังไม่ฝาก|Terverifikasi · belum deposit|सत्यापित · अभी जमा नहीं
演示两笔各 RM80（不可合并，不获得次数）|演示兩筆各 RM80（不可合併，不獲得次數）|Demo two RM80 deposits (cannot combine, no spin)|Demo dua deposit RM80 (tidak boleh digabung, tiada putaran)|Demo hai lần nạp RM80 (không gộp, không có lượt)|เดโมฝากสองรายการละ RM80 (รวมไม่ได้ ไม่ได้สิทธิ์หมุน)|Demo dua deposit RM80 (tidak bisa digabung, tidak ada putaran)|दो RM80 जमा डेमो (जोड़ नहीं सकते, कोई स्पिन नहीं)
演示取消或退款充值 RM200（不产生抽奖机会）|演示取消或退款儲值 RM200（不產生抽獎機會）|Demo cancelled or refunded RM200 deposit (no spin)|Demo deposit RM200 dibatalkan atau dipulangkan (tiada putaran)|Demo nạp RM200 bị hủy hoặc hoàn (không có lượt)|เดโมฝาก RM200 ที่ยกเลิกหรือคืนเงิน (ไม่ได้สิทธิ์หมุน)|Demo deposit RM200 dibatalkan atau refund (tidak ada putaran)|डेमो रद्द/रिफंड जमा RM200 (कोई स्पिन नहीं)
模拟次日（演示用）|模擬次日（演示用）|Simulate next day (demo)|Simulasi hari berikutnya (demo)|Mô phỏng ngày hôm sau (demo)|จำลองวันถัดไป (เดโม)|Simulasikan hari berikutnya (demo)|अगला दिन सिमुलेट करें (डेमो)
去充值获得抽奖次数|去儲值獲得抽獎次數|Deposit to get spins|Deposit untuk mendapat putaran|Nạp để nhận lượt quay|ฝากเพื่อรับสิทธิ์หมุน|Deposit untuk mendapat putaran|स्पिन पाने के लिए जमा करें
待升级后领取|待升級後領取|Claim after upgrading|Tuntut selepas naik taraf|Nhận sau khi nâng cấp|รับหลังอัปเกรด|Klaim setelah upgrade|अपग्रेड के बाद दावा करें
待保级结果|待保級結果|Waiting for retention result|Menunggu keputusan pengekalan|Chờ kết quả giữ hạng|รอผลคงระดับ|Menunggu hasil retensi|रिटेंशन परिणाम की प्रतीक्षा
待有效投注|待有效投注|Waiting for valid bets|Menunggu pertaruhan sah|Chờ cược hợp lệ|รอเดิมพันที่มีผล|Menunggu taruhan valid|मान्य दांव की प्रतीक्षा
本周可领取|本週可領取|Available this week|Boleh dituntut minggu ini|Có thể nhận trong tuần này|รับได้ในสัปดาห์นี้|Dapat diklaim minggu ini|इस सप्ताह दावा योग्य
节日期间可领取|節日期間可領取|Available during the festival|Boleh dituntut semasa perayaan|Có thể nhận trong thời gian lễ|รับได้ในช่วงเทศกาล|Dapat diklaim selama festival|त्योहार के दौरान दावा योग्य
未参加|未參加|Not joined|Belum menyertai|Chưa tham gia|ยังไม่ร่วม|Belum ikut|शामिल नहीं
待首次充值|待首次儲值|Waiting for first deposit|Menunggu deposit pertama|Chờ nạp lần đầu|รอการฝากครั้งแรก|Menunggu deposit pertama|पहली जमा की प्रतीक्षा
演示首次充值 MYR 2,944|演示首次儲值 MYR 2,944|Demo first deposit MYR 2,944|Demo deposit pertama MYR 2,944|Demo nạp lần đầu MYR 2,944|เดโมฝากครั้งแรก MYR 2,944|Demo deposit pertama MYR 2,944|डेमो पहली जमा MYR 2,944
第3期进行中|第3期進行中|Period 3 in progress|Tempoh 3 sedang berlangsung|Kỳ 3 đang diễn ra|งวดที่ 3 กำลังดำเนินการ|Periode 3 sedang berjalan|अवधि 3 चालू
可选|可選|Optional|Pilihan|Tùy chọn|เลือกได้|Opsional|वैकल्पिक
`;
const UI_DICTIONARIES=Object.fromEntries(UI_LANGUAGES.map(([code])=>[code,{}]));
for(const row of UI_TRANSLATION_ROWS.trim().split('\n')){const cells=row.split('|');if(cells.length!==8)throw new Error('Invalid locale row: '+cells[0]);UI_LANGUAGES.forEach(([code],i)=>UI_DICTIONARIES[code][cells[0]]=cells[i]);}
const UI_NOTES={
 'zh-CN':'',
 'zh-TW':'介面語言已切換。活動名稱、規則正文及圖片文字保留簡體中文原文。',
 en:'Interface translated. Activity names, rule text and artwork remain in the original Chinese.',
 ms:'Bahasa antara muka ditukar. Nama aktiviti, teks peraturan dan imej kekal dalam bahasa Cina asal.',
 vi:'Đã đổi ngôn ngữ giao diện. Tên hoạt động, nội dung thể lệ và hình ảnh giữ nguyên tiếng Trung.',
 th:'เปลี่ยนภาษาของส่วนติดต่อแล้ว ชื่อกิจกรรม เนื้อหากติกา และข้อความในภาพยังเป็นภาษาจีนต้นฉบับ',
 id:'Bahasa antarmuka diubah. Nama acara, isi aturan, dan gambar tetap dalam bahasa Mandarin asli.',
 hi:'इंटरफ़ेस की भाषा बदल गई है। कार्यक्रम के नाम, नियमों का पाठ और चित्र मूल चीनी में हैं।'
};
