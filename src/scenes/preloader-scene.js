import 'phaser';
import blueButton from '../assets/blue-button.png';
import blueButtonHighlight from '../assets/blue-button-highlight.png';

export default class PreloaderScene extends Phaser.Scene {

  constructor () {
    super('Preloader');
  }

  preload () {

    // Add logo image.
    //
    this.add.image(400, 0, 'logo');


    // Display a progress bar.
    //
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    // Create "loading" text.
    //
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText =this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading....',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    // Create "percent" text".
    //
    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    // Create "asset" text.
    //
    var assetText =this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    // Update progress bar.
    //
    this.load.on('progress', (value) => {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle('0xffffff', 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    /// Update file progress text.
    //
    this.load.on('fileprogress', (file) => {
      assetText.setText(' Loading asset: ' + file.key);
    });

    // Remove progress bar when complete.
    //
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    }.bind(this));

    this.time.delayedCall(1000, this.ready, [], this);

    // Load assets needed in our game.
    //
    this.load.image('BlueButton', blueButton);
    this.load.image('BlueButtonHighlight', blueButtonHighlight);
  }

  init () {
    this.readyCount = 0;
  }

  ready () {
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }

  create () {
  }
};
