import { tarotData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('card-grid');
    const overlay = document.getElementById('result-overlay');
    const closeBtn = document.getElementById('close-btn');
    const ctaBtn = document.getElementById('cta-btn');
    const resultImg = document.getElementById('r-img');
    
    // LINE 連結
    const YOUR_LINE_URL = "https://line.me/ti/p/@example"; 

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
        container.innerHTML = '';
        const deck = shuffle([...tarotData]);
        
        const totalCards = deck.length;
        const arcAngle = 100;
        const angleStep = arcAngle / (totalCards - 1);
        const startAngle = -arcAngle / 2;

        deck.forEach((item, index) => {
            let card = document.createElement('div');
            card.className = 'card';
            
            const rotateAngle = startAngle + (index * angleStep);
            
            // 點擊事件
            card.onclick = () => pickCard(card, item, rotateAngle);
            
            // Hover 效果 (只在未選中時生效)
            // 這裡保留一點點上浮感，讓使用者知道滑鼠指到哪張
            card.onmouseenter = () => {
                if(!card.classList.contains('selected') && !card.classList.contains('fade-out')) {
                    card.style.transform = `rotate(${rotateAngle}deg) translateY(-20px) scale(1.1)`;
                }
            };
            card.onmouseleave = () => {
                if(!card.classList.contains('selected') && !card.classList.contains('fade-out')) {
                    card.style.transform = `rotate(${rotateAngle}deg) translateY(0) scale(1)`;
                }
            };

            container.appendChild(card);

            // 入場動畫
            setTimeout(() => {
                card.style.transform = `rotate(${rotateAngle}deg) translateY(0) scale(1)`;
            }, 100 + (index * 30));
        });
    }

    // 核心：直接飛到中間 -> 翻牌
    function pickCard(selectedCard, data, originalAngle) {
        // 1. 鎖定所有卡片，防止重複點擊
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(c => c.style.pointerEvents = 'none');

        // 2. 清場：其他牌立刻淡出 (0ms)
        // 讓畫面瞬間變乾淨，焦點只剩這張牌
        allCards.forEach(card => {
            if (card !== selectedCard) {
                card.classList.add('fade-out');
            }
        });

        // 3. 飛行：主角直接飛到正中央 (0ms)
        // 移除 inline style (旋轉角度)，讓 class selected 生效
        selectedCard.style.transform = ''; 
        // 加入 selected，CSS 會控制它直接位移到 top: 50%, left: 50%
        selectedCard.classList.add('selected');

        // 4. 翻轉：等到飛行結束 (600ms) 後開始翻
        setTimeout(() => {
            selectedCard.classList.add('flipping'); // 轉側面
        }, 600);

        // 5. 換圖並轉正 (900ms)
        setTimeout(() => {
            selectedCard.style.backgroundImage = `url('${data.img}')`;
            selectedCard.classList.remove('flipping');
            selectedCard.classList.add('revealed');
        }, 900);

        // 6. 顯示結果彈窗 (1600ms)
        setTimeout(() => {
            showResultModal(data);
        }, 1600);
    }

    // 顯示結果
    function showResultModal(data) {
        resultImg.src = data.img;
        document.getElementById('r-card').innerText = data.card;
        document.getElementById('r-dest').innerText = data.dest;
        document.getElementById('r-quote').innerText = data.text;
        
        const message = encodeURIComponent(`你好，我在靈魂羅盤抽到了【${data.dest}】，想詢問相關行程價格。`);
        ctaBtn.href = `${YOUR_LINE_URL}?text=${message}`;

        overlay.style.display = 'flex';
    }

    // 關閉
    closeBtn.onclick = () => { 
        overlay.style.display = 'none'; 
        setTimeout(initGame, 300);
    };
    
    window.onclick = (e) => {
        if (e.target == overlay) {
            overlay.style.display = 'none';
            setTimeout(initGame, 300);
        }
    };

    initGame();
});
