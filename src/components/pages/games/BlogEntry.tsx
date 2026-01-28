import { Grid, Typography } from "@mui/material";
import moment from "moment";
import { Card } from "../../Card";
import styles from "../../../styles/BlogEntry.module.css";

const BlogEntry: React.FC<{
  date: string | Date;
  blogText: string;
  image: string;
  imageAlt: string;
  switchSides: boolean;
  keyChanges: string[];
  firstEntry: boolean;
}> = ({
  date,
  blogText,
  image,
  imageAlt,
  switchSides,
  keyChanges,
  firstEntry,
}) => {
  const displayDate = moment(date).format("DD-MM-YYYY");

  return (
    <>
      <Grid display={"flex"} sx={{ paddingTop: !firstEntry ? "5%" : "0%" }}>
        {!switchSides && <GridImage image={image} imageAlt={imageAlt} />}
        <Grid width={"50%"}>
          <Typography variant="h4" sx={{ textAlign: "center" }} gutterBottom>
            {displayDate}
          </Typography>
          <Card>
            <Typography
              variant="body1"
              component="p"
              sx={{ textAlign: "justify", width: "90%" }}
            >
              {blogText}
            </Typography>
          </Card>
          <Card>
            <div className={styles.card}>
              <ul className={styles.list}>
                {keyChanges.map((change, index) => (
                  <div key={index}>
                    <li>{change}</li>
                  </div>
                ))}
              </ul>
            </div>
          </Card>
        </Grid>
        {switchSides && <GridImage image={image} imageAlt={imageAlt} />}
      </Grid>
    </>
  );
};

export default BlogEntry;

const GridImage: React.FC<{
  image: string;
  imageAlt: string;
}> = ({ image, imageAlt }) => {
  return (
    <Grid width={"50%"}>
      <img src={`/${image}`} alt={imageAlt} className={styles.image} />
    </Grid>
  );
};
