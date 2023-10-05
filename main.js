const { crawlPage } = require("./crawl.js");

function main() {
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
  crawlPage(baseURL);
}

main();
