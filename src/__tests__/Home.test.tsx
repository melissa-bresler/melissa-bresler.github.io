import { render, screen } from "@testing-library/react";
import { useGetGamesQuery } from "../api/gameQueries";
import { TestGameDTOs } from "./utils/apiConstants";
import Home from "../pages/Home";

vi.mock("../api/gameQueries", () => ({
  useGetGamesQuery: vi.fn(),
}));

vi.mock("react-fast-marquee", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

const mockedUseGetGamesQuery = vi.mocked(useGetGamesQuery);

describe("home page", () => {
  test("renders page succesfully", () => {
    mockedUseGetGamesQuery.mockReturnValue({
      data: TestGameDTOs,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    render(<Home />);

    TestGameDTOs.forEach((game) => {
      expect(screen.getByText(game.title)).toBeInTheDocument();
      expect(screen.getByText(game.description)).toBeInTheDocument();
    });
  });

  test("renders spinner when query is loading", () => {
    mockedUseGetGamesQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as any);

    render(<Home />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders error when query fails", () => {
    mockedUseGetGamesQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error("Failed to fetch"),
    } as any);

    render(<Home />);

    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
  });
});
