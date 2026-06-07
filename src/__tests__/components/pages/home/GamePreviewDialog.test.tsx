import { render, screen } from "@testing-library/react";
import GamePreviewDialog from "../../../../components/pages/home/GamePreviewDialog";
import { TestGame } from "../../../utils/apiConstants";
import { MemoryRouter } from "react-router-dom";

describe("game preview dialog component", () => {
  test("renders component", () => {
    render(
      <MemoryRouter>
        <GamePreviewDialog open={true} handleClose={() => {}} game={TestGame} />
        ,
      </MemoryRouter>,
    );

    expect(screen.getByText(TestGame.title)).toBeInTheDocument();
    expect(
      screen.getByText(TestGame.platforms.join(" | ")),
    ).toBeInTheDocument();
    expect(screen.getByText(TestGame.description)).toBeInTheDocument();
  });
});
