// 匯出資料庫：包含牌名、目的地、文案、以及【真實圖檔連結】
// 圖源使用經典 Rider-Waite-Smith (Public Domain)

export const tarotData = [
    { 
        id: 0, 
        card: "0. 愚者 (The Fool)", 
        // 新增圖片連結欄位
        img: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg",
        dest: "🇮🇸 冰島", 
        text: "你的靈魂渴望一場不顧一切的流浪。在世界的盡頭與極光相遇，讓一切歸零重啟。" 
    },
    { 
        id: 1, 
        card: "I. 魔術師 (The Magician)", 
        img: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
        dest: "🇸🇬 新加坡", 
        text: "此刻的你充滿創造力與顯化能力。去一個融合未來科技與綠意的城市，激發更多靈感。" 
    },
    { 
        id: 2, 
        card: "II. 女祭司 (The High Priestess)", 
        img: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg",
        dest: "🇪🇬 埃及", 
        text: "你渴望深入未知的神秘領域。尼羅河畔的古老智慧與神殿，正等待著你的解讀。" 
    },
    { 
        id: 3, 
        card: "III. 皇后 (The Empress)", 
        img: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg",
        dest: "🇫🇷 法國・巴黎", 
        text: "你需要極致的感官滋養。藝術、時尚、美食，請好好寵愛你自己，感受豐盛的美學。" 
    },
    { 
        id: 4, 
        card: "IV. 皇帝 (The Emperor)", 
        img: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg",
        dest: "🇩🇪 德國・柏林", 
        text: "生活需要建立秩序與結構。在歷史厚度與現代秩序交錯的城市，找回你的掌控權。" 
    },
    { 
        id: 5, 
        card: "V. 教皇 (The Hierophant)", 
        img: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg",
        dest: "🇮🇳 印度・瓦拉納西", 
        text: "這是一趟尋求精神指引的旅程。在恆河邊的晨禱與傳統儀式中，尋求心靈的答案。" 
    },
    { 
        id: 6, 
        card: "VI. 戀人 (The Lovers)", 
        img: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg",
        dest: "🇬🇷 希臘・聖托里尼", 
        text: "面對人生選擇時，請聽從你的心。在藍白相間的浪漫島嶼，找回愛的初衷。" 
    },
    { 
        id: 7, 
        card: "VII. 戰車 (The Chariot)", 
        img: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
        dest: "🇦🇪 杜拜", 
        text: "你的野心需要釋放。去沙漠中拔地而起的奇蹟之城，感受強大意志力如何征服世界。" 
    },
    { 
        id: 8, 
        card: "VIII. 力量 (Strength)", 
        img: "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg",
        dest: "🇰🇪 肯亞", 
        text: "真正的力量是以柔克剛。在廣袤草原看動物大遷徙，喚醒你內在最原始的勇氣。" 
    },
    { 
        id: 9, 
        card: "IX. 隱士 (The Hermit)", 
        img: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg",
        dest: "🇯🇵 日本・京都", 
        text: "世界太吵了。你需要古寺的鐘聲、苔蘚與枯山水，來一場與靈魂深處的獨處對話。" 
    },
    { 
        id: 10, 
        card: "X. 命運之輪 (Wheel of Fortune)", 
        img: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg",
        dest: "🇹🇷 土耳其", 
        text: "改變的時刻到了，順勢而為。搭上熱氣球升空，當視角改變了，運氣也會跟著轉動。" 
    },
    { 
        id: 11, 
        card: "XI. 正義 (Justice)", 
        img: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg",
        dest: "🇨🇭 瑞士", 
        text: "你需要絕對的客觀與平靜。在阿爾卑斯山純淨無瑕的風景中，找回生活的平衡點。" 
    },
    { 
        id: 12, 
        card: "XII. 倒吊人 (The Hanged Man)", 
        img: "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg",
        dest: "🇳🇵 尼泊爾", 
        text: "試著換個角度看世界。在喜馬拉雅山腳下，學習暫停、等待與放下的智慧。" 
    },
    { 
        id: 13, 
        card: "XIII. 死神 (Death)", 
        img: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg",
        dest: "🇲🇽 墨西哥", 
        text: "舊的不去，新的不來。在亡靈節斑斕的色彩中，慶祝生命的轉化與重生。" 
    },
    { 
        id: 14, 
        card: "XIV. 節制 (Temperance)", 
        img: "https://
