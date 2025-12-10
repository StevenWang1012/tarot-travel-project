// 匯入資料
import { tarotData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('card-grid');
    const overlay = document.getElementById('result-overlay');
    const closeBtn = document.getElementById('close-btn');

    // 1. 生成卡片
    tarotData.forEach((item) => {
        let cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.onclick = () => showResult(item); // 直接傳入 item 物件
        grid.appendChild(cardDiv);
    });

    // 2. 顯示結果邏輯
    function showResult(data) {
        document.getElementById('r-card').innerText = data.card;
        document.getElementById('r-dest').innerText = data.dest;
        document.getElementById('r-quote').innerText = data.text;
        
        // 綁定按鈕事件 (這裡可以未來加入 Google Analytics 追蹤碼)
        document.getElementById('cta-btn').onclick = () => {
            alert(`正在導向至 ${data.dest} 的行程頁面...`);
        };

        overlay.style.display = 'flex';
    }

    // 3. 關閉視窗邏輯
    closeBtn.onclick = () => {
        overlay.style.display = 'none';
    };
    
    // 點擊背景也能關閉
    window.onclick = (event) => {
        if (event.target == overlay) {
            overlay.style.display = 'none';
        }
    };
});
