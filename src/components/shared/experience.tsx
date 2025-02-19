import React, { Fragment, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Group } from "three";
import { easing } from "maath";
import { useAppContext } from "@/state/context";
import { TILE_GROUPS } from "@/utils/static";
import { TileGroup } from "./tile-group";
import { clamp, linearMap } from "@/utils";
import { setScaleFactorX, setSelectedScaleFactor } from "@/state/reducer";
import { AlbumDetails, Back } from "./html";

export function Experience() {
  const { dispatch, state } = useAppContext();

  const basePosition = useRef([0, 0]);
  const groupRef = useRef<Group | null>(null);

  const { viewport } = useThree();

  useFrame((_, delta) => {
    if (groupRef.current) {
      easing.damp3(
        groupRef?.current?.position,
        [basePosition?.current[0], basePosition?.current[1], 0],
        0.2,
        delta
      );

      easing.damp3(groupRef?.current?.scale, state.scaleFactorX, 0.05, delta);
    }
  });

  useEffect(() => {
    basePosition.current = [
      basePosition.current[0],
      basePosition.current[1] + state.scrollDelta.y * 0.005,
    ];
  }, [state.scrollDelta.y]);

  useEffect(() => {
    basePosition.current = [
      basePosition.current[0] + state.scrollDelta.x * 0.005,
      basePosition.current[1],
    ];
  }, [state.scrollDelta.x]);

  useEffect(() => {
    const scaleFactorX = clamp(
      0.5,
      1,
      viewport.width / state.tileConfig.referenceSize.width
    );

    const newSelectedScaleFactor = linearMap(
      1.25,
      2.5,
      0.9,
      0.6,
      scaleFactorX * state.tileConfig.tileSize
    );

    dispatch(setSelectedScaleFactor(newSelectedScaleFactor));
    dispatch(setScaleFactorX(scaleFactorX));
    // eslint-disable-next-line
  }, [viewport.width]);

  return (
    <Fragment>
      <group ref={groupRef}>
        {TILE_GROUPS(state.tileConfig.gridSize).map((item, index) => {
          return (
            <TileGroup
              key={index}
              pos={item.pos}
              groupIndex={index}
              handleTileGroupClick={(vec) => {
                if (!groupRef.current) return;
                const newX = groupRef?.current.position.x - vec.x;
                const newY = groupRef?.current.position.y - vec.y;

                basePosition.current = [newX, newY];
              }}
              handleSreenResize={(vec) => {
                if (!groupRef.current) return;
                const newX = groupRef?.current.position.x - vec.x;
                const newY = groupRef?.current.position.y - vec.y;

                basePosition.current = [newX, newY];
              }}
            />
          );
        })}
      </group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry
          args={[viewport.width * 1.2, viewport.height * 1.2, 0, 1]}
        />
        <meshPhysicalMaterial transmission={1} roughness={0.5} transparent />
      </mesh>

      <mesh position={[0, 0, 0.01]}>
        <boxGeometry
          args={[viewport.width * 1.2, viewport.height * 12, 0, 1]}
        />
        <meshBasicMaterial color={"#000"} opacity={0.5} transparent />
      </mesh>

      <Back />

      <AlbumDetails />
    </Fragment>
  );
}
