import React from "react";
import styles from "../../../styles/GamePreviewCard.module.css";
import { Game } from "../../../pages/Home";

const GamePreviewCard: React.FC<Game> = ({
  title,
  description,
  logo: image,
}) => {
  return (
    <div className={styles.card}>
      {image && (
        <div className={styles.imageWrapper}>
          <img
            src={image}
            alt={title}
            className={`${styles.image} invert-on-dark`}
          />
        </div>
      )}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default GamePreviewCard;
