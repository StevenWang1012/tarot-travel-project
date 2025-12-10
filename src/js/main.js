import { tarotData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('card-grid');
    const overlay = document.getElementById('result-overlay');
    const closeBtn = document.getElementById('close-btn');
    const ctaBtn = document.getElementById('cta-btn');
    const resultImg = document.getElementById('r-img');
    const titleText = document.querySelector('p.subtitle');
    const quoteBox = document.getElementById('r-quote');
    const destBox = document.getElementById('r-dest');
    const cardNameBox = document.getElementById('r-card');
    const imgContainer = document.querySelector('.tarot-img-container');

    // ★★★ 請更換成真實 LINE 連結 ★★★
    const YOUR_LINE_URL = "https://line.me/ti/p/@example"; 

    let selectedCards = []; 
    const MAX_SELECTION = 3;

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
        selectedCards = []; 
        titleText.innerText = "請憑直覺抽取第 1 張牌：【現狀】\n揭示你為何想出發？";

        const deck = shuffle([...tarotData]);
        const totalCards = deck.length;
        const arcAngle = 100;
        const angleStep = arcAngle / (totalCards - 1);
        const startAngle = -arcAngle / 2;

        deck.forEach((item, index) => {
            let card = document.createElement('div');
            card.className = 'card';
            const rotateAngle = startAngle + (index * angleStep);
            
            card.onclick = () => handleCardClick(card, item, rotateAngle);
            
            card.onmouseenter = () => {
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

    function handleCardClick(card, data, originalAngle) {
        if (selectedCards.length >= MAX_SELECTION || card.classList.contains('picked')) return;

        card.classList.add('picked');
        selectedCards.push({ cardDom: card, data: data, angle: originalAngle });

        const pickCount = selectedCards.length;

        // 選中時的視覺回饋
        card.style.transform = `rotate(${originalAngle}deg) translateY(-60px) scale(1.1)`;
        card.style.borderColor = 'var(--gold)';
        card.style.boxShadow = '0 0 20px var(--gold)';

        if (pickCount === 1) {
            titleText.innerText = "請抽取第 2 張牌：【渴望】\n你靈魂深處在尋求什麼？";
        } else if (pickCount === 2) {
            titleText.innerText = "請抽取最後 1 張牌：【指引】\n宇宙給你的最終答案。";
        } else if (pickCount === 3) {
            titleText.innerText = "正在連結宇宙訊號...\n解讀你的聖三角牌陣...";
            startRevealSequence();
        }
    }

    // ★★★ 核心修改：響應式排列 (金字塔型) ★★★
    function startRevealSequence() {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(c => c.style.pointerEvents = 'none');

        // 1. 其他牌淡出
        allCards.forEach(card => {
            if (!card.classList.contains('picked')) {
                card.classList.add('fade-out');
            }
        });

        const [c1, c2, c3] = selectedCards;
        const isMobile = window.innerWidth <= 768; // 偵測是否為手機

        // 2. 飛到定位 (500ms)
        setTimeout(() => {
            if (isMobile) {
                // === 手機版：金字塔排列 ===
                // c1 (現狀): 左上
                // c2 (渴望): 右上
                // c3 (結果): 正下方 (主角)
                
                // translate(-110%) 代表往左移超過一個身位
                // translate(10%) 代表往右移一點點
                c1.cardDom.style.transform = 'translate(-110%, -130%) scale(0.9) rotate(-5deg)';
                
                c2.cardDom.style.transform = 'translate(10%, -130%) scale(0.9) rotate(5deg)';
                
                c3.cardDom.style.transform = 'translate(-50%, -10%) scale(1.2) rotate(0deg)';
                
            } else {
                // === 電腦版：水平排列 ===
                c1.cardDom.style.transform = 'translate(-160%, -50%) scale(1.0) rotate(-5deg)';
                c2.cardDom.style.transform = 'translate(60%, -50%) scale(1.0) rotate(5deg)';
                c3.cardDom.style.transform = 'translate(-50%, -50%) scale(1.4) rotate(0deg)';
            }

            // 加入 selected class 確保層級正確
            c1.cardDom.classList.add('selected'); 
            c2.cardDom.classList.add('selected');
            c3.cardDom.classList.add('selected');
            c3.cardDom.style.zIndex = '3000'; // 主角最高
        }, 500);

        // 3. 依序翻牌
        setTimeout(() => flipCard(c1, "現狀"), 1200);
        setTimeout(() => flipCard(c2, "渴望"), 1600);
        setTimeout(() => flipCard(c3, "指引"), 2200);

        // 4. 顯示結果彈窗 (延遲到大家都翻完)
        setTimeout(() => {
            showResultModal(selectedCards[2].data);
        }, 3200);
    }

    function flipCard(cardObj, labelText) {
        const dom = cardObj.cardDom;
        const data = cardObj.data;
        
        // 建立標籤
        const cardNameSimple = data.card.split('(')[0].trim(); 
        const labelDiv = document.createElement('div');
        labelDiv.className = 'card-label';
        labelDiv.innerText = `${labelText}：${cardNameSimple}`;
        dom.appendChild(labelDiv);

        dom.classList.add('flipping');
        setTimeout(() => {
            dom.style.backgroundImage = `url('${data.img}')`;
            dom.classList.remove('flipping');
            dom.classList.add('revealed');
        }, 300);
    }

    function showResultModal(finalCardData) {
        resultImg.src = finalCardData.img;
        cardNameBox.innerText = finalCardData.card;
        destBox.innerHTML = `<img src="${finalCardData.flag}" class="flag-icon" alt="flag"> ${finalCardData.dest}`;
        
        imgContainer.classList.remove('reveal-show');
        imgContainer.classList.add('reveal-pending');
        destBox.classList.remove('reveal-show');
        destBox.classList.add('reveal-pending');
        ctaBtn.classList.remove('reveal-show');
        ctaBtn.classList.add('reveal-pending');
        
        const card1 = selectedCards[0].data; 
        const card2 = selectedCards[1].data; 
        
        const analysisText = `牌陣顯示，你目前正處於「${card1.keywords}」的狀態，而你的靈魂深處渴望著「${card2.keywords}」。\n\n綜合這兩股能量，宇宙為你指引的出口是……`;
        const fullText = `${analysisText}\n${finalCardData.dest}。\n\n${finalCardData.advice}\n${finalCardData.text}`;
        
        quoteBox.innerHTML = ""; 
        quoteBox.classList.add('typing-cursor'); 
        
        const message = encodeURIComponent(`你好，我在靈魂羅盤抽到了【${finalCardData.dest}】。\n(現狀：${card1.keywords} / 渴望：${card2.keywords})，想詢問行程。`);
        ctaBtn.href = `${YOUR_LINE_URL}?text=${message}`;

        overlay.style.display = 'flex';

        typeWriter(analysisText, 0, () => {
            quoteBox.classList.remove('typing-cursor'); 
            quoteBox.innerText = fullText; 
            setTimeout(() => {
                imgContainer.classList.add('reveal-show');
                destBox.classList.add('reveal-show');
                ctaBtn.classList.add('reveal-show');
            }, 300);
        });
    }

    function typeWriter(text, i, callback) {
        if (i < text.length) {
            quoteBox.innerHTML += text.charAt(i);
            let speed = 40;
            if (text.charAt(i) === '，' || text.charAt(i) === '。') speed = 300;
            if (text.charAt(i) === '\n') speed = 500;
            setTimeout(() => { typeWriter(text, i + 1, callback); }, speed);
        } else {
            if (callback) callback();
        }
    }

    closeBtn.onclick = () => { overlay.style.display = 'none'; setTimeout(initGame, 300); };
    window.onclick = (e) => { if (e.target == overlay) { overlay.style.display = 'none'; setTimeout(initGame, 300); } };

    initGame();
});
