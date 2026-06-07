import { render, screen } from "@testing-library/react";
import ErrorPage from "../../components/ErrorPage";

describe("error page component", () => {
  const errText = "Something went wrong!";

  test("renders component with generic error message", () => {
    render(<ErrorPage />);

    expect(screen.getByText(errText)).toBeInTheDocument();
    expect(
      screen.getByText(
        "There was an unexpected error. Please try again later.",
      ),
    ).toBeInTheDocument();
  });

  test("renders component with specific error message", () => {
    const mockError = new Error("Mock error.");

    render(<ErrorPage error={mockError} />);

    expect(screen.getByText(errText)).toBeInTheDocument();
    expect(screen.getByText(mockError.message)).toBeInTheDocument();
  });
});
