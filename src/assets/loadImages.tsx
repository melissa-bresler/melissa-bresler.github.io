declare const require: {
  context: (
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
  ) => {
    keys: () => string[];
    (id: string): string;
  };
};

// FIXME: Something here is breaking these 2 pages
export const loadImagesFromFolder = (folderName: string): string[] => {
  const folderContexts: Record<string, ReturnType<typeof require.context>> = {
    mm: require.context(
      "./pages/games/MemoryMeltdown",
      false,
      /\.(png|jpe?g|svg)$/
    ),
    kd: require.context(
      "./pages/games/KaaxsDawn/Slideshow",
      false,
      /\.(png|jpe?g|svg)$/
    ),
  };

  const context = folderContexts[folderName];
  if (!context) {
    console.warn(`No context for folder: ${folderName}`);
    return [];
  }

  return context
    .keys()
    .map(context)
    .sort((a, b) => a.localeCompare(b));
};
