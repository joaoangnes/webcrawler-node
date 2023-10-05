const { crawlPage } = require("./crawl.js");
const { printReport } = require("./report.js");

async function main() {
  // Required a website argument
  if (process.argv.length < 3) {
    console.log("no website provided");
    process.exit(1);
  }

  // Not support more than one website
  if (process.argv.length > 3) {
    console.log("too many command line arguments");
    process.exit(1);
  }

  // Get the URL
  const baseURL = process.argv[2];

  console.log("starting crawl");
  const pages = await crawlPage(baseURL, baseURL, {});
  printReport(pages);
}

main();
