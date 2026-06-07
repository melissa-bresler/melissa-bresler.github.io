import { render, screen } from "@testing-library/react";
import GamePreviewCard from "../../../../components/pages/home/GamePreviewCard";
import { TestGame } from "../../../utils/apiConstants";

describe("game preview card component", () => {
  test("renders component", () => {
    render(<GamePreviewCard {...TestGame} />);

    expect(screen.getByText(TestGame.title)).toBeInTheDocument();
  });
});
