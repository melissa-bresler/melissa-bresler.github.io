import { useEffect, useState } from "react";
import { PELLET_COUNT } from "./constants";

export interface Pellet {
  id: number;
  lengthOnPath: number;
  position: { x: number; y: number };
  eaten: boolean;
}

export function usePellets(
  pathRef: React.RefObject<SVGPathElement | null>,
  isMobile: boolean,
) {
  const [pellets, setPellets] = useState<Pellet[]>([]);

  // Set pellets
  useEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const totalLength = path.getTotalLength();

    const newPellets: Pellet[] = [];

    for (let i = 0; i < PELLET_COUNT / 2; i++) {
      const lengthOnPath = (totalLength / PELLET_COUNT) * i;
      const point = path.getPointAtLength(lengthOnPath);

      newPellets.push({
        id: i,
        lengthOnPath,
        position: { x: point.x, y: point.y },
        eaten: false,
      });
    }

    setPellets(newPellets);
  }, [isMobile, pathRef]);

  return { pellets, setPellets };
}
