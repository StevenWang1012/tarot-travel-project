// src/js/main.js

// 檢查資料是否成功載入
if (typeof window.tarotData === 'undefined') {
    console.error("錯誤：找不到 tarotData，請確認 data.js 是否在 main.js 之前載入。");
}

const cardData = window.tarotData || []; 

// 全局變數
let displayedCards = []; 
let selectedCards = [];  
const cardContainer = document.getElementById('card-container');
const resultModal = document.getElementById('result-modal');
const closeBtn = document.querySelector('.close-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const analysisContent = document.getElementById('analysis-content');
const resultCardsContainer = document.querySelector('.result-cards');

document.addEventListener('DOMContentLoaded', initCards);

function initCards() {
    if (!cardContainer) return;
    
    cardContainer.innerHTML = '';
    selectedCards = [];
    
    // 隱藏彈窗並解鎖滾動
    if(resultModal) {
        resultModal.style.display = 'none';
        document.body.style.overflow = ''; // 恢復背景滾動
    }

    // 1. 顯示所有牌 (22張)
    displayedCards = [...cardData].sort(() => Math.random() - 0.5);

    // 2. 渲染卡片
    displayedCards.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'tarot-card';
        cardEl.dataset.id = card.id;
        
        const totalCards = displayedCards.length;
        
        // 排列密度
        const angle = (index - (totalCards - 1) / 2) * 3; 
        const yOffset = Math.abs(index - (totalCards - 1) / 2) * 3; 

        cardEl.style.transform = `rotate(${angle}deg) translateY(${yOffset}px)`;
        
        const isMobile = window.innerWidth < 768;
        const step = isMobile ? 12 : 25; 
        const cardWidth = isMobile ? 90 : 100; // 對應 CSS
        
        const offset = (index - (totalCards - 1) / 2) * step;
        
        // 修正 left 計算
        cardEl.style.left = `calc(50% + ${offset}px - ${cardWidth / 2}px)`; 

        cardEl.addEventListener('click', () => handleCardClick(cardEl, card));
        cardContainer.appendChild(cardEl);
    });
}

function handleCardClick(cardEl, cardData) {
    if (selectedCards.some(c => c.id === cardData.id)) {
        cardEl.classList.remove('selected');
        selectedCards = selectedCards.filter(c => c.id !== cardData.id);
        return;
    }

    if (selectedCards.length >= 3) return;

    cardEl.classList.add('selected');
    selectedCards.push(cardData);

    if (selectedCards.length === 3) {
        setTimeout(showResult, 800); 
    }
}

function showResult() {
    if (selectedCards.length < 3) return;

    const currentCard = selectedCards[0]; 
    const desireCard = selectedCards[1];  
    const destCard = selectedCards[2];    

    resultCardsContainer.innerHTML = '';
    selectedCards.forEach((card, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'result-card-item';
        
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

    if(resultModal) {
        resultModal.style.display = 'flex';
        // 關鍵：鎖定背景滾動
        document.body.style.overflow = 'hidden';
    }
}

if(closeBtn) {
    closeBtn.addEventListener('click', () => {
        initCards(); // initCards 裡包含了恢復滾動的邏輯
    });
}

window.addEventListener('click', (e) => {
    if (e.target === resultModal) {
        initCards();
    }
});

if(shuffleBtn) {
    shuffleBtn.addEventListener('click', initCards);
}
