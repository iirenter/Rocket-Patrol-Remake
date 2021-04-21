let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
}
let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let highScore= 0;
let timer= 0;

let keyLEFT, keyRIGHT, keyF, keyR, keyS;
//Israel Renteria
//Rocket Patrol Mods
//4/20/2021
//
//All Modifications for grading:
//Added a High Score(5)
//Added a Speed increase to ships after 30 seconds(5)
//Added a New background Sprite(5)
//Added the ability to control rocket after firing(5)
//Created a new title Screen(10)
//Added Parallax Scrolling(10)
//Created a new Spaceship type(20)
//Created new artwork for all in-game assets(20)
//Created and implemented a new weapon type(20)
//Total: 100