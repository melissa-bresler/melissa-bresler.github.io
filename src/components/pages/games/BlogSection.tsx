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
          key={i}
          date={entry.date}
          blogText={entry.blogText}
          image={entry.image}
          imageAlt={entry.imageAlt}
          switchSides={i % 2 !== 0}
          keyChanges={entry.keyChanges}
          firstEntry={i === 0}
        />
      ))}
    </>
  );
};

export default BlogSection;
