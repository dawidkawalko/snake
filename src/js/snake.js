const Direction = {
    'NONE': 0,
    'LEFT' : 1, 
    'UP' : 2, 
    'RIGHT': 3, 
    'DOWN' : 4
};

class Snake {
    constructor(headX, headY, canGoThroughWalls) {
        this.canGoThroughWalls = canGoThroughWalls;
        this.parts = [];

        this.bufferDirection = Direction.NONE;
        this.direction = Direction.NONE;

        this.head = this._addPart(headX, headY);
    }

    update(food, bombs) {
        if (this.head == null) {
            return false;
        }

        this.direction = this.bufferDirection;
        return this._move(food, bombs);
    }

    setDirection(direction) {
        this.bufferDirection = direction;
    }

    draw() {
        for (const part of this.parts) {
            part.draw();
        }
    }

    _eatFood(food) {
        if (this.head.x == food.x && this.head.y == food.y) {
            food.respawn();
            return true;
        }

        return false;
    }

    _move(food, bombs) {
        this.head = this._addPart(this.head.x, this.head.y);

        if (this.canGoThroughWalls) {
            if (this.head.x < 0) this.head.x = GRID_WIDTH - 1;
            else if (this.head.x >= GRID_WIDTH) this.head.x = 0;

            if (this.head.y < 0) this.head.y = GRID_HEIGHT - 1;
            else if (this.head.y >= GRID_HEIGHT) this.head.y = 0;
        }

        if (!this._eatFood(food)) {
            this.parts.pop();
        }

        const hitSelf = this._hitSelf();
        const hitWall = this._hitWall();
        const hitBomb = this._hitBomb(bombs);

        return !hitSelf && !hitWall && !hitBomb;
    }

    _hitSelf() {
        for (let i = 1; i < this.parts.length; i++) {
            const part = this.parts[i];
            if (this.head.x == part.x && this.head.y == part.y) {
                return true;
            }
        }

        return false;
    }

    _hitWall() {
        return !this.canGoThroughWalls && (this.head.x < 0 || this.head.x >= GRID_WIDTH ||
            this.head.y < 0 || this.head.y >= GRID_HEIGHT);
    }

    _hitBomb(bombs) {
        for (const bomb of bombs) {
            if (this.head.x == bomb.x && this.head.y == bomb.y) {
                return true;
            }
        }

        return false;
    }

    _addPart(x, y) {
        const newHead = new SnakePart(x, y);
        this._movePart(newHead);
        this.parts.unshift(newHead);

        return newHead;
    }

    _movePart(part) {
        switch (this.direction) {
            case Direction.LEFT:
                part.x -= 1;
                break;

            case Direction.UP:
                part.y -= 1;
                break;

            case Direction.RIGHT:
                part.x += 1;
                break;

            case Direction.DOWN:
                part.y += 1;
                break;
        }
    }
}