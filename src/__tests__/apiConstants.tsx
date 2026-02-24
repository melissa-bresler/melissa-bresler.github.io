import { BlogEntryData } from "../types/BlogPost";
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

export const BlogEntriesData = [BlogEntryTestData1, BlogEntryTestData2];
