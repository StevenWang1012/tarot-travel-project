// src/js/data.js
// 22張大阿爾克那 x 3種城市變體 = 66組命定旅程
// type A: 能量/現代 (適合流年需要動力時)
// type B: 歷史/文化 (適合流年需要沈澱時)
// type C: 自然/療癒 (適合流年需要放鬆時)

window.tarotData = [
    { 
        id: 0, 
        card: "0. 愚者", 
        img: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg",
        keywords: "歸零與冒險",
        advice: "你需要一場不顧一切的流浪，讓一切重頭開始。",
        cities: [
            { type: 'A', name: "美國・拉斯維加斯", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg", text: "愚者需要的是豪賭一把的勇氣！在紙醉金迷的霓虹中，學會對人生放手一搏。" },
            { type: 'B', name: "西班牙・朝聖之路", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg", text: "愚者的行囊是空的。踏上聖雅各之路，用雙腳最原始的節奏，找回流浪的初心。" },
            { type: 'C', name: "冰島・全島環遊", flag: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Iceland.svg", text: "世界的盡頭最適合歸零。在冰火共存的荒原中，讓那個無所畏懼的自己重生。" }
        ]
    },
    { 
        id: 1, 
        card: "I. 魔術師", 
        img: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
        keywords: "創造與顯化",
        advice: "此刻的你充滿能量，需要一個舞台展現自己。",
        cities: [
            { type: 'A', name: "美國・舊金山", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg", text: "你是天生的鍊金術師。去矽谷感受將創意變現的科技魔法，你的靈感需要這種高頻能量。" },
            { type: 'B', name: "英國・倫敦", flag: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg", text: "魔術師需要知識的底蘊。在大英博物館與工業革命的發源地，看見人類如何顯化奇蹟。" },
            { type: 'C', name: "新加坡", flag: "https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Singapore.svg", text: "在一片荒蕪中創造出的花園城市，正是魔術師顯化能力的極致展現，去吸收這份創造力吧。" }
        ]
    },
    { 
        id: 2, 
        card: "II. 女祭司", 
        img: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg",
        keywords: "直覺與神祕",
        advice: "你渴望深入未知的領域，探索內在的聲音。",
        cities: [
            { type: 'A', name: "韓國・首爾", flag: "https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg", text: "在現代摩天樓與古老宮殿的交錯間，探索這座城市夜晚隱藏的神祕面紗。" },
            { type: 'B', name: "埃及・開羅", flag: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg", text: "尼羅河畔的古老神廟藏著宇宙的真理，等待著擁有女祭司直覺的你來解讀。" },
            { type: 'C', name: "芬蘭・拉普蘭", flag: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Finland.svg", text: "女祭司屬於月亮與黑夜。在極圈永夜的極光下，你將聽見內心最清晰的聲音。" }
        ]
    },
    { 
        id: 3, 
        card: "III. 皇后", 
        img: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg",
        keywords: "豐盛與感官",
        advice: "你需要極致的感官滋養，請好好寵愛你自己。",
        cities: [
            { type: 'A', name: "法國・巴黎", flag: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg", text: "皇后的特權是享受。在香榭大道的時尚與米其林美食中，感受生命極致的豐盛。" },
            { type: 'B', name: "奧地利・維也納", flag: "https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_Austria.svg", text: "沉浸在克林姆的畫作與交響樂中，讓皇室級的優雅美學滋養你乾涸的靈魂。" },
            { type: 'C', name: "印尼・峇里島", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg", text: "回歸大地的懷抱。在稻田與花瓣浴的香氣中，感受大自然母親最溫柔的療癒。" }
        ]
    },
    { 
        id: 4, 
        card: "IV. 皇帝", 
        img: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg",
        keywords: "秩序與結構",
        advice: "生活需要建立秩序，你需要找回掌控權。",
        cities: [
            { type: 'A', name: "中國・上海", flag: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg", text: "你的野心需要一個戰場。在外灘傲視天際線，那種極致的繁華正是你展現掌控力的舞台。" },
            { type: 'B', name: "中國・西安", flag: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg", text: "皇帝象徵根基。在兵馬俑軍陣與古城牆的凝視下，找回你生命中不可動搖的秩序與莊嚴。" },
            { type: 'C', name: "中國・成都", flag: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg", text: "真正的掌控是懂得放手。在茶館與火鍋的煙火氣中，學會『寬窄巷子』裡的從容帝王學。" }
        ]
    },
    { 
        id: 5, 
        card: "V. 教皇", 
        img: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg",
        keywords: "傳統與指引",
        advice: "這是一趟精神之旅，你需要心靈導師的指引。",
        cities: [
            { type: 'A', name: "梵蒂岡 (羅馬)", flag: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg", text: "走進信仰權力的核心。在聖彼得大教堂的穹頂下，感受那股震攝人心的神聖秩序。" },
            { type: 'B', name: "以色列・耶路撒冷", flag: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Israel.svg", text: "三大宗教的聖地。在哭牆與古巷之間，尋找人類靈魂最深處的根源與答案。" },
            { type: 'C', name: "印度・瓦拉納西", flag: "https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg", text: "教皇掌管儀式。在恆河邊的晨禱與生死火葬中，你會看見超越世俗的生命真理。" }
        ]
    },
    { 
        id: 6, 
        card: "VI. 戀人", 
        img: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg",
        keywords: "選擇與連結",
        advice: "面對人生抉擇時，請聽從你的心，找回愛的初衷。",
        cities: [
            { type: 'A', name: "日本・東京", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg", text: "在澀谷十字路口的人潮中緊握雙手，在繁華與喧囂中確認彼此是唯一的連結。" },
            { type: 'B', name: "義大利・威尼斯", flag: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg", text: "在面具與運河的迷宮中迷路，體驗愛情的古典承諾與浪漫的逃亡。" },
            { type: 'C', name: "希臘・聖托里尼", flag: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg", text: "藍與白的純粹世界。在這裡，愛情不需要語言，只需要一起看全世界最美的夕陽。" }
        ]
    },
    { 
        id: 7, 
        card: "VII. 戰車", 
        img: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
        keywords: "意志與征服",
        advice: "你的野心需要釋放，去感受強大的意志力。",
        cities: [
            { type: 'A', name: "阿聯酋・杜拜", flag: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg", text: "戰車需要奇蹟。去看看沙漠中拔地而起的未來之城，見證人定勝天的鋼鐵意志。" },
            { type: 'B', name: "德國・柏林", flag: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg", text: "戰車代表前進。在這座從分裂到統一的城市，感受那股堅不可摧的重生力量。" },
            { type: 'C', name: "紐西蘭・皇后鎮", flag: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg", text: "駕馭恐懼！透過高空彈跳與噴射快艇，用身體的極限體驗來征服你內心的軟弱。" }
        ]
    },
    { 
        id: 8, 
        card: "VIII. 力量", 
        img: "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg",
        keywords: "勇氣與包容",
        advice: "真正的力量是以柔克剛，喚醒你內在的野性。",
        cities: [
            { type: 'A', name: "美國・紐約", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg", text: "在華爾街的叢林法則中生存，你需要最強大的內心力量來面對世界的挑戰。" },
            { type: 'B', name: "義大利・羅馬", flag: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg", text: "站在競技場中央，遙想角鬥士的勇氣。歷史告訴你，生存本身就是一種力量。" },
            { type: 'C', name: "肯亞・馬賽馬拉", flag: "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Kenya.svg", text: "這才是真正的力量牌義。與獅群共存於大草原，喚醒你靈魂深處最原始的野性。" }
        ]
    },
    { 
        id: 9, 
        card: "IX. 隱士", 
        img: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg",
        keywords: "獨處與內省",
        advice: "世界太吵了，你需要一場與靈魂深處的獨處對話。",
        cities: [
            { type: 'A', name: "日本・東京 (獨旅)", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg", text: "隱士的現代詮釋是『匿名』。在數百萬人的新宿街頭，享受誰也不認識你的絕對孤獨。" },
            { type: 'B', name: "日本・京都", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg", text: "在枯山水庭園前坐下吧。在苔蘚與鐘聲的禪意裡，與你內心的老靈魂對話。" },
            { type: 'C', name: "日本・北海道", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg", text: "世界太吵了。讓冬日的茫茫大雪，幫你凍結並過濾掉所有不必要的雜訊。" }
        ]
    },
    { 
        id: 10, 
        card: "X. 命運之輪", 
        img: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg",
        keywords: "機遇與改變",
        advice: "改變的時刻到了，順勢而為，運氣會跟著轉動。",
        cities: [
            { type: 'A', name: "摩納哥", flag: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Flag_of_Monaco.svg", text: "轉動輪盤吧！在世界最奢華的賭場，學習擁抱機遇，相信幸運女神站在你這邊。" },
            { type: 'B', name: "土耳其・卡帕多奇亞", flag: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg", text: "搭上熱氣球升空。當你的視角改變了，原本卡住的命運齒輪也會開始轉動。" },
            { type: 'C', name: "柬埔寨・吳哥窟", flag: "https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_Cambodia.svg", text: "在王朝興衰的遺跡中，你會看懂『成、住、壞、空』的循環，學會順勢而為。" }
        ]
    },
    { 
        id: 11, 
        card: "XI. 正義", 
        img: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg",
        keywords: "平衡與真相",
        advice: "你需要絕對的客觀與平靜，找回生活的平衡點。",
        cities: [
            { type: 'A', name: "瑞士・日內瓦", flag: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg", text: "去這座國際中立之都，呼吸極致理性的空氣。讓精密的鐘錶精神幫你校準生活的節奏。" },
            { type: 'B', name: "英國・倫敦", flag: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg", text: "走訪現代法治的發源地。在嚴謹的邏輯與歷史條理中，理清你目前混亂的思緒。" },
            { type: 'C', name: "瑞士・策馬特", flag: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg", text: "大自然是最公平的法官。在馬特洪峰純淨無瑕的倒影中，找回內心傾斜已久的平衡。" }
        ]
    },
    { 
        id: 12, 
        card: "XII. 倒吊人", 
        img: "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg",
        keywords: "犧牲與換位",
        advice: "試著換個角度看世界，學習暫停與放下的智慧。",
        cities: [
            { type: 'A', name: "泰國・曼谷", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg", text: "在永恆的塞車與喧囂中，學會泰式『Mai Pen Rai』(沒關係) 的隨遇而安哲學。" },
            { type: 'B', name: "西藏・拉薩", flag: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg", text: "倒吊人是為了信仰而自我犧牲。在轉山轉水的路上，主動按下人生的暫停鍵。" },
            { type: 'C', name: "尼泊爾・波卡拉", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Flag_of_Nepal.svg", text: "在喜馬拉雅山腳下，什麼都不做。發呆，就是倒吊人給你最奢侈的禮物。" }
        ]
    },
    { 
        id: 13, 
        card: "XIII. 死神", 
        img: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg",
        keywords: "結束與重生",
        advice: "舊的不去，新的不來，你需要一場徹底的轉化。",
        cities: [
            { type: 'A', name: "日本・廣島", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg", text: "見證一座城市如何從毀滅中重生。在和平紀念公園，你會明白結束是為了更好的開始。" },
            { type: 'B', name: "墨西哥・亡靈節", flag: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg", text: "去與死者共舞吧！在斑斕的色彩中，慶祝生命的結束即是另一個旅程的起點。" },
            { type: 'C', name: "約旦・死海", flag: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Flag_of_Jordan.svg", text: "在地球最低點的鹹水中漂浮。洗去舊有的皮囊與包袱，完成一場身心靈的脫胎換骨。" }
        ]
    },
    { 
        id: 14, 
        card: "XIV. 節制", 
        img: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg",
        keywords: "調和與療癒",
        advice: "尋找冰與火、身與心的調和，療癒疲憊的靈魂。",
        cities: [
            { type: 'A', name: "荷蘭・阿姆斯特丹", flag: "https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg", text: "節制需要流動。在運河與單車的城市節奏中，找到工作與生活最完美的平衡點。" },
            { type: 'B', name: "台灣・北投", flag: "https://upload.wikimedia.org/wikipedia/commons/7/72/Flag_of_the_Republic_of_China.svg", text: "體驗溫泉的冷熱交替。在硫磺氣息與日式古蹟中，調節你失衡已久的靈魂溫度。" },
            { type: 'C', name: "加拿大・班夫", flag: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada.svg", text: "洛磯山脈的冰河湖是節制牌最美的風景。水與山的完美調和，能療癒一切焦慮。" }
        ]
    },
    { 
        id: 15, 
        card: "XV. 惡魔", 
        img: "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg",
        keywords: "慾望與束縛",
        advice: "誠實面對你的慾望吧！偶爾的放縱不是罪。",
        cities: [
            { type: 'A', name: "美國・拉斯維加斯", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg", text: "既然抽到惡魔，就去罪惡之城吧！誠實面對內心的貪婪與慾望，在狂歡中釋放自己。" },
            { type: 'B', name: "德國・柏林", flag: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg", text: "去體驗地下夜店文化。在強烈的電子節奏與幽暗空間中，打破平日束縛你的道德枷鎖。" },
            { type: 'C', name: "泰國・芭達雅", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg", text: "感官的極致放縱。在熱帶海灘與喧鬧夜市中，偶爾當個不聽話的壞孩子並不可恥。" }
        ]
    },
    { 
        id: 16, 
        card: "XVI. 高塔", 
        img: "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg",
        keywords: "破壞與覺醒",
        advice: "打破現有的框架與信念，你需要強烈的震撼。",
        cities: [
            { type: 'A', name: "香港", flag: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Flag_of_Hong_Kong.svg", text: "高樓林立的壓迫感正是高塔的具象化。在極度緊繃的城市節奏中，尋求突破自我的缺口。" },
            { type: 'B', name: "義大利・龐貝", flag: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg", text: "見證瞬間毀滅的古城遺跡。這場千年前的災難會告訴你，唯有打破舊殼，才能看見真相。" },
            { type: 'C', name: "美國・大峽谷", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg", text: "地質撕裂的傷痕之美。讓大自然鬼斧神工的震撼，幫你震碎早已僵化的價值觀。" }
        ]
    },
    { 
        id: 17, 
        card: "XVII. 星星", 
        img: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg",
        keywords: "希望與靈感",
        advice: "希望能指引方向，保持信心，未來充滿光芒。",
        cities: [
            { type: 'A', name: "美國・洛杉磯", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg", text: "好萊塢是地上的星空。去這座造夢之城，重新相信『只要有夢想，我就會發光』。" },
            { type: 'B', name: "法國・普羅旺斯", flag: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg", text: "走進梵谷畫作裡的星空。在藝術、薰衣草與光影的交織中，找回靈魂最純真的希望。" },
            { type: 'C', name: "紐西蘭・蒂卡波湖", flag: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg", text: "全球最美的星空保護區。在無光害的銀河下許願，宇宙會聽見你最微小的聲音。" }
        ]
    },
    { 
        id: 18, 
        card: "XVIII. 月亮", 
        img: "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg",
        keywords: "不安與潛意識",
        advice: "直覺往往比邏輯重要，探索你潛意識深處的夢境。",
        cities: [
            { type: 'A', name: "英國・倫敦", flag: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg", text: "霧都的朦朧是月亮的特質。在貝克街的陰影與迷霧中，探索城市與你內心背後的真相。" },
            { type: 'B', name: "蘇格蘭・高地", flag: "https://upload.wikimedia.org/wikipedia/commons/1/10/Flag_of_Scotland.svg", text: "古堡、傳說與尼斯湖水怪。走進這片神祕的土地，直面你潛意識深處的恐懼與幻想。" },
            { type: 'C', name: "玻利維亞・天空之鏡", flag: "https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Bolivia.svg", text: "烏尤尼鹽湖的倒影讓人分不清虛實。走進這場醒著的夢境，看見最真實的自己。" }
        ]
    },
    { 
        id: 19, 
        card: "XIX. 太陽", 
        img: "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg",
        keywords: "快樂與成功",
        advice: "擁抱純粹的快樂與生命力！你值得陽光普照的日子。",
        cities: [
            { type: 'A', name: "美國・加州", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg", text: "陽光、海灘、滑板。去擁抱最純粹的美式熱情，讓加州的陽光曬乾你所有的陰霾。" },
            { type: 'B', name: "西班牙・巴塞隆納", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg", text: "高第的建築充滿了童趣與生命力。像個孩子一樣，在這座色彩斑斕的城市開心大笑吧！" },
            { type: 'C', name: "義大利・西西里島", flag: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg", text: "地中海的艷陽與檸檬香氣。在這裡，快樂不需要理由，活著本身就是一種慶典。" }
        ]
    },
    { 
        id: 20, 
        card: "XX. 審判", 
        img: "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg",
        keywords: "召喚與覺醒",
        advice: "這是一聲來自靈魂的召喚，去完成你的人生清單。",
        cities: [
            { type: 'A', name: "德國・紐倫堡", flag: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg", text: "歷史的審判之地。在這裡為你的過去做一個清算與總結，帶著清醒的頭腦走向未來。" },
            { type: 'B', name: "秘魯・馬丘比丘", flag: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Peru.svg", text: "失落的空中之城傳來遠古的號角聲。這是一趟朝聖之旅，去回應靈魂對你的召喚。" },
            { type: 'C', name: "南極 / 北極", flag: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg", text: "世界的盡頭是最後的審判。在極地的純白中，完成你人生清單上最重要、最瘋狂的那塊拼圖。" }
        ]
    },
    { 
        id: 21, 
        card: "XXI. 世界", 
        img: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg",
        keywords: "圓滿與整合",
        advice: "旅程的終點是圓滿，不用再選擇，去擁抱整個世界。",
        cities: [
            { type: 'A', name: "環球郵輪", flag: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg", text: "世界牌象徵擁有全部。不需要做選擇題，搭上郵輪，一次擁抱整個地球的風景。" },
            { type: 'B', name: "土耳其・伊斯坦堡", flag: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg", text: "跨越歐亞大陸的橋樑。在這裡，東方與西方完美融合，象徵你內在二元對立的最終整合。" },
            { type: 'C', name: "澳洲・大堡礁", flag: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg", text: "孕育生命的海洋搖籃。潛入深藍，感受萬物合一的圓滿，這是一趟集大成的完美旅程。" }
        ]
    }
];
