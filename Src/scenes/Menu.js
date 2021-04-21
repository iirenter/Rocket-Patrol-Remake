

class Menu extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    preload(){
        this.load.audio('sfx_select', 'assets/blip_select12.wav');
        this.load.audio('sfx_explosion', 'assets/explosion38.wav');
        this.load.audio('sfx_rocket', 'assets/rocket_shot.wav');
    }
    create() {
        let menuConfig = {
            fontFamily: 'Special Elite',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }


        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -borderPadding- 15, 'ROCKET PATROl', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2- 15, 'Use <--> arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, '(S) to Energy Blast (Can only use 3 times)', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding +40, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding +70, 'High Score:', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2 +120, game.config.height/2 + borderUISize + borderPadding +70, highScore, menuConfig).setOrigin(0.5);// Added a Highscore to start screen that persists as long as game is running

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('PlayScene');
            timer = 6000;
        }

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('PlayScene');
            timer = 4500;
        }
    }
}