import 'phaser';
import config from '../config/config';


export default class TitleScene extends Phaser.Scene {

  constructor () {
    super('Title');
  }

  addTitleButton(position, text, scene) {

    var titleButton = this.add.sprite(100, 100, 'BlueButton').setInteractive();

    this.centerButton(titleButton, position);
    var text = this.add.text(0, 0, text, { fontSize: '24px', fill: '#ffffff' });
    this.centerButtonText(text, titleButton);

    titleButton.on('pointerdown', function (pointer) {
      this.scene.start('Game');
    }.bind(this));

    titleButton.on('pointerover', () => {
      titleButton.setTexture('BlueButtonHighlight');
    });

    titleButton.on('pointerout', () => {
      titleButton.setTexture('BlueButton');
    });
  }

  create () {

    /*
    this.gameButton = this.add.sprite(100, 200, 'BlueButton').setInteractive();
    this.centerButton(this.gameButton, 1);
    this.gameText = this.add.text(0, 0, 'Play', { fontSize: '24px', fill: '#ffffff' });
    this.centerButtonText(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', function (pointer) {
      this.scene.start('Game');
    }.bind(this));

    this.input.on('pointerover', function (event, gameObjects) {
      gameObjects[0].setTexture('BlueButtonHighlight');
    })

    this.input.on('pointerout', function (event, gameObjects) {
      gameObjects[0].setTexture('BlueButton');
    })
    */

    this.addTitleButton(0, 'Play', 'Game');
    this.addTitleButton(1, 'Options', 'Options');
    this.addTitleButton(2, 'Credits', 'Credits');
  }

  centerButton (gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(0, 0, config.width, config.height),
      0,
      offset * 100
    );
  }

  centerButtonText (gameText, gameButton) {
    Phaser.Display.Align.In.Center(gameText, gameButton);
  }
};

