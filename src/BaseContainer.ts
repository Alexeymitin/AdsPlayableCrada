import { Container } from 'pixi.js';
import { Game } from './game';

export abstract class BaseContainer extends Container {
  /** Текущий экземпляр игры */
  protected game: Game;

  constructor() {
    super();
    if (!Game.current) {
      throw new Error('Game instance is not initialized yet');
    }
    this.game = Game.current;
  }
}
