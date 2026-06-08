import { BlogEntryData } from "../../types/BlogPost";
import { Game } from "../../types/Game";
const testDate = new Date("2026-02-24T18:36:00");
const testDate2 = new Date("1999-01-11T09:59:00");

export const BlogEntryTestData1: BlogEntryData = {
  date: testDate,
  blogText: "This is some random test text used for testing.",
  image: "test-image-1",
  imageAlt: "test-image-alt-1",
  keyChanges: ["foo", "bar", "foobar"],
};

export const BlogEntryTestData2: BlogEntryData = {
  date: testDate2,
  blogText: "Here is some more random text for testing purposes.",
  image: "test-image-2",
  imageAlt: "test-image-alt-2",
  keyChanges: ["barfoo"],
};

export const BlogEntriesTestData = [BlogEntryTestData1, BlogEntryTestData2];

export const TestGame: Game = {
  id: "1234",
  title: "Test Game",
  description: "Test description here.",
  slug: "testGame",
  logo: "foobar.logo",
  platforms: ["platformA", "platformB"],
  starred: false,
};

export const TestGameDTO1 = {
  ...TestGame,
  longDescription:
    "Test description that is longer than the regular description here.",
  status: "Complete",
  createdAt: testDate,
};

export const TestGameDTO2 = {
  id: "5678",
  title: "FooBar",
  description: "Some long text",
  slug: "someTest",
  logo: "another.logo",
  platforms: ["platformC"],
  starred: true,
  longDescription: "Even longer text with more words.",
  status: "In Development",
  createdAt: testDate2,
};

export const TestGameDTOs = [TestGameDTO1, TestGameDTO2];
