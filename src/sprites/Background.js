import properties from '../properties';

export default class Background {
  constructor(scene) {

    const seaLevel = 200 - 8;
    this.cloudBuffer = 10;
    this.cloudsConfig = [
      { width: 96, height: 3, x: -10, y: 18, speed: -0.0001 },
      { width: 48, height: 2, x: 10, y: 30, speed: -0.0005 },
      { width: 32, height: 1, x: 20, y: 42, speed: -0.0010 },
    ];

    this.carrierConfig = { width: 8, height: 2, x: 50, y: 180, speed: -0.0001, buffer: 200 };

    this.sky = scene.add.image(0, 0, 'sky')
      .setOrigin(0);

    this.clouds = this.cloudsConfig.map(cloudConfig =>
      scene.add.image(cloudConfig.x, cloudConfig.y, 'cloud')
        .setScale(cloudConfig.width, cloudConfig.height)
        .setOrigin(0));

    this.sea = scene.add.image(0, seaLevel, 'sea')
      .setOrigin(0);

    this.carrier = scene.add.image(this.carrierConfig.x, this.carrierConfig.y, 'carrier')
      .setScale(this.carrierConfig.width, this.carrierConfig.height)
      .setOrigin(0);
  }

  update(delta, planeModel, player) {
    const { velocity } = planeModel;
    this.clouds.forEach((cloud, i) => {
      cloud.setX(cloud.x + (delta * velocity.x * this.cloudsConfig[i].speed));
      if (cloud.getTopRight().x + this.cloudBuffer < 0) {
        cloud.setX(properties.width + this.cloudBuffer + this.cloudsConfig[i].x);
      }
    });

    this.carrier.setX(this.carrier.x + (delta * velocity.x * this.carrierConfig.speed));
    if (this.carrier.getTopRight().x + this.carrierConfig.buffer < 0) {
      this.carrier.setX(properties.width + this.carrierConfig.buffer + this.carrierConfig.x);
    }

    planeModel.setIsOverCarrier(
      this.carrier.x <= player.x && this.carrier.getTopRight().x >= player.getTopRight().x);
  }

}
