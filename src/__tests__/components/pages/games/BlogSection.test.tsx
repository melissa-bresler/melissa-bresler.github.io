import { render, screen } from "@testing-library/react";
import { BlogEntriesData } from "../../../apiConstants";
import BlogSection from "../../../../components/pages/games/BlogSection";

describe("blog section component", () => {
  test("renders component", () => {
    render(<BlogSection entries={BlogEntriesData} />);

    BlogEntriesData.forEach((entry) => {
      expect(screen.getByText(entry.blogText)).toBeInTheDocument();

      entry.keyChanges.forEach((change) => {
        expect(screen.getByText(change)).toBeInTheDocument();
      });
    });
  });
});
