import { Application } from 'pixi.js';
import { Loader } from './Loader';
import { PlayingField } from './components/PlayingField';
import { TargetSymbol } from './components/TargetSymbol';
declare global {
  var __PIXI_APP__: Application | undefined;
}

export class Game {
  public static current: Game;
  app!: Application;
  loader: Loader;
  playingField: PlayingField;
  targetSymbol: TargetSymbol;

  constructor() {
    if (Game.current) {
      throw new Error('Game is already initialized');
    }
    Game.current = this;

    this.loader = new Loader();
    this.loader.register();
  }

  async start() {
    await this.loader.loadAll();

    this.app = new Application();

    globalThis.__PIXI_APP__ = this.app;

    await this.app.init({ background: '#1099bb', resizeTo: window });

    document.body.appendChild(this.app.canvas);

    this.playingField = new PlayingField(6, 7);
    this.playingField.position.set(
      this.app.screen.width / 2 - this.playingField.width / 2,
      this.app.screen.height / 2 - this.playingField.height / 2
    );
    this.app.stage.addChild(this.playingField);

    this.targetSymbol = new TargetSymbol();
    this.targetSymbol.position.set(245, 422);
    this.targetSymbol.changeSymbol();

    this.playingField.targetPoint = { x: this.targetSymbol.x, y: this.targetSymbol.y };

    console.log(this.targetSymbol.x);
    this.app.stage.addChild(this.targetSymbol);
  }
}
