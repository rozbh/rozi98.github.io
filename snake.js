var canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');
let snakebody = [];
let gol = [0, 0]
snakebody.push(
    { x: 0, y: 50 },
    { x: 50, y: 50 },
    { x: 100, y: 50 },
    { x: 150, y: 50 },
)
let swap = false
for (let indexy = 0; indexy < 800; indexy += 50) {
    for (let index = 0; index <= 1500; index += 50) {
        ctx.fillStyle = swap ? 'green' : 'lime'
        ctx.fillRect(index, indexy, 50, 50);
        swap = !swap
    }
}


for (let index = 0; index < snakebody.length; index++) {
    ctx.beginPath();
    ctx.arc(snakebody[index].x + 25, snakebody[index].y + 25, 20, 0, 2 * Math.PI);
    ctx.fillStyle = 'red'
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
}


let Move;
document.body.addEventListener("keydown", event => {
const interval=100
    switch (event.code) {
        case 'KeyD':
            clearInterval(Move)
            Move = setInterval(() => {
                drawsnake(50, 0)
            }, interval);
            break;
        case 'KeyA':
            clearInterval(Move)
            Move = setInterval(() => {
                drawsnake(-50, 0)
            }, interval);
            break;
        case 'KeyW':
            clearInterval(Move)
            Move = setInterval(() => {
                drawsnake(0, -50)
            }, interval);
            break;
        case 'KeyS':
            clearInterval(Move)
            Move = setInterval(() => {
                drawsnake(0, 50)
            }, interval);
            break;
        default:
            break;
    }
});

function drawsnake(x, y) {
    for (let index = 0; index < snakebody.length - 1; index++) {
        ctx.beginPath();
        var p = ctx.getImageData(5 + snakebody[index].x , 5+ snakebody[index].y , 1, 1).data;
        const HexColor = "#" + ((1 << 24) + (p[0] << 16) + (p[1] << 8) + p[2]).toString(16).slice(1);
        ctx.arc(25 + snakebody[index].x, 25 + snakebody[index].y , 20, 0, 2 * Math.PI);
        ctx.fillStyle = HexColor
        ctx.fill();
        ctx.lineWidth = 10;
        ctx.strokeStyle = HexColor
        ctx.stroke();
        snakebody[index].x = parseInt(snakebody[index + 1].x)
        snakebody[index].y = parseInt(snakebody[index + 1].y)
    }
    snakebody[snakebody.length - 1].x += x
    snakebody[snakebody.length - 1].y += y

        for (let index = 0; index < snakebody.length; index++) {
            ctx.beginPath();
            ctx.arc(snakebody[index].x + 25, snakebody[index].y + 25, 20, 0, 2 * Math.PI);
            ctx.fillStyle = 'red'
            ctx.fill();
            ctx.lineWidth = 5;
            ctx.strokeStyle = '#003300';
            ctx.stroke();
        }

}