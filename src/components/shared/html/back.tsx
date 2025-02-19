import React from "react";
import { Html } from "@react-three/drei";
import { useAppContext } from "@/state/context";
import { setSelectedTileId } from "@/state/reducer";

export function Back() {
  const { state, dispatch } = useAppContext();

  return (
    <group
      position={[
        0,
        ((state.tileConfig.tileSize * state.scaleFactorX) / 2 + 0.11) *
          state.selectedScaleFactor,
        0.2,
      ]}
    >
      <Html>
        {state.selectedTileId && (
          <div className="app_top_ctt">
            <button
              className="app_back_btn"
              onClick={() => {
                dispatch(setSelectedTileId(""));
              }}
            >
              Back
            </button>
          </div>
        )}
      </Html>
    </group>
  );
}
