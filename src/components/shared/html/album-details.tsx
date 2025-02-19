import React from "react";
import { Html } from "@react-three/drei";
import { useAppContext } from "@/state/context";
import { Spotify } from "@/components/svgs/icon";

export function AlbumDetails() {
  const { state } = useAppContext();

  return (
    <group
      position={[
        0,
        -((state.tileConfig.tileSize * state.scaleFactorX) / 2 + 0.11) *
          state.selectedScaleFactor,
        0.2,
      ]}
    >
      <Html>
        {state.selectedTileId && (
          <div className="app_bottom_ctt">
            <div className="app_bottom_ctt__flex">
              <div className="app_album_details">
                <p className="app_album_details__artist">
                  {" "}
                  {state?.albumData?.artist}
                </p>

                <p className="app_album_details__album">
                  {state?.albumData?.album}
                </p>
              </div>

              <a href={state?.albumData?.link} target="_blank">
                <div className="app_album_link">
                  <Spotify />
                  <p className="app_album_link__text">LISTEN TO THE ALBUM</p>
                </div>
              </a>
            </div>
          </div>
        )}
      </Html>
    </group>
  );
}
