export type GameDTO = {
  id: string;
  title: string;
  description: string;
  slug: string;
  longDescription: string;
  platforms: string[];
  status: string;
  createdAt: Date;
  starred: boolean;
  logo: string;
};

export interface Game {
  id: string;
  title: string;
  description: string;
  slug: string;
  logo: string;
  platforms: string[];
  starred: boolean;
}
