
class BootScene extends Phaser.Scene {

  constructor(test) {
    super({
      key: 'BootScene',
    });
  }

  preload() {
    this.load.image('atariLike', 'assets/fonts/atari_like.png');
    this.load.image('title', 'assets/images/title.png');
    this.load.image('hudBackground', 'assets/images/hud_background.png');
    this.load.image('sky', 'assets/images/sky.png');
    this.load.image('cloud', 'assets/images/cloud.png');
    this.load.image('carrier', 'assets/images/carrier.png');
    this.load.image('sea', 'assets/images/sea.png');
    this.load.spritesheet('f14', 'assets/images/f14.png',
      { frameWidth: 16, frameHeight: 8 });
  }

  create() {
    this.scene.start('TitleScene');
  }
}

export default BootScene;
