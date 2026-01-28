import React, { useEffect, useState } from "react";
import GameCarousel from "../components/pages/home/GameCarousel";
import CraneOverlay from "../components/pages/home/CraneOverlay";
import styles from "../styles/Home.module.css";
import { useGetGamesQuery } from "../api/gameQueries";
import { Game, GameDTO } from "../types/Game";
import Spinner from "../components/Spinner";

const Home: React.FC = () => {
  const getGamesQuery = useGetGamesQuery();
  const [data, setData] = useState<GameDTO[] | undefined>(undefined);

  useEffect(() => {
    if (getGamesQuery.data) {
      setData(getGamesQuery.data);
    }
  }, [getGamesQuery.data]);

  if (data == undefined) {
    return <Spinner />;
  }

  const games: Game[] = data.map((game) => ({
    id: game.id,
    title: game.title,
    description: game.description,
    slug: game.slug,
    platforms: game.platforms,
    starred: game.starred,
  }));

  return (
    <div className={styles.homeContainer}>
      <GameCarousel games={games} />
      <CraneOverlay />
    </div>
  );
};

export default Home;
