import { tarotData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('card-grid');
    const overlay = document.getElementById('result-overlay');
    const closeBtn = document.getElementById('close-btn');
    const ctaBtn = document.getElementById('cta-btn');
    const resultImg = document.getElementById('r-img');
    const titleText = document.querySelector('p.subtitle'); // 抓取副標題來做提示

    const YOUR_LINE_URL = "https://line.me/ti/p/@example"; 

    // 狀態變數：紀錄已抽了幾張
    let selectedCards = []; 
    const MAX_SELECTION = 3; // 聖三角：3張

    // 洗牌
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    // 初始化
    function initGame() {
        container.innerHTML = '';
        selectedCards = []; // 重置
        titleText.innerText = "請憑直覺抽取第 1 張牌：【現狀】\n揭示你為何想出發？";
        titleText.style.opacity = '1';

        const deck = shuffle([...tarotData]);
        
        // 扇形參數
        const totalCards = deck.length;
        const arcAngle = 100;
        const angleStep = arcAngle / (totalCards - 1);
        const startAngle = -arcAngle / 2;

        deck.forEach((item, index) => {
            let card = document.createElement('div');
            card.className = 'card';
            const rotateAngle = startAngle + (index * angleStep);
            
            card.onclick = () => handleCardClick(card, item, rotateAngle);
            
            // Hover 效果
            card.onmouseenter = () => {
                // 只有沒被選過且沒淡出的牌才會有 Hover 效果
                if(!card.classList.contains('picked') && !card.classList.contains('fade-out')) {
                    card.style.transform = `rotate(${rotateAngle}deg) translateY(-20px) scale(1.1)`;
                }
            };
            card.onmouseleave = () => {
                if(!card.classList.contains('picked') && !card.classList.contains('fade-out')) {
                    card.style.transform = `rotate(${rotateAngle}deg) translateY(0) scale(1)`;
                }
            };

            container.appendChild(card);
            setTimeout(() => {
                card.style.transform = `rotate(${rotateAngle}deg) translateY(0) scale(1)`;
            }, 100 + (index * 30));
        });
    }

    // 點擊卡片處理邏輯 (核心修改)
    function handleCardClick(card, data, originalAngle) {
        // 如果已經選滿3張，或這張已經被選過，就無視
        if (selectedCards.length >= MAX_SELECTION || card.classList.contains('picked')) return;

        // 1. 標記這張牌已被選取
        card.classList.add('picked');
        selectedCards.push({ cardDom: card, data: data, angle: originalAngle });

        const pickCount = selectedCards.length;

        // 2. 根據第幾張牌，給予不同的視覺回饋 (稍微往上浮並鎖定)
        card.style.transform = `rotate(${originalAngle}deg) translateY(-60px) scale(1.1)`;
        card.style.borderColor = 'var(--gold)';
        card.style.boxShadow = '0 0 20px var(--gold)';

        // 3. 更新提示文字
        if (pickCount === 1) {
            titleText.innerText = "請抽取第 2 張牌：【渴望】\n你靈魂深處在尋求什麼？";
        } else if (pickCount === 2) {
            titleText.innerText = "請抽取最後 1 張牌：【指引】\n宇宙給你的最終答案。";
        } else if (pickCount === 3) {
            titleText.innerText = "正在連結宇宙訊號...\n解讀你的聖三角牌陣...";
            // 開始最終動畫
            startRevealSequence();
        }
    }

    // 最終揭曉動畫序列
    function startRevealSequence() {
        // 1. 鎖定所有牌
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(c => c.style.pointerEvents = 'none');

        // 2. 其他沒選中的牌淡出 (0ms)
        allCards.forEach(card => {
            if (!card.classList.contains('picked')) {
                card.classList.add('fade-out');
            }
        });

        // 3. 三張牌飛到中間 (500ms)
        // 我們把前兩張放在左右當配角，第三張(結果)放中間
        setTimeout(() => {
            const [c1, c2, c3] = selectedCards;

            // 第一張 (現狀) - 飛到左邊，縮小一點
            c1.cardDom.style.transform = 'translate(-160%, -50%) scale(1.0) rotate(-10deg)';
            c1.cardDom.classList.add('selected'); // 借用 selected 來設定 position:fixed

            // 第二張 (渴望) - 飛到右邊，縮小一點
            c2.cardDom.style.transform = 'translate(60%, -50%) scale(1.0) rotate(10deg)';
            c2.cardDom.classList.add('selected');

            // 第三張 (結果) - 飛到正中間，放大
            c3.cardDom.style.transform = 'translate(-50%, -50%) scale(1.4) rotate(0deg)';
            c3.cardDom.classList.add('selected');
            
            // 這裡我們只給第三張牌加上高層級，因為它是主角
            c3.cardDom.style.zIndex = '3000'; 
        }, 500);

        // 4. 翻開主角牌 (第三張) (1200ms)
        setTimeout(() => {
            const finalCard = selectedCards[2]; // 第三張是結果
            finalCard.cardDom.classList.add('flipping');
        }, 1200);

        // 5. 換圖並轉正 (1500ms)
        setTimeout(() => {
            const finalCard = selectedCards[2];
            finalCard.cardDom.style.backgroundImage = `url('${finalCard.data.img}')`;
            finalCard.cardDom.classList.remove('flipping');
            finalCard.cardDom.classList.add('revealed');
        }, 1500);

        // 6. 顯示結果視窗 (2200ms)
        setTimeout(() => {
            // 這裡我們傳入第三張牌的數據作為最終結果
            // 但我們可以把前兩張牌的資訊也加進去 (如果想做進階文案的話)
            showResultModal(selectedCards[2].data);
        }, 2200);
    }

    function showResultModal(data) {
        resultImg.src = finalCardData.img;
        document.getElementById('r-card').innerText = data.card;
        document.getElementById('r-dest').innerText = data.dest;

        // 組合文案公式：
        // "從【現狀關鍵字】的狀態中，看出你靈魂深處渴望著【渴望關鍵字】。
        //  綜合牌陣指引，宇宙建議你前往【國家】——
        //  【結果牌建議】"
        const logicText = `牌陣顯示，你目前正處於「${card1.keywords}」的狀態，\n而你的靈魂深處渴望著「${card2.keywords}」。\n\n綜合這兩股能量，宇宙為你指引的出口是——\n${finalCardData.dest}。\n\n${finalCardData.advice}\n${finalCardData.text}`;
        document.getElementById('r-quote').innerText = logicText;

        // 設定 LINE 連結
        // 這裡也可以把前兩張牌的結果帶入，讓客服知道客戶的心理狀態
        const message = encodeURIComponent(`你好，我在靈魂羅盤抽到了【${finalCardData.dest}】。\n(現狀：${card1.keywords} / 渴望：${card2.keywords})，想詢問行程。`);
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
