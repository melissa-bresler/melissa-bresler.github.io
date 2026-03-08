import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import GameBreakdown from "../../components/pages/games/GameBreakdown";
import csharplogo from "../../assets/pages/games/c-sharp-logo.png";
import unitylogo from "../../assets/pages/games/unity-logo.png";
import { BackToHomeButton } from "../../components/BackToHomeButton";
import gameScreenshot from "../../assets/pages/games/KaaxsDawn/Slideshow/save-slots.png";
import { loadImagesFromFolder } from "../../assets/loadImages";
import { useGetBlogPostsByGameIdQuery } from "../../api/gameQueries";
import { BlogEntryData, BlogPostDTO } from "../../types/BlogPost";
import Spinner from "../../components/Spinner";
import BlogSection from "../../components/pages/games/BlogSection";
import { useIsMobile } from "../../hooks/UseIsMobile";

const KaaxsDawn: React.FC = () => {
  const isMobile = useIsMobile();
  const name = "kaaxs-dawn";
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

  const images = loadImagesFromFolder("kd");

  return (
    <>
      <BackToHomeButton />
      <Container sx={{ marginTop: 4 }}>
        <GameBreakdown
          isMobile={isMobile}
          logos={[
            { name: csharplogo, alt: "C# Logo", invert: false },
            { name: unitylogo, alt: "Unity Logo", invert: true },
          ]}
          gameArt={{
            src: gameScreenshot,
            alt: "Kaax's Dawn",
          }}
          images={images}
          name={name}
          setGameId={setGameId}
        />
        {blogPostsData ? (
          <BlogSection isMobile={isMobile} entries={posts} />
        ) : gameId ? (
          <Spinner />
        ) : null}
      </Container>
    </>
  );
};

export default KaaxsDawn;
