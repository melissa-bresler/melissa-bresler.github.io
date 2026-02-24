import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import GameBreakdown from "../../components/pages/games/GameBreakdown";
import csharplogo from "../../assets/pages/games/c-sharp-logo.png";
import unitylogo from "../../assets/pages/games/unity-logo.png";
import chapterStats from "../../assets/pages/games/AdventureExe/chapter-stats-introduced.png";
import { BackToHomeButton } from "../../components/BackToHomeButton";
// import AdventureExeGame from "../../components/pages/games/AdventureExeGame"; //This is currently a test file and not the actual game
import BlogSection from "../../components/pages/games/BlogSection";
import { useGetBlogPostsByGameIdQuery } from "../../api/gameQueries";
import Spinner from "../../components/Spinner";
import { BlogEntryData, BlogPostDTO } from "../../types/BlogPost";
import ConstructionWarning from "../../components/ConstructionWarning";

const AdventureExe: React.FC = () => {
  const name = "adventureExe";
  const [gameId, setGameId] = useState<string | undefined>();
  const [blogPostsData, setBlogPostsData] = useState<
    BlogPostDTO[] | undefined
  >();

  const getBlogPostsQuery = useGetBlogPostsByGameIdQuery(gameId);

  useEffect(() => {
    if (getBlogPostsQuery.data) {
      setBlogPostsData(getBlogPostsQuery.data);
    }
  }, [getBlogPostsQuery.data]);

  const posts: BlogEntryData[] = blogPostsData
    ? blogPostsData.map((post) => ({
        date: post.date,
        blogText: post.blogText,
        image: post.image,
        imageAlt: post.imageAlt,
        keyChanges: post.keyChanges,
      }))
    : [];

  return (
    <>
      <BackToHomeButton />
      <Container sx={{ marginTop: 4 }}>
        <GameBreakdown
          logos={[
            { name: csharplogo, alt: "C# Logo", invert: false },
            { name: unitylogo, alt: "Unity Logo", invert: true },
          ]}
          gameArt={{
            src: chapterStats, //TODO: Change this later
            alt: name,
          }}
          // GameComponent={AdventureExeGame} //TODO: Uncomment after importing actual game
          GameComponent={ConstructionWarning}
          setGameId={setGameId}
          name={name}
        />
        {blogPostsData ? (
          <BlogSection entries={posts} />
        ) : gameId ? (
          <Spinner />
        ) : null}
      </Container>
    </>
  );
};

export default AdventureExe;
