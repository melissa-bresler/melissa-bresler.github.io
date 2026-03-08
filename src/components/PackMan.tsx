import styles from "../styles/Pacman.module.css";
import React, { useRef, useEffect, useState } from "react";
import pelletimg from "../assets/pages/about/pellet.png";
import clsx from "clsx";

interface Props {
  onPacmanClick?: () => void;
  darkMode: boolean;
}
interface Pellet {
  id: number;
  lengthOnPath: number;
  position: { x: number; y: number };
  eaten: boolean;
}

const PacmanEasterEgg: React.FC<Props> = ({ onPacmanClick, darkMode }) => {
  const pacmanRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const pelletCount = 20;
  const [pellets, setPellets] = useState<Pellet[]>([]);

  // Set pellets
  useEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const totalLength = path.getTotalLength();

    const pelletPositions: Pellet[] = [];
    for (let i = 0; i < pelletCount / 2; i++) {
      const lengthOnPath = (totalLength / pelletCount) * i;
      const point = path.getPointAtLength(lengthOnPath);
      pelletPositions.push({
        id: i,
        lengthOnPath,
        position: { x: point.x, y: point.y },
        eaten: false,
      });
    }

    setPellets(pelletPositions);
  }, [pelletCount]);

  // Pacman movement
  useEffect(() => {
    if (!pathRef.current || !pacmanRef.current) return;

    const path = pathRef.current;
    const pacman = pacmanRef.current;
    const totalLength = path.getTotalLength() / 2;

    let progress = 0;
    let lastTimestamp: number | null = null;

    const spriteFrameCount = 4;
    let frame = 0;
    const frameInterval = 150; // ms per frame
    let frameElapsed = 0;

    const speed = 100; // pixels per second

    const animate = (timestamp: number) => {
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const delta = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      progress += speed * delta;

      //Reset pacman position and pellets
      if (progress > totalLength) {
        progress = 0;

        setPellets((oldPellets) =>
          oldPellets.map((p) => ({ ...p, eaten: false })),
        );
      }

      const point = path.getPointAtLength(progress);

      // Calculate angle for pacman to face
      const nextPoint = path.getPointAtLength(progress + 1);
      const dx = nextPoint.x - point.x;
      const dy = nextPoint.y - point.y;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      const svgPoint = path.ownerSVGElement?.createSVGPoint();
      if (!svgPoint) return;

      svgPoint.x = point.x;
      svgPoint.y = point.y;

      const screenCTM = path.getScreenCTM();
      if (!screenCTM) return;

      const screenPoint = svgPoint.matrixTransform(screenCTM);

      pacman.style.transform = `translate(${screenPoint.x - 24}px, ${
        screenPoint.y - 24
      }px)  rotate(${angle}deg)`;

      frameElapsed += delta * 1000;
      if (frameElapsed >= frameInterval) {
        frameElapsed = 0;
        frame = (frame + 1) % spriteFrameCount;
        pacman.style.backgroundPosition = `-${frame * 48}px 0`;
      }

      setPellets((oldPellets) =>
        oldPellets.map((pellet) => {
          if (pellet.eaten) return pellet;

          svgPoint.x = pellet.position.x;
          svgPoint.y = pellet.position.y;
          const pelletScreenPoint = svgPoint.matrixTransform(screenCTM);

          const dx = screenPoint.x - pelletScreenPoint.x;
          const dy = screenPoint.y - pelletScreenPoint.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 20) {
            return { ...pellet, eaten: true };
          }
          return pellet;
        }),
      );
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  const spriteUrl = darkMode
    ? "/assets/pacman-coloured-sprite.png"
    : "/assets/pacman-sprite.png";

  return (
    <div className={styles.wrapper}>
      <svg
        className={styles.svg}
        viewBox="300 -650 950 450"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d="M926.24-167.44l.28 2.44h2.76 2.76l-.32-2.88c-.52-4.64-.36-21.28.2-25.72 1.6-12.12 4.6-22.56 8.92-31.2 6.68-13.36 13.44-22.52 25.28-34.28 9.68-9.68 19.12-16.92 32.36-24.96 6.64-4.04 19.44-10.12 34.52-16.36 18.44-7.64 35-16.16 48.2-24.76 5.36-3.52 13.32-10 18.36-15 7.8-7.68 12-13.44 28.76-39.12 11.92-18.36 24.12-31.56 40.28-43.72 10.36-7.76 17.8-12.08 27.6-16s14.36-5.2 30-8.36c14.08-2.84 19.24-3.36 33.2-3.4L1271-450.8l4.92 1.52c2.72.8 5.4 1.48 5.92 1.48.96 0 1-.08.88-2.68l-.12-2.72-4.6-1.4-4.6-1.4-14.2.04c-10.88 0-15.56.16-20 .68-6.8.84-25.6 4.56-32.68 6.52-11.48 3.12-24.28 8.84-33 14.64-22.44 15.04-37.6 30.96-53.52 56.24-14.4 22.8-21.36 31.24-34.6 41.88-12.08 9.72-31.8 20.52-56 30.6-15.76 6.56-27.72 12.28-34.8 16.52-6.08 3.64-15.56 10.12-19.8 13.48-8.64 6.88-18.2 16.48-25.16 25.2-6.4 8-13.36 19.84-16.8 28.52-2.96 7.4-5.12 17.04-6.24 27.48-.6 5.56-.8 22.24-.36 26.76Z"
          fill="none"
          stroke="transparent"
          strokeWidth="2"
        />
      </svg>

      {pellets.map(
        (pellet) =>
          !pellet.eaten && (
            <img
              key={pellet.id}
              src={pelletimg}
              alt="Pellet"
              className={clsx("invert-on-dark", styles.pellet)}
              style={{
                width: 12,
                height: 12,
                transform: (() => {
                  if (!pathRef.current) return "";
                  const svgPoint =
                    pathRef.current.ownerSVGElement?.createSVGPoint();
                  if (!svgPoint) return "";
                  svgPoint.x = pellet.position.x;
                  svgPoint.y = pellet.position.y;
                  const screenCTM = pathRef.current.getScreenCTM();
                  if (!screenCTM) return "";
                  const screenPoint = svgPoint.matrixTransform(screenCTM);
                  return `translate(${screenPoint.x - 6}px, ${
                    screenPoint.y - 6
                  }px)`; // center the image
                })(),
                transition: "opacity 0.3s ease",
              }}
            />
          ),
      )}

      <div
        ref={pacmanRef}
        className={styles.pacman}
        onClick={() => {
          if (onPacmanClick) onPacmanClick();
        }}
        role="button"
        aria-label="Hidden Pac-Man"
        style={{
          backgroundImage: `url("${spriteUrl}")`,
        }}
      />
    </div>
  );
};

export default PacmanEasterEgg;
