import { backgroundAssets } from './background';
import { commonAssets } from './common';
import { atlasAssetsSymbols } from './symbols';

export const imageAssets = [...commonAssets, ...backgroundAssets];

export const atlasAssets = [...atlasAssetsSymbols];
