const { normalizeUrl } = require("./crawl");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://example.dev/path";
  const actual = normalizeUrl(input);
  const expected = "example.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip '/' ", () => {
  const input = "https://example.dev/path/";
  const actual = normalizeUrl(input);
  const expected = "example.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://EXAMPLE.dev/path/";
  const actual = normalizeUrl(input);
  const expected = "example.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "http://EXAMPLE.dev/path/";
  const actual = normalizeUrl(input);
  const expected = "example.dev/path";
  expect(actual).toEqual(expected);
});
