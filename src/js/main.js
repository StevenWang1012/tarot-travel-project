import { tarotData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('card-grid');
    const overlay = document.getElementById('result-overlay');
    const closeBtn = document.getElementById('close-btn');
    const ctaBtn = document.getElementById('cta-btn');
    const resultImg = document.getElementById('r-img');
    const YOUR_LINE_URL = "https://line.me/ti/p/@example"; 

    // Fisher-Yates 洗牌算法
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    // 初始化遊戲：生成扇形牌組
    function initGame() {
        container.innerHTML = '';
        
        // 1. 洗牌
        const deck = shuffle([...tarotData]);
        
        // 2. 計算扇形參數
        const totalCards = deck.length;
        // 設定扇形展開的總角度 (例如 100度)
        const arcAngle = 100; 
        // 計算每張牌之間的角度間隔
        const angleStep = arcAngle / (totalCards - 1);
        // 起始角度 (例如從 -50度開始)
        const startAngle = -arcAngle / 2;

        // 3. 生成卡片
        deck.forEach((item, index) => {
            let card = document.createElement('div');
            card.className = 'card';
            
            // 計算這張牌應該旋轉的角度
            const rotateAngle = startAngle + (index * angleStep);
            
            // 為了讓動畫順暢，我們先設定一個變數存角度
            // 之後 hover 效果需要用到
            card.dataset.rotation = rotateAngle;
            
            // 點擊事件
            card.onclick = () => pickCard(card, item);
            
            // Hover 事件：讓牌稍微往上浮，但保持旋轉角度
            card.onmouseenter = () => {
                if(!card.classList.contains('selected')) {
                    card.style.transform = `rotate(${rotateAngle}deg) translateY(-30px) scale(1.1)`;
                }
            };
            card.onmouseleave = () => {
                if(!card.classList.contains('selected')) {
                    card.style.transform = `rotate(${rotateAngle}deg) translateY(0) scale(1)`;
                }
            };

            container.appendChild(card);

            // 4. 入場發牌動畫 (延遲執行)
            // 剛生成時，牌都在中間 (因為 CSS 設定了 bottom: 0, left: 50%)
            // 我們用 setTimeout 讓它們一張張展開
            setTimeout(() => {
                card.style.transform = `rotate(${rotateAngle}deg) translateY(0) scale(1)`;
            }, 100 + (index * 30)); // 每張牌間隔 30ms 展開
        });
    }

    // 選牌邏輯
    function pickCard(selectedCard, data) {
        // 1. 鎖定所有卡片，不能再點
        const allCards = document.querySelectorAll('.card');
        
        allCards.forEach(card => {
            if (card === selectedCard) {
                // 選中的牌：加入 selected class (CSS 會讓它飛到中間變大)
                card.classList.add('selected');
                // 清除 inline style 讓 CSS class 生效
                card.style.transform = ''; 
            } else {
                // 沒選中的牌：加入 fade-out (CSS 會讓它們往下掉並消失)
                card.classList.add('fade-out');
            }
        });

        // 2. 延遲一下顯示結果視窗 (等卡片飛到中間的動畫跑完)
        setTimeout(() => {
            showResultModal(data);
        }, 800);
    }

    // 顯示結果彈窗
    function showResultModal(data) {
        resultImg.src = data.img;
        document.getElementById('r-card').innerText = data.card;
        document.getElementById('r-dest').innerText = data.dest;
        document.getElementById('r-quote').innerText = data.text;
        
        const message = encodeURIComponent(`你好，我在靈魂羅盤抽到了【${data.dest}】，想詢問相關行程價格。`);
        ctaBtn.href = `${YOUR_LINE_URL}?text=${message}`;

        overlay.style.display = 'flex';
    }

    // 關閉視窗 (關閉後自動重新洗牌，讓使用者可以再玩)
    closeBtn.onclick = () => { 
        overlay.style.display = 'none'; 
        // 稍微延遲後重新發牌
        setTimeout(initGame, 300);
    };
    
    // 點擊背景關閉
    window.onclick = (e) => {
        if (e.target == overlay) {
            overlay.style.display = 'none';
            setTimeout(initGame, 300);
        }
    };

    // 啟動遊戲
    initGame();
});
