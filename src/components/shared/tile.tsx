import React, { useEffect, useRef, useState } from "react";
import { Image } from "@react-three/drei";
import { Group, Vector3 } from "three";
import { albumsData } from "@/utils/static";
import { useAppContext } from "@/state/context";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";

interface IProps {
  item: {
    pos: number[];
    id: number;
  };
  groupIndex: number;
  handleSreenResize: (vector3: Vector3) => void;
}

export function Tile(props: IProps) {
  const { item, groupIndex, handleSreenResize } = props;
  const { state } = useAppContext();
  const { viewport } = useThree();

  const [hovered, setHovered] = useState(false);

  const groupRef = useRef<Group | null>(null);
  // eslint-disable-next-line
  const ref = useRef<any>(null);
  const offsetY = useRef(0);

  const generalIndex = groupIndex * 9 + item.id;
  const dataIndex = generalIndex % albumsData.length;

  const data = albumsData[dataIndex];
  const indexModulus = item.id % 3;

  if (indexModulus === 0) {
    offsetY.current = state.tileConfig.tileSpace / 2.5;
  }
  if (indexModulus === 2) {
    offsetY.current = -state.tileConfig.tileSpace / 3.5;
  }

  const isActive = state.selectedTileId === generalIndex.toString();

  // eslint-disable-next-line
  const pointerOver = (e: any) => {
    e.stopPropagation();
    setHovered(true);
  };

  const pointerOut = () => {
    setHovered(false);
  };

  useFrame((_, delta) => {
    easing.damp(
      ref.current.material,
      "zoom",
      hovered && state.selectedTileId === "" ? 1.15 : 1,
      0.2,
      delta
    );

    easing.damp(
      ref.current.position,
      "z",
      isActive || state.selectedTileId === "" ? 0.2 : -0.1,
      0.2,
      delta
    );

    easing.damp3(
      ref.current.scale,
      isActive ? state.selectedScaleFactor : 1,
      0.2,
      delta
    );

    // if (isActive && groupRef.current) {
    //   const worldPosition = new Vector3();
    //   groupRef.current.getWorldPosition(worldPosition);

    //   handleSreenResize(worldPosition);
    // }
  });

  useEffect(() => {
    if (isActive && groupRef.current) {
      const worldPosition = new Vector3();
      groupRef.current.getWorldPosition(worldPosition);

      handleSreenResize(worldPosition);
    }

    // eslint-disable-next-line
  }, [viewport.width, viewport.height]);

  return (
    <group
      ref={groupRef}
      position={[item.pos[0], item.pos[1] + offsetY.current, 0]}
    >
      <mesh>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
          ref={ref}
          onPointerOver={pointerOver}
          onPointerOut={pointerOut}
          url={data?.cover}
          toneMapped
          userData={{ id: `${generalIndex}`, albumData: data }}
          scale={[
            state.selectedScaleFactor,
            state.selectedScaleFactor,
            state.selectedScaleFactor,
          ]}
        >
          <planeGeometry
            name="plane"
            args={[state.tileConfig.tileSize, state.tileConfig.tileSize]}
          ></planeGeometry>
        </Image>
      </mesh>
    </group>
  );
}
