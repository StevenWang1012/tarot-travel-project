import { tarotData } from './data.js';

// 全局變數
let displayedCards = []; // 桌面上顯示的牌
let selectedCards = [];  // 使用者選中的牌 (按順序)
const cardContainer = document.getElementById('card-container');
const resultModal = document.getElementById('result-modal');
const closeBtn = document.querySelector('.close-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const analysisContent = document.getElementById('analysis-content');
const resultCardsContainer = document.querySelector('.result-cards');

// 初始化：頁面載入時洗牌
document.addEventListener('DOMContentLoaded', initCards);

// 洗牌並發牌
function initCards() {
    cardContainer.innerHTML = '';
    selectedCards = [];
    resultModal.style.display = 'none';

    // 1. 從完整牌庫中隨機抽取 10 張牌放在桌面上供選擇
    // (全顯示22張會太擠，隨機取10張營造"命運"感)
    displayedCards = [...tarotData]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

    // 2. 渲染卡片到介面
    displayedCards.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'tarot-card';
        cardEl.dataset.id = card.id;
        
        // 扇形排列計算
        const totalCards = displayedCards.length;
        const angle = (index - (totalCards - 1) / 2) * 5; // 每張相差5度
        const yOffset = Math.abs(index - (totalCards - 1) / 2) * 5; // 兩側稍微下沉

        cardEl.style.transform = `rotate(${angle}deg) translateY(${yOffset}px)`;
        
        // 計算水平位置，讓它們稍微重疊但展開
        // 視窗寬度越小，間距應該越小
        const step = window.innerWidth < 768 ? 30 : 60; 
        const startLeft = 50; // 50% 處
        // 這裡用 CSS calc 來定位，讓所有牌以中心為基準向左右展開
        // 簡單點：直接用 flex 或者 absolute left 計算
        // 為了扇形效果，這裡手動計算 left
        // 假設中心是 50%，每張牌偏移 step
        const offset = (index - (totalCards - 1) / 2) * step;
        cardEl.style.left = `calc(50% + ${offset}px - 60px)`; // 60px是卡片寬度的一半

        // 點擊事件
        cardEl.addEventListener('click', () => handleCardClick(cardEl, card));
        
        cardContainer.appendChild(cardEl);
    });
}

// 處理卡片點擊
function handleCardClick(cardEl, cardData) {
    // 如果已經選了這張，則取消選擇
    if (selectedCards.some(c => c.id === cardData.id)) {
        cardEl.classList.remove('selected');
        selectedCards = selectedCards.filter(c => c.id !== cardData.id);
        return;
    }

    // 檢查是否已選滿 3 張
    if (selectedCards.length >= 3) {
        return; // 不做任何事，或者提示已滿
    }

    // 選取卡片
    cardEl.classList.add('selected');
    selectedCards.push(cardData);

    // 如果選滿 3 張，延遲後顯示結果
    if (selectedCards.length === 3) {
        setTimeout(showResult, 800); // 稍微停頓讓使用者看到選取狀態
    }
}

// 顯示結果
function showResult() {
    if (selectedCards.length < 3) return;

    // 定義三張牌的角色
    const currentCard = selectedCards[0]; // 現狀
    const desireCard = selectedCards[1];  // 渴望/建議
    const destCard = selectedCards[2];    // 最終目的地

    // 1. 渲染上方三張牌圖示
    resultCardsContainer.innerHTML = '';
    selectedCards.forEach((card, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'result-card-item';
        
        // 標籤：第幾張牌
        const label = document.createElement('span');
        label.className = 'card-label';
        label.textContent = index === 0 ? "現狀" : index === 1 ? "指引" : "目的地";

        const img = document.createElement('img');
        img.src = card.img;
        img.alt = card.card;
        img.className = 'tarot-img';

        const name = document.createElement('p');
        name.textContent = card.card.split('.')[1]; // 去掉前面的數字編號，只留牌名

        wrapper.appendChild(label);
        wrapper.appendChild(img);
        wrapper.appendChild(name);
        resultCardsContainer.appendChild(wrapper);
    });

    // 2. 渲染三段式文字分析
    // 使用 innerHTML 構建結構
    analysisContent.innerHTML = `
        <div class="analysis-section">
            <h4>✦ 靈魂現狀</h4>
            <p>抽到<strong>「${currentCard.card}」</strong>，象徵你目前的能量關鍵字是<span class="highlight">${currentCard.keywords}</span>。</p>
        </div>
        
        <div class="analysis-section">
            <h4>✦ 內在指引</h4>
            <p>你的靈魂深處告訴你：<strong>「${desireCard.advice}」</strong>這張牌暗示你需要${desireCard.keywords}。</p>
        </div>

        <div class="dest-divider">▼ 宇宙為你指引的命定之地 ▼</div>

        <div class="dest-section">
            <h2 class="dest-title">
                <img src="${destCard.flag}" class="dest-flag" alt="flag"> 
                ${destCard.dest}
            </h2>
            <p class="dest-quote">"${destCard.text}"</p>
        </div>
    `;

    // 顯示彈窗
    resultModal.style.display = 'flex';
}

// 關閉彈窗
closeBtn.addEventListener('click', () => {
    resultModal.style.display = 'none';
    // 選擇性：關閉後是否重置？通常建議重置，讓使用者可以重玩
    initCards(); 
});

// 點擊遮罩層也可關閉
window.addEventListener('click', (e) => {
    if (e.target === resultModal) {
        resultModal.style.display = 'none';
        initCards();
    }
});

// 重新洗牌按鈕
shuffleBtn.addEventListener('click', initCards);
