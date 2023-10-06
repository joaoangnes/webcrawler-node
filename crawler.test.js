const { normalizeUrl, getURLsFromHTML } = require("./crawl");
const { test, expect } = require("@jest/globals");

// test("normalizeURL strip protocol", () => {
//   const input = "https://example.dev/path";
//   const actual = normalizeUrl(input);
//   const expected = "example.dev/path";
//   expect(actual).toEqual(expected);
// });

// test("normalizeURL strip '/' ", () => {
//   const input = "https://example.dev/path/";
//   const actual = normalizeUrl(input);
//   const expected = "example.dev/path";
//   expect(actual).toEqual(expected);
// });

// test("normalizeURL capitals", () => {
//   const input = "https://EXAMPLE.dev/path/";
//   const actual = normalizeUrl(input);
//   const expected = "example.dev/path";
//   expect(actual).toEqual(expected);
// });

// test("normalizeURL strip http", () => {
//   const input = "http://EXAMPLE.dev/path/";
//   const actual = normalizeUrl(input);
//   const expected = "example.dev/path";
//   expect(actual).toEqual(expected);
// });

// test("getURLsFromHTML absolute", () => {
//   const inputHTMLBody = `
//     <html>
//         <body>
//             <a href="http://blog.boot.dev/path/">
//                 Boot.dev Blog
//             </a>
//         </body>
//     </html>`;

//   const inputBaseURL = "http://blog.boot.dev";
//   const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
//   const expected = ["http://blog.boot.dev/path/"];
//   expect(actual).toEqual(expected);
// });

test("getURLsFromHTML relative", () => {
  const inputHTMLBody = `
      <html>
          <body>
              <a href="https://www.saintgermainbrand.com.br//account/register">
                  Boot.dev Blog
              </a>
          </body>
      </html>`;

  const inputBaseURL = "https://www.saintgermainbrand.com.br/";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://www.saintgermainbrand.com.br//account/register"];
  expect(actual).toEqual(expected);
});

// test("getURLsFromHTML both", () => {
//   const inputHTMLBody = `
//     <html>
//         <body>
//             <a href="http://blog.boot.dev/path1/">
//                 Boot.dev Blog
//             </a>

//             <a href="/path2/">
//                 Boot.dev Blog (2)
//             </a>
//         </body>
//     </html>`;

//   const inputBaseURL = "http://blog.boot.dev";
//   const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
//   const expected = [
//     "http://blog.boot.dev/path1/",
//     "http://blog.boot.dev/path2/",
//   ];
//   expect(actual).toEqual(expected);
// });

// test("getURLsFromHTML invalide", () => {
//   const inputHTMLBody = `
//     <html>
//         <body>
//             <a href="invalid">
//                 Invalid URL
//             </a>
//         </body>
//     </html>`;

//   const inputBaseURL = "http://blog.boot.dev";
//   const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
//   const expected = [];
//   expect(actual).toEqual(expected);
// });

// test("getURLsFromHTML valid and invalide", () => {
//   const inputHTMLBody = `
//     <html>
//         <body>
//             <a href="invalid">
//                 Invalid URL
//             </a>

//             <a href="http://blog.boot.dev/path/">
//               Boot.dev Blog
//             </a>

//             <a href="/path2/">
//                 Boot.dev Blog (2)
//             </a>
//         </body>
//     </html>`;

//   const inputBaseURL = "http://blog.boot.dev";
//   const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
//   const expected = [
//     "http://blog.boot.dev/path/",
//     "http://blog.boot.dev/path2/",
//   ];
//   expect(actual).toEqual(expected);
// });
