import { tarotData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('card-grid');
    const overlay = document.getElementById('result-overlay');
    const closeBtn = document.getElementById('close-btn');
    const ctaBtn = document.getElementById('cta-btn');
    // 【新增】獲取圖片元素
    const resultImg = document.getElementById('r-img');

    // 洗牌算法
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    // 初始化遊戲
    function initGame() {
        grid.innerHTML = '';
        const shuffledDeck = shuffle([...tarotData]);

        shuffledDeck.forEach((item, index) => {
            let cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            // 點擊時觸發揭曉
            cardDiv.onclick = () => revealCard(item);
            
            // 簡單的入場動畫
            cardDiv.style.opacity = '0';
            grid.appendChild(cardDiv);
            setTimeout(() => {
                cardDiv.style.transition = 'opacity 0.5s ease';
                cardDiv.style.opacity = '1';
            }, index * 50);
        });
    }

    // 揭曉卡片函數
    function revealCard(data) {
        // 【關鍵修改】設定圖片來源
        resultImg.src = data.img; 
        resultImg.alt = data.card;

        // 填入文字資料
        document.getElementById('r-card').innerText = data.card;
        document.getElementById('r-dest').innerText = data.dest;
        document.getElementById('r-quote').innerText = data.text;
        
        ctaBtn.onclick = (e) => {
            e.preventDefault();
            alert(`導流測試：正在開啟前往【${data.dest}】的旅程頁面...`);
        };

        overlay.style.display = 'flex';
    }

    // 關閉功能
    closeBtn.onclick = () => { overlay.style.display = 'none'; };
    window.onclick = (e) => {
        if (e.target == overlay) overlay.style.display = 'none';
    };

    initGame();
});
