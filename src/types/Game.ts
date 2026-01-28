export type GameDTO = {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  platforms: string[];
  status: string;
  createdAt: Date;
  starred: boolean;
};

export interface Game {
  id: string;
  title: string;
  description: string;
  slug: string;
  logo?: string;
  platforms: string[];
  starred: boolean;
}
