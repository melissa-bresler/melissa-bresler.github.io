import { Grid, Typography } from "@mui/material";
import moment from "moment";
import { Card } from "../../Card";
import styles from "../../../styles/BlogEntry.module.css";
import { BlogEntryData } from "../../../types/BlogPost";

const BlogEntry: React.FC<{
  isMobile: boolean;
  data: BlogEntryData;
  switchSides: boolean;
  firstEntry: boolean;
}> = ({ isMobile, data, switchSides, firstEntry }) => {
  const displayDate = moment(data.date).format("DD-MM-YYYY");
  const direction = isMobile
    ? "column-reverse"
    : switchSides
      ? "row-reverse"
      : "row";

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          flexDirection: direction,
          paddingTop: !firstEntry ? "5%" : "0%",
        }}
      >
        <GridImage
          isMobile={isMobile}
          image={data.image}
          imageAlt={data.imageAlt}
        />
        <Grid sx={{ width: isMobile ? "100%" : "50%" }}>
          <Typography variant="h4" sx={{ textAlign: "center" }} gutterBottom>
            {displayDate}
          </Typography>
          <Card>
            <Typography
              variant="body1"
              component="p"
              sx={{ textAlign: "justify", width: "90%" }}
            >
              {data.blogText}
            </Typography>
          </Card>
          {!isMobile && (
            <Card>
              <div className={styles.card}>
                <ul className={styles.list}>
                  {data.keyChanges.map((change, index) => (
                    <div key={index}>
                      <li>{change}</li>
                    </div>
                  ))}
                </ul>
              </div>
            </Card>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default BlogEntry;

const GridImage: React.FC<{
  isMobile: boolean;
  image: string;
  imageAlt: string;
}> = ({ isMobile, image, imageAlt }) => {
  return (
    <Grid
      sx={{
        width: isMobile ? "100%" : "50%",
        paddingY: isMobile ? "1rem" : "",
      }}
    >
      <img src={`/${image}`} alt={imageAlt} className={styles.image} />
    </Grid>
  );
};
