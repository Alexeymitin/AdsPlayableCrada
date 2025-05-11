import { EventEmitter } from 'pixi.js';

export class Viewport extends EventEmitter {
  public width!: number;
  public height!: number;
  public aspectRatio!: number;
  public propAspectRatio!: number;
  public paddingX!: number;
  public paddingY!: number;

  resize(width: number, height: number, innerWidth?: number, innerHeight?: number) {
    this.width = width;
    this.height = height;

    const mw = innerWidth ?? window.innerWidth;
    const mh = innerHeight ?? window.innerHeight;

    this.aspectRatio = parseFloat(Math.min(mw / width, mh / height).toFixed(3));

    this.paddingX = Math.max(
      Math.round((mw / 2 - (this.width / 2) * this.aspectRatio) / this.aspectRatio),
      0
    );
    this.paddingY = Math.max(
      Math.round((mh / 2 - (this.height / 2) * this.aspectRatio) / this.aspectRatio),
      0
    );

    this.propAspectRatio = parseFloat(
      Math.max(
        (this.paddingX * 2 + this.width) / this.width,
        (this.paddingY * 2 + this.height) / this.height
      ).toFixed(3)
    );
  }
}
