import { Application, Container, Graphics } from 'pixi.js';
import { Background } from './Background/Background';
import { Loader } from './Loader';

import { PlayingField } from './PlayingField';
import { TargetSymbol } from './PlayingField/components/TargetSymbol';
import { Popup } from './Popup/Popup';
import { Device } from './shared/Device';
import { Viewport } from './shared/Viewport';

declare global {
  var __PIXI_APP__: Application | undefined;
}

export class Game {
  public static current: Game;
  app!: Application;
  loader: Loader;
  background: Background;
  playingField: PlayingField;
  device: Device;
  rootNode: Container;
  viewport: Viewport;
  targetSymbol: TargetSymbol;
  popup: Popup;
  protected landscapeMask: Graphics;

  constructor() {
    if (Game.current) {
      throw new Error('Game is already initialized');
    }
    Game.current = this;

    this.loader = new Loader();
    this.loader.register();

    this.rootNode = new Container();
    this.device = new Device();
    this.viewport = new Viewport();

    window.addEventListener('resize', this.resize.bind(this));
  }

  async start() {
    await this.loader.loadAll();

    this.app = new Application();

    globalThis.__PIXI_APP__ = this.app;

    await this.app.init({ resizeTo: window });

    document.body.appendChild(this.app.canvas);

    this.app.stage.addChild(this.rootNode);

    this.createMask();

    this.background = new Background();

    this.playingField = new PlayingField();
    this.playingField.position.set(260, 102);

    this.popup = new Popup();

    this.targetSymbol = this.playingField.getTargetSymbol();

    this.rootNode.addChild(this.background);
    this.rootNode.addChild(this.playingField);
    this.rootNode.addChild(this.popup);

    this.playingField.start();

    this.resize();
  }

  createMask() {
    this.landscapeMask = new Graphics()
      .setStrokeStyle({ width: 1, color: 0x000000, alpha: 1 })
      .rect(0, 0, 1920, 1080)
      .fill({ color: 0x000000, alpha: 1 });

    this.rootNode.addChild(this.landscapeMask);
  }

  resize() {
    this.device.resize(window.innerWidth, window.innerHeight);

    if (this.device.desktop || this.device.landscape) {
      this.app.renderer.resize(this.device.width, this.device.height);
      this.viewport.resize(1920, 1080);

      this.rootNode.scale.set(this.viewport.aspectRatio);
      this.rootNode.pivot.set(this.viewport.width / 2, this.viewport.height / 2);
      this.rootNode.position.set(this.device.width / 2, this.device.height / 2);
      this.rootNode.mask = this.landscapeMask;
    } else {
      this.app.renderer.resize(this.device.width, this.device.height);
      this.viewport.resize(1080, 1920);

      this.rootNode.scale.set(this.viewport.aspectRatio);
      this.rootNode.pivot.set(this.viewport.width / 2, 0);
      this.rootNode.position.set(this.device.width / 2, 0);
      this.rootNode.mask = null;
    }

    this.background.resize(this.viewport.width, this.viewport.height);
    this.playingField.resize();
    this.popup.resize();
    this.app.renderer.render(this.rootNode);
  }
}
