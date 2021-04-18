

class Play extends Phaser.Scene {
    constructor() {
        super("PlayScene");
    }
    preload() {
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('ship', 'assets/spaceship.png');
        this.load.spritesheet('explosion', 'assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    create() { 
        this.starfield = this.add.tileSprite(
        0,0,640,480, 'starfield'
         ).setOrigin(0,0);

         this.p1Rocket = new Rocket(
             this,
             game.config.width/2,
             game.config.height -borderUISize - borderPadding,
             'rocket'
         ).setOrigin(0.5,0);

         this.ship1= new Ship(
             this,
             100,
             200,
             'ship',
             0, 30
         );

         this.ship2= new Ship(
            this,
            300,
            240,
            'ship',
            0, 20
        );

        this.ship3= new Ship(
            this,
            380,
            300,
            'ship',
            0, 10
        );

        // green UI Background
        this.add.rectangle(
            0, 
            borderUISize + borderPadding, 
            game.config.width,
             borderUISize * 2,
             0x00FF00
             ).setOrigin(0,0);

        //WHite Border
     this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
	this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
        frameRate: 30
    });

    this.p1Score = 0;

    let scoreConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 100
    }
    this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
    this.timerRight=  this.add.text(borderUISize + borderPadding + 300, borderUISize + borderPadding*2, timer, scoreConfig);

    this.gameOver = false;
    scoreConfig.fixedWidth = 0;
    this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- to menu', scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding +60, 'High Score:', scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2 +120, game.config.height/2 + borderUISize + borderPadding +60, highScore, scoreConfig).setOrigin(0.5);
        this.gameOver = true;
    }, null, this);

    }
    update() {
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("MenuScene");
        }
        this.starfield.tilePositionX -=4;
        if(!this.gameOver){
        this.p1Rocket.update();
        this.ship1.update();
        this.ship2.update();
        this.ship3.update();
        }

        if(this.checkCollision(this.p1Rocket, this.ship1)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship1);
        }
        if(this.checkCollision(this.p1Rocket, this.ship2)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship2);
        }
        if(this.checkCollision(this.p1Rocket, this.ship3)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship3);
        }

        if(Play.clock <= 30000) {// Add a speed change when time reaches 30 seconds.
            ship.moveSpeed = ship.moveSpeed * 2;
        }

        if(this.p1Score > highScore) {
            highScore = this.p1Score;
        }

        timer = timer- 1;


    }
    
    checkCollision(rocket, ship){
        if(rocket.x > ship.x && rocket.x <ship.x + ship.width && rocket.y > ship.y && rocket.y < ship.y + ship.width) {
            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha= 0;
        let boom = this.add.sprite(ship.x, ship.y, 'explosion'). setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }
}