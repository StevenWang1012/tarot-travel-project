// 匯出資料庫：包含牌名、目的地、文案、以及【真實圖檔連結】
// 圖源使用 Wikimedia Commons (Public Domain)

export const tarotData = [
    { 
        id: 0, 
        card: "0. 愚者", 
        img: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg",
        dest: "冰島", 
        flag: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Iceland.svg",
        keywords: "歸零與冒險",
        advice: "你需要一場不顧一切的流浪，讓一切重頭開始。",
        text: "在世界的盡頭與極光相遇，找回那個無所畏懼的自己。" 
    },
    { 
        id: 1, 
        card: "I. 魔術師", 
        img: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
        dest: "新加坡", 
        flag: "https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Singapore.svg",
        keywords: "創造與顯化",
        advice: "此刻的你充滿能量，需要一個舞台展現自己。",
        text: "去一個融合未來科技與綠意的城市，激發更多靈感。" 
    },
    { 
        id: 2, 
        card: "II. 女祭司", 
        img: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg",
        dest: "埃及", 
        flag: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg",
        keywords: "直覺與神祕",
        advice: "你渴望深入未知的領域，探索內在的聲音。",
        text: "尼羅河畔的古老智慧與神殿，正等待著你的解讀。" 
    },
    { 
        id: 3, 
        card: "III. 皇后", 
        img: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg",
        dest: "法國・巴黎", 
        flag: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg",
        keywords: "豐盛與感官",
        advice: "你需要極致的感官滋養，請好好寵愛你自己。",
        text: "藝術、時尚、美食，感受生命中豐盛的美學。" 
    },
    { 
        id: 4, 
        card: "IV. 皇帝", 
        img: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg",
        dest: "德國・柏林", 
        flag: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg",
        keywords: "秩序與結構",
        advice: "生活需要建立秩序，你需要找回掌控權。",
        text: "在歷史厚度與現代秩序交錯的城市，重新架構你的生活。" 
    },
    { 
        id: 5, 
        card: "V. 教皇", 
        img: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg",
        dest: "印度・瓦拉納西", 
        flag: "https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg",
        keywords: "傳統與指引",
        advice: "這是一趟精神之旅，你需要心靈導師的指引。",
        text: "在恆河邊的晨禱與傳統儀式中，尋求心靈的答案。" 
    },
    { 
        id: 6, 
        card: "VI. 戀人", 
        img: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg",
        dest: "希臘・聖托里尼", 
        flag: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg",
        keywords: "選擇與連結",
        advice: "面對人生抉擇時，請聽從你的心，找回愛的初衷。",
        text: "在藍白相間的浪漫島嶼，重新連結你與世界的關係。" 
    },
    { 
        id: 7, 
        card: "VII. 戰車", 
        img: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
        dest: "杜拜", 
        flag: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg",
        keywords: "意志與征服",
        advice: "你的野心需要釋放，去感受強大的意志力。",
        text: "去沙漠中拔地而起的奇蹟之城，證明凡事皆有可能。" 
    },
    { 
        id: 8, 
        card: "VIII. 力量", 
        img: "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg",
        dest: "肯亞", 
        flag: "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Kenya.svg",
        keywords: "勇氣與包容",
        advice: "真正的力量是以柔克剛，喚醒你內在的野性。",
        text: "在廣袤草原看動物大遷徙，感受生命最原始的脈動。" 
    },
    { 
        id: 9, 
        card: "IX. 隱士", 
        img: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg",
        dest: "日本・京都", 
        flag: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg",
        keywords: "獨處與內省",
        advice: "世界太吵了，你需要一場與靈魂深處的獨處對話。",
        text: "古寺的鐘聲、苔蘚與枯山水，能讓你的心安靜下來。" 
    },
    { 
        id: 10, 
        card: "X. 命運之輪", 
        img: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg",
        dest: "土耳其", 
        flag: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg",
        keywords: "機遇與改變",
        advice: "改變的時刻到了，順勢而為，運氣會跟著轉動。",
        text: "搭上熱氣球升空，當視角改變了，命運也會跟著改變。" 
    },
    { 
        id: 11, 
        card: "XI. 正義", 
        img: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg",
        dest: "瑞士", 
        flag: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg",
        keywords: "平衡與真相",
        advice: "你需要絕對的客觀與平靜，找回生活的平衡點。",
        text: "在阿爾卑斯山純淨無瑕的風景中，理清混亂的思緒。" 
    },
    { 
        id: 12, 
        card: "XII. 倒吊人", 
        img: "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg",
        dest: "尼泊爾", 
        flag: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Flag_of_Nepal.svg",
        keywords: "犧牲與換位",
        advice: "試著換個角度看世界，學習暫停與放下的智慧。",
        text: "在喜馬拉雅山腳下，你會發現慢下來才能走得更遠。" 
    },
    { 
        id: 13, 
        card: "XIII. 死神", 
        img: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg",
        dest: "墨西哥", 
        flag: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg",
        keywords: "結束與重生",
        advice: "舊的不去，新的不來，你需要一場徹底的轉化。",
        text: "在亡靈節斑斕的色彩中，慶祝生命的延續與新生。" 
    },
    { 
        id: 14, 
        card: "XIV. 節制", 
        img: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg",
        dest: "加拿大・班夫", 
        flag: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada.svg",
        keywords: "調和與療癒",
        advice: "尋找冰與火、身與心的調和，療癒疲憊的靈魂。",
        text: "在洛磯山脈的湖光山色中，讓身心靈重回和諧頻率。" 
    },
    { 
        id: 15, 
        card: "XV. 惡魔", 
        img: "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg",
        dest: "泰國・芭達雅", 
        flag: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg",
        keywords: "慾望與束縛",
        advice: "誠實面對你的慾望吧！偶爾的放縱不是罪。",
        text: "去享受一場物質與感官的狂歡派對，釋放壓抑已久的自己。" 
    },
    { 
        id: 16, 
        card: "XVI. 高塔", 
        img: "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg",
        dest: "美國・大峽谷", 
        flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg",
        keywords: "破壞與覺醒",
        advice: "打破現有的框架與信念，你需要強烈的震撼。",
        text: "大自然鬼斧神工的景色，能幫你重組早已僵化的價值觀。" 
    },
    { 
        id: 17, 
        card: "XVII. 星星", 
        img: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg",
        dest: "紐西蘭", 
        flag: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg",
        keywords: "希望與靈感",
        advice: "希望能指引方向，保持信心，未來充滿光芒。",
        text: "在蒂卡波湖無光害的星空下許願，感受純粹的療癒能量。" 
    },
    { 
        id: 18, 
        card: "XVIII. 月亮", 
        img: "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg",
        dest: "英國・蘇格蘭高地", 
        flag: "https://upload.wikimedia.org/wikipedia/commons/1/10/Flag_of_Scotland.svg",
        keywords: "不安與潛意識",
        advice: "直覺往往比邏輯重要，探索你潛意識深處的夢境。",
        text: "在迷霧、古堡與傳說中，你會看見自己真實的恐懼與渴望。" 
    },
    { 
        id: 19, 
        card: "XIX. 太陽", 
        img: "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg",
        dest: "義大利・西西里島", 
        flag: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg",
        keywords: "快樂與成功",
        advice: "擁抱純粹的快樂與生命力！你值得陽光普照的日子。",
        text: "燦爛陽光、蔚藍地中海，讓你像孩子一樣開懷大笑。" 
    },
    { 
        id: 20, 
        card: "XX. 審判", 
        img: "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg",
        dest: "秘魯・馬丘比丘", 
        flag: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Peru.svg",
        keywords: "召喚與覺醒",
        advice: "這是一聲來自靈魂的召喚，去完成你的人生清單。",
        text: "走上印加古道，完成那塊最重要的拼圖，迎來生命的覺醒。" 
    },
    { 
        id: 21, 
        card: "XXI. 世界", 
        img: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg",
        dest: "環球遊輪", 
        flag: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg",
        keywords: "圓滿與整合",
        advice: "旅程的終點是圓滿，不用再選擇，去擁抱整個世界。",
        text: "享受達成目標的成就感，這是一趟集大成的完美旅程。" 
    }
];
