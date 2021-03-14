var canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');
let snakebody = [];
let gol = [0, 0]
snakebody.push([0, 0])
let swap = false
for (let indexy = 0; indexy < 800; indexy += 50) {
    for (let index = 0; index <= 1500; index += 50) {
        ctx.fillStyle = swap ? 'green' : 'lime'
        ctx.fillRect(index, indexy, 50, 50);
        swap = !swap
    }
}
ctx.beginPath();
ctx.arc(snakebody[snakebody.length - 1][0] + 25, snakebody[snakebody.length - 1][1] + 25, 20, 0, 2 * Math.PI);
ctx.fillStyle = 'red'
ctx.fill();
ctx.lineWidth = 5;
ctx.strokeStyle = '#003300';
ctx.stroke();

let Move;
document.body.addEventListener("keydown", event => {

    switch (event.code) {
        case 'KeyD':
            clearInterval(Move)
           // drawsnake(50, 0)
            Move = setInterval(() => {
                drawsnake(50, 0)
            }, 500);
            break;
        case 'KeyA':
            clearInterval(Move)
            Move = setInterval(() => {
                drawsnake(-50, 0)
            }, 500);
            break;
            case 'KeyW':
                clearInterval(Move)
               // drawsnake(50, 0)
                Move = setInterval(() => {
                    drawsnake(0, -50)
                    
                }, 500);
                break;
            case 'KeyS':
                clearInterval(Move)
                Move = setInterval(() => {
                    drawsnake(0, 50)
                }, 500);
                break;

        default:
            break;
    }


});

function drawsnake(x, y) {
    snakebody[snakebody.length - 1][0] += x
    snakebody[snakebody.length - 1][1] += y
    ctx.beginPath();
    ctx.arc(snakebody[snakebody.length - 1][0] + 25, snakebody[snakebody.length - 1][1] + 25, 20, 0, 2 * Math.PI);
    ctx.fillStyle = 'red'
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
    ctx.beginPath();
    var p = ctx.getImageData(5 + snakebody[snakebody.length - 1][0] - x, snakebody[snakebody.length - 1][1] - y, 1, 1).data;
    const HexColor = "#" + ((1 << 24) + (p[0] << 16) + (p[1] << 8) + p[2]).toString(16).slice(1);
    ctx.arc(25 + snakebody[snakebody.length - 1][0] - x, 25 + snakebody[snakebody.length - 1][1] - y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = HexColor
    ctx.fill();
    ctx.lineWidth = 10;
    ctx.strokeStyle = HexColor
    ctx.stroke();
    for (let index = 0; index < snakebody.length - 1; index++) {
        snakebody[index] = snakebody[index + 1]
    }


}