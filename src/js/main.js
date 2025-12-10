import { tarotData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('card-grid');
    const overlay = document.getElementById('result-overlay');
    const closeBtn = document.getElementById('close-btn');
    const ctaBtn = document.getElementById('cta-btn');
    const resultImg = document.getElementById('r-img');
    
    const YOUR_LINE_URL = "https://line.me/ti/p/@example"; 

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

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
            // 將角度存入 dataset 以便後續讀取
            card.dataset.angle = rotateAngle;
            
            card.onclick = () => pickCard(card, item, rotateAngle);
            
            card.onmouseenter = () => {
                if(!card.classList.contains('selected') && !card.classList.contains('pre-select') && !card.classList.contains('fade-out')) {
                    card.style.transform = `rotate(${rotateAngle}deg) translateY(-30px) scale(1.1)`;
                }
            };
            card.onmouseleave = () => {
                if(!card.classList.contains('selected') && !card.classList.contains('pre-select') && !card.classList.contains('fade-out')) {
                    card.style.transform = `rotate(${rotateAngle}deg) translateY(0) scale(1)`;
                }
            };

            container.appendChild(card);

            setTimeout(() => {
                card.style.transform = `rotate(${rotateAngle}deg) translateY(0) scale(1)`;
            }, 100 + (index * 30));
        });
    }

    function pickCard(selectedCard, data, originalAngle) {
        // 1. 鎖定所有卡片，防止重複點擊
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(c => c.style.pointerEvents = 'none');

        // === 動畫第一步：輕輕抽出 ===
        // 保持原角度，往上移更多 (-70px)
        selectedCard.classList.add('pre-select');
        selectedCard.style.transform = `rotate(${originalAngle}deg) translateY(-80px) scale(1.1)`;

        // === 動畫第二步：其他牌淡出 (延遲 300ms) ===
        setTimeout(() => {
            allCards.forEach(card => {
                if (card !== selectedCard) {
                    card.classList.add('fade-out');
                }
            });
        }, 300);

        // === 動畫第三步：飛到正中央 (延遲 800ms) ===
        setTimeout(() => {
            // 移除 pre-select 和 inline transform
            selectedCard.classList.remove('pre-select');
            selectedCard.style.transform = ''; 
            // 加入 selected (CSS 會控制它用 fixed position 飛到正中央)
            selectedCard.classList.add('selected');
        }, 800);

        // === 動畫第四步：翻轉 (延遲 1600ms, 等飛行結束) ===
        setTimeout(() => {
            selectedCard.classList.add('flipping');
        }, 1600);

        // === 動畫第五步：換圖並轉正 (延遲 1900ms) ===
        setTimeout(() => {
            selectedCard.style.backgroundImage = `url('${data.img}')`;
            selectedCard.classList.remove('flipping');
            selectedCard.classList.add('revealed');
        }, 1900);

        // === 動畫第六步：顯示彈窗 (延遲 2600ms) ===
        setTimeout(() => {
            showResultModal(data);
        }, 2600);
    }

    function showResultModal(data) {
        resultImg.src = data.img;
        document.getElementById('r-card').innerText = data.card;
        document.getElementById('r-dest').innerText = data.dest;
        document.getElementById('r-quote').innerText = data.text;
        
        const message = encodeURIComponent(`你好，我在靈魂羅盤抽到了【${data.dest}】，想詢問相關行程價格。`);
        ctaBtn.href = `${YOUR_LINE_URL}?text=${message}`;

        overlay.style.display = 'flex';
    }

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
