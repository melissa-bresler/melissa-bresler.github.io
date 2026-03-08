import React, { useState } from "react";
import { Container } from "@mui/material";
import GameBreakdown from "../../components/pages/games/GameBreakdown";
import swiflogo from "../../assets/pages/games/swift-logo.png";
import { BackToHomeButton } from "../../components/BackToHomeButton";
import gameScreenshot from "../../assets/pages/games/MemoryMeltdown/madness-1.png";
import { loadImagesFromFolder } from "../../assets/loadImages";
import { useIsMobile } from "../../hooks/UseIsMobile";

const MemoryMeltdown: React.FC = () => {
  const isMobile = useIsMobile();
  const images = loadImagesFromFolder("mm");

  const name = "memory-meltdown";
  const [_, setGameId] = useState<string | undefined>();

  return (
    <>
      <BackToHomeButton />
      <Container sx={{ marginTop: 4 }}>
        <GameBreakdown
          isMobile={isMobile}
          logos={[{ name: swiflogo, alt: "Swift Logo", invert: false }]}
          gameArt={{
            src: gameScreenshot,
            alt: "Memory Meltdown",
          }}
          images={images}
          name={name}
          setGameId={setGameId}
        />
        <div style={{ margin: 50 }} />
      </Container>
    </>
  );
};

export default MemoryMeltdown;
