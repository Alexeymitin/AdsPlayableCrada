import { Point, Sprite, Ticker } from 'pixi.js';
import { BaseContainer } from '../BaseContainer';
import { getAngle } from '../helpers/getAngle';
import { getDistance } from '../helpers/getDistance';
import { TargetSymbol } from './TargetSymbol';

export class Symbol extends BaseContainer {
  private symbol: Sprite;
  private background: Sprite;
  private symbolName: string;
  private isSelected: boolean = false;

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

  setSelected(selected: boolean): void {
    this.isSelected = selected;
    this.alpha = selected ? 0.7 : 1;
    this.background.tint = selected ? 0xffff00 : 0xffffff;
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

  public animateToTarget(targetSymbol: TargetSymbol): void {
    const copiedSymbol = new Sprite(this.symbol.texture);
    copiedSymbol.anchor.set(0.5);
    copiedSymbol.position.set(this.symbol.x, this.symbol.y);
    copiedSymbol.zIndex = 1000;
    this.addChild(copiedSymbol);

    let elapsed = 0;
    const duration = 1000;
    const ticker = new Ticker();

    const start = new Point(copiedSymbol.x, copiedSymbol.y);

    ticker.add(() => {
      elapsed += ticker.deltaMS;
      const t = Math.min(elapsed / duration, 1);

      const globalTargetPos = targetSymbol.getTarget().getGlobalPosition();
      const end = this.toLocal(globalTargetPos, targetSymbol.parent);
      const angle = getAngle(end, start);
      const distance = getDistance(start.x, start.y, end.x, end.y);
      const control = new Point(
        start.x + Math.cos(angle) * (distance / 2),
        start.y + Math.sin(angle) * (distance / 2) - 100
      );

      // Пересчёт позиции на кривой Безье
      const x = (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * control.x + t * t * end.x;
      const y = (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * control.y + t * t * end.y;

      copiedSymbol.position.set(x, y);

      if (t >= 1) {
        ticker.stop();
        ticker.destroy();
        this.removeChild(copiedSymbol);
      }
    });

    ticker.start();
  }
}
