const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [{x: 200, y: 200}]; // Snake starts at center
let food = {x: 0, y: 0};       // Food position
let direction = 'right';       // Initial direction
let score = 0;                 // Player score

// Generate random food position
function randomFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

randomFood();

// Game loop running every 100ms, stored in a variable
let gameInterval = setInterval(gameLoop, 100);

function gameLoop() {
    moveSnake();
    if (checkCollision()) {
        clearInterval(gameInterval); // Stop the game loop
        alert('Game Over');
        location.reload(); // Restart game
    }
    if (eatFood()) {
        score++;
        document.getElementById('score').textContent = score;
        randomFood();
        growSnake();
    }
    draw();
}

// Move the snake
function moveSnake() {
    let head = {x: snake[0].x, y: snake[0].y};
    if (direction === 'right') head.x += 10;
    else if (direction === 'left') head.x -= 10;
    else if (direction === 'up') head.y -= 10;
    else if (direction === 'down') head.y += 10;
    snake.unshift(head); // Add new head
    snake.pop();         // Remove tail
}

// Check for collisions with walls or self
function checkCollision() {
    let head = snake[0];
    // Wall collision
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }
    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Check if snake eats food
function eatFood() {
    let head = snake[0];
    if (head.x === food.x && head.y === food.y) {
        return true;
    }
    return false;
}

// Grow the snake
function growSnake() {
    let tail = snake[snake.length - 1];
    snake.push({x: tail.x, y: tail.y});
}

// Draw the game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    // Draw snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });
    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
}

// Handle directional input
document.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' && direction !== 'left') {
        direction = 'right';
    } else if (event.key === 'ArrowLeft' && direction !== 'right') {
        direction = 'left';
    } else if (event.key === 'ArrowUp' && direction !== 'down') {
        direction = 'up';
    } else if (event.key === 'ArrowDown' && direction !== 'up') {
        direction = 'down';
    }
});