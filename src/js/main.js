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

// 滾輪元素
const yearWheel = document.getElementById('year-wheel');
const monthWheel = document.getElementById('month-wheel');
const dayWheel = document.getElementById('day-wheel');

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    if (yearWheel && monthWheel && dayWheel) {
        initWheels();
    }
    // 預先準備卡片，但先不顯示
});

// === 3D 滾輪邏輯 ===
function initWheels() {
    const currentYear = new Date().getFullYear();
    // 年份：1950 ~ 2025
    populateWheel(yearWheel, 2025, 1950, 2000); 
    // 月份：1 ~ 12
    populateWheel(monthWheel, 12, 1, new Date().getMonth() + 1);
    // 日期：1 ~ 31
    populateWheel(dayWheel, 31, 1, new Date().getDate());

    // 綁定滾動音效或吸附邏輯 (這裡依賴 CSS scroll-snap)
    [yearWheel, monthWheel, dayWheel].forEach(wheel => {
        wheel.addEventListener('scroll', () => highlightActive(wheel));
        // 初始化高亮
        highlightActive(wheel);
    });
}

function populateWheel(container, max, min, selectedVal) {
    // 前後加空白元素，讓第一個和最後一個選項能捲到中間
    container.innerHTML = '<div class="wheel-spacer"></div>';
    
    // 判斷是遞增還是遞減
    if (max > min && max > 1000) { // 年份通常是倒序比較好找
        for (let i = max; i >= min; i--) {
            createItem(container, i, selectedVal);
        }
    } else {
        for (let i = min; i <= max; i++) {
            createItem(container, i, selectedVal);
        }
    }
    
    container.innerHTML += '<div class="wheel-spacer"></div>';
    
    // 滾動到預設值
    setTimeout(() => {
        const active = container.querySelector(`.wheel-item[data-val="${selectedVal}"]`);
        if (active) {
            active.scrollIntoView({ block: "center" });
        }
    }, 100);
}

function createItem(container, val, selectedVal) {
    const div = document.createElement('div');
    div.className = 'wheel-item';
    div.textContent = val < 10 ? `0${val}` : val; // 補零
    div.dataset.val = val;
    if (val === selectedVal) div.classList.add('active');
    container.appendChild(div);
}

function highlightActive(wheel) {
    const center = wheel.scrollTop + (wheel.clientHeight / 2);
    const items = wheel.querySelectorAll('.wheel-item');
    
    let minDist = Infinity;
    let activeItem = null;

    items.forEach(item => {
        const itemCenter = item.offsetTop + (item.offsetHeight / 2);
        const dist = Math.abs(center - itemCenter);
        
        if (dist < minDist) {
            minDist = dist;
            activeItem = item;
        }
        item.classList.remove('active');
    });

    if (activeItem) {
        activeItem.classList.add('active');
    }
}

function getWheelValue(wheel) {
    const active = wheel.querySelector('.wheel-item.active');
    return active ? active.dataset.val : null;
}

// 監聽開始按鈕
if (startBtn) {
    startBtn.addEventListener('click', () => {
        const y = getWheelValue(yearWheel);
        const m = getWheelValue(monthWheel);
        const d = getWheelValue(dayWheel);

        if (!y || !m || !d) {
            alert("請完整選擇您的出生年、月、日");
            return;
        }

        userBirthday = `${y}-${m}-${d}`;
        
        startBtn.textContent = "✦ 正在下載靈魂數據...";
        startBtn.style.opacity = "0.8";

        setTimeout(() => {
            startScreen.style.opacity = '0';
            setTimeout(() => {
                startScreen.style.display = 'none';
                mainInterface.style.display = 'flex';
                initCards(); // 顯示介面時再生成卡片，確保寬度計算正確
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

    // === 關鍵修改：動態計算間距 ===
    // 獲取容器寬度
    const containerWidth = window.innerWidth;
    // 卡片寬度 (CSS設定是85px)
    const cardWidth = 85; 
    // 我們希望 22 張牌展開後，寬度大約佔螢幕的 95%
    // 總寬度 = (數量-1) * 間距 + 卡片寬度
    // 所以 間距 = (螢幕寬 * 0.95 - 卡片寬) / (數量-1)
    
    let step = (containerWidth * 0.95 - cardWidth) / (displayedCards.length - 1);
    
    // 設定最大間距，避免桌面版太開
    if (step > 25) step = 25;
    // 設定最小間距，避免疊太死 (雖然理論上不會，因為是照螢幕算的)
    if (step < 5) step = 5;

    displayedCards.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'tarot-card';
        cardEl.dataset.id = card.id;
        
        const totalCards = displayedCards.length;
        // 角度也稍微隨螢幕調整，手機版角度小一點比較好看
        const maxAngle = window.innerWidth < 768 ? 40 : 60; // 總展開角度
        const angleStep = maxAngle / (totalCards - 1);
        const angle = (index - (totalCards - 1) / 2) * angleStep;
        
        // 垂直位移：兩側下沉
        const yOffset = Math.abs(index - (totalCards - 1) / 2) * (window.innerWidth < 768 ? 2 : 4); 

        cardEl.style.transform = `rotate(${angle}deg) translateY(${yOffset}px)`;
        
        // 計算 Left 位置
        // 中心點是 50%，然後往左右推
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
    
    const cityIndex = (birthYear + cardId + currentYear) % 3;
    const missionIndex = (birthMonth + birthDay) % 9;

    return { cityIndex, missionIndex };
}

function showResult() {
    if (selectedCards.length < 3) return;

    const currentCard = selectedCards[0]; 
    const desireCard = selectedCards[1];  
    const destCardRaw = selectedCards[2]; 

    const { cityIndex, missionIndex } = calculateDestiny(userBirthday, destCardRaw.id);
    
    const finalDest = destCardRaw.cities[cityIndex];
    const finalMission = missionData[missionIndex];

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
