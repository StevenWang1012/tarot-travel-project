// src/js/main.js

// 檢查資料是否成功載入
if (typeof window.tarotData === 'undefined') {
    console.error("錯誤：找不到 tarotData，請確認 data.js 是否在 main.js 之前載入。");
}

const cardData = window.tarotData || []; 

// 全局變數
let displayedCards = []; 
let selectedCards = [];  
let userBirthday = ""; // 儲存使用者生日 (計算流年用)

// DOM 元素
const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');
const birthdayInput = document.getElementById('birthday-input');
const mainInterface = document.getElementById('main-interface');
const cardContainer = document.getElementById('card-container');
const resultModal = document.getElementById('result-modal');
const closeBtn = document.querySelector('.close-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const analysisContent = document.getElementById('analysis-content');
const resultCardsContainer = document.querySelector('.result-cards');

// 監聽開始按鈕
if (startBtn) {
    startBtn.addEventListener('click', () => {
        const dateVal = birthdayInput.value;
        if (!dateVal) {
            alert("請先選擇您的出生年月日，讓我們連結您的流年能量。");
            return;
        }

        userBirthday = dateVal;
        
        // 儀式感：按鈕變色
        startBtn.textContent = "✦ 正在連結宇宙流年...";
        startBtn.style.opacity = "0.8";

        // 模擬運算延遲
        setTimeout(() => {
            startScreen.style.opacity = '0';
            setTimeout(() => {
                startScreen.style.display = 'none';
                mainInterface.style.display = 'flex';
                initCards();
            }, 500);
        }, 1000);
    });
}

function initCards() {
    if (!cardContainer) return;
    
    cardContainer.innerHTML = '';
    selectedCards = [];
    
    if(resultModal) {
        resultModal.style.display = 'none';
        document.body.style.overflow = ''; 
    }

    // 顯示所有 22 張牌
    displayedCards = [...cardData].sort(() => Math.random() - 0.5);

    displayedCards.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'tarot-card';
        cardEl.dataset.id = card.id;
        
        const totalCards = displayedCards.length;
        const angle = (index - (totalCards - 1) / 2) * 3; 
        const yOffset = Math.abs(index - (totalCards - 1) / 2) * 3; 

        cardEl.style.transform = `rotate(${angle}deg) translateY(${yOffset}px)`;
        
        const isMobile = window.innerWidth < 768;
        const step = isMobile ? 12 : 25; 
        const cardWidth = isMobile ? 90 : 100; 
        
        const offset = (index - (totalCards - 1) / 2) * step;
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

// === 核心：靈魂流年演算法 ===
function calculateSoulDest(birthdayString, cardId) {
    // 1. 處理生日：移除符號 (例如 "1990-05-20" -> 19900520)
    const birthNumber = parseInt(birthdayString.replace(/-/g, ''));
    
    // 2. 獲取當前年份 (流年關鍵)
    const currentYear = new Date().getFullYear();
    
    // 3. 核心公式：(生日 + 牌ID + 年份) 除以 3 取餘數
    // 結果會是 0, 1, 或 2
    const magicNumber = (birthNumber + cardId + currentYear) % 3;

    return magicNumber; // 回傳索引值 (0=TypeA, 1=TypeB, 2=TypeC)
}

function showResult() {
    if (selectedCards.length < 3) return;

    const currentCard = selectedCards[0]; 
    const desireCard = selectedCards[1];  
    const destCardRaw = selectedCards[2]; // 這是原始卡片資料

    // 運用演算法，算出「流年命定城市」
    // 從 destCardRaw.cities 陣列中，挑出 0, 1, 或 2
    const magicIndex = calculateSoulDest(userBirthday, destCardRaw.id);
    const finalDest = destCardRaw.cities[magicIndex];

    // 渲染上方圖示
    resultCardsContainer.innerHTML = '';
    selectedCards.forEach((card, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'result-card-item';
        
        const label = document.createElement('span');
        label.className = 'card-label';
        label.textContent = index === 0 ? "現狀" : index === 1 ? "指引" : "目的地";

        const img = document.createElement('img');
        img.src = card.img; // 這裡依然顯示塔羅牌原本的圖
        img.alt = card.card;
        img.className = 'tarot-img';

        const name = document.createElement('p');
        name.textContent = card.card.split('.')[1]; 

        wrapper.appendChild(label);
        wrapper.appendChild(img);
        wrapper.appendChild(name);
        resultCardsContainer.appendChild(wrapper);
    });

    // 渲染文字分析
    // 注意：這裡的最後一段，使用了 finalDest (算出來的城市) 的資料
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
                <img src="${finalDest.flag}" class="dest-flag" alt="flag"> 
                ${finalDest.name}
            </h2>
            <p class="dest-quote">"${finalDest.text}"</p>
        </div>
    `;

    if(resultModal) {
        resultModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

if(closeBtn) {
    closeBtn.addEventListener('click', () => {
        initCards(); 
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
