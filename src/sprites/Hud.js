import properties from '../properties';

export default class Hud {
  constructor(scene, font, planeModel) {
    this.font = font;

    this.hudBackground = scene.add.image(0, 0, 'hudBackground')
      .setOrigin(0);
  }

  update(delta, planeModel) {

    const throttleValue = planeModel.throttle.value.toString().padStart(3, '0');
    this.font.render(1, 0, `throttle: ${throttleValue}%`);

    let sign = ' ';
    if (planeModel.stick.value > 0) {
      sign = '+';
    }
    else if (planeModel.stick.value < 0) {
      sign = '-';
    }
    const stickValue = Math.abs(planeModel.stick.value).toString().padStart(3, '0');
    this.font.render(1, 8, `stick:   ${sign}${stickValue}%`);

    const airspeed = Phaser.Math.RoundTo(planeModel.velocity.length(), 1).toString().padStart(5, '0');
    this.font.render(140, 0, `airspeed: ${airspeed}kn`);

    const altitude = Phaser.Math.RoundTo(planeModel.position.y, 2).toString().padStart(5, '0');
    this.font.render(140, 8, `altitude: ${altitude}ft`);
  }
}
