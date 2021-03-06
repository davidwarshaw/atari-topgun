import properties from '../properties';

import Font from '../sprites/Font';

export default class TitleScene extends Phaser.Scene {

  constructor(test) {
    super({
      key: 'TitleScene'
    });
  }

  create() {
    this.font = new Font(this);
    this.font.render(120, 120, 'atari 5200');
    this.font.render(70, 150, '(just taking off and\nlanding on the carrier)');

    this.sky = this.add.image(properties.width / 2, 90, 'title')
      .setScale(2, 1);
    this.input.keyboard.addCapture(properties.playerKeys);
    this.keys = this.input.keyboard.addKeys(properties.playerKeys);
  }

  update(time, delta) {
    if (this.keys.up.isDown || this.keys.down.isDown || this.keys.left.isDown || this.keys.right.isDown) {
      this.scene.start('GameScene');
    }
  }
}
