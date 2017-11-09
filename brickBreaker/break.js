//initializing canvas
    var canvas = document.getElementById('brickCanvas');
    var ctx = canvas.getContext('2d');
//beginning ball position
    var x = canvas.width/2;
    var y = canvas.height-30;

//Paddle characteristics
    const PADDLE_HEIGHT = 10;
    const PADDLE_WIDTH = 75;
    var paddleX = (canvas.width-PADDLE_WIDTH)/2;

// Ball characteristics
    var ballRadius = 10;
// dx = ball speed on x-axis, dy = ball speed on y-axis.
    var xSpeed = 2;
    var ySpeed = -2;

// Booleans checking to see if an arrow is clicked
    var rightArrowPressed = false;
    var leftArrowPressed = false;


// Setting up ball color/size
    function drawBall(){
        ctx.beginPath();
        ctx.arc(x,y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#eee";
        ctx.fill();
        ctx.closePath();
    }

//Drawing paddle
    function drawPaddle(){
        ctx.beginPath();                                            //brings paddle up
        ctx.rect(paddleX, canvas.height-PADDLE_HEIGHT-ballRadius, PADDLE_WIDTH, PADDLE_HEIGHT);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.closePath();
    }

/*
 Allows the ball to move by updating every 10ms, and clears the previously drawn
 ball at the beginning of the function.
 */
    function draw(){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        drawBall();
        drawPaddle()
    /*
     Both if's check for bounce off of ceiling, floor, or wall.
     I am subtracting half the radius(5) from each because it gives the ball a
     nicer touch off of the sides by barely touching instead of going
     into the side.
     */

        if(y + ySpeed > canvas.height-5 || y + ySpeed < 5 ){
            ySpeed = -ySpeed;
        }

        if(x + xSpeed > canvas.height-5|| x + xSpeed < 5){
            xSpeed = -xSpeed;
        }

        //Checking for keyup/keydown to move paddle
        if(rightArrowPressed && paddleX < canvas.width-PADDLE_WIDTH){
            paddleX = paddleX + 5;
        }
        else if(leftArrowPressed && paddleX > 0){
            paddleX = paddleX - 5;
        }

        x = x + xSpeed;
        y = y + ySpeed;
}
document.addEventListener("keydown", keyDownCheck, false);
//document.addEventListener("keyup", keyUpCheck, false);

//Checking for keycodes, and setting booleans based on keyup/keydown

function keyDownCheck(e){
    if(e.keycode === 39){
        rightArrowPressed = true;
    }
    else if(e.keycode === 37){
        leftArrowPressed = true;
    }
}

function keyUpCheck(e){
    if(e.keyCode === 39){
        rightArrowPressed = false;
    }
    else if(e.keyCode === 37) {
        leftArrowPressed = false;
    }
}

setInterval(draw,10);
