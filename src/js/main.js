// src/js/main.js

// 檢查資料
if (typeof window.tarotData === 'undefined' || typeof window.soulMissions === 'undefined') {
    console.error("錯誤：資料載入失敗，請確認 data.js 是否完整。");
}

const cardData = window.tarotData || []; 
const missionData = window.soulMissions || [];

let displayedCards = []; 
let selectedCards = [];  
let userBirthday = ""; 
let isLocked = false;

const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');
const mainInterface = document.getElementById('main-interface');
const cardContainer = document.getElementById('card-container');
const resultModal = document.getElementById('result-modal');
const closeBtn = document.querySelector('.close-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const analysisContent = document.getElementById('analysis-content');
const resultCardsContainer = document.querySelector('.result-cards');

const yearWheel = document.getElementById('year-wheel');
const monthWheel = document.getElementById('month-wheel');
const dayWheel = document.getElementById('day-wheel');

document.addEventListener('DOMContentLoaded', () => {
    if (yearWheel && monthWheel && dayWheel) {
        initWheels();
    }
});

function initWheels() {
    const currentYear = new Date().getFullYear();
    populateWheel(yearWheel, 2025, 1950, 2000); 
    populateWheel(monthWheel, 12, 1, new Date().getMonth() + 1);
    populateWheel(dayWheel, 31, 1, new Date().getDate());

    [yearWheel, monthWheel, dayWheel].forEach(wheel => {
        wheel.addEventListener('scroll', () => highlightActive(wheel));
        highlightActive(wheel);
    });
}

function populateWheel(container, max, min, selectedVal) {
    container.innerHTML = '<div class="wheel-spacer"></div>';
    if (max > min && max > 1000) { 
        for (let i = max; i >= min; i--) {
            createItem(container, i, selectedVal);
        }
    } else {
        for (let i = min; i <= max; i++) {
            createItem(container, i, selectedVal);
        }
    }
    container.innerHTML += '<div class="wheel-spacer"></div>';
    
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
    // 這裡只是顯示用的補0，不影響 dataset.val
    div.textContent = val < 10 ? `0${val}` : val;
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
    // 確保回傳的是字串，方便後續處理
    return active ? active.dataset.val.toString() : null;
}

if (startBtn) {
    startBtn.addEventListener('click', () => {
        const y = getWheelValue(yearWheel);
        const m = getWheelValue(monthWheel);
        const d = getWheelValue(dayWheel);

        if (!y || !m || !d) {
            alert("請完整選擇您的出生年、月、日");
            return;
        }

        // === 關鍵修正：針對 Safari 的日期格式修復 ===
        // 將 "1" 變成 "01"，確保格式為 "YYYY-MM-DD"
        const mm = m.padStart(2, '0');
        const dd = d.padStart(2, '0');
        
        userBirthday = `${y}-${mm}-${dd}`;
        
        // 偵錯用：您可以在朋友手機的 console 看到這個值，現在應該是標準格式了
        console.log("User Birthday:", userBirthday);
        
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
    isLocked = false;
    cardContainer.classList.remove('locked');
    
    if(resultModal) {
        resultModal.style.display = 'none';
        document.body.style.overflow = ''; 
    }

    displayedCards = [...cardData].sort(() => Math.random() - 0.5);

    const containerWidth = window.innerWidth;
    const isMobile = containerWidth < 768;
    const cardWidth = isMobile ? 60 : 100; 
    
    let step = (containerWidth * 0.95 - cardWidth) / (displayedCards.length - 1);
    if (step > 25) step = 25;
    if (step < 5) step = 5;

    displayedCards.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'tarot-card';
        cardEl.dataset.id = card.id;
        
        const totalCards = displayedCards.length;
        const maxAngle = isMobile ? 40 : 60; 
        const angleStep = maxAngle / (totalCards - 1);
        const angle = (index - (totalCards - 1) / 2) * angleStep;
        
        const yOffset = Math.abs(index - (totalCards - 1) / 2) * (isMobile ? 2 : 4); 

        cardEl.style.transform = `rotate(${angle}deg) translateY(${yOffset}px)`;
        
        const offset = (index - (totalCards - 1) / 2) * step;
        cardEl.style.left = `calc(50% + ${offset}px - ${cardWidth / 2}px)`; 

        cardEl.addEventListener('click', () => handleCardClick(cardEl, card));
        cardContainer.appendChild(cardEl);
    });
}

function handleCardClick(cardEl, cardData) {
    if (isLocked) return;

    if (selectedCards.some(c => c.id === cardData.id)) {
        cardEl.classList.remove('selected');
        selectedCards = selectedCards.filter(c => c.id !== cardData.id);
        return;
    }

    if (selectedCards.length >= 3) return;

    cardEl.classList.add('selected');
    selectedCards.push(cardData);

    if (selectedCards.length === 3) {
        isLocked = true;
        cardContainer.classList.add('locked');
        setTimeout(showResult, 800); 
    }
}

// === 核心運算 ===
function calculateDestinyIndices(birthdayString, cardId, cityOptionsCount) {
    // 這裡現在會接收到標準的 "1995-01-05"，Safari 就不會報錯了
    const dateObj = new Date(birthdayString);
    
    // 防呆檢查：如果日期還是無效，提供預設值
    if (isNaN(dateObj.getTime())) {
        console.error("Invalid Date:", birthdayString);
        return { cityIndex: 0, missionIndex: 0 };
    }

    const birthYear = dateObj.getFullYear();
    const birthMonth = dateObj.getMonth() + 1;
    const birthDay = dateObj.getDate();
    const currentYear = new Date().getFullYear();
    
    const cityIndex = (birthYear + cardId + currentYear) % cityOptionsCount;
    const missionIndex = (birthMonth + birthDay) % 9;

    return { cityIndex, missionIndex };
}

function showResult() {
    if (selectedCards.length < 3) return;

    const currentCard = selectedCards[0]; 
    const desireCard = selectedCards[1];  
    const destCardRaw = selectedCards[2]; 

    const cityCount = destCardRaw.cities.length;

    const { cityIndex, missionIndex } = calculateDestinyIndices(userBirthday, destCardRaw.id, cityCount);
    
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
