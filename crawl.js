const fs = require("fs");
const cheerio = require("cheerio");

function delay() {
  // const min = 1;
  // const max = 1.5;
  // const rand = Math.floor(Math.random() * (max - min + 1) + min);
  // return new Promise((resolve) => setTimeout(resolve, rand * 1000));
  return 1000;
}

async function crawlPage(baseURL, currentURL, pages) {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);

  // Verify with the current URL has the same domain of the baseURL
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  // Count how many times we've visited the page, and not crawl the page
  const normalizeCurrentURL = normalizeUrl(currentURL);
  if (pages[normalizeCurrentURL] > 0) {
    pages[normalizeCurrentURL]++;
    return pages;
  }

  pages[normalizeCurrentURL] = 1;

  console.log(`actively crawling: ${currentURL}`);

  try {
    const resp = await fetch(currentURL);

    if (resp.status > 399) {
      fs.appendFileSync(
        "errors.txt",
        `error in fetch with status code: ${resp.status} on page ${currentURL}\n`
      );
      return pages;
    }

    const htmlBody = await resp.text();
    const nextURLs = getURLsFromHTML(htmlBody, baseURL);

    // Recursive call the crawlPage, to get all pages of the website
    for (const nextURL of nextURLs) {
      await delay(); // Wait the delay for the next request
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (error) {
    fs.appendFileSync(
      "errors.txt",
      `error in fetch: ${error.message}, on page: ${currentURL}\n`
    );
  }

  return pages;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const $ = cheerio.load(htmlBody);
  const linkElements = $("a")
    .map((i, link) => link.attribs.href)
    .get();

  for (const linkElement of linkElements) {
    if (linkElement.slice(0, 1) === "/") {
      // Relative URL
      try {
        const urlObj = new URL(`${baseURL}${linkElement}`);
        urls.push(urlObj.href);
      } catch (error) {
        fs.appendFileSync(
          "errors.txt",
          `error with relative URL ${linkElement}: ${error.message}\n`
        );
      }
    } else {
      // Absolute URL
      try {
        const urlObj = new URL(`${linkElement}`);
        urls.push(urlObj.href);
      } catch (error) {
        fs.appendFileSync(
          "errors.txt",
          `error with absolute URL ${linkElement}: ${error.message}\n`
        );
      }
    }
  }
  return urls;
}

function normalizeUrl(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  // Check if it's an image url
  if (urlObj.pathname.match(/\.(jpeg|jpg|gif|png)$/) != null) {
    return null;
  }

  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath; // Return the Normalized URL
}

module.exports = {
  normalizeUrl,
  getURLsFromHTML,
  crawlPage,
};
