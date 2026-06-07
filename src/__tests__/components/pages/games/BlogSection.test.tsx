import { render, screen } from "@testing-library/react";
import { BlogEntriesTestData } from "../../../utils/apiConstants";
import BlogSection from "../../../../components/pages/games/BlogSection";

describe("blog section component", () => {
  test("renders component", () => {
    render(<BlogSection entries={BlogEntriesTestData} isMobile={false} />);

    BlogEntriesTestData.forEach((entry) => {
      expect(screen.getByText(entry.blogText)).toBeInTheDocument();

      entry.keyChanges.forEach((change) => {
        expect(screen.getByText(change)).toBeInTheDocument();
      });
    });
  });
});
