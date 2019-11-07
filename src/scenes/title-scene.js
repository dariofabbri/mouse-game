import 'phaser';
import config from '../config/config';


export default class TitleScene extends Phaser.Scene {

  constructor () {
    super('Title');
  }

  addTitleButton(position, text, scene) {

    var button = this.add.sprite(0, 0, 'BlueButton').setInteractive();

    Phaser.Display.Align.In.Center(
      button,
      this.add.zone(config.width / 2, config.width / 2, config.width, config.height),
      0,
      -config.height / 2 + position * 100
    );

    var text = this.add.text(0, 0, text, { fontSize: '24px', fill: '#ffffff' });
    Phaser.Display.Align.In.Center(text, button);

    button.on('pointerdown', function (pointer) {
      this.scene.start(scene);
    }.bind(this));

    button.on('pointerover', () => {
      button.setTexture('BlueButtonHighlight');
    });

    button.on('pointerout', () => {
      button.setTexture('BlueButton');
    });
  }

  create () {
    this.addTitleButton(0, 'Play', 'Game');
    this.addTitleButton(1, 'Options', 'Options');
    this.addTitleButton(2, 'Credits', 'Credits');
  }
};
