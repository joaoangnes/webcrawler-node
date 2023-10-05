const { sortPages } = require("./report.js");
const { test, expect } = require("@jest/globals");

test("sortPages", () => {
  const input = {
    "https://google.com": 1,
    "https://google.com/path": 3,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://google.com/path", 3],
    ["https://google.com", 1],
  ];
  expect(actual).toEqual(expected);
});

test("sortPages 5 pages", () => {
  const input = {
    "https://google.com": 1,
    "https://google.com/path": 20,
    "https://google.com/path2": 7,
    "https://google.com/path3": 10,
    "https://google.com/path4": 3,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://google.com/path", 20],
    ["https://google.com/path3", 10],
    ["https://google.com/path2", 7],
    ["https://google.com/path4", 3],
    ["https://google.com", 1],
  ];
  expect(actual).toEqual(expected);
});
