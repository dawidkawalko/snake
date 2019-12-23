class Bomb {
    constructor() {
        this.x = -1;
        this.y = -1;

        this.respawn();
    }

    hide() {
        this.hiddenTimer = 500;
    }

    respawn() {
        let x = Math.floor(Math.random() * GRID_WIDTH);
        let y = Math.floor(Math.random() * GRID_HEIGHT);

        // can't spawn bomb again at the same location
        while (x == this.x && y == this.y) {
            x = Math.floor(Math.random() * GRID_WIDTH);
            y = Math.floor(Math.random() * GRID_HEIGHT);
        }

        this.x = x;
        this.y = y;

        this.prevX = x;
        this.prevY = y;

        this.ttl = 400;
        this.hiddenTimer = 0;
    }

    update() {
        if (this.hiddenTimer == 0) {
            this.ttl -= 1;
            if (this.ttl == 0) {
                this.respawn();
            }
        }

        if (this.hiddenTimer > 0) {
            this.hiddenTimer -= 1;
            this.x = -1;
            this.y = -1;
        } else {
            this.x = this.prevX;
            this.y = this.prevY;
        }
    }

    draw() {
        noStroke();
        fill(200, 0, 0);
        circle((this.x + 1/2)*CELL_SIZE, (this.y + 1/2)*CELL_SIZE, CELL_SIZE);
    }
}