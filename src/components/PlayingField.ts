import { BaseContainer } from '../BaseContainer';
import { getRandomSymbolName } from '../helpers/getRandomSymbolName';
import { Symbol } from './Symbol';

export class PlayingField extends BaseContainer {
  private rows: number;
  private columns: number;
  private symbols: Symbol[][];
  private selectedSymbols: Symbol[] = [];
  private targetSymbolName: string | null = null;

  constructor(rows: number = 6, columns: number = 7) {
    super();
    this.sortableChildren = true;
    this.rows = rows;
    this.columns = columns;
    this.symbols = [];

    this.createField();

    this.on('symbol:press', (symbol: Symbol) => {
      this.handleSymbolSelection(symbol);
    });
  }

  public setTargetSymbolName(name: string): void {
    this.targetSymbolName = name;
    this.clearSelection();
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

  private handleSymbolSelection(symbol: Symbol): void {
    if (!this.targetSymbolName) return;

    if (this.selectedSymbols.includes(symbol)) {
      this.selectedSymbols = this.selectedSymbols.filter((s) => s !== symbol);
      symbol.setSelected(false);
    } else {
      if (symbol.getCurrentSymbolName() === this.targetSymbolName) {
        this.selectedSymbols.push(symbol);
        symbol.setSelected(true);
      } else {
        this.clearSelection();
      }
    }

    if (this.selectedSymbols.length === 3) {
      this.moveSymbolsToTarget();
    }
  }

  private moveSymbolsToTarget(): void {
    this.selectedSymbols.forEach((symbol) => {
      symbol.animateToTarget(this.game.targetSymbol);
    });

    this.clearSelection();
  }

  private clearSelection(): void {
    this.selectedSymbols.forEach((symbol) => symbol.setSelected(false));
    this.selectedSymbols = [];
  }
}
