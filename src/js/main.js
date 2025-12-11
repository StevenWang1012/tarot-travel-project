// src/js/main.js

// 檢查資料是否成功載入
if (typeof window.tarotData === 'undefined') {
    console.error("錯誤：找不到 tarotData，請確認 data.js 是否在 main.js 之前載入。");
    alert("系統載入錯誤，請重新整理頁面");
}

// 取得資料（因為已經掛載在 window 上，可以直接使用 tarotData）
const cardData = window.tarotData; 

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
    if (!cardContainer) {
        console.error("錯誤：找不到 card-container 元素，請檢查 HTML");
        return;
    }
    
    cardContainer.innerHTML = '';
    selectedCards = [];
    if(resultModal) resultModal.style.display = 'none';

    // 1. 從完整牌庫中隨機抽取 10 張牌放在桌面上供選擇
    // 使用 cardData 替代之前的 tarotData
    displayedCards = [...cardData]
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
        
        // 計算水平位置
        const step = window.innerWidth < 768 ? 30 : 60; 
        const offset = (index - (totalCards - 1) / 2) * step;
        cardEl.style.left = `calc(50% + ${offset}px - 60px)`; 

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
        return; 
    }

    // 選取卡片
    cardEl.classList.add('selected');
    selectedCards.push(cardData);

    // 如果選滿 3 張，延遲後顯示結果
    if (selectedCards.length === 3) {
        setTimeout(showResult, 800); 
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
        name.textContent = card.card.split('.')[1]; 

        wrapper.appendChild(label);
        wrapper.appendChild(img);
        wrapper.appendChild(name);
        resultCardsContainer.appendChild(wrapper);
    });

    // 2. 渲染三段式文字分析
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
    if(resultModal) resultModal.style.display = 'flex';
}

// 關閉彈窗
if(closeBtn) {
    closeBtn.addEventListener('click', () => {
        resultModal.style.display = 'none';
        initCards(); 
    });
}

// 點擊遮罩層也可關閉
window.addEventListener('click', (e) => {
    if (e.target === resultModal) {
        resultModal.style.display = 'none';
        initCards();
    }
});

// 重新洗牌按鈕
if(shuffleBtn) {
    shuffleBtn.addEventListener('click', initCards);
}
