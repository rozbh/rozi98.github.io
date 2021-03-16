function drawMap(ctx) {
    let swap = false
    for (let indexy = 0; indexy < 800; indexy += 50) {
        for (let index = 0; index <= 1500; index += 50) {
            ctx.fillStyle = swap ? 'green' : 'lime'
            ctx.fillRect(index, indexy, 50, 50);
            swap = !swap
        }
    }
}
function Drawgol(ctx) {
    let golxy = {
        x: (Math.floor(Math.random() * 29) + 1) * 50,
        y: (Math.floor(Math.random() * 15) + 1) * 50
    }
    for (let index = 0; index < snakebody.length; index++) {
        if (JSON.stringify(snakebody[index]) == JSON.stringify(golxy)) {
            golxy = {
                x: (Math.floor(Math.random() * 29) + 1) * 50,
                y: (Math.floor(Math.random() * 15) + 1) * 50
            }
            index = 0
        }
    }
    ctx.beginPath();
    ctx.arc(golxy.x + 25, golxy.y + 25, 20, 0, 2 * Math.PI);
    ctx.fillStyle = 'pink'
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
    return golxy
}
function DrawSnake(ctx) {
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
function ClearSnake(ctx) {
    for (let index = 0; index < snakebody.length - 1; index++) {
        ctx.beginPath();
        var p = ctx.getImageData(5 + snakebody[index].x, 5 + snakebody[index].y, 1, 1).data;
        const HexColor = "#" + ((1 << 24) + (p[0] << 16) + (p[1] << 8) + p[2]).toString(16).slice(1);
        ctx.arc(25 + snakebody[index].x, 25 + snakebody[index].y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = HexColor
        ctx.fill();
        ctx.lineWidth = 10;
        ctx.strokeStyle = HexColor
        ctx.stroke();
        snakebody[index].x = parseInt(snakebody[index + 1].x)
        snakebody[index].y = parseInt(snakebody[index + 1].y)
    }
}
function Losser() {
    clearInterval(Move)
    const interval = 5000/snakebody.length
    GameOver.play()
    let x=0
    const clear= setInterval(() => {
        ctx.beginPath();
        var p = ctx.getImageData(5 + snakebody[x].x, 5 + snakebody[x].y, 1, 1).data;
        const HexColor = "#" + ((1 << 24) + (p[0] << 16) + (p[1] << 8) + p[2]).toString(16).slice(1);
        ctx.arc(25 + snakebody[x].x, 25 + snakebody[x].y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = HexColor
        ctx.fill();
        ctx.lineWidth = 10;
        ctx.strokeStyle = HexColor
        ctx.stroke();
        x+=1
        if (x==snakebody.length) {
            clearInterval(clear)
            location.reload()
        }
    }, interval);

   // alert(`HaHa Loser score is : ${score}`)
    
}
function LossCheck() {

    const { x, y } = snakebody[snakebody.length - 1]
    if (x > 1450 || x < 0) {
       
        return  Losser()
    }
    if (y > 750 || y < 0) {
        
        return Losser()
    }
    for (let index = 0; index < snakebody.length - 1; index++) {
        if (snakebody[index].x == x && snakebody[index].y == y) {
            return Losser()
        }

    }
}
let eat = new Audio('./sounds/eat.mp3');
let GameOver = new Audio('./sounds/gameover.wav');
function logic(x, y, ctx) {
    ClearSnake(ctx)
    snakebody[snakebody.length - 1].x += x
    snakebody[snakebody.length - 1].y += y
    LossCheck()
    position.innerText = `x=${snakebody[snakebody.length - 1].x} y=${snakebody[snakebody.length - 1].y}`
    DrawSnake(ctx)
   
    if (JSON.stringify(snakebody[snakebody.length - 1]) == JSON.stringify(gol)) {
        
        snakebody.push(gol)
        // var p = document.getElementById("score")
        gol = Drawgol(ctx);
        score += 1
        para.innerText = `your score is :${score}`
        eat.play();
    }


}