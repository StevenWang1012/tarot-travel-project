// src/js/data.js
// 22張大阿爾克那 x 5種城市變體 = 110組命定旅程
// Type A: 能量/現代 (適合流年需要動力時)
// Type B: 歷史/文化 (適合流年需要沈澱時)
// Type C: 自然/療癒 (適合流年需要放鬆時)
// Type D: 獨特/小眾 (適合流年需要突破時)
// Type E: 奢華/夢幻 (適合流年需要犒賞時)

window.tarotData = [
    { 
        id: 0, card: "0. 愚者", img: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg",
        keywords: "歸零與冒險", advice: "你需要一場不顧一切的流浪，讓一切重頭開始。",
        cities: [
            { type: 'A', name: "美國・拉斯維加斯", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg", text: "愚者需要的是豪賭一把的勇氣！在紙醉金迷的霓虹中，學會對人生放手一搏。" },
            { type: 'B', name: "西班牙・朝聖之路", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg", text: "愚者的行囊是空的。踏上聖雅各之路，用雙腳最原始的節奏，找回流浪的初心。" },
            { type: 'C', name: "冰島・全島環遊", flag: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Iceland.svg", text: "世界的盡頭最適合歸零。在冰火共存的荒原中，讓那個無所畏懼的自己重生。" },
            { type: 'D', name: "澳洲・塔斯馬尼亞", flag: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg", text: "世界的心臟。在與世隔絕的荒野中，做一個快樂的傻瓜，找回最純粹的快樂。" },
            { type: 'E', name: "巴西・里約熱內盧", flag: "https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg", text: "跳進嘉年華的瘋狂人群！愚者不需要計畫，只需要跟著森巴舞的節奏，徹底釋放靈魂。" }
        ]
    },
    { 
        id: 1, card: "I. 魔術師", img: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
        keywords: "創造與顯化", advice: "此刻的你充滿能量，需要一個舞台展現自己。",
        cities: [
            { type: 'A', name: "美國・舊金山", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg", text: "你是天生的鍊金術師。去矽谷感受將創意變現的科技魔法，你的靈感需要這種高頻能量。" },
            { type: 'B', name: "英國・倫敦", flag: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg", text: "魔術師需要知識的底蘊。在大英博物館與工業革命的發源地，看見人類如何顯化奇蹟。" },
            { type: 'C', name: "新加坡", flag: "https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Singapore.svg", text: "在一片荒蕪中創造出的花園城市，正是魔術師顯化能力的極致展現，去吸收這份創造力吧。" },
            { type: 'D', name: "日本・東京 (秋葉原)", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg", text: "二次元與科技的完美結合。在這裡，想像力沒有邊界，只要你敢想，世界就能被創造出來。" },
            { type: 'E', name: "愛沙尼亞・塔林", flag: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Flag_of_Estonia.svg", text: "數位遊牧者的天堂。在這座中世紀古城與現代網路王國的交界，顯化你自由工作的生活方式。" }
        ]
    },
    { 
        id: 2, card: "II. 女祭司", img: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg",
        keywords: "直覺與神祕", advice: "你渴望深入未知的領域，探索內在的聲音。",
        cities: [
            { type: 'A', name: "韓國・首爾", flag: "https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg", text: "在現代摩天樓與古老宮殿的交錯間，探索這座城市夜晚隱藏的神祕面紗。" },
            { type: 'B', name: "埃及・開羅", flag: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg", text: "尼羅河畔的古老神廟藏著宇宙的真理，等待著擁有女祭司直覺的你來解讀。" },
            { type: 'C', name: "芬蘭・拉普蘭", flag: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Finland.svg", text: "女祭司屬於月亮與黑夜。在極圈永夜的極光下，你將聽見內心最清晰的聲音。" },
            { type: 'D', name: "英國・巨石陣", flag: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg", text: "史前的神秘遺跡。站在巨石圈中，感受大地能量的流動，喚醒你沉睡已久的第六感。" },
            { type: 'E', name: "摩洛哥・撒哈拉", flag: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg", text: "沙漠的星空是通往潛意識的鏡子。在無邊的寂靜中，解讀風中傳來的神諭。" }
        ]
    },
    { 
        id: 3, card: "III. 皇后", img: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg",
        keywords: "豐盛與感官", advice: "你需要極致的感官滋養，請好好寵愛你自己。",
        cities: [
            { type: 'A', name: "法國・巴黎", flag: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg", text: "皇后的特權是享受。在香榭大道的時尚與米其林美食中，感受生命極致的豐盛。" },
            { type: 'B', name: "奧地利・維也納", flag: "https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_Austria.svg", text: "沉浸在克林姆的畫作與交響樂中，讓皇室級的優雅美學滋養你乾涸的靈魂。" },
            { type: 'C', name: "印尼・峇里島", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg", text: "回歸大地的懷抱。在稻田與花瓣浴的香氣中，感受大自然母親最溫柔的療癒。" },
            { type: 'D', name: "義大利・托斯卡尼", flag: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg", text: "陽光、葡萄酒莊與橄欖園。這是關於土地的豐饒，讓你重新連結生命中『富足』的定義。" },
            { type: 'E', name: "泰國・清邁", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg", text: "在蘭納王朝的古都，享受頂級的泰式按摩與精緻慢活，做自己生命中的皇后。" }
        ]
    },
    { 
        id: 4, card: "IV. 皇帝", img: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg",
        keywords: "秩序與結構", advice: "生活需要建立秩序，你需要找回掌控權。",
        cities: [
            { type: 'A', name: "中國・上海", flag: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg", text: "你的野心需要一個戰場。在外灘傲視天際線，那種極致的繁華正是你展現掌控力的舞台。" },
            { type: 'B', name: "中國・西安", flag: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg", text: "皇帝象徵根基。在兵馬俑軍陣與古城牆的凝視下，找回你生命中不可動搖的秩序與莊嚴。" },
            { type: 'C', name: "中國・成都", flag: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg", text: "真正的掌控是懂得放手。在茶館與火鍋的煙火氣中，學會『寬窄巷子』裡的從容帝王學。" },
            { type: 'D', name: "俄羅斯・莫斯科", flag: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg", text: "紅場的威嚴與地鐵的深邃。這座城市散發著絕對的權力感，能強化你建立生活秩序的決心。" },
            { type: 'E', name: "日本・東京 (皇居)", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg", text: "在現代秩序的巔峰，感受皇居周圍的寧靜與肅穆。這是一種內斂而強大的結構力量。" }
        ]
    },
    { 
        id: 5, card: "V. 教皇", img: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg",
        keywords: "傳統與指引", advice: "這是一趟精神之旅，你需要心靈導師的指引。",
        cities: [
            { type: 'A', name: "梵蒂岡 (羅馬)", flag: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg", text: "走進信仰權力的核心。在聖彼得大教堂的穹頂下，感受那股震攝人心的神聖秩序。" },
            { type: 'B', name: "以色列・耶路撒冷", flag: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Israel.svg", text: "三大宗教的聖地。在哭牆與古巷之間，尋找人類靈魂最深處的根源與答案。" },
            { type: 'C', name: "印度・瓦拉納西", flag: "https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg", text: "教皇掌管儀式。在恆河邊的晨禱與生死火葬中，你會看見超越世俗的生命真理。" },
            { type: 'D', name: "緬甸・蒲甘", flag: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Flag_of_Myanmar.svg", text: "千塔之城。當陽光灑落在數千座佛塔之上，你會感受到一種跨越時空的寧靜指引。" },
            { type: 'E', name: "西班牙・聖家堂", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg", text: "上帝的建築師高第的作品。在這座尚未完工的教堂中，看見信仰如何轉化為藝術的極致。" }
        ]
    },
    { 
        id: 6, card: "VI. 戀人", img: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg",
        keywords: "選擇與連結", advice: "面對人生抉擇時，請聽從你的心，找回愛的初衷。",
        cities: [
            { type: 'A', name: "日本・東京", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg", text: "在澀谷十字路口的人潮中緊握雙手，在繁華與喧囂中確認彼此是唯一的連結。" },
            { type: 'B', name: "義大利・威尼斯", flag: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg", text: "在面具與運河的迷宮中迷路，體驗愛情的古典承諾與浪漫的逃亡。" },
            { type: 'C', name: "希臘・聖托里尼", flag: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg", text: "藍與白的純粹世界。在這裡，愛情不需要語言，只需要一起看全世界最美的夕陽。" },
            { type: 'D', name: "捷克・布拉格", flag: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg", text: "波西米亞的浪漫之都。在查理大橋的雕像下許願，讓古老的傳說守護你的選擇。" },
            { type: 'E', name: "馬爾地夫", flag: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_Maldives.svg", text: "私密的海洋天堂。在與世隔絕的水上屋，重新連結你與愛人、你與世界最親密的關係。" }
        ]
    },
    { 
        id: 7, card: "VII. 戰車", img: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
        keywords: "意志與征服", advice: "你的野心需要釋放，去感受強大的意志力。",
        cities: [
            { type: 'A', name: "阿聯酋・杜拜", flag: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg", text: "戰車需要奇蹟。去看看沙漠中拔地而起的未來之城，見證人定勝天的鋼鐵意志。" },
            { type: 'B', name: "德國・柏林", flag: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg", text: "戰車代表前進。在這座從分裂到統一的城市，感受那股堅不可摧的重生力量。" },
            { type: 'C', name: "紐西蘭・皇后鎮", flag: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg", text: "駕馭恐懼！透過高空彈跳與噴射快艇，用身體的極限體驗來征服你內心的軟弱。" },
            { type: 'D', name: "美國・休士頓", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg", text: "太空總署的所在地。人類征服宇宙的起點，去感受那種『目標是星辰大海』的宏大野心。" },
            { type: 'E', name: "蒙古・大草原", flag: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Mongolia.svg", text: "成吉思汗的疆域。策馬奔騰在無邊際的草原上，找回你體內流動的征服者血液。" }
        ]
    },
    { 
        id: 8, card: "VIII. 力量", img: "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg",
        keywords: "勇氣與包容", advice: "真正的力量是以柔克剛，喚醒你內在的野性。",
        cities: [
            { type: 'A', name: "美國・紐約", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg", text: "在華爾街的叢林法則中生存，你需要最強大的內心力量來面對世界的挑戰。" },
            { type: 'B', name: "義大利・羅馬", flag: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg", text: "站在競技場中央，遙想角鬥士的勇氣。歷史告訴你，生存本身就是一種力量。" },
            { type: 'C', name: "肯亞・馬賽馬拉", flag: "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Kenya.svg", text: "這才是真正的力量牌義。與獅群共存於大草原，喚醒你靈魂深處最原始的野性。" },
            { type: 'D', name: "南非・開普敦", flag: "https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg", text: "桌山之下的韌性之城。見證一個國家如何用包容與和解，轉化過去的傷痛為力量。" },
            { type: 'E', name: "尼泊爾・基地營", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Flag_of_Nepal.svg", text: "攀登者的聖地。不需要登頂，光是站在聖母峰腳下，就需要極大的勇氣與謙卑。" }
        ]
    },
    { 
        id: 9, card: "IX. 隱士", img: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg",
        keywords: "獨處與內省", advice: "世界太吵了，你需要一場與靈魂深處的獨處對話。",
        cities: [
            { type: 'A', name: "日本・東京 (獨旅)", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg", text: "隱士的現代詮釋是『匿名』。在數百萬人的新宿街頭，享受誰也不認識你的絕對孤獨。" },
            { type: 'B', name: "日本・京都", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg", text: "在枯山水庭園前坐下吧。在苔蘚與鐘聲的禪意裡，與你內心的老靈魂對話。" },
            { type: 'C', name: "日本・北海道", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg", text: "世界太吵了。讓冬日的茫茫大雪，幫你凍結並過濾掉所有不必要的雜訊。" },
            { type: 'D', name: "不丹・廷布", flag: "https://upload.wikimedia.org/wikipedia/commons/9/91/Flag_of_Bhutan.svg", text: "幸福的隱士國度。在這個還沒被現代焦慮淹沒的山谷中，學習如何簡單地活著。" },
            { type: 'E', name: "挪威・斯瓦爾巴", flag: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg", text: "地球最北的城市。在極地的寂靜與北極熊的凝視下，你會聽見自己心跳的聲音。" }
        ]
    },
    { 
        id: 10, card: "X. 命運之輪", img: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg",
        keywords: "機遇與改變", advice: "改變的時刻到了，順勢而為，運氣會跟著轉動。",
        cities: [
            { type: 'A', name: "摩納哥", flag: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Flag_of_Monaco.svg", text: "轉動輪盤吧！在世界最奢華的賭場，學習擁抱機遇，相信幸運女神站在你這邊。" },
            { type: 'B', name: "土耳其・卡帕多奇亞", flag: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg", text: "搭上熱氣球升空。當你的視角改變了，原本卡住的命運齒輪也會開始轉動。" },
            { type: 'C', name: "柬埔寨・吳哥窟", flag: "https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_Cambodia.svg", text: "在王朝興衰的遺跡中，你會看懂『成、住、壞、空』的循環，學會順勢而為。" },
            { type: 'D', name: "美國・66號公路", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg", text: "這是一趟公路旅行。沒有固定的終點，重點在於輪子轉動時，路上遇見的風景與人。" },
            { type: 'E', name: "秘魯・納斯卡線", flag: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Peru.svg", text: "外星人的跑道？從飛機上俯瞰這些巨型圖案，感受命運中那些人類至今無法解釋的神秘力量。" }
        ]
    },
    { 
        id: 11, card: "XI. 正義", img: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg",
        keywords: "平衡與真相", advice: "你需要絕對的客觀與平靜，找回生活的平衡點。",
        cities: [
            { type: 'A', name: "瑞士・日內瓦", flag: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg", text: "去這座國際中立之都，呼吸極致理性的空氣。讓精密的鐘錶精神幫你校準生活的節奏。" },
            { type: 'B', name: "英國・倫敦", flag: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg", text: "走訪現代法治的發源地。在嚴謹的邏輯與歷史條理中，理清你目前混亂的思緒。" },
            { type: 'C', name: "瑞士・策馬特", flag: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg", text: "大自然是最公平的法官。在馬特洪峰純淨無瑕的倒影中，找回內心傾斜已久的平衡。" },
            { type: 'D', name: "瑞典・斯德哥爾摩", flag: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Sweden.svg", text: "Lagom（不多不少）的生活哲學。在這座北歐城市，學習如何活得『剛剛好』的平衡藝術。" },
            { type: 'E', name: "美國・華盛頓特區", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg", text: "權力與法律的核心。站在林肯紀念堂前，思考正義的重量，為你的人生做出正確的判決。" }
        ]
    },
    { 
        id: 12, card: "XII. 倒吊人", img: "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg",
        keywords: "犧牲與換位", advice: "試著換個角度看世界，學習暫停與放下的智慧。",
        cities: [
            { type: 'A', name: "泰國・曼谷", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg", text: "在永恆的塞車與喧囂中，學會泰式『Mai Pen Rai』(沒關係) 的隨遇而安哲學。" },
            { type: 'B', name: "西藏・拉薩", flag: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg", text: "倒吊人是為了信仰而自我犧牲。在轉山轉水的路上，主動按下人生的暫停鍵。" },
            { type: 'C', name: "尼泊爾・波卡拉", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Flag_of_Nepal.svg", text: "在喜馬拉雅山腳下，什麼都不做。發呆，就是倒吊人給你最奢侈的禮物。" },
            { type: 'D', name: "紐西蘭・螢火蟲洞", flag: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg", text: "倒過來看世界。進入地底的星空，在黑暗中安靜地漂流，等待光明的出現。" },
            { type: 'E', name: "印度・瑞詩凱詩", flag: "https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg", text: "瑜珈的發源地。透過身體的倒立與扭轉，換個角度看世界，也換個角度看自己。" }
        ]
    },
    { 
        id: 13, card: "XIII. 死神", img: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg",
        keywords: "結束與重生", advice: "舊的不去，新的不來，你需要一場徹底的轉化。",
        cities: [
            { type: 'A', name: "日本・廣島", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg", text: "見證一座城市如何從毀滅中重生。在和平紀念公園，你會明白結束是為了更好的開始。" },
            { type: 'B', name: "墨西哥・亡靈節", flag: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg", text: "去與死者共舞吧！在斑斕的色彩中，慶祝生命的結束即是另一個旅程的起點。" },
            { type: 'C', name: "約旦・死海", flag: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Flag_of_Jordan.svg", text: "在地球最低點的鹹水中漂浮。洗去舊有的皮囊與包袱，完成一場身心靈的脫胎換骨。" },
            { type: 'D', name: "烏克蘭・車諾比", flag: "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg", text: "時間靜止之地。在廢墟中看見大自然如何接管人類的文明，感受毀滅後的寂靜之美。" },
            { type: 'E', name: "印尼・伊真火山", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg", text: "地獄之火的藍色火焰。在硫磺礦工的艱辛與火山的壯麗中，看見生命最邊緣的樣貌。" }
        ]
    },
    { 
        id: 14, card: "XIV. 節制", img: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg",
        keywords: "調和與療癒", advice: "尋找冰與火、身與心的調和，療癒疲憊的靈魂。",
        cities: [
            { type: 'A', name: "荷蘭・阿姆斯特丹", flag: "https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg", text: "節制需要流動。在運河與單車的城市節奏中，找到工作與生活最完美的平衡點。" },
            { type: 'B', name: "台灣・北投", flag: "https://upload.wikimedia.org/wikipedia/commons/7/72/Flag_of_the_Republic_of_China.svg", text: "體驗溫泉的冷熱交替。在硫磺氣息與日式古蹟中，調節你失衡已久的靈魂溫度。" },
            { type: 'C', name: "加拿大・班夫", flag: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada.svg", text: "洛磯山脈的冰河湖是節制牌最美的風景。水與山的完美調和，能療癒一切焦慮。" },
            { type: 'D', name: "匈牙利・布達佩斯", flag: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg", text: "浴場之都。在賽切尼溫泉的棋盤邊，像當地人一樣泡在水裡思考人生，這就是生活。" },
            { type: 'E', name: "紐西蘭・羅托魯瓦", flag: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg", text: "地熱與毛利文化。看著間歇泉噴發，感受地球內部的能量如何與地表達成微妙的平衡。" }
        ]
    },
    { 
        id: 15, card: "XV. 惡魔", img: "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg",
        keywords: "慾望與束縛", advice: "誠實面對你的慾望吧！偶爾的放縱不是罪。",
        cities: [
            { type: 'A', name: "美國・拉斯維加斯", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg", text: "既然抽到惡魔，就去罪惡之城吧！誠實面對內心的貪婪與慾望，在狂歡中釋放自己。" },
            { type: 'B', name: "德國・柏林", flag: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg", text: "去體驗地下夜店文化。在強烈的電子節奏與幽暗空間中，打破平日束縛你的道德枷鎖。" },
            { type: 'C', name: "泰國・芭達雅", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg", text: "感官的極致放縱。在熱帶海灘與喧鬧夜市中，偶爾當個不聽話的壞孩子並不可恥。" },
            { type: 'D', name: "荷蘭・紅燈區", flag: "https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg", text: "直視人性的櫥窗。在這裡，慾望是公開的商品，去觀察、去理解，而不要急著批判。" },
            { type: 'E', name: "巴西・聖保羅", flag: "https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg", text: "南美洲的慾望叢林。在這座貧富差距極大的巨型城市，看見人類在物質中掙扎與享樂的真實面。" }
        ]
    },
    { 
        id: 16, card: "XVI. 高塔", img: "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg",
        keywords: "破壞與覺醒", advice: "打破現有的框架與信念，你需要強烈的震撼。",
        cities: [
            { type: 'A', name: "香港", flag: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Flag_of_Hong_Kong.svg", text: "高樓林立的壓迫感正是高塔的具象化。在極度緊繃的城市節奏中，尋求突破自我的缺口。" },
            { type: 'B', name: "義大利・龐貝", flag: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg", text: "見證瞬間毀滅的古城遺跡。這場千年前的災難會告訴你，唯有打破舊殼，才能看見真相。" },
            { type: 'C', name: "美國・大峽谷", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg", text: "地質撕裂的傷痕之美。讓大自然鬼斧神工的震撼，幫你震碎早已僵化的價值觀。" },
            { type: 'D', name: "德國・柏林圍牆", flag: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg", text: "看見高牆倒下的痕跡。沒有什麼限制是永恆的，你的信念也一樣，是時候敲碎它了。" },
            { type: 'E', name: "智利・復活節島", flag: "https://upload.wikimedia.org/wikipedia/commons/7/78/Flag_of_Chile.svg", text: "文明崩壞的孤島。看著巨大的摩艾石像，思考人類的極限與脆弱，這是一場深層的覺醒之旅。" }
        ]
    },
    { 
        id: 17, card: "XVII. 星星", img: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg",
        keywords: "希望與靈感", advice: "希望能指引方向，保持信心，未來充滿光芒。",
        cities: [
            { type: 'A', name: "美國・洛杉磯", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg", text: "好萊塢是地上的星空。去這座造夢之城，重新相信『只要有夢想，我就會發光』。" },
            { type: 'B', name: "法國・普羅旺斯", flag: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg", text: "走進梵谷畫作裡的星空。在藝術、薰衣草與光影的交織中，找回靈魂最純真的希望。" },
            { type: 'C', name: "紐西蘭・蒂卡波湖", flag: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg", text: "全球最美的星空保護區。在無光害的銀河下許願，宇宙會聽見你最微小的聲音。" },
            { type: 'D', name: "智利・阿塔卡馬", flag: "https://upload.wikimedia.org/wikipedia/commons/7/78/Flag_of_Chile.svg", text: "地球上最適合觀星的沙漠。在這裡，星星不再遙遠，而是觸手可及的希望。" },
            { type: 'E', name: "台灣・蘭嶼", flag: "https://upload.wikimedia.org/wikipedia/commons/7/72/Flag_of_the_Republic_of_China.svg", text: "人之島的純淨。躺在涼亭上聽海觀星，讓太平洋的風吹走你的焦慮，只留下平靜。" }
        ]
    },
    { 
        id: 18, card: "XVIII. 月亮", img: "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg",
        keywords: "不安與潛意識", advice: "直覺往往比邏輯重要，探索你潛意識深處的夢境。",
        cities: [
            { type: 'A', name: "英國・倫敦", flag: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg", text: "霧都的朦朧是月亮的特質。在貝克街的陰影與迷霧中，探索城市與你內心背後的真相。" },
            { type: 'B', name: "蘇格蘭・高地", flag: "https://upload.wikimedia.org/wikipedia/commons/1/10/Flag_of_Scotland.svg", text: "古堡、傳說與尼斯湖水怪。走進這片神祕的土地，直面你潛意識深處的恐懼與幻想。" },
            { type: 'C', name: "玻利維亞・天空之鏡", flag: "https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Bolivia.svg", text: "烏尤尼鹽湖的倒影讓人分不清虛實。走進這場醒著的夢境，看見最真實的自己。" },
            { type: 'D', name: "羅馬尼亞・外西凡尼亞", flag: "https://upload.wikimedia.org/wikipedia/commons/7/73/Flag_of_Romania.svg", text: "吸血鬼德古拉的故鄉。月亮總是與陰暗面共存，去探索那些讓你害怕卻又著迷的故事。" },
            { type: 'E', name: "墨西哥・天然井", flag: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg", text: "馬雅人的聖井。潛入地底的藍色深淵，這是一場通往潛意識深處的洞穴探險。" }
        ]
    },
    { 
        id: 19, card: "XIX. 太陽", img: "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg",
        keywords: "快樂與成功", advice: "擁抱純粹的快樂與生命力！你值得陽光普照的日子。",
        cities: [
            { type: 'A', name: "美國・加州", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg", text: "陽光、海灘、滑板。去擁抱最純粹的美式熱情，讓加州的陽光曬乾你所有的陰霾。" },
            { type: 'B', name: "西班牙・巴塞隆納", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg", text: "高第的建築充滿了童趣與生命力。像個孩子一樣，在這座色彩斑斕的城市開心大笑吧！" },
            { type: 'C', name: "義大利・西西里島", flag: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg", text: "地中海的艷陽與檸檬香氣。在這裡，快樂不需要理由，活著本身就是一種慶典。" },
            { type: 'D', name: "澳洲・黃金海岸", flag: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg", text: "衝浪者的天堂。感受海浪的能量與太陽的溫度，這是一場充滿維他命D的活力之旅。" },
            { type: 'E', name: "希臘・米克諾斯", flag: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg", text: "派對與陽光之島。在純白的街道與蔚藍的海岸邊，盡情享受生命中最燦爛的夏日。" }
        ]
    },
    { 
        id: 20, card: "XX. 審判", img: "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg",
        keywords: "召喚與覺醒", advice: "這是一聲來自靈魂的召喚，去完成你的人生清單。",
        cities: [
            { type: 'A', name: "德國・紐倫堡", flag: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg", text: "歷史的審判之地。在這裡為你的過去做一個清算與總結，帶著清醒的頭腦走向未來。" },
            { type: 'B', name: "秘魯・馬丘比丘", flag: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Peru.svg", text: "失落的空中之城傳來遠古的號角聲。這是一趟朝聖之旅，去回應靈魂對你的召喚。" },
            { type: 'C', name: "南極 / 北極", flag: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg", text: "世界的盡頭是最後的審判。在極地的純白中，完成你人生清單上最重要、最瘋狂的那塊拼圖。" },
            { type: 'D', name: "坦上尼亞・吉力馬札羅", flag: "https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Tanzania.svg", text: "非洲之巔。這是一場體力與意志的審判，站在峰頂，你會看見一個全新的自己。" },
            { type: 'E', name: "葡萄牙・羅卡角", flag: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg", text: "『陸止於此，海始於斯』。站在歐亞大陸的盡頭，向過去告別，準備啟航前往未知的海域。" }
        ]
    },
    { 
        id: 21, card: "XXI. 世界", img: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg",
        keywords: "圓滿與整合", advice: "旅程的終點是圓滿，不用再選擇，去擁抱整個世界。",
        cities: [
            { type: 'A', name: "環球郵輪", flag: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg", text: "世界牌象徵擁有全部。不需要做選擇題，搭上郵輪，一次擁抱整個地球的風景。" },
            { type: 'B', name: "土耳其・伊斯坦堡", flag: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg", text: "跨越歐亞大陸的橋樑。在這裡，東方與西方完美融合，象徵你內在二元對立的最終整合。" },
            { type: 'C', name: "澳洲・大堡礁", flag: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg", text: "孕育生命的海洋搖籃。潛入深藍，感受萬物合一的圓滿，這是一趟集大成的完美旅程。" },
            { type: 'D', name: "美國・紐約 (聯合國)", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg", text: "世界的大熔爐。在這裡聽見數百種語言，看見數百種膚色，理解『我們都是一家人』的真諦。" },
            { type: 'E', name: "國際太空站 (模擬體驗)", flag: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg", text: "從太空看地球，沒有國界，只有一個藍色的家園。這是世界牌視角的極致，超越凡俗的體驗。" }
        ]
    }
];

// === 第二部分：靈魂任務庫 (What) ===
// 9種通用任務，根據 (生日日+月) % 9 來決定
window.soulMissions = [
    { title: "隱形旅人", desc: "在旅途中關掉手機網路 24 小時，只靠直覺與當地人交流，找回迷路的樂趣。" },
    { title: "味蕾探險", desc: "不要看網路評價，走進一間當地人最多的巷弄小店，點一道你完全看不懂的菜。" },
    { title: "晨間儀式", desc: "每天比這座城市早起一小時。去逛清晨的市場或公園，看見觀光客看不見的日常。" },
    { title: "時空郵差", desc: "買一張明信片，寫下此刻的煩惱與希望，寄給一年後的自己。" },
    { title: "在地連結", desc: "嘗試學會 3 句當地的語言（你好、謝謝、好吃），並對 5 個陌生人微笑說出來。" },
    { title: "微醺時刻", desc: "找一間看得到夜景的酒吧或路邊攤，獨自喝一杯，與這座城市的靈魂乾杯。" },
    { title: "歷史對話", desc: "去參觀一座博物館或古蹟，不是走馬看花，而是選一件展品，凝視它 10 分鐘。" },
    { title: "自然療癒", desc: "找一個公園、海邊或山上，脫掉鞋子踩在土地上，進行 5 分鐘的深呼吸接地。" },
    { title: "極致犒賞", desc: "這趟旅程中，允許自己有一筆『不理智的消費』。買個喜歡的紀念品或吃頓大餐，你值得。" }
];
