import { Point, Sprite, Ticker } from 'pixi.js';
import { BaseContainer } from '../BaseContainer';

export class Symbol extends BaseContainer {
  private symbol: Sprite;
  private background: Sprite;
  private symbolName: string;

  constructor(symbolName: string, atlasName: string) {
    super();

    this.symbolName = symbolName;

    this.background = new Sprite(this.game.loader.getAsset(atlasName, 'symbolBackground'));
    this.background.anchor.set(0.5);

    this.symbol = new Sprite(this.game.loader.getAsset(atlasName, symbolName));
    this.symbol.anchor.set(0.5);
    this.symbol.position.set(0, -10);

    this.addChild(this.background);
    this.addChild(this.symbol);

    this.enableInteraction();
  }

  getCurrentSymbolName(): string {
    return this.symbolName;
  }

  private enableInteraction(): void {
    this.interactive = true;
    this.cursor = 'pointer';

    this.on('pointerdown', this.onPress);
    this.on('pointerup', this.onRelease);
    this.on('pointerupoutside', this.onRelease);
  }

  private onPress = (): void => {
    this.animateScale(0.9);

    this.parent?.emit('symbol:press', this);
  };

  private onRelease = (): void => {
    this.animateScale(1);
  };

  private animateScale(targetScale: number, onComplete?: () => void): void {
    const duration = 200;
    const startScale = this.scale.x;
    const deltaScale = targetScale - startScale;
    const ticker = new Ticker();

    let elapsed = 0;
    ticker.add(() => {
      elapsed += ticker.deltaMS;
      const progress = Math.min(elapsed / duration, 1);
      this.scale.set(startScale + deltaScale * progress);

      if (progress === 1) {
        ticker.stop();
        ticker.destroy();
        if (onComplete) {
          onComplete();
        }
      }
    });

    ticker.start();
  }

  public animateSymbolToPoint(targetPoint: Point): void {
    // Преобразуем глобальную целевую точку в локальную систему координат символа
    const localTargetPoint = this.parent.toLocal(targetPoint);

    const copy = new Sprite(this.symbol.texture);
    copy.anchor.set(0.5);
    copy.position.set(this.symbol.x, this.symbol.y);
    this.addChild(copy);

    const controlPoint = new Point((this.symbol.x + localTargetPoint.x) / 2, this.symbol.y - 100);

    const duration = 500;
    const ticker = new Ticker();
    let elapsed = 0;

    ticker.add(() => {
      elapsed += ticker.deltaMS;
      const t = Math.min(elapsed / duration, 1);

      // Вычисляем позицию на кривой (квадратичная Безье)
      const x =
        (1 - t) * (1 - t) * this.symbol.x +
        2 * (1 - t) * t * controlPoint.x +
        t * t * localTargetPoint.x;
      const y =
        (1 - t) * (1 - t) * this.symbol.y +
        2 * (1 - t) * t * controlPoint.y +
        t * t * localTargetPoint.y;

      copy.position.set(x, y);

      if (t === 1) {
        ticker.stop();
        ticker.destroy();
        this.removeChild(copy);
      }
    });

    ticker.start();
  }
}
