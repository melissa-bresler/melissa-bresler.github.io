import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import photo from "../assets/pages/about/about-me-photo.jpg";
import machine from "../assets/pages/about/arcade-machine.png";
import ghost from "../assets/pages/about/ghost.png";
import redGhost from "../assets/pages/about/red-ghost.png";
import greenGhost from "../assets/pages/about/green-ghost.png";
import styles from "../styles/About.module.css";
import PacmanEasterEgg from "../components/PackMan";
import clsx from "clsx";
// import VpnKeyIcon from "@mui/icons-material/VpnKey";
import InputDialog from "../components/InputDialog";
import { useIsMobile } from "../hooks/UseIsMobile";

const About: React.FC = () => {
  const isMobile = useIsMobile();
  const [darkMode, setDarkMode] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Check initial theme on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const isDark =
      storedTheme === "dark" || document.body.classList.contains("dark-mode");

    setDarkMode(isDark);

    if (isDark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);

  const toggleDarkMode = () => {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setDarkMode(isDark);
  };

  const secretText =
    "One of the things I've always liked about games is the easter eggs hidden inside them, so I thought I'd add a few of my own into this website as well.";

  return (
    <div>
      {/* TODO: Adjust positioning to be mobile/narrow screen friendly */}
      <InputDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        title="Can you guess the code?"
        content={secretText}
      />
      {!isMobile && (
        <>
          <img
            src={machine}
            alt="arcade machine"
            className={`${styles.static} invert-on-dark`}
          />
          <img
            src={darkMode ? redGhost : ghost}
            alt="red ghost"
            className={clsx(styles.ghost, !darkMode && styles.flipped)}
            style={{
              top: "70vh",
              left: "40vw",
            }}
          />
          <img
            src={darkMode ? greenGhost : ghost}
            alt="green ghost"
            className={styles.ghost}
            style={{
              top: "15vh",
              left: "85vw",
            }}
          />
        </>
      )}
      <Container sx={{ marginTop: !isMobile ? 4 : 2 }}>
        <Box
          sx={{
            maxWidth: !isMobile ? "60%" : "100%",
            margin: "0 auto",
            marginBottom: "-2rem",
            padding: 2,
          }}
        >
          <img src={photo} alt="portrait" className={styles.image} />
          <Typography
            variant="body1"
            component="div"
            sx={{ lineHeight: 1.8 }}
            align="justify"
          >
            <p>
              I’m a software developer based in the UK with a strong interest in
              game development. Outside of my day job, I’ve been teaching myself
              how to design and build games, starting with small side projects
              and gradually picking up the skills involved along the way.
            </p>
            <p>
              This site is where I share what I’ve worked on so far. It’s a mix
              of finished games and works in progress, along with some notes on
              how things are going. I enjoy experimenting with mechanics,
              exploring new tools, and figuring out how to make something that’s
              fun to play.
            </p>
            <p>
              It’s an ongoing process, but one I really enjoy and want to keep
              building on. Thanks for taking a look.
            </p>
            <p>PS: There’s a hidden button on this page somewhere...</p>
            {/* TODO: Make iconbutton component */}
          </Typography>
        </Box>
        {/* TODO: Re-enable once dialog has been completed */}
        {/* {darkMode && (
          <Button
            className="easter-egg-button"
            style={{
              color: "gold",
              alignContent: "center",
              margin: "auto",
              display: "flex",
              backgroundColor: "transparent",
            }}
            disableElevation
            disableRipple
            onClick={() => setDialogOpen(true)}
          >
            <VpnKeyIcon />
          </Button>
        )} */}
      </Container>
      {/* Used https://picsvg.com to get svg file from img */}
      {/* Used https://yqnn.github.io/svg-path-editor/ for the svg path edit */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none", // So clicks pass through unless you want to catch clicks inside Pacman
          zIndex: 9999, // Ensure it’s on top
        }}
      >
        <PacmanEasterEgg onPacmanClick={toggleDarkMode} darkMode={darkMode} />
      </div>
    </div>
  );
};

export default About;
