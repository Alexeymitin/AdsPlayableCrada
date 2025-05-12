import { backgroundAssets } from './background';
import { commonAssets } from './common';
import { popupAssets } from './popup';
import { atlasAssetsSymbols } from './symbols';

export const imageAssets = [...commonAssets, ...backgroundAssets, ...popupAssets];

export const atlasAssets = [...atlasAssetsSymbols];
