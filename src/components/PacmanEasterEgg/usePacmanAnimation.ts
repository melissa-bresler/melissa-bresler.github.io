import { useEffect } from "react";
import { FRAME_INTERVAL, SPRITE_FRAME_COUNT } from "./constants";
import { calculateDistance, toScreenPoint } from "./utils";
import { Pellet } from "./usePellets";

interface Args {
  pathRef: React.RefObject<SVGPathElement | null>;
  pacmanRef: React.RefObject<HTMLDivElement | null>;
  isMobile: boolean;
  setPellets: React.Dispatch<React.SetStateAction<Pellet[]>>;
}

export function usePacmanAnimation({
  pathRef,
  pacmanRef,
  isMobile,
  setPellets,
}: Args) {
  // Pacman movement
  useEffect(() => {
    if (!pathRef.current || !pacmanRef.current) return;

    let progress = 0;
    let lastTimestamp: number | null = null;

    let frame = 0;
    let frameElapsed = 0;

    const speed = isMobile ? 300 : 100; // pixels per second

    const animate = (timestamp: number) => {
      if (!pathRef.current || !pacmanRef.current) {
        requestAnimationFrame(animate);
        return;
      }

      const path = pathRef.current;
      const pacman = pacmanRef.current;
      const totalLength = path.getTotalLength() / 2;

      if (lastTimestamp === null) lastTimestamp = timestamp;

      const delta = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      progress += speed * delta;

      //Reset pacman position and pellets
      if (progress > totalLength) {
        progress = 0;

        setPellets((p) => p.map((x) => ({ ...x, eaten: false })));
      }

      const point = path.getPointAtLength(progress);

      // Calculate angle for pacman to face
      const nextPoint = path.getPointAtLength(progress + 1);

      const dx = nextPoint.x - point.x;
      const dy = nextPoint.y - point.y;

      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      const screenPoint = toScreenPoint(path, point.x, point.y);
      if (!screenPoint) return requestAnimationFrame(animate);

      pacman.style.transform = `translate(${screenPoint.x - 24}px, ${
        screenPoint.y - 24
      }px) rotate(${angle}deg)`;

      frameElapsed += delta * 1000;

      if (frameElapsed >= FRAME_INTERVAL) {
        frameElapsed = 0;
        frame = (frame + 1) % SPRITE_FRAME_COUNT;
        pacman.style.backgroundPosition = `-${frame * 48}px 0`;
      }

      setPellets((old) =>
        old.map((pellet) => {
          if (pellet.eaten) return pellet;

          const pelletScreen = toScreenPoint(
            path,
            pellet.position.x,
            pellet.position.y,
          );

          if (!pelletScreen) return pellet;

          const distance = calculateDistance(screenPoint, pelletScreen);

          if (distance < 20) {
            return { ...pellet, eaten: true };
          }

          return pellet;
        }),
      );

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isMobile, pathRef, pacmanRef, setPellets]);
}
