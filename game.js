const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 20,
    height: 20,
    color: 'blue',
    speed: 5
};

let obstacles = [];
let score = 0;
let gameRunning = false;
let difficultyMultiplier = 1;

// 使用 requestAnimationFrame 的時間戳來控制障礙物生成
let lastObstacleTime = 0;

// 全局變量
let leftPressed = false;
let rightPressed = false;
let accelerationFactor = 1;
const maxAcceleration = 2;
const accelerationRate = 0.05;

let animationFrameId = null;

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function createObstacle() {
    return {
        x: Math.random() * (canvas.width - 20),
        y: 0,
        width: 20,
        height: 20,
        color: 'red',
        speed: (2 + Math.random() * 3) * difficultyMultiplier
    };
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function moveObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.y += obstacle.speed;
    });

    // 如果這裡有對 obstacles 的新賦值，使用 filter 方法而不是重新賦值
    obstacles = obstacles.filter(obstacle => obstacle.y < canvas.height);
}

function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function updatePlayerPosition() {
    if (leftPressed && !rightPressed) {
        accelerationFactor = Math.min(accelerationFactor + accelerationRate, maxAcceleration);
        player.x = Math.max(0, player.x - player.speed * accelerationFactor);
    } else if (rightPressed && !leftPressed) {
        accelerationFactor = Math.min(accelerationFactor + accelerationRate, maxAcceleration);
        player.x = Math.min(canvas.width - player.width, player.x + player.speed * accelerationFactor);
    } else {
        accelerationFactor = 1;
    }
}

function gameLoop(timestamp) {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updatePlayerPosition();
    drawPlayer();
    drawObstacles();
    moveObstacles();

    if (timestamp - lastObstacleTime > 500) { // 每500毫秒生成一個障礙物
        obstacles.push(createObstacle());
        lastObstacleTime = timestamp;
    }

    score++;

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`得分: ${score}`, 10, 30);

    if (obstacles.some(obstacle => checkCollision(player, obstacle))) {
        gameOver();
        return;
    }

    animationFrameId = requestAnimationFrame(gameLoop);
}

function startGame() {
    if (gameRunning) {
        stopGame();
    }
    
    gameRunning = true;
    obstacles = [];
    score = 0;
    lastObstacleTime = 0;
    player.x = canvas.width / 2;
    leftPressed = false;
    rightPressed = false;
    accelerationFactor = 1;
    
    animationFrameId = requestAnimationFrame(gameLoop);
}

function stopGame() {
    gameRunning = false;
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}

function gameOver() {
    stopGame();
    alert(`遊戲結束！你的得分是: ${score}`);
}

// 修改事件監聽器
document.addEventListener('keydown', (event) => {
    if (!gameRunning) return; // 只在遊戲運行時響應按鍵
    switch(event.key) {
        case 'ArrowLeft':
            leftPressed = true;
            break;
        case 'ArrowRight':
            rightPressed = true;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch(event.key) {
        case 'ArrowLeft':
            leftPressed = false;
            break;
        case 'ArrowRight':
            rightPressed = false;
            break;
    }
    accelerationFactor = 1; // 釋放按鍵時重置加速因子
});

// 在 HTML 中添加開始按鈕，並綁定事件
document.getElementById('startButton').addEventListener('click', startGame);

// 確保開始按鈕正確綁定了這個函數
document.getElementById('startButton').addEventListener('click', startGame);

// 將所有遊戲邏輯包裝在一個函數中
function initGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // ... 其他遊戲代碼 ...

    document.addEventListener('keydown', (event) => {
        switch(event.key) {
            case 'ArrowLeft':
                player.x = Math.max(0, player.x - player.speed);
                break;
            case 'ArrowRight':
                player.x = Math.min(canvas.width - player.width, player.x + player.speed);
                break;
        }
    });

    gameLoop();
}

// 確保在 DOM 加載完成後再初始化遊戲
document.addEventListener('DOMContentLoaded', initGame);

setInterval(() => {
    difficultyMultiplier += 0.1;
}, 10000); // 每10秒增加一次難度

console.log("DOM 加載狀態:", document.readyState);
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM 內容已加載");

    const canvas = document.getElementById('gameCanvas');
    if (!canvas) {
        console.error("無法找到 canvas 元素");
        return;
    }
    console.log("Canvas 元素:", canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("無法獲取 2D 繪圖上下文");
        return;
    }

    // 在這裡定義 player, obstacles 等遊戲對象

    function drawPlayer() {
        // 繪製玩家的代碼
    }

    function createObstacle() {
        // 創建障礙物的代碼
    }

    function drawObstacles() {
        // 繪製障礙物的代碼
    }

    function moveObstacles() {
        // 移動障礙物的代碼
    }

    function checkCollision(rect1, rect2) {
        // 碰撞檢測的代碼
    }

    function gameLoop() {
        // 遊戲主循環的代碼
    }

    // 添加鍵盤事件監聽器
    document.addEventListener('keydown', (event) => {
        // 處理鍵盤輸入的代碼
    });

    // 開始遊戲循環
    gameLoop();
});

const startButton = document.getElementById('startButton');
if (startButton) {
    startButton.addEventListener('click', startGame);
} else {
    console.error("無法找到開始按鈕");
}
