// 模擬塔罗牌數據（可替換為真實數據）
const tarotData = [
    { id: 1, name: "愚者", img: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg", dest: "希臘", desc: "適合冒險的旅程，探索未知的風景。" },
    { id: 2, name: "魔術師", img: "https://upload.wikimedia.org/wikipedia/commons/5/5f/RWS_Tarot_01_Magician.jpg", dest: "日本", desc: "充滿創意的旅程，體驗獨特文化。" },
    { id: 3, name: "女祭司", img: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg", dest: "埃及", desc: "神秘的旅程，探索古老文明的智慧。" },
    { id: 4, name: "女皇", img: "https://upload.wikimedia.org/wikipedia/commons/b/b4/RWS_Tarot_03_Empress.jpg", dest: "義大利", desc: "享受美食與藝術的旅程，感受生活美好。" },
    { id: 5, name: "皇帝", img: "https://upload.wikimedia.org/wikipedia/commons/9/9a/RWS_Tarot_04_Emperor.jpg", dest: "英國", desc: "充滿歷史與莊嚴的旅程，體驗皇室文化。" },
    { id: 6, name: "教皇", img: "https://upload.wikimedia.org/wikipedia/commons/0/06/RWS_Tarot_05_Hierophant.jpg", dest: "西班牙", desc: "感受宗教與傳統交融的獨特魅力。" },
    { id: 7, name: "戀人", img: "https://upload.wikimedia.org/wikipedia/commons/2/2a/RWS_Tarot_06_Lovers.jpg", dest: "法國", desc: "浪漫的旅程，適合與心愛的人同行。" },
    { id: 8, name: "戰車", img: "https://upload.wikimedia.org/wikipedia/commons/1/19/RWS_Tarot_07_Chariot.jpg", dest: "德國", desc: "充滿動力的旅程，探索精密與效率之美。" },
    { id: 9, name: "力量", img: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_08_Strength.jpg", dest: "美國", desc: "充滿活力的旅程，挑戰自我極限。" },
    { id: 10, name: "隱者", img: "https://upload.wikimedia.org/wikipedia/commons/7/73/RWS_Tarot_09_Hermit.jpg", dest: "挪威", desc: "寧靜的旅程，與自然深度連接。" }
];

// 全局變量
let selectedCards = [];
const cardContainer = document.getElementById('card-container');
const resultModal = document.getElementById('result-modal');
const closeBtn = document.querySelector('.close-btn');
const shuffleBtn = document.getElementById('shuffle-btn');

// 初始化卡片
function initCards() {
    cardContainer.innerHTML = ''; // 清空容器
    selectedCards = []; // 重置選中狀態

    // 隨機顯示8張牌（扇形排列）
    const shuffled = [...tarotData].sort(() => Math.random() - 0.5).slice(0, 8);
    shuffled.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'tarot-card';
        cardEl.dataset.id = card.id;
        // 扇形排列（左右對稱）
        const angle = (index - 3.5) * 15; // 中間對齊，每張牌相差15度
        cardEl.style.transform = `rotate(${angle}deg)`;
        cardEl.style.left = `calc(50% - 60px)`; // 水平居中
        cardEl.style.zIndex = index + 1; // 避免完全重疊

        // 點擊選中/取消選中
        cardEl.addEventListener('click', () => toggleSelect(cardEl, card));
        
        cardContainer.appendChild(cardEl);
    });
}

// 切換卡片選中狀態
function toggleSelect(cardEl, cardData) {
    const isSelected = cardEl.classList.contains('selected');

    if (isSelected) {
        // 取消選中
        cardEl.classList.remove('selected');
        selectedCards = selectedCards.filter(c => c.id !== cardData.id);
    } else {
        // 最多選3張
        if (selectedCards.length >= 3) {
            alert('最多選擇3張牌哦！');
            return;
        }
        // 選中
        cardEl.classList.add('selected');
        selectedCards.push(cardData);

        // 選滿3張顯示結果
        if (selectedCards.length === 3) {
            setTimeout(showResult, 500);
        }
    }
}

// 顯示結果彈窗
function showResult() {
    // 隨機選取一個目的地作為結果（以第三張牌為主）
    const resultCard = selectedCards[2];
    
    // 顯示選中的3張牌
    const resultCardsContainer =
