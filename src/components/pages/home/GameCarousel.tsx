import React, { useState, useRef } from "react";
import Marquee from "react-fast-marquee";
import { Box } from "@mui/material";
import GamePreviewCard from "./GamePreviewCard";
import GamePreviewDialog from "./GamePreviewDialog";
import { Game } from "../../../types/Game";

interface Props {
  games: Game[];
}

// TODO: Still needs crane functionality to be added  so that crane can select a game
const GameCarousel: React.FC<Props> = ({ games }) => {
  // Card click tracking
  const [manualSelectionIndex, setManualSelectionIndex] = useState<
    number | null
  >(null);

  const [isHovering, setIsHovering] = useState<boolean>(false);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const selectedGameIndex = manualSelectionIndex; // TODO: Will also check crane index once that has been made functional
  const selectedGame =
    selectedGameIndex !== null ? games[selectedGameIndex] : null;

  // Pause carousel when dialog is open or mouse is over a card
  const isPaused = selectedGameIndex !== null || isHovering === true;

  const carouselItems = games.map((game, index) => (
    <Box
      component="div"
      ref={(el: HTMLDivElement | null) => {
        cardRefs.current[index] = el;
      }}
      onClick={() => setManualSelectionIndex(index)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      sx={{
        cursor: "pointer",
        marginRight: 3,
        minWidth: 280,
        flexShrink: 0,
        userSelect: "none",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          zIndex: 1,
        },
      }}
    >
      <GamePreviewCard {...game} />
    </Box>
  ));

  return (
    <>
      <Marquee
        play={!isPaused}
        gradient={false}
        speed={30}
        pauseOnHover={false} // This is too sensitive as it pauses when the mouse is anywhere near it
      >
        {carouselItems}
      </Marquee>

      <GamePreviewDialog
        open={selectedGameIndex !== null}
        handleClose={() => setManualSelectionIndex(null)}
        game={selectedGame}
      />
    </>
  );
};

export default GameCarousel;
