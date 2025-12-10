import { tarotData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('card-grid');
    const overlay = document.getElementById('result-overlay');
    const closeBtn = document.getElementById('close-btn');
    const ctaBtn = document.getElementById('cta-btn');
    const resultImg = document.getElementById('r-img');
    const titleText = document.querySelector('p.subtitle');
    const introBox = document.getElementById('intro');
    const quoteBox = document.getElementById('r-quote');
    const destBox = document.getElementById('r-dest');
    const cardNameBox = document.getElementById('r-card');
    const imgContainer = document.querySelector('.tarot-img-container');
    
    // SVG Lines
    const lineLeft = document.getElementById('line-left');
    const lineRight = document.getElementById('line-right');

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

    function updateTitle(newText) {
        introBox.style.transition = 'opacity 0.3s ease';
        introBox.style.opacity = '0';
        setTimeout(() => {
            titleText.innerText = newText;
            introBox.style.opacity = '1';
        }, 300);
    }

    function initGame() {
        container.innerHTML = ''; // 清空卡牌
        // 重置連線
        lineLeft.setAttribute('opacity', '0');
        lineRight.setAttribute('opacity', '0');

        selectedCards = []; 
        introBox.style.opacity = '1';
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
            card.onmouseenter = () => { if(!card.classList.contains('picked') && !card.classList.contains('fade-out')) card.style.transform = `rotate(${rotateAngle}deg) translateY(-20px) scale(1.1)`; };
            card.onmouseleave = () => { if(!card.classList.contains('picked') && !card.classList.contains('fade-out')) card.style.transform = `rotate(${rotateAngle}deg) translateY(0) scale(1)`; };

            container.appendChild(card);
            setTimeout(() => { card.style.transform = `rotate(${rotateAngle}deg) translateY(0) scale(1)`; }, 100 + (index * 30));
        });
        
        // 確保 SVG 容器在卡片下方 (z-index 已經設為 1，卡片是 100)
        // 但要確保 SVG 沒有被清空，因為它在 container 外面 (不，它在裡面)
        // 修正：我們的 HTML 結構中 SVG 在 container 裡。
        // 上面的 container.innerHTML = '' 會把 SVG 刪掉！
        // 解決：重新把 SVG 加回去，或者用 appendChild 加卡片時不要清空整個 innerHTML
        // 為了簡單，我們這裡把 SVG 重新寫入
        if (!document.getElementById('connection-layer')) {
             // 其實更好的是把 SVG 放在 HTML 裡 container 的旁邊，而不是裡面
             // 但為了不改 HTML 結構太複雜，我們用 JS 補回去
             const svgHTML = `
                <svg id="connection-layer" width="100%" height="100%" style="position:absolute; top:0; left:0; z-index:1; pointer-events:none; overflow:visible;">
                    <line id="line-left" x1="0" y1="0" x2="0" y2="0" stroke="url(#grad1)" stroke-width="3" stroke-linecap="round" opacity="0" filter="url(#glow)"/>
                    <line id="line-right" x1="0" y1="0" x2="0" y2="0" stroke="url(#grad1)" stroke-width="3" stroke-linecap="round" opacity="0" filter="url(#glow)"/>
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style="stop-color:#ffd700;stop-opacity:0.2" />
                            <stop offset="50%" style="stop-color:#fff;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#ffd700;stop-opacity:0.2" />
                        </linearGradient>
                        <filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    </defs>
                </svg>`;
             container.insertAdjacentHTML('afterbegin', svgHTML);
        }
    }

    function handleCardClick(card, data, originalAngle) {
        if (selectedCards.length >= MAX_SELECTION || card.classList.contains('picked')) return;
        card.classList.add('picked');
        selectedCards.push({ cardDom: card, data: data, angle: originalAngle });
        const pickCount = selectedCards.length;
        card.style.transform = `rotate(${originalAngle}deg) translateY(-60px) scale(1.1)`;
        card.style.borderColor = 'var(--gold)';
        card.style.boxShadow = '0 0 20px var(--gold)';

        if (pickCount === 1) updateTitle("請抽取第 2 張牌：【渴望】\n你靈魂深處在尋求什麼？");
        else if (pickCount === 2) updateTitle("請抽取最後 1 張牌：【指引】\n宇宙給你的最終答案。");
        else if (pickCount === 3) {
            introBox.style.opacity = '0';
            startRevealSequence();
        }
    }

    function startRevealSequence() {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(c => c.style.pointerEvents = 'none');
        allCards.forEach(card => { if (!card.classList.contains('picked')) card.classList.add('fade-out'); });

        const [c1, c2, c3] = selectedCards;
        const isMobile = window.innerWidth <= 768;

        // 1. 飛到定位
        setTimeout(() => {
            if (isMobile) {
                c1.cardDom.style.transform = 'translate(-110%, -130%) scale(0.9) rotate(-5deg)';
                c2.cardDom.style.transform = 'translate(10%, -130%) scale(0.9) rotate(5deg)';
                c3.cardDom.style.transform = 'translate(-50%, -10%) scale(1.2) rotate(0deg)';
            } else {
                c1.cardDom.style.transform = 'translate(calc(-50% - 250px), -50%) scale(1.0) rotate(-5deg)';
                c2.cardDom.style.transform = 'translate(calc(-50% + 250px), -50%) scale(1.0) rotate(5deg)';
                c3.cardDom.style.transform = 'translate(-50%, -50%) scale(1.4) rotate(0deg)';
            }
            c1.cardDom.classList.add('selected'); 
            c2.cardDom.classList.add('selected');
            c3.cardDom.classList.add('selected');
            c3.cardDom.style.zIndex = '3000';
        }, 500);

        // 2. 依序翻牌
        setTimeout(() => flipCard(c1, "現狀"), 1200);
        setTimeout(() => flipCard(c2, "渴望"), 1600);
        setTimeout(() => flipCard(c3, "指引"), 2200);

        // 3. ★★★ 啟動浮動與連線 (在翻完牌後) ★★★
        setTimeout(() => {
            // 加入浮動動畫 Class
            if (isMobile) {
                c1.cardDom.classList.add('floating-m-left');
                c2.cardDom.classList.add('floating-m-right');
            } else {
                c1.cardDom.classList.add('floating-left');
                c2.cardDom.classList.add('floating-right');
            }
            c3.cardDom.classList.add('floating-center');

            // 開始畫線
            connectCards(c1.cardDom, c3.cardDom, document.getElementById('line-left'));
            connectCards(c2.cardDom, c3.cardDom, document.getElementById('line-right'));
            
        }, 2800);

        // 4. 顯示結果彈窗 (再晚一點，讓使用者欣賞一下連線特效)
        setTimeout(() => {
            showResultModal(selectedCards[2].data);
        }, 4500);
    }

    // 繪製連線函式
    function connectCards(fromCard, toCard, lineEl) {
        // 取得卡片中心點座標
        const rect1 = fromCard.getBoundingClientRect();
        const rect2 = toCard.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        // 計算相對於 container 的座標
        const x1 = rect1.left + rect1.width / 2 - containerRect.left;
        const y1 = rect1.top + rect1.height / 2 - containerRect.top;
        const x2 = rect2.left + rect2.width / 2 - containerRect.left;
        const y2 = rect2.top + rect2.height / 2 - containerRect.top;

        lineEl.setAttribute('x1', x1);
        lineEl.setAttribute('y1', y1);
        lineEl.setAttribute('x2', x2);
        lineEl.setAttribute('y2', y2);
        
        // 淡入線條
        lineEl.style.transition = 'opacity 1s ease';
        lineEl.setAttribute('opacity', '1');
    }

    function flipCard(cardObj, labelText) {
        const dom = cardObj.cardDom;
        const data = cardObj.data;
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
