import { render, screen } from "@testing-library/react";
import ConstructionWarning from "../../components/ConstructionWarning";

describe("construction warning component", () => {
  test("renders component", () => {
    render(<ConstructionWarning />);

    expect(screen.getByText("Under construction!")).toBeInTheDocument();
    expect(
      screen.getByText("This feature is currently still being built"),
    ).toBeInTheDocument();
  });
});
