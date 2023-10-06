const fs = require("fs");

function printReport(pages) {
  console.log("=========");
  console.log("REPORT");
  console.log("=========");
  const sortedPages = sortPages(pages);

  for (const sortedPage of sortedPages) {
    const url = sortedPage[0];
    const hits = sortedPage[1];
    console.log(`Found ${hits} links to page ${url}`);
  }

  console.log("=========");
  console.log("END REPORT");
  console.log("=========");
}

function saveReportCSVFile(pages) {
  // Prepare data for CSV
  const sortedPages = sortPages(pages);
  let csvData = "URL,Hits\n";

  for (const sortedPage of sortedPages) {
    const url = sortedPage[0];
    const hits = sortedPage[1];
    // Add data to CSV string
    csvData += `${url},${hits}\n`;
  }

  // Write data to CSV file
  fs.writeFileSync("report.csv", csvData);
}

function sortPages(pages) {
  const pagesArr = Object.entries(pages);
  pagesArr.sort((a, b) => {
    aHits = a[1];
    bHits = b[1];
    return b[1] - a[1];
  });
  return pagesArr;
}

module.exports = {
  sortPages,
  printReport,
  saveReportCSVFile,
};
