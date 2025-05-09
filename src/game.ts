import { Application } from 'pixi.js';
import { Loader } from './Loader';
import { Symbol } from './components/Symbol';
declare global {
  var __PIXI_APP__: Application | undefined;
}

export class Game {
  public static current: Game;
  app!: Application;
  loader: Loader;
  symbol: Symbol;

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

    this.symbol = new Symbol('star_blue', 'symbols_atlas');
    this.app.stage.addChild(this.symbol);
  }
}
