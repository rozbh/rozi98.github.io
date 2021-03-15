var canvas = document.getElementById("myCanvas");
var para = document.getElementById("score");
const ctx = canvas.getContext('2d');
let snakebody = [];
snakebody.push(
    { x: 0, y: 50 },
    { x: 50, y: 50 },
    { x: 100, y: 50 },
    { x: 150, y: 50 },
)
drawMap(ctx)
let gol=Drawgol(ctx)
DrawSnake(ctx)
let Move;
let score = 0
let CanMoveX=true
let CanMoveY=true
document.body.addEventListener("keydown", event => {
    const interval = 100
    switch (event.code) {
        case 'KeyD':
            if (!CanMoveX) {
                return
            }
            logic(50, 0,ctx,gol,score)
            CanMoveY=true
            CanMoveX=false
            clearInterval(Move)
            Move = setInterval(() => {
                logic(50, 0,ctx,gol,score)
            }, interval);
            break;
        case 'KeyA':
            if (!CanMoveX) {
                return
            }
            logic(-50, 0,ctx,gol,score)
            CanMoveY=true
            CanMoveX=false
            clearInterval(Move)
            Move = setInterval(() => {
                logic(-50, 0,ctx,gol,score)
            }, interval);
            break;
        case 'KeyW':
            if (!CanMoveY) {
                return
            }
            logic(0, -50,ctx,gol,score)
            CanMoveY=false
            CanMoveX=true
            clearInterval(Move)
            Move = setInterval(() => {
                logic(0, -50,ctx,gol,score)
            }, interval);
            break;
        case 'KeyS':
            if (!CanMoveY) {
                return
            }
            logic(0, 50,ctx,gol,score)
            CanMoveY=false
            CanMoveX=true
            clearInterval(Move)
            Move = setInterval(() => {
                logic(0, 50,ctx,gol,score)
            }, interval);
            break;
        default:
            break;
    }
});