import { Sprite } from 'pixi.js';
import { BaseContainer } from '../../shared/BaseContainer';

export class Button extends BaseContainer {
  private _background: Sprite;
  private _text: Sprite;

  constructor() {
    super();

    this.interactive = true;
    this.cursor = 'pointer';

    this._background = new Sprite(this.game.loader.getAsset('buttonBackground'));
    this._background.anchor.set(0.5);

    this._text = new Sprite(this.game.loader.getAsset('buttonText'));
    this._text.anchor.set(0.5);

    this.addChild(this._background);
    this.addChild(this._text);

    this.on('pointerdown', () => {
      window.open('https://play.google.com/store/apps/details?id=com.spyke.tilebusters', '_blank');
    });
  }
}
