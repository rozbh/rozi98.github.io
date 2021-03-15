var canvas = document.getElementById("myCanvas");
var para = document.getElementById("score");

var position = document.getElementById("position");

const ctx = canvas.getContext('2d');
let snakebody = [];
snakebody.push(
    { x: 0, y: 50 },
    { x: 50, y: 50 },
    { x: 100, y: 50 },
    { x: 150, y: 50 },
)
position.innerText = `Head x=${snakebody[snakebody.length - 1].x} y=${snakebody[snakebody.length - 1].y}`
drawMap(ctx)
let gol = Drawgol(ctx)
DrawSnake(ctx)
let Move;
let score = 0
let CanMoveX = true
let CanMoveY = true
document.body.addEventListener("keydown", event => {
    const interval = 100
    switch (event.code) {
        case 'KeyD':
        case 'ArrowRight':
            if (!CanMoveX) {
                return
            }
            clearInterval(Move)
            logic(50, 0, ctx, gol, score)
            CanMoveY = true
            CanMoveX = false
            Move = setInterval(() => {
                logic(50, 0, ctx, gol, score)
            }, interval);
            break;
        case 'KeyA':
        case 'ArrowLeft':
            if (!CanMoveX) {
                return
            }
            clearInterval(Move)
            logic(-50, 0, ctx, gol, score)
            CanMoveY = true
            CanMoveX = false
            Move = setInterval(() => {
                logic(-50, 0, ctx, gol, score)
            }, interval);
            break;
        case 'KeyW':
        case 'ArrowUp':
            if (!CanMoveY) {
                return
            }
            clearInterval(Move)
            logic(0, -50, ctx, gol, score)
            CanMoveY = false
            CanMoveX = true
            Move = setInterval(() => {
                logic(0, -50, ctx, gol, score)
            }, interval);
            break;
        case 'KeyS':
        case 'ArrowDown':
            if (!CanMoveY) {
                return
            }
            clearInterval(Move)
            logic(0, 50, ctx, gol, score)
            CanMoveY = false
            CanMoveX = true
            Move = setInterval(() => {
                logic(0, 50, ctx, gol, score)
            }, interval);
            break;
        default:
            break;
    }
});