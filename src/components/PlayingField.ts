import { Point } from 'pixi.js';
import { BaseContainer } from '../BaseContainer';
import { getRandomSymbolName } from '../helpers/getRandomSymbolName';
import { Symbol } from './Symbol';

export class PlayingField extends BaseContainer {
  private rows: number;
  private columns: number;
  private symbols: Symbol[][];
  private point: Point | null = null;

  constructor(rows: number = 6, columns: number = 7) {
    super();
    this.rows = rows;
    this.columns = columns;
    this.symbols = [];

    this.createField();

    this.on('symbol:press', (symbol: Symbol) => {
      this.point && symbol.animateSymbolToPoint(this.point);
    });
  }

  get targetPoint(): Point | null {
    return this.point;
  }

  set targetPoint({ x, y }: { x: number; y: number }) {
    console.log('targetPoint', x, y);
    this.point = new Point(x, y);
  }

  private createField(): void {
    const symbolSize = 100;
    const padding = 0;

    for (let row = 0; row < this.rows; row++) {
      const rowSymbols: Symbol[] = [];

      for (let col = 0; col < this.columns; col++) {
        const symbolName = getRandomSymbolName();

        const symbol = new Symbol(symbolName, 'symbols_atlas');
        symbol.position.set(col * (symbolSize + padding), row * (symbolSize + padding));

        this.addChild(symbol);
        rowSymbols.push(symbol);
      }

      this.symbols.push(rowSymbols);
    }
  }
}
