import "@testing-library/jest-dom";
// import { vi } from "vitest";

// Object.defineProperty(window, "matchMedia", {
//   writable: true,
//   value: vi.fn().mockImplementation((query) => ({
//     matches: false, //set to true for dark mode?
//     media: query,
//     onChange: null,
//     addListener: vi.fn(),
//     removeListener: vi.fn(),
//     addEventListener: vi.fn(),
//     removeEventListener: vi.fn(),
//     dispatchEvent: vi.fn(),
//   })),
// });

beforeEach(() => {
  const store: Record<string, string> = {};

  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        Object.keys(store).forEach((k) => delete store[k]);
      },
    },
    configurable: true,
  });
});
