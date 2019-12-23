// grid settings
const GRID_WIDTH = 30;
const GRID_HEIGHT = 30;
const CELL_SIZE = 20;

// game variables
let snake = null;
let food = null;
let bombs = [];
let bonus = null;
let updateCounter = 0;

function restart() {
    snake = new Snake(Math.floor(GRID_WIDTH / 2), Math.floor(GRID_HEIGHT / 2), 5, true);
    updateCounter = snake.speed;

    food = new Food();
    bonus = new Bonus();
    
    bombs = [];
    bombs.push(new Bomb());
}

function setup() {
    createCanvas(GRID_WIDTH * CELL_SIZE, GRID_HEIGHT * CELL_SIZE);
    restart();
}

function draw() {
    background(255);

    if (snake.direction != Direction.NONE) {
        food.update();
        bonus.update();

        for (const bomb of bombs) {
            bomb.update();
        }

        if (snake.parts.length % (5 * (bombs.length)) == 0) {
            bombs.push(new Bomb());
        }
    }

    updateCounter -= 1;
    if (updateCounter == 0) {
        const isAlive = snake.update(food, bombs, bonus);
        if (!isAlive) {
            restart();
        }

        updateCounter = snake.speed;
    }

    stroke(0);
    strokeWeight(1);
    fill(255);
    rect(0, 0, width, height);

    food.draw();
    bonus.draw();

    for (const bomb of bombs) {
        bomb.draw();
    }

    snake.draw();

    // score
    fill(0);
    noStroke();
    textSize(25);
    textAlign(LEFT);
    text('Score: ' + (snake.parts.length - 1), 5, height - 5);

    // food ttl
    fill(0);
    noStroke();
    textSize(25);
    textAlign(RIGHT);
    text('Food timer: ' + ('000' + food.ttl).slice(-3), width - 5, height - 5);
}

function keyPressed() {
    switch (key) {
        case 'a':
            if (snake.direction != Direction.RIGHT) {
                snake.setDirection(Direction.LEFT);
            }

            break;

        case 'w':
            if (snake.direction != Direction.DOWN) {
                snake.setDirection(Direction.UP);
            }

            break;

        case 'd':
            if (snake.direction != Direction.LEFT) {
                snake.setDirection(Direction.RIGHT);
            }

            break;

        case 's':
            if (snake.direction != Direction.UP) {
                snake.setDirection(Direction.DOWN);
            }

            break;
    }
}