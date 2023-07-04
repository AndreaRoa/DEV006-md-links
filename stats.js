const example = [
  {
    href: "C:\\Users\\wader\\Documents\\DEV006-md-links\\evidence\\text.md",
    text: "Markdown",
    file: "https://es.wikipedia.org/wiki/Markdown",
    status: 200,
    ok: "OK",
  },
  {
    href: "C:\\Users\\wader\\Documents\\DEV006-md-links\\evidence\\textOne.md",
    text: "Node.js",
    file: "https://nodejs.org/",
    status: 200,
    ok: "fail",
  },
];
function brokenLinks(arrayOfObjects) {
  let broken = 0;
  arrayOfObjects.map((element) => {
    if (element.message === "fail" || element.status === 400 || element.status === 404) {
      broken++;
    }
  });
  return broken;
}

function linksTotal(arrayOfObjects) {
  let links = 0;
  arrayOfObjects.map((element) => {
    if (element.href) {
      links++;
    }
  });
  return links;
}


function uniqueLinks(arrayOfObjects) {
  let linksArr = [];
  arrayOfObjects.map((element) => {
    if (!linksArr.includes(element.href)) {
      linksArr.push(element.href);
    }
  });
  return linksArr.length;
}


module.exports = {
    brokenLinks,
    linksTotal,
    uniqueLinks,
};
