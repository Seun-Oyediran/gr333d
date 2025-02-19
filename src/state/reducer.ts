import {
  ActionType,
  AppActions,
  SetAlbumData,
  SetScaleFactorX,
  SetScaleFactorY,
  SetScrollDelta,
  SetSelectedScaleFactor,
  SetSelectedTileId,
} from "./actions";
import { AppState, IAlbumData } from "./state";

export function appReducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case ActionType.SetScrollDelta:
      return { ...state, scrollDelta: { ...action.payload } };

    case ActionType.SetScaleFactorX:
      return { ...state, scaleFactorX: action.payload };

    case ActionType.SetScaleFactorY:
      return { ...state, scaleFactorY: action.payload };

    case ActionType.SetSelectedTileId:
      return { ...state, selectedTileId: action.payload };

    case ActionType.SetSelectedScaleFactor:
      return { ...state, selectedScaleFactor: action.payload };

    case ActionType.SetAlbumData:
      return { ...state, albumData: action.payload };

    default:
      return state;
  }
}

export const setScrollDelta = (
  data: AppState["scrollDelta"]
): SetScrollDelta => {
  return {
    type: ActionType.SetScrollDelta,
    payload: data,
  };
};

export const setScaleFactorX = (data: number): SetScaleFactorX => {
  return {
    type: ActionType.SetScaleFactorX,
    payload: data,
  };
};

export const setScaleFactorY = (data: number): SetScaleFactorY => {
  return {
    type: ActionType.SetScaleFactorY,
    payload: data,
  };
};

export const setSelectedTileId = (data: string): SetSelectedTileId => {
  return {
    type: ActionType.SetSelectedTileId,
    payload: data,
  };
};

export const setSelectedScaleFactor = (
  data: number
): SetSelectedScaleFactor => {
  return {
    type: ActionType.SetSelectedScaleFactor,
    payload: data,
  };
};

export const setAlbumData = (data: IAlbumData): SetAlbumData => {
  return {
    type: ActionType.SetAlbumData,
    payload: data,
  };
};
