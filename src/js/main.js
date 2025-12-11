// src/js/main.js

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
const zodiacScreen = document.getElementById('zodiac-screen'); // 新增
const startBtn = document.getElementById('start-btn');
const mainInterface = document.getElementById('main-interface');
const cardContainer = document.getElementById('card-container');
const resultModal = document.getElementById('result-modal');
const closeBtn = document.querySelector('.close-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const analysisContent = document.getElementById('analysis-content');
const resultCardsContainer = document.querySelector('.result-cards');

// 星座元素
const zodiacIcon = document.getElementById('zodiac-icon');
const zodiacName = document.getElementById('zodiac-name');
const zodiacEnergy = document.getElementById('zodiac-energy');

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
    return active ? active.dataset.val.toString() : null;
}

// === 星座計算邏輯 ===
function getZodiac(month, day) {
    const zodiacs = [
        { name: "摩羯座", icon: "♑", energy: "土象能量・結構與野心", start: 22 },
        { name: "水瓶座", icon: "♒", energy: "風象能量・革新與自由", start: 20 },
        { name: "雙魚座", icon: "♓", energy: "水象能量・夢幻與慈悲", start: 19 },
        { name: "牡羊座", icon: "♈", energy: "火象能量・行動與熱情", start: 21 },
        { name: "金牛座", icon: "♉", energy: "土象能量・感官與穩定", start: 20 },
        { name: "雙子座", icon: "♊", energy: "風象能量・交流與多變", start: 21 },
        { name: "巨蟹座", icon: "♋", energy: "水象能量・情感與守護", start: 22 },
        { name: "獅子座", icon: "♌", energy: "火象能量・創造與榮耀", start: 23 },
        { name: "處女座", icon: "♍", energy: "土象能量・細節與服務", start: 23 },
        { name: "天秤座", icon: "♎", energy: "風象能量・和諧與關係", start: 23 },
        { name: "天蠍座", icon: "♏", energy: "水象能量・直覺與轉化", start: 24 },
        { name: "射手座", icon: "♐", energy: "火象能量・探索與信念", start: 22 },
        { name: "摩羯座", icon: "♑", energy: "土象能量・結構與野心", start: 22 } // 用來處理12月底
    ];
    
    // 陣列索引對應月份 (0=1月, 1=2月...)
    // 摩羯(1月) index=0, 水瓶(2月) index=1...
    // 但因為有跨月問題，邏輯稍微調整：
    // 如果 day < start，則是上個月的星座；否則就是這個月的星座。
    // 注意：zodiacs[0] 是摩羯(對應1月開頭)，zodiacs[12] 也是摩羯(對應12月結尾)
    
    // 修正索引：月份 - 1
    let index = month - 1;
    if (day < zodiacs[index + 1].start) {
        return zodiacs[index]; // 其實是上一個星座，這裡陣列順序已經排好
        // 修正邏輯：摩羯(1/1-1/19) -> index 0
    }
    
    // 簡單查表法：
    // 1.1~1.19 摩羯(0), 1.20~ 水瓶(1)
    // 2.1~2.18 水瓶(1), 2.19~ 雙魚(2)
    // ...
    
    const boundaries = [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 22, 22];
    // Jan(0): 20 -> 摩羯/水瓶
    // Dec(11): 22 -> 射手/摩羯
    
    const m = parseInt(month) - 1;
    const d = parseInt(day);
    
    if (d >= boundaries[m]) {
        return zodiacs[m + 1];
    } else {
        return zodiacs[m];
    }
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

        const mm = m.padStart(2, '0');
        const dd = d.padStart(2, '0');
        userBirthday = `${y}-${mm}-${dd}`;
        
        // 1. 計算星座
        const zodiac = getZodiac(m, d);
        
        // 2. 顯示星座過場
        zodiacIcon.textContent = zodiac.icon;
        zodiacName.textContent = zodiac.name;
        zodiacEnergy.textContent = zodiac.energy;
        
        startScreen.style.opacity = '0'; // 淡出開始頁
        
        setTimeout(() => {
            startScreen.style.display = 'none';
            zodiacScreen.style.display = 'flex'; // 顯示星座頁
            
            // 3. 等待動畫結束 (2.5秒) 後進入主畫面
            setTimeout(() => {
                zodiacScreen.style.opacity = '0'; // 淡出星座頁
                setTimeout(() => {
                    zodiacScreen.style.display = 'none';
                    mainInterface.style.display = 'flex';
                    initCards(); 
                }, 500);
            }, 2500);
        }, 500);
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

function calculateDestinyIndices(birthdayString, cardId, cityOptionsCount) {
    const dateObj = new Date(birthdayString);
    if (isNaN(dateObj.getTime())) {
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
