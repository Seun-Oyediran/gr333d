import { IAlbumData } from "./state";

export enum ActionType {
  SetScrollDelta,
  SetScaleFactorX,
  SetScaleFactorY,
  SetSelectedTileId,
  SetSelectedScaleFactor,
  SetAlbumData,
}

export interface SetScrollDelta {
  type: ActionType.SetScrollDelta;
  payload: { x: number; y: number };
}

export interface SetScaleFactorX {
  type: ActionType.SetScaleFactorX;
  payload: number;
}

export interface SetScaleFactorY {
  type: ActionType.SetScaleFactorY;
  payload: number;
}

export interface SetSelectedTileId {
  type: ActionType.SetSelectedTileId;
  payload: string;
}

export interface SetSelectedScaleFactor {
  type: ActionType.SetSelectedScaleFactor;
  payload: number;
}

export interface SetAlbumData {
  type: ActionType.SetAlbumData;
  payload: IAlbumData;
}

export type AppActions =
  | SetScrollDelta
  | SetScaleFactorX
  | SetScaleFactorY
  | SetSelectedTileId
  | SetSelectedScaleFactor
  | SetAlbumData;
