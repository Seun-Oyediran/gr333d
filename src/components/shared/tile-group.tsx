import React, { useRef } from "react";
import { Group, Vector3 } from "three";
import { useAppContext } from "@/state/context";
import { TILES } from "@/utils/static";
import { Tile } from "./tile";
import { useFrame } from "@react-three/fiber";
import { setAlbumData, setSelectedTileId } from "@/state/reducer";

interface IProps {
  pos: number[];
  groupIndex: number;
  handleTileGroupClick: (vector3: Vector3) => void;
  handleSreenResize: (vector3: Vector3) => void;
}

export function TileGroup(props: IProps) {
  const { pos, groupIndex, handleTileGroupClick, handleSreenResize } = props;

  const { dispatch, state } = useAppContext();
  const { tileConfig } = state;

  const tileGroupRef = useRef<Group | null>(null);
  const tilePosition = useRef(new Vector3(pos[0], pos[1], pos[2]))?.current;

  const gridSize = new Vector3(
    state.tileConfig.totalGridSize * 1,
    state.tileConfig.totalGridSize * 1,
    0
  );

  useFrame(() => {
    if (!tileGroupRef?.current) return;

    const worldPosition = new Vector3();
    tileGroupRef.current.getWorldPosition(worldPosition);

    // Check if the tile is off the screen
    // (gridSize.x * clamp(0.6, 1, viewport.width / 6)) / 2
    // (gridSize.y * clamp(0.6, 1, viewport.width / 4)) / 2;
    const gridSizeX = gridSize.x * state.scaleFactorX;
    const gridSizeY = gridSize.y * state.scaleFactorX;
    if (worldPosition.x < -gridSizeX / 2) {
      tilePosition.x += gridSize.x;
    } else if (worldPosition.x > gridSizeX / 2) {
      tilePosition.x -= gridSize.x;
    }

    if (worldPosition.y < -gridSizeY / 2) {
      tilePosition.y += gridSize.y;
    } else if (worldPosition.y > gridSizeY / 2) {
      tilePosition.y -= gridSize.y;
    }

    // Update the tile group's position
    tileGroupRef.current.position.copy(tilePosition);
  });

  return (
    <group
      ref={tileGroupRef}
      position={[pos[0], pos[1], pos[2]]}
      onClick={(e) => {
        const worldPosition = new Vector3();
        e.object.getWorldPosition(worldPosition);

        const isSameTile = state.selectedTileId === e?.object?.userData?.id;
        // if (isSameTile) {
        //   dispatch(setSelectedTileId(""));
        //   return;
        // }

        if (state.selectedTileId && !isSameTile) return;

        dispatch(setSelectedTileId(e?.object?.userData?.id));

        dispatch(setAlbumData(e?.object?.userData?.albumData));

        handleTileGroupClick(worldPosition);
      }}
    >
      {TILES(tileConfig.tileSpace).map((item) => {
        return (
          <Tile
            key={item?.id}
            item={item}
            groupIndex={groupIndex}
            handleSreenResize={handleSreenResize}
          />
        );
      })}
    </group>
  );
}
