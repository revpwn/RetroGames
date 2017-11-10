var canvas = document.getElementById("brickCanvas");
var ctx = canvas.getContext("2d");
//beginning ball position
var x = canvas.width / 2;
var y = canvas.height - 30;
//Paddle attributes
const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 75;
var paddleX = (canvas.width - PADDLE_WIDTH) / 2;

var ballRadius = 10;
var xSpeed = 2;
var ySpeed = -2;
var rightArrowPressed = false;
var leftArrowPressed = false;
var lives = 3;

function drawLives() {
    ctx.font = "20px Helvetica";
    ctx.fillStyle = "#fff";
    ctx.fillText("Lives: " + lives, canvas.width - 80, 20);
}

// Setting up ball color/size
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

//Drawing paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(
        paddleX,
        canvas.height - PADDLE_HEIGHT,
        PADDLE_WIDTH,
        PADDLE_HEIGHT
    );
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

/*
 Allows the ball to move by updating every 10ms, and clears the previously drawn
 ball at the beginning of the function.
 */
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDectection();
    /*
     Both if's check for bounce off of ceiling, floor, or wall.
     I am subtracting half the radius(5) from each because it gives the ball a
     nicer touch off of the sides by barely touching instead of going
     into the side.
     */
    if (x + xSpeed > canvas.height - 5 || x + xSpeed < 5) {
        xSpeed = -xSpeed;
    }

    if (y + ySpeed < 5) {
        ySpeed = -ySpeed;
    } else if (y + ySpeed > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + PADDLE_WIDTH) {
            ySpeed = -ySpeed;
            ySpeed -= 0.5;
        } else {
            lives--;
            if (!lives) {
                alert(
                    "Game over :( you scored " +
                        score +
                        " points. Click OK to try again!"
                );
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                xSpeed = 3;
                ySpeed = -3;
                paddleX = (canvas.width - PADDLE_WIDTH) / 2;
            }
        }
    }

    //Checking for keyup/keydown to move paddle
    if (rightArrowPressed && paddleX < canvas.width - PADDLE_WIDTH) {
        paddleX = paddleX + 5;
    } else if (leftArrowPressed && paddleX > 0) {
        paddleX = paddleX - 5;
    }

    x = x + xSpeed;
    y = y + ySpeed;
    requestAnimationFrame(draw);
}
document.addEventListener("keydown", keyDownCheck, false);
document.addEventListener("keyup", keyUpCheck, false);
document.addEventListener("mousemove", mouseMoveCheck, false);

function mouseMoveCheck(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - PADDLE_WIDTH / 2;
    }
}
//Checking for keycodes, and setting booleans based on keyup/keydown

function keyDownCheck(e) {
    if (e.keyCode === 39) {
        rightArrowPressed = true;
    } else if (e.keyCode === 37) {
        leftArrowPressed = true;
    }
}

function keyUpCheck(e) {
    if (e.keyCode === 39) {
        rightArrowPressed = false;
    } else if (e.keyCode === 37) {
        leftArrowPressed = false;
    }
}

draw();

// Setting Brick attributes

var brickRowCount = 8;
var brickColumnCount = 5;
var brickWidth = 80;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 40;
var brickOffsetLeft = 35;

//Where we will hold our blocks
var bricks = [];
for (column = 0; column < brickColumnCount; column++) {
    bricks[column] = [];
    for (row = 0; row < brickRowCount; row++) {
        bricks[column][row] = { x: 0, y: 0, status: 1 };
    }
}
//Building the Bricks (c = column, r = row)
function drawBricks() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#fff";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

//Checks to see if ball has hit a brick
function collisionDectection() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status === 1) {
                if (
                    x > b.x &&
                    x < b.x + brickWidth &&
                    y > b.y &&
                    y < b.y + brickHeight
                ) {
                    ySpeed = -ySpeed;
                    b.status = 0;
                    score++;
                    if (score === brickRowCount * brickColumnCount) {
                        alert("Awesome Job! You won! Click OK to play again.");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// Keeping track of score

var score = 0;

function drawScore() {
    ctx.font = "20px Helvetica";
    ctx.fillStyle = "#fff";
    ctx.fillText("Score: " + score, 8, 20);
}
