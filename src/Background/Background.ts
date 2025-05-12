import { Graphics, Sprite } from 'pixi.js';
import { BaseContainer } from '../shared/BaseContainer';

export class Background extends BaseContainer {
  backgroundLight: Sprite;
  backgroundDark: Sprite;
  private _mask: Graphics;

  constructor() {
    super();

    this.backgroundLight = new Sprite(this.game.loader.getAsset('backgroundLight'));
    this.backgroundLight.anchor.set(0, 0.5);

    this.backgroundDark = new Sprite(this.game.loader.getAsset('backgroundDark'));
    this.backgroundDark.anchor.set(0, 0.5);
    this.addChild(this.backgroundDark);
    this.addChild(this.backgroundLight);

    this._mask = new Graphics();
    this.addChild(this._mask);
    this.backgroundLight.mask = this._mask;
  }

  update() {
    const targetX = this.game.targetSymbol.x;

    this._mask.clear();
    this._mask.beginFill(0xffffff);
    this._mask.drawRect(
      targetX + 260,
      0,
      this.game.viewport.width - targetX,
      this.game.viewport.height
    );
    this._mask.endFill();
  }

  resize(width: number, height: number) {
    if (this.game.device.landscape || this.game.device.desktop) {
      const scale = height / this.backgroundLight.texture.height;

      this.backgroundLight.anchor.set(0, 0.5);
      this.backgroundLight.scale.set(scale);
      this.backgroundLight.position.set(0, height / 2);

      this.backgroundDark.anchor.set(0, 0.5);
      this.backgroundDark.scale.set(scale);
      this.backgroundDark.position.set(0, height / 2);
    } else {
      this.backgroundLight.anchor.set(0);
      this.backgroundLight.scale.set(1.3);
      this.backgroundLight.position.set(0, 0);

      this.backgroundDark.anchor.set(0);
      this.backgroundDark.scale.set(1.3);
      this.backgroundDark.position.set(0, 0);
    }
  }
}
