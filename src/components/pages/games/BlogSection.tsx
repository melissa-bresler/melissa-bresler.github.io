import { Divider, Typography } from "@mui/material";
import BlogEntry from "./BlogEntry";
import { BlogEntryData } from "../../../types/BlogPost";

const BlogSection: React.FC<{
  entries: BlogEntryData[];
}> = ({ entries }) => {
  return (
    <>
      <Divider
        sx={{
          "&::before, &::after": {
            borderColor: "var(--pink)",
          },
          marginTop: "5%",
        }}
      >
        <Typography variant="h5">Blog Entries</Typography>
      </Divider>
      <div style={{ margin: 50 }} />
      {entries.map((entry, i) => (
        <BlogEntry
          data={entry}
          switchSides={i % 2 !== 0}
          firstEntry={i === 0}
        />
      ))}
    </>
  );
};

export default BlogSection;
