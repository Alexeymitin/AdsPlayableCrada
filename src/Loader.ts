import { Assets, Texture } from 'pixi.js';
import { atlasAssets, imageAssets } from './assets';

export class Loader {
  private textures: Record<string, Texture> = {};

  public register(): void {
    imageAssets.forEach(({ name, url }) => {
      Assets.add({ alias: name, src: url });
    });
    atlasAssets.forEach(({ name, url }) => {
      Assets.add({ alias: name, src: url });
    });
  }

  public async loadAll(): Promise<void> {
    try {
      const imageNames = imageAssets.map((a) => a.name);
      const atlasNames = atlasAssets.map((a) => a.name);

      const loadedImages = await Assets.load(imageNames);
      imageNames.forEach((name) => {
        const tex = Assets.get(name) as Texture;
        if (!tex) throw new Error(`Texture not loaded: ${name}`);
        this.textures[name] = tex;
      });

      const loadedAtlases = await Promise.all(atlasNames.map((name) => Assets.load(name)));
      atlasNames.forEach((name) => {
        const pack = Assets.get(name);

        if (!pack || !pack.textures) {
          throw new Error(`Atlas not loaded or invalid: ${name}`);
        }

        Object.entries(pack.textures).forEach(([frameName, texture]) => {
          this.textures[frameName] = texture as Texture;
        });
      });
    } catch (error) {
      console.error('Error loading assets:', error);
      throw error;
    }
  }

  public getAsset(textureName: string): Texture;
  public getAsset(atlasName: string, textureName: string): Texture;
  public getAsset(assetName: string, textureName?: string): Texture {
    const key = textureName ?? assetName;
    const texture = this.textures[key];
    if (!texture) {
      throw new Error(`Texture not found: ${key}`);
    }
    return texture;
  }
}
