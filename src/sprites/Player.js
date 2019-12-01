import properties from '../properties';

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, planeModel) {
    super(scene, Math.round(properties.width / 2), Math.round(properties.height / 2), 'f14');
    scene.add.existing(this);

    this.planeModel = planeModel;

    scene.input.keyboard.addCapture(properties.playerKeys);
    this.keys = scene.input.keyboard.addKeys(properties.playerKeys);
  }

  update(delta) {
    if (this.keys.up.isDown) {
      this.planeModel.increaseThrottle();
    }
    else if (this.keys.down.isDown) {
      this.planeModel.decreaseThrottle();
    }
    else if (this.keys.left.isDown) {
      this.planeModel.stickBack();
    }
    else if (this.keys.right.isDown) {
      this.planeModel.stickForward();
    }

    console.log('this.planeModel.screenFractionFromVelocity()');
    console.log(this.planeModel.screenFractionFromVelocity());
    this.setX(((properties.width - 200) * this.planeModel.screenFractionFromVelocity()) + 100);
    this.setY(((192 - 20) * this.planeModel.screenFractionFromPosition()) + 20);

    console.log(this.x);
    console.log(this.y);

    this.updateAnimation();
  }

  updateAnimation() {
    if (this.planeModel.stick.value > 30) {
      this.setFrame(2);
    }
    else if (this.planeModel.stick.value < -30) {
      this.setFrame(1);
    }
    else {
      this.setFrame(0);
    }
  }

}
