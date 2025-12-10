import { tarotData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('card-grid');
    const overlay = document.getElementById('result-overlay');
    const closeBtn = document.getElementById('close-btn');
    const ctaBtn = document.getElementById('cta-btn');
    // const titleText = document.querySelector('p.subtitle'); // 舊的
    const promptBox = document.getElementById('prompt-area'); // 整個區塊
    const titleText = promptBox.querySelector('.subtitle');   // 裡面的文字
    
    const quoteBox = document.getElementById('r-quote');
    const destBox = document.getElementById('r-dest');
    
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
        promptBox.style.transition = 'opacity 0.3s ease';
        promptBox.style.opacity = '0';
        setTimeout(() => {
            titleText.innerText = newText;
            promptBox.style.opacity = '1';
        }, 300);
    }

    function initGame() {
        container.innerHTML = ''; 
        if(lineLeft) lineLeft.setAttribute('opacity', '0');
        if(lineRight) lineRight.setAttribute('opacity', '0');

        selectedCards = []; 
        promptBox.style.opacity = '1';
        titleText.innerText = "請憑直覺抽取第 1 張牌：【現狀】\n揭示你為何想出發？";

        const deck = shuffle([...tarotData]);
        const totalCards = deck.length;
        const angleStep = 100 / (totalCards - 1);
        const startAngle = -50;

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
        
        // 補回 SVG
        if (!document.getElementById('connection-layer')) {
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
            promptBox.style.opacity = '0'; // 隱藏下方文字
            startRevealSequence();
        }
    }

    function startRevealSequence() {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(c => c.style.pointerEvents = 'none');
        allCards.forEach(card => { if (!card.classList.contains('picked')) card.classList.add('fade-out'); });

        const [c1, c2, c3] = selectedCards;
        const isMobile = window.innerWidth <= 768;

        setTimeout(() => {
            if (isMobile) {
                c1.cardDom.style.transform = 'translate(-110%, -130%) scale(0.9) rotate(-5deg)';
                c2.cardDom.style.transform = 'translate(10%, -130%) scale(0.9) rotate(5deg)';
                c3.cardDom.style.transform = 'translate(-50%, -10%) scale(1.2) rotate(0deg)';
            } else {
                c1.cardDom.style.transform = 'translate(calc(-50% - 220px), -50%) scale(1.0) rotate(-5deg)';
                c2.cardDom.style.transform = 'translate(calc(-50% + 220px), -50%) scale(1.0) rotate(5deg)';
                c3.cardDom.style.transform = 'translate(-50%, -50%) scale(1.4) rotate(0deg)';
            }
            c1.cardDom.classList.add('selected'); 
            c2.cardDom.classList.add('selected');
            c3.cardDom.classList.add('selected');
            c3.cardDom.style.zIndex = '3000';
        }, 500);

        setTimeout(() => flipCard(c1, "現狀"), 1200);
        setTimeout(() => flipCard(c2, "渴望"), 1600);
        setTimeout(() => flipCard(c3, "指引"), 2200);

        setTimeout(() => {
            if (isMobile) {
                c1.cardDom.classList.add('floating-m-left');
                c2.cardDom.classList.add('floating-m-right');
            } else {
                c1.cardDom.classList.add('floating-left');
                c2.cardDom.classList.add('floating-right');
            }
            c3.cardDom.classList.add('floating-center');
            connectCards(c1.cardDom, c3.cardDom, document.getElementById('line-left'));
            connectCards(c2.cardDom, c3.cardDom, document.getElementById('line-right'));
        }, 2800);

        setTimeout(() => {
            showResultModal(selectedCards);
        }, 4500);
    }

    function connectCards(fromCard, toCard, lineEl) {
        if(!lineEl) return;
        const rect1 = fromCard.getBoundingClientRect();
        const rect2 = toCard.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const x1 = rect1.left + rect1.width / 2 - containerRect.left;
        const y1 = rect1.top + rect1.height / 2 - containerRect.top;
        const x2 = rect2.left + rect2.width / 2 - containerRect.left;
        const y2 = rect2.top + rect2.height / 2 - containerRect.top;
        lineEl.setAttribute('x1', x1); lineEl.setAttribute('y1', y1); lineEl.setAttribute('x2', x2); lineEl.setAttribute('y2', y2);
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

    // ★★★ 生成三張牌的結果 ★★★
    function showResultModal(cards) {
        const c1 = cards[0].data; 
        const c2 = cards[1].data; 
        const c3 = cards[2].data; 

        // 1. 生成三張牌 HTML
        const tarotImgHTML = `
            <div class="three-card-display reveal-pending">
                <div class="mini-card-wrapper">
                    <img src="${c1.img}" class="mini-card-img">
                    <div class="mini-card-title">現狀</div>
                    <div class="mini-card-name">${c1.card.split('(')[0]}</div>
                </div>
                <div class="mini-card-wrapper">
                    <img src="${c2.img}" class="mini-card-img">
                    <div class="mini-card-title">渴望</div>
                    <div class="mini-card-name">${c2.card.split('(')[0]}</div>
                </div>
                <div class="mini-card-wrapper">
                    <img src="${c3.img}" class="mini-card-img">
                    <div class="mini-card-title">指引</div>
                    <div class="mini-card-name">${c3.card.split('(')[0]}</div>
                </div>
            </div>
        `;

        const dynamicArea = document.getElementById('dynamic-content-area');
        dynamicArea.innerHTML = tarotImgHTML;

        // 2. 設定文字
        destBox.innerHTML = `<img src="${c3.flag}" class="flag-icon"> ${c3.dest}`;
        
        // 初始隱藏
        destBox.classList.remove('reveal-show'); destBox.classList.add('reveal-pending');
        ctaBtn.classList.remove('reveal-show'); ctaBtn.classList.add('reveal-pending');
        
        const analysisText = `牌陣顯示，你目前正處於「${c1.keywords}」的狀態，而你的靈魂深處渴望著「${c2.keywords}」。\n\n綜合這兩股能量，宇宙為你指引的出口是……`;
        const fullText = `${analysisText}\n${c3.dest}。\n\n${c3.advice}\n${c3.text}`;
        
        quoteBox.innerHTML = ""; 
        quoteBox.classList.add('typing-cursor'); 
        
        const message = encodeURIComponent(`你好，我在靈魂羅盤抽到了【${c3.dest}】。\n(現狀：${c1.keywords} / 渴望：${c2.keywords})，想詢問行程。`);
        ctaBtn.href = `${YOUR_LINE_URL}?text=${message}`;

        overlay.style.display = 'flex';

        // 3. 打字與揭曉
        typeWriter(analysisText, 0, quoteBox, () => {
            quoteBox.classList.remove('typing-cursor'); 
            quoteBox.innerText = fullText; 
            
            setTimeout(() => {
                document.querySelector('.three-card-display').classList.add('reveal-show');
                destBox.classList.add('reveal-show');
                ctaBtn.classList.add('reveal-show');
            }, 300);
        });
    }

    function typeWriter(text, i, element, callback) {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            let speed = 40;
            if (text.charAt(i) === '，' || text.charAt(i) === '。') speed = 300;
            if (text.charAt(i) === '\n') speed = 500;
            setTimeout(() => { typeWriter(text, i + 1, element, callback); }, speed);
        } else {
            if (callback) callback();
        }
    }

    // 重新綁定關閉
    const realCloseBtn = document.getElementById('close-btn');
    if(realCloseBtn) {
        realCloseBtn.onclick = () => {
            overlay.style.display = 'none';
            setTimeout(initGame, 300);
        };
    }
    
    window.onclick = (e) => { if (e.target == overlay) { overlay.style.display = 'none'; setTimeout(initGame, 300); } };

    initGame();
});
