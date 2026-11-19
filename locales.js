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
新人首存彩金|新人首存彩金|New Member First Deposit Bonus|Bonus Deposit Pertama Ahli Baharu|New Member First Deposit Bonus|New Member First Deposit Bonus|New Member First Deposit Bonus|New Member First Deposit Bonus
活动兼容表|活動兼容表|Activity compatibility table|Jadual keserasian aktiviti|Activity compatibility table|Activity compatibility table|Activity compatibility table|Activity compatibility table
待确认规则|待確認規則|Rules pending confirmation|Peraturan menunggu pengesahan|Rules pending confirmation|Rules pending confirmation|Rules pending confirmation|Rules pending confirmation
待确认|待確認|Pending confirmation|Menunggu pengesahan|Pending confirmation|Pending confirmation|Pending confirmation|Pending confirmation
演示控制|演示控制|Demo controls|Kawalan demo|Demo controls|Demo controls|Demo controls|Demo controls
当前为演示，未连接真实功能|當前為演示，未連接真實功能|This is a demo and is not connected to live features|Ini adalah demo dan tidak disambungkan ke fungsi sebenar|This is a demo and is not connected to live features|This is a demo and is not connected to live features|This is a demo and is not connected to live features|This is a demo and is not connected to live features
我的参与资格与当前状态|我的參與資格與當前狀態|My eligibility and current status|Kelayakan dan status saya|My eligibility and current status|My eligibility and current status|My eligibility and current status|My eligibility and current status
当前需要操作的内容|當前需要操作的內容|What you need to do now|Tindakan yang diperlukan sekarang|What you need to do now|What you need to do now|What you need to do now|What you need to do now
奖励或任务进度|獎勵或任務進度|Reward or task progress|Kemajuan ganjaran atau tugasan|Reward or task progress|Reward or task progress|Reward or task progress|Reward or task progress
关键参与条件|關鍵參與條件|Key participation conditions|Syarat penyertaan utama|Key participation conditions|Key participation conditions|Key participation conditions|Key participation conditions
完整活动规则|完整活動規則|Full event rules|Peraturan penuh aktiviti|Full event rules|Full event rules|Full event rules|Full event rules
登录后查看资格|登錄後查看資格|Log in to view eligibility|Log masuk untuk lihat kelayakan|Log in to view eligibility|Log in to view eligibility|Log in to view eligibility|Log in to view eligibility
领取活动金|領取活動金|Claim promo funds|Tuntut kredit aktiviti|Claim promo funds|Claim promo funds|Claim promo funds|Claim promo funds
请选择优惠类别|請選擇優惠類別|Please choose an offer type|Sila pilih jenis tawaran|Please choose an offer type|Please choose an offer type|Please choose an offer type|Please choose an offer type
去充值|去儲值|Go to deposit|Pergi deposit|Go to deposit|Go to deposit|Go to deposit|Go to deposit
查看进度|查看進度|View progress|Lihat kemajuan|View progress|View progress|View progress|View progress
查看适用游戏|查看適用遊戲|View eligible games|Lihat permainan layak|View eligible games|View eligible games|View eligible games|View eligible games
转换余额|轉換餘額|Convert balance|Tukar baki|Convert balance|Convert balance|Convert balance|Convert balance
正在处理，请勿重复操作|正在處理，請勿重複操作|Processing, do not repeat|Sedang diproses, jangan ulang|Processing, do not repeat|Processing, do not repeat|Processing, do not repeat|Processing, do not repeat
查看领取记录|查看領取記錄|View claim history|Lihat rekod tuntutan|View claim history|View claim history|View claim history|View claim history
查看当前进行中的活动|查看當前進行中的活動|View active events|Lihat aktiviti berjalan|View active events|View active events|View active events|View active events
重新操作|重新操作|Try again|Cuba semula|Try again|Try again|Try again|Try again
活动已完成|活動已完成|Event completed|Aktiviti selesai|Event completed|Event completed|Event completed|Event completed
确认参与|確認參與|Confirm participation|Sahkan penyertaan|Confirm participation|Confirm participation|Confirm participation|Confirm participation
确认并完成演示充值|確認並完成演示儲值|Confirm and complete the demo deposit|Sahkan dan lengkapkan deposit demo|Confirm and complete the demo deposit|Confirm and complete the demo deposit|Confirm and complete the demo deposit|Confirm and complete the demo deposit
转换明细|轉換明細|Conversion details|Butiran penukaran|Conversion details|Conversion details|Conversion details|Conversion details
本次转出金额|本次轉出金額|Amount transferred out|Jumlah dipindahkan keluar|Amount transferred out|Amount transferred out|Amount transferred out|Amount transferred out
活动钱包|活動錢包|Promo wallet|Dompet aktiviti|Promo wallet|Promo wallet|Promo wallet|Promo wallet
现金钱包|現金錢包|Cash wallet|Dompet tunai|Cash wallet|Cash wallet|Cash wallet|Cash wallet
可提款余额|可提款餘額|Withdrawable balance|Baki boleh dikeluarkan|Withdrawable balance|Withdrawable balance|Withdrawable balance|Withdrawable balance
适用会员|適用會員|Eligible members|Ahli yang layak|Eligible members|Eligible members|Eligible members|Eligible members
充值条件|儲值條件|Deposit conditions|Syarat deposit|Deposit conditions|Deposit conditions|Deposit conditions|Deposit conditions
奖励比例及上限|獎勵比例及上限|Bonus rate and cap|Kadar dan had bonus|Bonus rate and cap|Bonus rate and cap|Bonus rate and cap|Bonus rate and cap
流水计算方式|流水計算方式|Turnover calculation|Pengiraan pusing ganti|Turnover calculation|Turnover calculation|Turnover calculation|Turnover calculation
适用游戏|適用遊戲|Eligible games|Permainan layak|Eligible games|Eligible games|Eligible games|Eligible games
活动期限及领取期限|活動期限及領取期限|Event and claim period|Tempoh aktiviti dan tuntutan|Event and claim period|Event and claim period|Event and claim period|Event and claim period
是否可同时参加|是否可同時參加|Can it be combined|Boleh diserta bersama|Can it be combined|Can it be combined|Can it be combined|Can it be combined
资格咨询|資格諮詢|Eligibility enquiry|Pertanyaan kelayakan|Eligibility enquiry|Eligibility enquiry|Eligibility enquiry|Eligibility enquiry
演示登录|演示登錄|Demo log in|Log masuk demo|Demo log in|Demo log in|Demo log in|Demo log in
退出登录|退出登錄|Log out|Log keluar|Log out|Log out|Log out|Log out
标记已完成首次充值|標記已完成首次儲值|Mark first deposit as completed|Tandai deposit pertama selesai|Mark first deposit as completed|Mark first deposit as completed|Mark first deposit as completed|Mark first deposit as completed
使当前活动过期|使當前活動過期|Expire this event (demo)|Tamatkan aktiviti ini (demo)|Expire this event (demo)|Expire this event (demo)|Expire this event (demo)|Expire this event (demo)
下一次领取/转换强制失败|下一次領取/轉換強制失敗|Force the next claim or conversion to fail|Paksa tuntutan atau penukaran seterusnya gagal|Force the next claim or conversion to fail|Force the next claim or conversion to fail|Force the next claim or conversion to fail|Force the next claim or conversion to fail
单笔充值超过RM100可获1次抽奖，每日最多3次，最高赢取RM888|單筆儲值超過RM100可獲1次抽獎，每日最多3次，最高贏取RM888|One deposit over RM100 grants 1 spin, up to 3 per day, max RM888|Deposit melebihi RM100 beri 1 putaran, maks. 3 sehari, hingga RM888|One deposit over RM100 grants 1 spin, up to 3 per day, max RM888|One deposit over RM100 grants 1 spin, up to 3 per day, max RM888|One deposit over RM100 grants 1 spin, up to 3 per day, max RM888|One deposit over RM100 grants 1 spin, up to 3 per day, max RM888
老虎机 100%|老虎機 100%|Slots 100%|Slot 100%|Slots 100%|Slots 100%|Slots 100%|Slots 100%
真人 50%|真人 50%|Live casino 50%|Kasino langsung 50%|Live casino 50%|Live casino 50%|Live casino 50%|Live casino 50%
已登录（演示会员陈美玲）|已登錄（演示會員陳美玲）|Logged in (demo member Chen Meiling)|Telah log masuk (ahli demo Chen Meiling)|Logged in (demo member Chen Meiling)|Logged in (demo member Chen Meiling)|Logged in (demo member Chen Meiling)|Logged in (demo member Chen Meiling)
尚未完成首次充值|尚未完成首次儲值|First deposit not completed|Deposit pertama belum selesai|First deposit not completed|First deposit not completed|First deposit not completed|First deposit not completed
已完成首次充值|已完成首次儲值|First deposit completed|Deposit pertama selesai|First deposit completed|First deposit completed|First deposit completed|First deposit completed
`;
const UI_DICTIONARIES=Object.fromEntries(UI_LANGUAGES.map(([code])=>[code,{}]));
for(const row of UI_TRANSLATION_ROWS.trim().split('\n')){const cells=row.split('|');if(cells.length!==8)throw new Error('Invalid locale row: '+cells[0]);UI_LANGUAGES.forEach(([code],i)=>UI_DICTIONARIES[code][cells[0]]=cells[i]);}
const UI_NOTES={
 'zh-CN':'',
 'zh-TW':'介面已切換為繁體。若個別新文案尚未提供譯文，會保留簡體原文。',
 en:'The interface, activity titles, status, buttons and available rule copy are in English. Decorative poster images are not localized. Missing strings stay in the original Chinese.',
 ms:'Antara muka, tajuk aktiviti, status, butang dan teks peraturan yang tersedia dipaparkan dalam bahasa Melayu. Imej poster hiasan tidak diterjemah. Rentetan yang tiada terjemahan kekal dalam bahasa Cina asal.',
 vi:'Giao diện ưu tiên tiếng Anh khi chưa có bản dịch. Một số nội dung gốc có thể vẫn bằng tiếng Trung.',
 th:'เมื่อไม่มีคำแปล ระบบจะแสดงภาษาอังกฤษเป็นหลัก บางข้อความอาจยังเป็นภาษาจีนต้นฉบับ',
 id:'Jika terjemahan belum ada, antarmuka memakai bahasa Inggris. Sebagian teks sumber mungkin tetap dalam bahasa Mandarin.',
 hi:'अनुवाद उपलब्ध न होने पर इंटरफ़ेस अंग्रेज़ी पर वापस जाता है। कुछ मूल पाठ चीनी में रह सकते हैं।'
};
