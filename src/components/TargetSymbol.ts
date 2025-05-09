import { Sprite } from 'pixi.js';
import { BaseContainer } from '../BaseContainer';
import { getRandomSymbolName } from '../helpers/getRandomSymbolName';

export class TargetSymbol extends BaseContainer {
  private background: Sprite;
  private symbol: Sprite;
  private symbolName: string;

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

  changeSymbol() {
    const symbolName = getRandomSymbolName();

    this.symbolName = symbolName;
    this.symbol.texture = this.game.loader.getAsset('symbols_atlas', symbolName);

    console.log(this.symbolName);
  }
}
