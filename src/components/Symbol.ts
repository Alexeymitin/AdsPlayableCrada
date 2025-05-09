import { Sprite } from 'pixi.js';
import { BaseContainer } from '../BaseContainer';

export class Symbol extends BaseContainer {
  symbol: Sprite;

  constructor(symbolName: string, atlasName: string) {
    super();

    const texture = this.game.loader.getAsset(atlasName, symbolName);

    this.symbol = new Sprite(texture);
    this.addChild(this.symbol);
  }
}
