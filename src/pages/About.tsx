import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import photo from "../assets/pages/about/about-me-photo.jpg";
import machine from "../assets/pages/about/arcade-machine.png";
import ghosts from "../assets/pages/about/ghosts.png";
import colouredGhosts from "../assets/pages/about/ghosts-coloured.png";
import styles from "../styles/About.module.css";
import PacmanEasterEgg from "../components/PackMan";
import classNames from "clsx";
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

  const baseColor = darkMode ? "var(--black)" : "var(--lightestgrey)";
  const diagonalColor = darkMode ? "var(--darkeryellow)" : "var(--lightpink)";
  const angle = !isMobile ? "170deg" : "140deg";

  const getText = () => {
    if (isMobile) {
      return (
        <>
          <p>
            I’m a software developer based in the UK with a strong interest in
            game development.
          </p>
          <p>
            This site is where I share what I’ve worked on so far. It’s a mix of
            finished games and works in progress, along with some notes on how
            things are going.
          </p>
          <p>
            It’s an ongoing process, but one I really enjoy and want to keep
            building on. Thanks for taking a look.
          </p>
          <p>PS: There’s a hidden button on this page somewhere...</p>
        </>
      );
    }
    return (
      <>
        <p>
          I’m a software developer based in the UK with a strong interest in
          game development. Outside of my day job, I’ve been teaching myself how
          to design and build games, starting with small side projects and
          gradually picking up the skills involved along the way.
        </p>
        <p>
          This site is where I share what I’ve worked on so far. It’s a mix of
          finished games and works in progress, along with some notes on how
          things are going. I enjoy experimenting with mechanics, exploring new
          tools, and figuring out how to make something that’s fun to play.
        </p>
        <p>
          It’s an ongoing process, but one I really enjoy and want to keep
          building on. Thanks for taking a look.
        </p>
        <p>PS: There’s a hidden button on this page somewhere...</p>
      </>
    );
  };

  return (
    <div>
      <InputDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        title="Can you guess the code?"
        content={secretText}
      />
      <div
        className={styles.aboutContainer}
        style={{
          background: `linear-gradient(
      ${angle},
      ${baseColor} 47%,
      ${diagonalColor} 90%
    )`,
          transition: "background 0.3s ease",
          height: "90vh",
          position: "absolute",
          bottom: 0,
        }}
      >
        <Box
          className={styles.box}
          sx={{
            maxWidth: !isMobile ? "80%" : "100%",
            marginTop: !isMobile ? "2rem" : "",
          }}
        >
          {!isMobile && (
            <img
              src={machine}
              alt="arcade machine"
              className={classNames(styles.aboutImage, "invert-on-dark")}
            />
          )}
          <div
            className={classNames({
              [styles.aboutContent]: !isMobile,
            })}
          >
            <div
              className={classNames({
                [styles.aboutTitle]: !isMobile,
              })}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Roboto",
                  fontWeight: 700,
                  textAlign: isMobile ? "center" : "left",
                  marginBottom: "1rem",
                }}
              >
                About Me
              </Typography>
              {!isMobile && (
                <img
                  src={darkMode ? colouredGhosts : ghosts}
                  alt="red ghost"
                  className={styles.ghosts}
                />
              )}
            </div>
            <div
              className={classNames({
                [styles.aboutText]: !isMobile,
              })}
            >
              {isMobile && (
                <img
                  src={photo}
                  alt="portrait"
                  className={styles.arcadeMachine}
                />
              )}
              <Typography
                variant="body1"
                component="div"
                sx={{ lineHeight: 1.8 }}
                align="justify"
              >
                {getText()}
                {/* TODO: Make iconbutton component */}
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
              </Typography>
            </div>
          </div>
        </Box>
      </div>
      {/* Used https://picsvg.com to get svg file from img */}
      {/* Used https://yqnn.github.io/svg-path-editor/ for the svg path edit */}
      <div className={styles.pacman}>
        <PacmanEasterEgg
          onPacmanClick={toggleDarkMode}
          darkMode={darkMode}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

export default About;
