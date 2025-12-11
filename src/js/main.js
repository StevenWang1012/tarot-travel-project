// src/js/main.js

// 檢查資料
if (typeof window.tarotData === 'undefined' || typeof window.soulMissions === 'undefined') {
    console.error("錯誤：資料載入失敗，請確認 data.js 是否完整。");
}

const cardData = window.tarotData || []; 
const missionData = window.soulMissions || [];

// 全局變數
let displayedCards = []; 
let selectedCards = [];  
let userBirthday = ""; 

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
            alert("請先選擇您的出生年月日，讓我們連結您的靈魂矩陣。");
            return;
        }

        userBirthday = dateVal;
        
        startBtn.textContent = "✦ 正在下載靈魂數據...";
        startBtn.style.opacity = "0.8";

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

// === 核心運算：流年地點 + 靈魂任務 ===
function calculateDestiny(birthdayString, cardId) {
    const dateObj = new Date(birthdayString);
    const birthYear = dateObj.getFullYear();
    const birthMonth = dateObj.getMonth() + 1;
    const birthDay = dateObj.getDate();
    const currentYear = new Date().getFullYear();
    
    // 1. 地點演算法 (Where): (出生年 + 卡牌ID + 當前年) % 3
    const cityIndex = (birthYear + cardId + currentYear) % 3;

    // 2. 任務演算法 (What): (月 + 日) % 9
    // 讓任務與地點脫鉤，增加隨機組合的樂趣
    const missionIndex = (birthMonth + birthDay) % 9;

    return { cityIndex, missionIndex };
}

function showResult() {
    if (selectedCards.length < 3) return;

    const currentCard = selectedCards[0]; 
    const desireCard = selectedCards[1];  
    const destCardRaw = selectedCards[2]; 

    // 取得運算結果
    const { cityIndex, missionIndex } = calculateDestiny(userBirthday, destCardRaw.id);
    
    const finalDest = destCardRaw.cities[cityIndex];
    const finalMission = missionData[missionIndex];

    // 渲染卡片
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

    // 渲染文案 (新增任務區塊)
    analysisContent.innerHTML = `
        <div class="analysis-section">
            <h4>✦ 靈魂現狀</h4>
            <p>抽到<strong>「${currentCard.card}」</strong>，象徵你目前的能量關鍵字是<span class="highlight">${currentCard.keywords}</span>。</p>
        </div>
        
        <div class="analysis-section">
            <h4>✦ 內在指引</h4>
            <p>你的靈魂深處告訴你：<strong>「${desireCard.advice}」</strong>這張牌暗示你需要${desireCard.keywords}。</p>
        </div>

        <div class="dest-divider">▼ 宇宙流年指引 ▼</div>

        <div class="dest-section">
            <h2 class="dest-title">
                <img src="${finalDest.flag}" class="dest-flag" alt="flag"> 
                ${finalDest.name}
            </h2>
            <p class="dest-quote">"${finalDest.text}"</p>
        </div>

        <div class="mission-section">
            <div class="mission-label">✦ 你的靈魂任務 ✦</div>
            <h3 class="mission-title">${finalMission.title}</h3>
            <p class="mission-desc">${finalMission.desc}</p>
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
