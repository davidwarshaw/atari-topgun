import 'phaser';

import properties from './properties';

import BootScene from './scenes/BootScene';
import TitleScene from './scenes/TitleScene';
import GameScene from './scenes/GameScene';
import WinScene from './scenes/WinScene';

console.log(Phaser);

const config = {
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'game-container',
    scale: {
      width: properties.width,
      height: properties.height,
      zoom: 3,
    },
    fps: {
      forceSetTimeOut: true,
      target: 15,
    },
    scene: [
        BootScene,
        TitleScene,
        GameScene,
        WinScene,
    ],
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
