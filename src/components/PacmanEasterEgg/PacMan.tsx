import styles from "../../styles/Pacman.module.css";
import React, { useRef } from "react";
import classNames from "clsx";
import pelletimg from "../../assets/pages/about/pellet.png";
import { MOBILE_PATH, DESKTOP_PATH, SPRITE_URL } from "./constants";
import { usePellets } from "./usePellets";
import { usePacmanAnimation } from "./usePacmanAnimation";

export interface Props {
  onPacmanClick?: () => void;
  isMobile: boolean;
}

const PacmanEasterEgg: React.FC<Props> = ({ onPacmanClick, isMobile }) => {
  const pacmanRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const { pellets, setPellets } = usePellets(pathRef, isMobile);

  usePacmanAnimation({
    pathRef,
    pacmanRef,
    isMobile,
    setPellets,
  });

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
          d={isMobile ? MOBILE_PATH : DESKTOP_PATH}
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
              className={classNames("invert-on-dark", styles.pellet)}
              style={{
                width: 12,
                height: 12,
                transform: (() => {
                  if (!pathRef.current) return "";

                  const svgPoint =
                    pathRef.current.ownerSVGElement?.createSVGPoint();

                  const screenCTM = pathRef.current.getScreenCTM();

                  if (!svgPoint || !screenCTM) return "";

                  svgPoint.x = pellet.position.x;
                  svgPoint.y = pellet.position.y;

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
        onClick={onPacmanClick}
        role="button"
        aria-label="Hidden Pac-Man"
        style={{
          backgroundImage: `url("${SPRITE_URL}")`,
        }}
      />
    </div>
  );
};

export default PacmanEasterEgg;
