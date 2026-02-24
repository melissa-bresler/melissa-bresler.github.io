import { Grid, Typography } from "@mui/material";
import moment from "moment";
import { Card } from "../../Card";
import styles from "../../../styles/GameBreakdown.module.css";
import clsx from "clsx";
import ImageSwiper from "./ImageSwiper";
import { useDarkMode } from "../../../hooks/UseDarkMode";
import { useGetGameBySlugQuery } from "../../../api/gameQueries";
import { useState, useEffect } from "react";
import { GameDTO } from "../../../types/Game";
import Spinner from "../../Spinner";
import ErrorPage from "../../ErrorPage";

const GameBreakdown: React.FC<{
  logos: { name: string; alt: string; invert: boolean }[];
  GameComponent?: React.FC;
  gameArt: { src: string; alt: string };
  images?: string[];
  name: string;
  setGameId: React.Dispatch<React.SetStateAction<string | undefined>>;
}> = ({ logos, gameArt, GameComponent, name, setGameId, images }) => {
  const isDarkMode = useDarkMode();

  const getGameQuery = useGetGameBySlugQuery(name);

  const [gameData, setGameData] = useState<GameDTO | undefined>();

  useEffect(() => {
    if (getGameQuery.data) {
      setGameData(getGameQuery.data);
      setGameId(getGameQuery.data.id);
    }
  }, [getGameQuery.data]);

  if (getGameQuery.isLoading) {
    return <Spinner />;
  }

  if (getGameQuery.isError || gameData == undefined) {
    return <ErrorPage error={getGameQuery.error} />;
  }

  const displayDate = moment(gameData.createdAt).format("DD-MM-YYYY");

  return (
    <>
      <Grid display={"flex"} height={"100%"}>
        <Grid width={"50%"} display="flex" flexDirection="column">
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            {gameData.title}
          </Typography>
          <Typography
            variant="overline"
            fontSize={14}
            sx={{
              textAlign: "center",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: 0,
            }}
            gutterBottom
          >
            {gameData?.platforms.join(" | ")}
          </Typography>
          <Card>
            <Typography
              variant="body1"
              component="p"
              sx={{ textAlign: "justify" }}
            >
              {gameData.longDescription}
            </Typography>
          </Card>
          <Grid
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Grid width={"50%"}>
              <Card>
                <div className={styles.card}>
                  <Typography variant="overline" fontSize={16}>
                    {gameData.status}
                  </Typography>
                </div>
              </Card>
            </Grid>
            <Grid width={"50%"}>
              <Card>
                <div style={{ display: "flex" }}>
                  {logos.map((logo, index) => (
                    <div key={index}>
                      <img
                        src={logo.name}
                        alt={logo.alt}
                        className={clsx(
                          styles.image,
                          logo.invert && "invert-on-dark",
                        )}
                        style={{ margin: 5 }}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </Grid>
          </Grid>
          <Card>
            <Typography variant="h5" style={{ color: "light-grey" }}>
              {displayDate}
            </Typography>
          </Card>
        </Grid>
        <Grid
          width={"50%"}
          marginLeft={"5px"}
          display="flex"
          flexDirection="column"
        >
          {GameComponent ? (
            <GameComponent />
          ) : images && images.length > 0 ? (
            <ImageSwiper images={images} isDarkMode={isDarkMode} />
          ) : (
            <img
              src={gameArt.src}
              alt={gameArt.alt}
              style={{ width: "90%", height: "auto", margin: 5 }}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default GameBreakdown;
