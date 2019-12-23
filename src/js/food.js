class Food {
    constructor() {
        this.x = -1;
        this.y = -1;

        this.respawn();
    }

    respawn() {
        let x = Math.floor(Math.random() * GRID_WIDTH);
        let y = Math.floor(Math.random() * GRID_HEIGHT);

        // can't spawn food again at the same location
        while (x == this.x && y == this.y) {
            x = Math.floor(Math.random() * GRID_WIDTH);
            y = Math.floor(Math.random() * GRID_HEIGHT);
        }

        this.x = x;
        this.y = y;
        this.ttl = 200;
    }

    update() {
        this.ttl -= 1;
        if (this.ttl == 0) {
            this.respawn();
        }
    }

    draw() {
        noStroke();
        fill(0, 200, 0);
        circle((this.x + 1/2)*CELL_SIZE, (this.y + 1/2)*CELL_SIZE, CELL_SIZE);
    }
}