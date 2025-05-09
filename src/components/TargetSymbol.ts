import { Sprite, Ticker } from 'pixi.js';
import { BaseContainer } from '../BaseContainer';
import { getRandomSymbolName } from '../helpers/getRandomSymbolName';

export class TargetSymbol extends BaseContainer {
  private background: Sprite;
  private symbol: Sprite;
  private symbolName: string;
  private speed: number = 0.2; // Скорость движения
  private boundaryX: number = 800; // Граница, при достижении которой игра заканчивается

  constructor() {
    super();

    this.background = new Sprite(this.game.loader.getAsset('backgroundTargetSymbol'));
    this.background.anchor.set(0.5);

    this.symbol = new Sprite(this.game.loader.getAsset('symbols_atlas', 'star_blue'));
    this.symbol.anchor.set(0.5);
    this.symbol.scale.set(1.3);
    this.symbol.position.set(0, 270);

    this.addChild(this.background);
    this.addChild(this.symbol);
  }

  get targetSymbolName(): string {
    return this.symbolName;
  }

  getTarget(): Sprite {
    return this.symbol;
  }

  changeSymbol() {
    const symbolName = getRandomSymbolName();

    this.symbolName = symbolName;
    this.symbol.texture = this.game.loader.getAsset('symbols_atlas', symbolName);
  }

  start() {
    const ticker = new Ticker();
    ticker.add(() => {
      this.x += this.speed;
      if (this.x >= this.boundaryX) {
        console.log('Game Over');
        ticker.stop();
        ticker.destroy();
      }
    });
    ticker.start();
  }
}
