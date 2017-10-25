var canvas;
var canvasContext;
var ballX= 50;
var ballY= 50;
var ballSpeedX = 5;
var ballSpeedY = 4;

var playerScore = 0;
var computerScore = 0;
var showingWinScreen = false;
const WINNING_SCORE = 1;

var paddle1Y = 400;
var paddle2Y = 400;
const PADDLE_HEIGHT= 100;
const PADDLE_WIDTH = 10;


function calculateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    }

}
function handleMouseClick(evt){
    if(showingWinScreen){
        playerScore = 0;
        computerScore = 0;
        showingWinScreen = false;
    }
}

window.onload = function(){
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    var framesPerSecond = 30;
    setInterval( function(){
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);

    canvas.addEventListener('mousedown', handleMouseClick);

    canvas.addEventListener('mousemove',
        function(evt){
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
        });

}
//function resets the ball after a winning shot passes the canvas width
// and also determines and alerts winner
function ballReset(){
    if(playerScore === WINNING_SCORE ){
           //alert("You won, congratulations, you beat a fake computer player!");
           playerScore = 0;
           computerScore = 0;
           showingWinScreen = true;
       }

       if(computerScore === WINNING_SCORE ){
             // alert("You lost to a computer..really? Better luck next time!");
              playerScore = 0;
              computerScore = 0;
              showingWinScreen = true;
          }

    ballSpeedX = 5;
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}


function computerMovement(){
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2)
    if(paddle2YCenter < ballY-35){
        paddle2Y += 7;
    } else if(paddle2YCenter > ballY+35) {
        paddle2Y -= 7;
    }
}

function moveEverything(){
    if(showingWinScreen){
        return;
    }
    computerMovement();
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballX < 20){
        if(ballY > paddle1Y &&
           ballY < paddle1Y+PADDLE_HEIGHT){
               ballSpeedX = -ballSpeedX+2;
               var deltaY =ballY -(paddle1Y+PADDLE_HEIGHT/2);
               ballSpeedY = deltaY * 0.33;
           }
        else{
            computerScore++; // checking score before resetting ball
            ballReset();
        ;
    }

}
    if(ballX >= canvas.width-20){
        if(ballY > paddle2Y &&
           ballY < paddle2Y+PADDLE_HEIGHT){
               ballSpeedX = -ballSpeedX-2;
               var deltaY =ballY -(paddle2Y+PADDLE_HEIGHT/2);
               ballSpeedY = deltaY * 0.33
           }
        else{
            ballReset();
            playerScore++;
    }
    }
//whenever ball is hitting the ceiling this functionality creates the bounce
    if(ballY<= 0){
        ballSpeedY = -ballSpeedY;
    }
    if(ballY >= canvas.height){
        ballSpeedY = -ballSpeedY;
    }
}

function drawNet(){
    for(var i=0; i<canvas.height; i+=30){
        styleRect(canvas.width/2-1,i,3,17,'white')
    }
}

function drawEverything(){
    //this is the black canvas
    styleRect(0,0, canvas.width, canvas.height, 'black');

  /* Bug when computer wins, and it is not displaying
  the computer Win Screen prompt*/
    if(showingWinScreen){
            canvasContext.fillStyle = 'white';
            canvasContext.font = '25px Arial';
            if(playerScore == WINNING_SCORE){
                canvasContext.fillStyle = 'white';
                canvasContext.fillText("The Humans Win!", 325, 200);
            }
            else if(computerScore == WINNING_SCORE){
                canvasContext.fillStyle = 'white';
                canvasContext.fillText("Damn..you just got beat by a computer", 325, 200);
            }
        canvasContext.fillStyle  = 'red';
        canvasContext.fillText("Click for Rematch", 345, 450);
        return;
    }

    drawNet();

    //this is the left player paddle
    styleRect(0,paddle1Y ,PADDLE_WIDTH,100, 'lightgrey');

    //this is the right computer paddle
    styleRect(canvas.width-PADDLE_WIDTH, paddle2Y,PADDLE_WIDTH,100, 'lightgrey');

    //this is the ball
    circle(ballX, ballY, 10,'#e2e2e2');
    canvasContext.font = '20px Helvetica';
    canvasContext.fillStyle = 'white';
    canvasContext.fillText(playerScore, 100, 100,);
    canvasContext.fillText(computerScore, canvas.width-100, 100);
}


//helper function for the circle
function circle(centerX, centerY, radius, color){
        canvasContext.fillStyle = color;
        canvasContext.beginPath();
        canvasContext.arc(ballX, centerY, radius, 0,Math.PI*2, true);
        canvasContext.fill();
}

//this function is to improve syntax readability and simplicity
function styleRect(leftX, topY, width, height, color){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX,topY,width,height);

}
