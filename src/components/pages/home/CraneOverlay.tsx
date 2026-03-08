import React, { useEffect, useRef, useState } from "react";
import styles from "../../../styles/CraneOverlay.module.css";
import { useIsMobile } from "../../../hooks/UseIsMobile";

const CraneOverlay: React.FC = () => {
  const isMobile = useIsMobile();
  const [xPosition, setXPosition] = useState(0);
  const [clawFrame, setClawFrame] = useState(0);
  const [isDropping, setIsDropping] = useState(false);

  const moveDirection = useRef<null | "left" | "right">(null);
  const animationFrameId = useRef<number | null>(null);

  const speed = 2;
  const frameWidth = 100;

  const move = () => {
    setXPosition((prevX) => {
      const newX =
        moveDirection.current === "left"
          ? Math.max(prevX - speed, 0)
          : Math.min(prevX + speed, window.innerWidth - frameWidth);
      return newX;
    });
    animationFrameId.current = requestAnimationFrame(move);
  };

  const handleMouseDown = (direction: "left" | "right") => {
    moveDirection.current = direction;
    if (!animationFrameId.current) move();
  };

  const handleMouseUp = () => {
    moveDirection.current = null;
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  };

  const handleDrop = () => {
    if (isDropping) return;
    setIsDropping(true);

    const frames = [0, 1, 2, 3, 0]; // open → closing → closed → opening → open
    let i = 0;

    const animateClaw = () => {
      setClawFrame(frames[i]);
      i++;
      if (i < frames.length) {
        setTimeout(animateClaw, 400);
      }
    };

    animateClaw();
    setTimeout(() => setIsDropping(false), 2000);
  };

  const handleReset = () => {
    const animateBack = () => {
      setXPosition((prev) => {
        if (prev <= 0) {
          cancelAnimationFrame(animationFrameId.current!);
          animationFrameId.current = null;
          return 0;
        }
        return prev - 5;
      });
      animationFrameId.current = requestAnimationFrame(animateBack);
    };
    if (animationFrameId.current)
      cancelAnimationFrame(animationFrameId.current);
    animationFrameId.current = requestAnimationFrame(animateBack);
  };

  useEffect(() => {
    return () => {
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <div className={styles.craneContainer}>
      <div
        className={styles.craneWrapper}
        style={{ transform: `translateX(${xPosition}px)` }}
      >
        <div
          className={`${styles.crane} ${isDropping ? styles.drop : ""}`}
          style={{
            backgroundImage: `url("/assets/claw-sprite.png")`,
            // Used https://www.piskelapp.com/ to edit sprite
            backgroundPosition: `-${clawFrame * frameWidth}px 0px`,
          }}
        />
      </div>

      {!isMobile && (
        <div className={styles.controls}>
          <button
            onMouseDown={() => handleMouseDown("left")}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            ←
          </button>
          <button onClick={handleDrop}>Drop</button>
          <button
            onMouseDown={() => handleMouseDown("right")}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            →
          </button>
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    </div>
  );
};

export default CraneOverlay;
