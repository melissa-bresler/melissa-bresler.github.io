import React from "react";
import styles from "../../../styles/GamePreviewCard.module.css";
import { Game } from "../../../types/Game";
import StarIcon from "@mui/icons-material/Star";

const GamePreviewCard: React.FC<Game> = ({
  title,
  description,
  logo,
  starred,
}) => {
  return (
    <div className={styles.card}>
      {logo && (
        <div className={styles.imageWrapper}>
          <img
            src={`/${logo}`}
            alt={title}
            className={`${styles.image} invert-on-dark`}
          />
        </div>
      )}
      <div className={styles.content}>
        <div style={{ display: "flex", margin: "auto" }}>
          {starred && (
            <div
              style={{
                color: "gold",
                alignContent: "center",
                margin: "auto",
                display: "flex",
                backgroundColor: "transparent",
              }}
            >
              <StarIcon />
            </div>
          )}
          <h3 className={styles.title}>{title}</h3>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default GamePreviewCard;
