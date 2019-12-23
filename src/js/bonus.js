TTR = 600;

class Bonus {
    constructor() {
        this.x = -1;
        this.y = -1;

        this.speed = 10;
        this.ttr = TTR;

        this.respawn();
    }

    respawn() {
        if (this.ttr == 0) {
            let x = Math.floor(Math.random() * GRID_WIDTH);
            let y = Math.floor(Math.random() * GRID_HEIGHT);

            // can't spawn bonus again at the same location
            while (x == this.x && y == this.y) {
                x = Math.floor(Math.random() * GRID_WIDTH);
                y = Math.floor(Math.random() * GRID_HEIGHT);
            }

            this.x = x;
            this.y = y;
            this.ttl = 150;
        } else {
            this.x = -1;
            this.y = -1;
            this.ttl = 0; 
        }

        this.ttr = TTR;
    }

    update() {
        if (this.ttl > 0) {
            this.ttl -= 1;

            if (this.ttl == 0) {
                this.x = -1;
                this.y = -1;
            }
        }
        else if (this.ttr > 0) {
            this.ttr -= 1;
        }

        if (this.ttr == 0) {
            this.respawn();
        }
    }

    draw() {
        noStroke();
        fill(0, 0, 200);
        circle((this.x + 1/2)*CELL_SIZE, (this.y + 1/2)*CELL_SIZE, CELL_SIZE);
    }
}