import { vi } from "vitest";
import * as hooks from "../../hooks/useIsMobile";

export const mockUseIsMobile = (value: boolean) => {
  vi.spyOn(hooks, "useIsMobile").mockReturnValue(value);
};
