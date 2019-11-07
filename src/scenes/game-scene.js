import 'phaser';
import config from '../config/config';


export default class GameScene extends Phaser.Scene {

  constructor () {
    super('Game');
  }

  preload () {
  }

  create () {

    this.score = 0;
    
    this.scoreText = this.add.text(20, 20, '0', { fontSize: '30px', fill: '#0000ff' });
    this.countdownText = this.add.text(config.width - 100, 20, '', {
      fontSize: '30px',
      fill: '#0000ff',
      fixedWidth: 80,
      align: 'right'
    });

    this.input.on('pointerdown', function (pointer) {
      
      if (!this.currentTarget || !this.currentTarget.active) {
        return;
      }

      if (this.currentTarget.getBounds().contains(pointer.downX, pointer.downY)) {
        this.score += this.countdown;
        this.scoreText.text = this.score;
      }

      this.startRound();

    }.bind(this));
    
    this.startRound();
  }

  startRound () {

    if (this.startRoundTimer) {
      this.startRoundTimer.destroy();
    }

    if (this.countdownTimer) {
      this.countdownTimer.destroy();
    }

    if (this.currentTarget) {
      this.currentTarget.destroy();
    }

    this.startRoundTimer = this.time.addEvent({ 
      delay: 1000, 
      callback: this.onStartRound, 
      callbackScope: this
    });
  }

  onStartRound () {

    // Calculate random coordinates for target.
    //
    var xTarget = Phaser.Math.RND.between(config.margin, config.width - config.margin);
    var yTarget = Phaser.Math.RND.between(config.margin, config.height - config.margin);

    // Add the target to the scene.
    //
    this.currentTarget = this.add.image(xTarget, yTarget, 'target');

    // Start countdown for hitting the target.
    //
    this.countdown = config.countdown;
    this.countdownTick();
  }

  countdownTick () {
    this.countdownTimer = this.time.addEvent({
      delay: 100,
      callback: this.onCountdownTick,
      callbackScope: this
    });
  }

  onCountdownTick () {
    this.countdown -= 1;
    this.countdownText.text = this.countdown;
    if (this.countdown <= 0) {
      this.startRound();
    } else {
      this.countdownTick();
    }
  }
};
