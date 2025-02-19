import { albumsData } from "@/utils/static";

const gridGap = 0.005;
// const tileSize = clamp(0.8, 2.5, 0.25 * viewport.width + 0.8);
const tileSize = 2.5;
const tileSpace = tileSize + gridGap;
const gridSize = tileSpace * 3;
const totalGridSize = gridSize * 3;
const referenceSize = {
  width: 7,
  height: 3.5,
};

export type IAlbumData = (typeof albumsData)[0] | undefined;

export const initialAppState = {
  scrollDelta: {
    x: 0,
    y: 0,
  },

  tileConfig: {
    gridGap,
    tileSize,
    tileSpace,
    gridSize,
    totalGridSize,
    referenceSize,
  },

  selectedTileId: "",

  scaleFactorX: 1,
  scaleFactorY: 1,

  selectedScaleFactor: 1,
  albumData: undefined as IAlbumData,
};

export type AppState = ReturnType<() => typeof initialAppState>;
