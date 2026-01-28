import { render, screen } from "@testing-library/react";
import GamePreviewCard from "../../../../components/pages/home/GamePreviewCard";

describe("TESTS", () => {
  test("renders component", () => {
    render(
      // TODO: some of these values shouldn't be required for this component but currently are due to being part of the Game object.
      // Hopefully can fix this with db implementation
      <GamePreviewCard
        title={"Test Game"}
        description={"foo bar"}
        logo=""
        slug={""}
        platforms={[]}
        id={""}
      />,
    );

    expect(screen.getByText("Test Game")).toBeInTheDocument();
  });
});
