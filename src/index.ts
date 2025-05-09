import { Application } from 'pixi.js';

// Extend the globalThis type to include __PIXI_APP__
declare global {
  var __PIXI_APP__: Application | undefined;
}

(async () => {
  const app = new Application();

  globalThis.__PIXI_APP__ = app;

  await app.init({ background: '#1099bb', resizeTo: window });

  document.body.appendChild(app.canvas);
})();
