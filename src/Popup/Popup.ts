import { Graphics, Sprite } from 'pixi.js';
import { BaseContainer } from '../shared/BaseContainer';
import { Button } from './components/Button';

export class Popup extends BaseContainer {
  private _background: Graphics;
  private _button: Button;
  private _logo: Sprite;

  constructor(message: string) {
    super();

    this._background = new Graphics();
    this._background.interactive = true;

    this._button = new Button();
    this._button.position.set(960, 650);

    this._logo = new Sprite(this.game.loader.getAsset('logo'));
    this._logo.anchor.set(0.5);
    this._logo.position.set(960, 390);

    this.addChild(this._background);
    this.addChild(this._button);
    this.addChild(this._logo);

    this.visible = false;
  }

  show(): void {
    this.visible = true;
  }

  hide(): void {
    this.visible = false;
  }

  resize() {
    if (this.game.device.landscape || this.game.device.desktop) {
      this._background.beginFill(0x000000, 0.4);
      this._background.drawRect(0, 0, 1920, 1080);
      this._background.endFill();

      this._button.position.set(960, 650);
      this._logo.position.set(960, 390);
    } else {
      this._background.beginFill(0x000000, 0.4);
      this._background.drawRect(
        0,
        0,
        this.game.viewport.width + this.game.viewport.paddingX * 2,
        this.game.viewport.height + this.game.viewport.paddingY * 2
      );
      this._background.endFill();
      this._button.position.set(540, 1200);
      this._logo.position.set(540, 900);
    }
  }
}
