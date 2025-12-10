import { tarotData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('card-grid');
    const overlay = document.getElementById('result-overlay');
    const closeBtn = document.getElementById('close-btn');
    const ctaBtn = document.getElementById('cta-btn');
    const resultImg = document.getElementById('r-img');
    
    // LINE 連結
    const YOUR_LINE_URL = "https://line.me/ti/p/@example"; 

    // Fisher-Yates 洗牌
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
        
        // 扇形參數
        const totalCards = deck.length;
        const arcAngle = 100; // 總角度
        const angleStep = arcAngle / (totalCards - 1);
        const startAngle = -arcAngle / 2;

        deck.forEach((item, index) => {
            let card = document.createElement('div');
            card.className = 'card';
            
            // 計算角度
            const rotateAngle = startAngle + (index * angleStep);
            
            // 點擊事件
            card.onclick = () => pickCard(card, item);
            
            // Hover 效果 (只在未選中時生效)
            card.onmouseenter = () => {
                if(!card.classList.contains('selected') && !card.classList.contains('fade-out')) {
                    // 保持原本的旋轉角度，但往上移 (-30px) 並稍微放大
                    card.style.transform = `rotate(${rotateAngle}deg) translateY(-30px) scale(1.1)`;
                }
            };
            card.onmouseleave = () => {
                if(!card.classList.contains('selected') && !card.classList.contains('fade-out')) {
                    // 恢復原狀
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

    // 核心：選牌與翻牌動畫
    function pickCard(selectedCard, data) {
        // 1. 鎖定：其他的牌淡出
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            if (card !== selectedCard) {
                card.classList.add('fade-out');
            }
        });

        // 2. 階段一：飛到中間 (0ms)
        // 移除 inline style (旋轉角度)，讓 class 生效
        selectedCard.style.transform = ''; 
        selectedCard.classList.add('selected');

        // 3. 階段二：開始翻轉 (600ms後，等飛行結束)
        setTimeout(() => {
            selectedCard.classList.add('flipping'); // 轉到 90度 (側面)
        }, 600);

        // 4. 階段三：換圖並轉正 (900ms後，轉到一半時換圖)
        setTimeout(() => {
            // 設定真實塔羅牌圖片
            selectedCard.style.backgroundImage = `url('${data.img}')`;
            
            // 移除翻轉狀態，加入揭曉狀態 (轉回 0度)
            selectedCard.classList.remove('flipping');
            selectedCard.classList.add('revealed');
        }, 900);

        // 5. 階段四：顯示詳細彈窗 (1500ms後)
        setTimeout(() => {
            showResultModal(data);
        }, 1500);
    }

    // 顯示彈窗
    function showResultModal(data) {
        resultImg.src = data.img;
        document.getElementById('r-card').innerText = data.card;
        document.getElementById('r-dest').innerText = data.dest;
        document.getElementById('r-quote').innerText = data.text;
        
        const message = encodeURIComponent(`你好，我在靈魂羅盤抽到了【${data.dest}】，想詢問相關行程價格。`);
        ctaBtn.href = `${YOUR_LINE_URL}?text=${message}`;

        overlay.style.display = 'flex';
    }

    // 關閉與重置
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

    // 啟動
    initGame();
});
