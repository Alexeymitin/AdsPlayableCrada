import { Sprite, Ticker } from 'pixi.js';
import { getRandomSymbolName } from '../../helpers/getRandomSymbolName';
import { BaseContainer } from '../../shared/BaseContainer';

export class TargetSymbol extends BaseContainer {
  private _background: Sprite;
  private _symbol: Sprite;
  private _symbolName: string;
  private _speed: number = 2; // Скорость движения
  private _boundaryX: number = 800; // Граница, при достижении которой игра заканчивается

  constructor() {
    super();

    this._background = new Sprite(this.game.loader.getAsset('backgroundTargetSymbol'));
    this._background.anchor.set(0.5);

    this._symbol = new Sprite(this.game.loader.getAsset('symbols_atlas', 'star_blue'));
    this._symbol.anchor.set(0.5);
    this._symbol.scale.set(1.3);
    this._symbol.position.set(0, 270);

    this.scale.set(1.3);
    this.position.set(-200, 415);

    this.addChild(this._background);
    this.addChild(this._symbol);

    this.on('game:over', () => {
      this.game.popup.show();
    });
  }

  get targetSymbolName(): string {
    return this._symbolName;
  }

  setBoundaryX(boundaryX: number) {
    this._boundaryX = boundaryX;
  }

  getTarget(): Sprite {
    return this._symbol;
  }

  changeSymbol() {
    const symbolName = getRandomSymbolName();

    this._symbolName = symbolName;
    this._symbol.texture = this.game.loader.getAsset('symbols_atlas', symbolName);

    return this._symbolName;
  }

  start() {
    const ticker = new Ticker();
    ticker.add(() => {
      this.x += this._speed;
      this.game.background.update();
      if (this.x >= this._boundaryX) {
        this.emit('game:over');
        ticker.stop();
        ticker.destroy();
      }
    });
    ticker.start();
  }

  increaseSpeed(amount: number = 0.5): void {
    this._speed += amount;
  }

  decreaseSpeed(amount: number = 0.3): void {
    this._speed -= amount;
    if (this._speed < 0.4) {
      this._speed = 0.4;
    }
  }

  resize() {
    if (this.game.device.landscape || this.game.device.desktop) {
      this.pivot.set(0);
      this.position.set(this.x, 415);
    } else {
      this.pivot.set(0, 400);
      this.position.set(this.x, 733 + this.game.viewport.paddingY * 2);
    }
  }
}
