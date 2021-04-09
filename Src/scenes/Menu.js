

class Menu extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }
    create() {
        this.add.text(20,20, "Rocket Patrol Menu");
        this.scene.start("PlayScene");
    }
}