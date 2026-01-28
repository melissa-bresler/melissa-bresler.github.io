export type BlogPostDTO = {
  id: string;
  date: Date;
  blogText: string;
  imageAlt: string;
  keyChanges: string[];
  image: string;
  gameId: string;
};

export interface BlogEntryData {
  date: string | Date;
  blogText: string;
  image: string;
  imageAlt: string;
  keyChanges: string[];
}
