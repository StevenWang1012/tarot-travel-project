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
const mainInterface = document.getElementById('main-interface');
const cardContainer = document.getElementById('card-container');
const resultModal = document.getElementById('result-modal');
const closeBtn = document.querySelector('.close-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const analysisContent = document.getElementById('analysis-content');
const resultCardsContainer = document.querySelector('.result-cards');

// 新增：滾輪選擇器元素
const yearSelect = document.getElementById('birth-year');
const monthSelect = document.getElementById('birth-month');
const daySelect = document.getElementById('birth-day');

// === 初始化：自動填入年月日選項 ===
document.addEventListener('DOMContentLoaded', () => {
    if (yearSelect && monthSelect && daySelect) {
        populateDateSelects();
    }
    initCards(); // 預先準備好卡片
});

function populateDateSelects() {
    // 1. 年份：從 2020 到 1950
    const currentYear = new Date().getFullYear();
    const endYear = 2025; // 允許選到最新
    const startYear = 1950;
    
    // 預設提示選項
    addOption(yearSelect, "", "年份");
    for (let y = endYear; y >= startYear; y--) {
        addOption(yearSelect, y, y);
    }

    // 2. 月份：1 ~ 12
    addOption(monthSelect, "", "月份");
    for (let m = 1; m <= 12; m++) {
        addOption(monthSelect, m, m + "月");
    }

    // 3. 日期：1 ~ 31
    addOption(daySelect, "", "日期");
    for (let d = 1; d <= 31; d++) {
        addOption(daySelect, d, d + "日");
    }
}

function addOption(selectElement, value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    selectElement.appendChild(option);
}

// 監聽開始按鈕
if (startBtn) {
    startBtn.addEventListener('click', () => {
        // 獲取三個滾輪的值
        const y = yearSelect.value;
        const m = monthSelect.value;
        const d = daySelect.value;

        // 檢查是否都有選
        if (!y || !m || !d) {
            alert("請完整選擇您的出生年、月、日，讓我們連結您的靈魂矩陣。");
            return;
        }

        // 拼湊成 YYYY-MM-DD 格式，補零
        const mm = m.padStart(2, '0');
        const dd = d.padStart(2, '0');
        userBirthday = `${y}-${mm}-${dd}`;
        
        startBtn.textContent = "✦ 正在下載靈魂數據...";
        startBtn.style.opacity = "0.8";

        setTimeout(() => {
            startScreen.style.opacity = '0';
            setTimeout(() => {
                startScreen.style.display = 'none';
                mainInterface.style.display = 'flex';
                // 這裡不需要再呼叫 initCards，因為 DOMContentLoaded 時已經呼叫過了
                // 只需要確保卡片容器是乾淨的並顯示出來
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

    // 渲染文案
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
