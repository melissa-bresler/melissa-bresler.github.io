import { Grid, Typography } from "@mui/material";
import moment from "moment";
import { Card } from "../../Card";
import styles from "../../../styles/GameBreakdown.module.css";
import clsx from "clsx";
import ImageSwiper from "./ImageSwiper";
import { useDarkMode } from "../../../hooks/UseDarkMode";

// TODO: After making db, can fetch all of the required data from there using game id
const GameBreakdown: React.FC<{
  date: string | Date;
  description: string;
  title: string;
  platforms: string[];
  status: string;
  logos: { name: string; alt: string; invert: boolean }[];
  GameComponent?: React.FC;
  gameArt: { src: string; alt: string };
  images?: string[];
}> = ({
  date,
  description,
  title,
  platforms,
  status,
  logos,
  gameArt,
  GameComponent,
  images,
}) => {
  const displayDate = moment(date).format("DD-MM-YYYY");
  const isDarkMode = useDarkMode();

  return (
    <>
      <Grid xs={6} display={"flex"} height={"100%"}>
        <Grid item width={"50%"} display="flex" flexDirection="column">
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            {title}
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
            {platforms.join(" | ")}
          </Typography>
          <Card>
            <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
              {description}
            </Typography>
          </Card>
          <Grid
            xs={6}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Grid item width={"50%"}>
              <Card>
                <div className={styles.card}>
                  <Typography variant="overline" fontSize={16}>
                    {status}
                  </Typography>
                </div>
              </Card>
            </Grid>
            <Grid item width={"50%"}>
              <Card>
                <div style={{ display: "flex" }}>
                  {logos.map((logo, index) => (
                    <div key={index}>
                      <img
                        src={logo.name}
                        alt={logo.alt}
                        className={clsx(
                          styles.image,
                          logo.invert && "invert-on-dark"
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
          item
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
