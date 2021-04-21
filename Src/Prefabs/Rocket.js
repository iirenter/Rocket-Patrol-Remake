class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 2;
        this.sfxRocket= scene.sound.add('sfx_rocket');
    }

    update() {
        if(this.isFiring) {
            this.y -= this.moveSpeed;
            if(keyLEFT.isDown) {
                this.x -= this.moveSpeed;// Added ability to control Rocket after firing
               }
               if(keyRIGHT.isDown) {
                this.x +=this.moveSpeed;
               }
            if(this.y < borderUISize* 3) {
                this.reset();
            }
        } else {
            if(keyLEFT.isDown) {
             this.x -= this.moveSpeed;
            }
            if(keyRIGHT.isDown) {
             this.x +=this.moveSpeed;
            }
            if(Phaser.Input.Keyboard.JustDown(keyF)) {
                this.isFiring = true;
                this.sfxRocket.play();
            }
            this.x = Phaser.Math.Clamp(this.x, borderUISize + borderPadding, game.config.width -borderUISize -borderPadding);
        }
    }
    reset() {
        this.y= game.config.height- borderUISize - borderPadding;
                this.isFiring = false;
    }
}

class screenClear extends Phaser.GameObjects.Sprite {// Added a new weapon type
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 2;
        this.usage = 3;
        this.sfxRocket= scene.sound.add('sfx_rocket');
    }

    update() {
        if(this.isFiring) {
            this.y -= this.moveSpeed;
            
               }
            if(this.y < borderUISize* 3) {
                this.reset();
            }
            if(Phaser.Input.Keyboard.JustDown(keyS) && this.usage > 0) {
                this.isFiring = true;
                this.usage -= 1;
                this.sfxRocket.play();
    
        }
    }
    reset() {
        this.y= game.config.height- borderUISize - borderPadding +15;
                this.isFiring = false;
    }
}

