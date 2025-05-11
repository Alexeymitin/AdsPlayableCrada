export class Device {
  public readonly forceMobile: boolean;
  public readonly forceLandscape: boolean;
  private _ua: string;
  private _windowWidth = window.innerWidth;
  private _windowHeight = window.innerHeight;

  constructor(forceLandscape = false) {
    this.forceMobile = document.documentElement?.classList?.contains('layout-mobile') ?? false;
    this.forceLandscape = forceLandscape;
    this._ua = window.navigator.userAgent.toLowerCase();
  }

  match(key: string) {
    return this._ua.includes(key);
  }

  resize(width: number, height: number) {
    this._windowWidth = width;
    this._windowHeight = height;
  }

  get width() {
    return this._windowWidth;
  }

  get height() {
    return this._windowHeight;
  }

  get portrait() {
    return this.height / this.width > 1 && !this.forceLandscape;
  }

  get landscape() {
    return !this.portrait;
  }

  get android() {
    return this.match('android');
  }

  get mobile() {
    return this.match('iphone') || (this.android && this.match('mobile')) || this.forceMobile;
  }

  get desktop() {
    return !(this.mobile || window.navigator.maxTouchPoints > 1);
  }
}
