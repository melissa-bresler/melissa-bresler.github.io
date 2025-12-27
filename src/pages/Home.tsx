import React from "react";
import GameCarousel from "../components/pages/home/GameCarousel";
import CraneOverlay from "../components/pages/home/CraneOverlay";
import styles from "../styles/Home.module.css";
import aeLogo from "../assets/pages/home/ae-logo.png";
import mmLogo from "../assets/pages/home/mm-logo.png";
import kdLogo from "../assets/pages/home/kd-logo.png";
import bLogo from "../assets/pages/home/b-logo.png";

export interface Game {
  title: string;
  description: string;
  link: string;
  logo?: string;
  image?: string;
  platforms: string[],
}

const Home: React.FC = () => {
  const games = [

  const games: Game[] = [
    {
      title: "Adventure.exe",
      description:
        "Dive into 90s nostalgia with this 2D retro game. Type your way through a choose-your-own-adventure story on an old-school terminal. Make choices, collect items, and experience a classic adventure!",
      link: "/adventureExe",
      logo: aeLogo,
      platforms: ["Web Based Application"],
    },
    {
      title: "Memory Meltdown",
      description:
        "Co-developed by James Watson, Joao Tiago Da Silva Figueira, and myself, Memory Meltdown is a mobile game that tests your memorization skills through three fun mini-games.",
      link: "/memory-meltdown",
      logo: mmLogo,
      platforms: ["Mobile Application - IOS"],
    },
    {
      title: "Kaax's Dawn",
      description:
        "Explore a vibrant 3D world in this adventure game prototype, blending light combat, exploration, and charm—fun for all ages and inspired by games like Stray and Breath of the Wild.",
      link: "/kaaxs-dawn",
      logo: kdLogo,
      platforms: ["PC"],
    },
    {
      title: "Biosynth",
      description:
        "A 2.5D isometric game set in a futuristic, barter-based society where you play as a kitchen worker navigating daily tasks, open exploration, and a growing effort to save a threatened world.",
      link: "/biosynth",
      logo: bLogo,
      platforms: ["PC"],
    },
  ];

  return (
    <div className={styles.homeContainer}>
      <GameCarousel games={games} />
      <CraneOverlay />
    </div>
  );
};

export default Home;
