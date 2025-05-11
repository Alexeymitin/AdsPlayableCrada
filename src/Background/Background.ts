import { Sprite } from 'pixi.js';
import { BaseContainer } from '../shared/BaseContainer';

export class Background extends BaseContainer {
  backgroundLight: Sprite;
  backgroundDark: Sprite;

  constructor() {
    super();

    this.backgroundLight = new Sprite(this.game.loader.getAsset('backgroundLight'));
    this.backgroundLight.anchor.set(0, 0.5);

    this.addChild(this.backgroundLight);

    // this.backgroundDark = new Sprite(this.game.loader.getAsset('backgroundDark'));
    // this.backgroundDark.anchor.set(0.5);

    // this.addChild(this.backgroundDark);
  }

  resize(width: number, height: number) {
    const targetWidth = (2 / 3) * width;
    const scaleLight = targetWidth / this.backgroundLight.texture.width;

    this.backgroundLight.scale.set(scaleLight);
    this.backgroundLight.height = height;
    this.backgroundLight.position.set(0, height / 2);
  }
}
