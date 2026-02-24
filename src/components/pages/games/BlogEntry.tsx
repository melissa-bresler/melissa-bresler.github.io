import { Grid, Typography } from "@mui/material";
import moment from "moment";
import { Card } from "../../Card";
import styles from "../../../styles/BlogEntry.module.css";
import { BlogEntryData } from "../../../types/BlogPost";

const BlogEntry: React.FC<{
  data: BlogEntryData;
  switchSides: boolean;
  firstEntry: boolean;
}> = ({ data, switchSides, firstEntry }) => {
  const displayDate = moment(data.date).format("DD-MM-YYYY");

  return (
    <>
      <Grid display={"flex"} sx={{ paddingTop: !firstEntry ? "5%" : "0%" }}>
        {!switchSides && (
          <GridImage image={data.image} imageAlt={data.imageAlt} />
        )}
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
              {data.blogText}
            </Typography>
          </Card>
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
        </Grid>
        {switchSides && (
          <GridImage image={data.image} imageAlt={data.imageAlt} />
        )}
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
