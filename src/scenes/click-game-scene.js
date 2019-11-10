import 'phaser';
import config from '../config/config';


export default class GameScene extends Phaser.Scene {

  constructor () {
    super('ClickGame');
  }

  preload () {
  }

  create () {

    this.score = 0;
    this.hit = 0;
    this.miss = 0;
    this.rounds = 0;

    this.scoreText = this.add.text(20, 20, '0', { 
      fontFamily: 'Righteous', 
      fontSize: '50px', 
      fill: '#0000ff',
      stroke: '#4dd0e1',
      strokeThickness: 4
    });

    this.hitText = this.add.text(200, 20, '0', { 
      fontFamily: 'Righteous', 
      fontSize: '50px', 
      fill: '#47d44e', 
      stroke: '#a9ffad',
      strokeThickness: 4
    });

    this.missText = this.add.text(300, 20, '0', { 
      fontFamily: 'Righteous', 
      fontSize: '50px', 
      fill: '#e41717',
      stroke: '#ec685e',
      strokeThickness: 4
    });

    this.countdownText = this.add.text(config.width - 100, 20, '', {
      fontFamily: 'Righteous',
      fontSize: '50px',
      fill: '#0000ff',
      fixedWidth: 80,
      align: 'right',
      stroke: '#4dd0e1',
      strokeThickness: 4
    });

    this.input.on('pointerdown', function (pointer) {

      if (!this.currentTarget || !this.currentTarget.active) {
        return;
      }

      // Check if pointer is within sprite boundaries.
      //
      var bounds = this.currentTarget.getBounds();
      if (bounds.contains(pointer.downX, pointer.downY)) {

        // Calculate distance and percentage of applicable score.
        //
        var distance = Phaser.Math.Distance.Between(pointer.downX, pointer.downY, bounds.centerX, bounds.centerY);
        var perc = (bounds.height / 2 - distance) / (bounds.height / 2)
        if (perc < 0) {
          perc = 0;
        }

        // Update score applying calculated percentage.
        //
        this.score += Math.round(this.countdown * perc);
        this.scoreText.text = this.score;
        this.hit += 1;
        this.hitText.text = this.hit;
      } else {
        this.miss += 1;
        this.missText.text = this.miss;
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

    this.rounds += 1;
    if (this.rounds > config.maxRounds) {
      this.gameOver();
      return;
    }

    this.startRoundTimer = this.time.addEvent({
      delay: 1000,
      callback: this.onStartRound,
      callbackScope: this
    });
  }

  gameOver () {

    // Remove the info texts.
    //
    this.scoreText.destroy();
    this.hitText.destroy();
    this.missText.destroy();
    this.countdownText.destroy();

    // Display game over.
    //
    var gameoverText = this.add.text(0, config.height / 2 - 50, 'GAME OVER', {
      fontFamily: 'Righteous',
      fontSize: '100px',
      fixedWidth: config.width,
      align: 'center',
      shadow: {
        offsetX: 4,
        offsetY: 4,
        color: '#ff9800',
        blur: 4,
        stroke: false,
        fill: true
      }
    });
    var bounds = gameoverText.getBounds();
    var gradient = gameoverText.context.createLinearGradient(0, 0, 0, bounds.height);
    gradient.addColorStop(0, '#ff5722');
    gradient.addColorStop(1, '#ff9800');
    gameoverText.setFill(gradient);


    // Display final score.
    //
    var finalScoreText = this.add.text(0, config.height / 2 + 80, this.score, {
      fontFamily: 'Righteous',
      fontSize: '100px',
      fixedWidth: config.width,
      align: 'center',
      shadow: {
        offsetX: 4,
        offsetY: 4,
        color: '#8d8dca',
        blur: 4,
        stroke: false,
        fill: true
      }
    });
    bounds = finalScoreText.getBounds();
    gradient = finalScoreText.context.createLinearGradient(0, 0, 0, bounds.height);
    gradient.addColorStop(0, '#0000cc');
    gradient.addColorStop(1, '#8d8dca');
    finalScoreText.setFill(gradient);

    this.time.addEvent({
      delay: 5000,
      callback: () => { this.scene.start('Title') },
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
    this.currentTarget = this.add.image(xTarget, yTarget, 'Target');

    // Start countdown for hitting the target.
    //
    this.countdown = config.countdown;
    this.countdownTick();
  }

  countdownTick () {
    this.countdownTimer = this.time.addEvent({
      delay: config.tick,
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
