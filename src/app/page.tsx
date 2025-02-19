"use client";
import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Content, Experience } from "@/components/shared";
import { useAppContext } from "@/state/context";
import { setScrollDelta } from "@/state/reducer";

export default function Home() {
  const { dispatch, state } = useAppContext();
  // const [delta, setDelta] = useState({ x: 0, y: 0 });

  // console.log(delta);

  const isDown = useRef(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const velocity = useRef({ x: 0, y: 0 });

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (state.selectedTileId !== "") return;
    dispatch(setScrollDelta({ x: -e?.deltaX, y: e?.deltaY }));
    // setDelta({ });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDown.current = true;
    // this.scroll.position = {
    // 	x: this.scroll.current.x,
    // 	y: this.scroll.current.y
    // }
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDown.current) return;
    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;

    const distanceX = (touchStartX.current - x) * 3.5;
    const distanceY = (touchStartY.current - y) * 3;

    if (state.selectedTileId !== "") return;
    dispatch(setScrollDelta({ x: -distanceX, y: distanceY }));
    // setDelta({ x: -distanceX, y: distanceY });

    touchStartX.current = x;
    touchStartY.current = y;
  };

  const handleTouchEnd = () => {
    isDown.current = false;

    // Apply inertia
    const applyInertia = () => {
      if (
        !isDown.current &&
        (Math.abs(velocity.current.x) > 0.1 ||
          Math.abs(velocity.current.y) > 0.1)
      ) {
        if (state.selectedTileId !== "") return;
        dispatch(
          setScrollDelta({
            x: state.scrollDelta.x + velocity.current.x,
            y: state.scrollDelta.y + velocity.current.y,
          })
        );
        // setDelta((prevDelta) => ({
        //   x: prevDelta.x + velocity.current.x,
        //   y: prevDelta.y + velocity.current.y,
        // }));

        // Decelerate velocity
        velocity.current = {
          x: velocity.current.x * 1, // Inertia factor
          y: velocity.current.y * 1,
        };

        requestAnimationFrame(applyInertia);
      }
    };

    requestAnimationFrame(applyInertia);
  };

  useEffect(() => {
    document.addEventListener(
      "wheel",
      function (event) {
        if (event.deltaX !== 0) {
          event.preventDefault();
        }
      },
      { passive: false }
    );
    return () => {
      document.removeEventListener("wheel", function (event) {
        if (event.deltaX !== 0) {
          event.preventDefault();
        }
      });
    };
  }, []);

  return (
    <main
      className="app_grid_canvas"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Canvas camera={{ position: [0, 0, 2.5 * 1] }}>
        <color args={["#000"]} attach="background" />
        <Experience />
        <ambientLight color={0x404040} intensity={10} />
      </Canvas>

      {state.selectedTileId && <Content />}
    </main>
  );
}
