

/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("gamescreen");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;
let tileCount = 20;
let tileSize = 18;
let headX = 10;
let headY = 10;
let xv = 0;
let yv = 0;
let foodX = 5;
let foodY = 5;
const SnakePart = [];
let tailL = 0;                     
document.body.addEventListener('keydown',Press);
let score = 0;
let speed = 7;

class Snake{
    constructor(x,y){
        this.x = x;
        this.y = y;

    }
}   

function drawGame(){
    changeSnakePos();
    
    let result = isGameOver();

    if (result){
        return;
        
    }
    cleargame();
    drawSnake();
    drawApple();

    checkCollision();
    drawScore();
   
    setTimeout(drawGame,1000/speed);
    


    
}

function cleargame(){
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,canvas.width,canvas.height);

}

function drawSnake(){
    ctx.fillStyle = "orange";
    for (let i = 0;i<SnakePart.length;i++){
        let part = SnakePart[i];
        ctx.fillRect(part.x * tileCount,part.y*tileCount,tileSize,tileSize)

    }
    SnakePart.push(new Snake(headX,headY));
    
    if (SnakePart.length>tailL){
        SnakePart.shift();

    }
ctx.fillRect(headX*tileCount,headY*tileCount,tileSize,tileSize)

}

function Press(event){
 
    if (event.keyCode == 38){ //UP
        if (yv == 1)
        return;
        yv = -1;
        xv = 0;

    }
    if (event.keyCode == 40){ //DOWN
        if (yv == -1)
        return;
        yv = 1;
        xv = 0;

    }
    if (event.keyCode == 37){ //LEFT
        if (xv == 1)
        return;
        yv = 0;
        xv = -1;

    }

     if (event.keyCode == 39){ //RIGHT
        if(xv==-1)
        return;

        yv = 0;
        xv = 1;

    }


}

function changeSnakePos(){
    headX = headX + xv;
    headY = headY + yv;


}

function drawApple(){
    ctx.fillStyle = "red";
    ctx.fillRect(foodX*tileCount,foodY*tileCount,tileSize,tileSize)
}


function checkCollision(){
    if (foodX == headX && foodY == headY){
        foodX = Math.floor(Math.random()*tileCount);
        foodY = Math.floor(Math.random()*tileCount);
        tailL++;
        score++;
        
    }                

    }
        
function drawScore(){
    ctx.fillStyle = "white";
    ctx.font = "13px verdana";
    ctx.fillText("Score: "+score,canvas.clientWidth-50,10);

}
//Game Over function
function isGameOver(){
    let gameover = false;
    if (yv == 0 && xv == 0){
        return false;

    }
    if (headX<0){
        gameover = true;

    }
    else if(headX > 24){
        gameover = true;

    }
    
    else if(headY<0){
        gameover = true;

    }

    else if(headY == 35){
        gameover = true;

    } 

    //stop the game when snake bumps into itself

for (let i = 0;i < SnakePart.length;i++){
        let part = SnakePart[i];
        if (part.x === headX && part.y === headY){
            gameover = true;
            break;

        }

    }


    if (gameover){
        ctx.fillStyle = "white";
        ctx.font = "50px verdana";
        ctx.fillText("Game Over ",canvas.clientWidth/6.5,canvas.clientHeight/2);

    }
    return gameover;
    

}




drawGame();



