import { getRandomSymbolName } from '../../helpers/getRandomSymbolName';
import { BaseContainer } from '../../shared/BaseContainer';
import { Symbol } from './Symbol';
import { TargetSymbol } from './TargetSymbol';

export class Field extends BaseContainer {
  private _rows: number;
  private _columns: number;
  private _symbols: Symbol[][];
  private _selectedSymbols: Symbol[] = [];
  private _targetSymbolName: string | null = null;
  private _targetSymbol: TargetSymbol;

  constructor(rows: number = 6, columns: number = 7, targetSymbol: TargetSymbol) {
    super();
    this.sortableChildren = true;
    this._rows = rows;
    this._columns = columns;
    this._symbols = [];

    this._targetSymbol = targetSymbol;

    this.createField();

    this.pivot.set(650, 240);
    this.scale.set(1.75);

    this.on('symbol:press', (symbol: Symbol) => {
      this.handleSymbolSelection(symbol);
    });
  }

  public setTargetSymbolName(name: string): void {
    this._targetSymbolName = name;
    this.clearSelection();
  }

  private createField(): void {
    const symbolSize = 100;
    const padding = 0;

    for (let row = 0; row < this._rows; row++) {
      const rowSymbols: Symbol[] = [];

      for (let col = 0; col < this._columns; col++) {
        const symbolName = getRandomSymbolName();

        const symbol = new Symbol(symbolName, 'symbols_atlas');
        symbol.position.set(col * (symbolSize + padding), row * (symbolSize + padding));

        this.addChild(symbol);
        rowSymbols.push(symbol);
      }

      this._symbols.push(rowSymbols);
    }
  }

  private handleSymbolSelection(symbol: Symbol): void {
    if (!this._targetSymbolName) return;

    if (this._selectedSymbols.includes(symbol)) {
      this._selectedSymbols = this._selectedSymbols.filter((s) => s !== symbol);
      symbol.setSelected(false);
    } else {
      if (symbol.getCurrentSymbolName() === this._targetSymbolName) {
        this._selectedSymbols.push(symbol);
        symbol.setSelected(true);
      } else {
        this.clearSelection();
      }
    }

    if (this._selectedSymbols.length === 3) {
      this.moveSymbolsToTarget();
    }
  }

  private moveSymbolsToTarget(): void {
    this._selectedSymbols.forEach((symbol) => {
      symbol.animateToTarget(this._targetSymbol);
    });

    this.clearSelection();
  }

  private clearSelection(): void {
    this._selectedSymbols.forEach((symbol) => symbol.setSelected(false));
    this._selectedSymbols = [];
  }

  resize() {
    if (this.game.device.landscape) {
      this.position.set(1645, 415);
    }
  }
}
