import { render, screen } from "@testing-library/react";
import BlogEntry from "../../../../components/pages/games/BlogEntry";
import { BlogEntryTestData1 } from "../../../utils/apiConstants";

describe("blog entry component", () => {
  test("renders component", () => {
    render(
      <BlogEntry
        data={BlogEntryTestData1}
        switchSides={false}
        firstEntry={false}
        isMobile={false}
      />,
    );

    expect(screen.getByText(BlogEntryTestData1.blogText)).toBeInTheDocument();

    BlogEntryTestData1.keyChanges.forEach((change) => {
      expect(screen.getByText(change)).toBeInTheDocument();
    });
  });
});
