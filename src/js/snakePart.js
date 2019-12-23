class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        noStroke();
        fill(0);
        rect(this.x*CELL_SIZE, this.y*CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
}