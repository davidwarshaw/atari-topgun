import properties from '../properties';

import PlaneModel from '../sprites/PlaneModel';
import Font from '../sprites/Font';
import Hud from '../sprites/Hud';
import Background from '../sprites/Background';
import Player from '../sprites/Player';

class GameScene extends Phaser.Scene {

  constructor(test) {
    super({
      key: 'GameScene'
    });
  }

  preload() {
  }

  create() {
    const f14Model = {
      maxLift: 1000,
      dragCoefficient: 0.160,
      thrustCoefficient: 1000000.0,
      wingArea: 6082, // m^2
      mass: 18191, // kg
    }
    this.playerPlaneModel = new PlaneModel(f14Model);

    this.font = new Font(this);

    this.background = new Background(this);

    this.hud = new Hud(this, this.font, this.playerPlaneModel);

    this.player = new Player(this, this.playerPlaneModel);
  }

  update(time, delta) {
    this.player.update(delta);
    this.playerPlaneModel.update(delta);
    this.hud.update(delta, this.playerPlaneModel);
    this.background.update(delta, this.playerPlaneModel);
  }

}

export default GameScene;
