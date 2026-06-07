import { mockUseIsMobile } from "./utils/mockHooks";
import { render, screen } from "@testing-library/react";
import About from "../pages/About";

beforeEach(() => {
  mockUseIsMobile(false);
});

afterEach(() => {
  vi.restoreAllMocks();
});

vi.mock("../components/PacmanEasterEgg/usePellets", () => ({
  usePellets: () => ({
    pellets: [],
    setPellets: vi.fn(),
  }),
}));

vi.mock("../components/PacmanEasterEgg/usePacmanAnimation", () => ({
  usePacmanAnimation: vi.fn(),
}));

describe("about page", () => {
  test("renders component on desktop", () => {
    render(<About />);

    expect(screen.getByText("About Me")).toBeInTheDocument();
    expect(screen.getByText(/I’m a software developer/)).toBeInTheDocument();
    expect(screen.getByText(/Outside of my day job/)).toBeInTheDocument();
  });

  test("renders component on mobile", () => {
    mockUseIsMobile(true);
    render(<About />);

    expect(screen.getByText("About Me")).toBeInTheDocument();
    expect(screen.getByText(/I’m a software developer/)).toBeInTheDocument();
    expect(screen.queryByText(/Outside of my day job/)).not.toBeInTheDocument();
  });
});
