import { tarotData } from './data.js';

// 全域變量
const cardGrid = document.getElementById('card-grid');
const overlay = document.getElementById('result-overlay');
const destBox = document.getElementById('r-dest');
const quoteBox = document.getElementById('r-quote');
const ctaBtn = document.getElementById('cta-btn');
const closeBtn = document.getElementById('close-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
let selectedCards = []; // 追蹤選中卡片
const YOUR_LINE_URL = 'https://line.me/R/msg/text/'; // 替換為實際LINE連結

// 初始化牌組
function initCards() {
    // 隨機排序牌組
    const shuffled = [...tarotData].sort(() => Math.random() - 0.5);
    cardGrid.innerHTML = ''; // 清空現有卡片
    
    // 生成10張可選卡片（適度數量避免擁擠）
    shuffled.slice(0, 10).forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'card';
        cardEl.dataset.id = card.id;
        cardEl.style.transform = `rotate(${index * 12 - 50}deg)`; // 扇形排列
        cardGrid.appendChild(cardEl);

        // 點擊選中/取消選中
        cardEl.addEventListener('click', () => toggleCardSelection(cardEl, card));
    });

    // 重置狀態
    selectedCards = [];
    overlay.style.display = 'none';
}

// 切換卡片選中狀態
function toggleCardSelection(cardEl, cardData) {
    const isSelected = cardEl.classList.contains('selected');
    
    if (isSelected) {
        // 取消選中
        cardEl.classList.remove('selected', 'revealed', 'floating-center');
        cardEl.style.transform = cardEl.style.originalTransform || ''; // 還原旋轉
        selectedCards = selectedCards.filter(c => c.data.id !== cardData.id);
    } else {
        // 限制選中3張
        if (selectedCards.length >= 3) {
            alert('最多選取3張牌哦！');
            return;
        }
        
        // 標記選中
        cardEl.style.originalTransform = cardEl.style.transform; // 保存原始位置
        cardEl.classList.add('selected', 'revealed', 'floating-center');
        cardEl.style.backgroundImage = `url(${cardData.img})`; // 顯示牌面
        selectedCards.push({ el: cardEl, data: cardData });

        // 選滿3張顯示結果
        if (selectedCards.length === 3) {
            setTimeout(() => showResultModal(selectedCards), 800);
        }
    }
}

// 顯示結果彈窗（優化動畫同步）
function showResultModal(cards) {
    const c1 = cards[0].data; 
    const c2 = cards[1].data; 
    const c3 = cards[2].data; 

    // 生成三張小卡片
    const tarotImgHTML = `
        <div class="three-card-display reveal-pending">
            <div class="mini-card-wrapper">
                <img src="${c1.img}" class="mini-card-img" onerror="this.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ5gMmXAAAAABJRU5ErkJggg=='">
                <div class="mini-card-title">現狀</div>
                <div class="mini-card-name">${c1.card.split('(')[0] || c1.card}</div>
            </div>
            <div class="mini-card-wrapper">
                <img src="${c2.img}" class="mini-card-img" onerror="this.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ5gMmXAAAAABJRU5ErkJggg=='">
                <div class="mini-card-title">渴望</div>
                <div class="mini-card-name">${c2.card.split('(')[0] || c2.card}</div>
            </div>
            <div class="mini-card-wrapper">
                <img src="${c3.img}" class="mini-card-img" onerror="this.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ5gMmXAAAAABJRU5ErkJggg=='">
                <div class="mini-card-title">指引</div>
                <div class="mini-card-name">${c3.card.split('(')[0] || c3.card}</div>
            </div>
        </div>
    `;
    document.getElementById('three-cards-area').innerHTML = tarotImgHTML;

    // 設置文字內容
    destBox.innerHTML = `<img src="${c3.flag}" class="flag-icon" onerror="this.style.display='none'"> ${c3.dest}`;
    const analysisText = `牌陣顯示，你目前正處於「${c1.keywords}」的狀態，而你的靈魂深處渴望著「${c2.keywords}」。\n\n綜合這兩股能量，宇宙為你指引的出口是……`;
    const fullText = `${analysisText}\n${c3.dest}。\n\n${c3.advice}\n${c3.text}`;
    quoteBox.innerHTML = ""; 
    quoteBox.classList.add('typing-cursor'); 

    // 設置LINE按鈕
    const message = encodeURIComponent(`你好，我在靈魂羅盤抽到了【${c3.dest}】。\n(現狀：${c1.keywords} / 渴望：${c2.keywords})，想詢問行程。`);
    ctaBtn.href = `${YOUR_LINE_URL}?text=${message}`;

    // 顯示彈窗
    overlay.style.display = 'flex';

    // 打字動畫（完成後同步顯示元素）
    typeWriter(analysisText, 0, quoteBox, () => {
        quoteBox.classList.remove('typing-cursor'); 
        quoteBox.innerText = fullText; 
        
        // 等待文字顯示後，依次顯示卡片、目的地、按鈕（用transitionend保證同步）
        const cardsArea = document.querySelector('.three-card-display');
        cardsArea.classList.add('reveal-show');
        cardsArea.addEventListener('transitionend', () => {
            destBox.classList.add('reveal-show');
            destBox.addEventListener('transitionend', () => {
                ctaBtn.classList.add('reveal-show');
            }, { once: true });
        }, { once: true });
    });
}

// 打字機動畫
function typeWriter(text, index, element, callback) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        setTimeout(() => typeWriter(text, index + 1, element, callback), 50);
    } else {
        callback();
    }
}

// 關閉彈窗
closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    // 重置選中卡片樣式
    selectedCards.forEach(card => {
        card.el.classList.remove('selected', 'revealed', 'floating-center');
        card.el.style.transform = card.el.style.originalTransform || '';
    });
    selectedCards = [];
});

// 重新洗牌（替換刷新頁面）
shuffleBtn.addEventListener('click', initCards);

// 初始化
window.addEventListener('DOMContentLoaded', initCards);
