class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x,y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
    }
    

    update() {
        this.x -= this.moveSpeed;

        if(this.x <= 0 -this.width){
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width;
    }
}

class newShip extends Phaser.GameObjects.Sprite {// Added anew enemy type with new artwork, faster, and worth more points
    constructor(scene, x,y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed*3;
    }
    

    update() {
        this.x -= this.moveSpeed;

        if(this.x <= 0 -this.width){
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width;
    }
}