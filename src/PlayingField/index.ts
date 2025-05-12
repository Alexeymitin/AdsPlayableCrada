import { BaseContainer } from '../shared/BaseContainer';
import { Field } from './components/Field';
import { TargetSymbol } from './components/TargetSymbol';

export class PlayingField extends BaseContainer {
  private _field: Field;
  private _targetSymbol: TargetSymbol;

  constructor() {
    super();

    this._targetSymbol = new TargetSymbol();
    this._targetSymbol.setBoundaryX(600);

    this._field = new Field(6, 6, this._targetSymbol);
    this._field.position.set(790, 200);

    this.addChild(this._field);
    this.addChild(this._targetSymbol);
  }

  getTargetSymbol(): TargetSymbol {
    return this._targetSymbol;
  }

  start() {
    this._targetSymbol.changeSymbol();
    this._field.setTargetSymbolName(this._targetSymbol.targetSymbolName);
    this._targetSymbol.start();
  }

  resize() {
    this._field.resize();
    this._targetSymbol.resize();
  }
}
