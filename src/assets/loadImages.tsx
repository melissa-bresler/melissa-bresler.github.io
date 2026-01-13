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

export const loadImagesFromFolder = (folderName: string): string[] => {
  const folderGlobs: Record<string, Record<string, { default: string }>> = {
    mm: import.meta.glob("./pages/games/MemoryMeltdown/*.{png,jpg,jpeg,svg}", {
      eager: true,
    }),
    kd: import.meta.glob(
      "./pages/games/KaaxsDawn/Slideshow/*.{png,jpg,jpeg,svg}",
      {
        eager: true,
      }
    ),
  };

  const images = folderGlobs[folderName];
  if (!images) {
    console.warn(`No context for folder: ${folderName}`);
    return [];
  }

  return Object.values(images)
    .map((mod) => mod.default)
    .sort((a, b) => a.localeCompare(b));
};
