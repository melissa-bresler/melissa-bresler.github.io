import { render, screen } from "@testing-library/react";
import { TestGameDTO } from "../../../utils/apiConstants";
import GameBreakdown from "../../../../components/pages/games/GameBreakdown";
import { useGetGameBySlugQuery } from "../../../../api/gameQueries";
import moment from "moment";

vi.mock("../../../../api/gameQueries", () => ({
  useGetGameBySlugQuery: vi.fn(),
}));

const mockedUseGetGameBySlugQuery = vi.mocked(useGetGameBySlugQuery);

describe("blog section component", () => {
  test("renders component succesfully", () => {
    mockedUseGetGameBySlugQuery.mockReturnValue({
      data: TestGameDTO,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    render(
      <GameBreakdown
        isMobile={false}
        logos={[]}
        gameArt={{
          src: "srcString",
          alt: "altString",
        }}
        name={"testGame"}
        setGameId={() => {}}
      />,
    );

    expect(screen.getByText(TestGameDTO.title)).toBeInTheDocument();
    expect(
      screen.getByText(TestGameDTO.platforms.join(" | ")),
    ).toBeInTheDocument();
    expect(screen.getByText(TestGameDTO.longDescription)).toBeInTheDocument();
    expect(screen.getByText(TestGameDTO.status)).toBeInTheDocument();
    expect(
      screen.getByText(moment(TestGameDTO.createdAt).format("DD-MM-YYYY")),
    ).toBeInTheDocument();
  });

  test("renders spinner when query is loading", () => {
    mockedUseGetGameBySlugQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as any);

    render(
      <GameBreakdown
        isMobile={false}
        logos={[]}
        gameArt={{
          src: "srcString",
          alt: "altString",
        }}
        name={"testGame"}
        setGameId={() => {}}
      />,
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders error when query fails", () => {
    mockedUseGetGameBySlugQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error("Failed to fetch"),
    } as any);

    render(
      <GameBreakdown
        isMobile={false}
        logos={[]}
        gameArt={{
          src: "srcString",
          alt: "altString",
        }}
        name={"testGame"}
        setGameId={() => {}}
      />,
    );

    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
  });
});
