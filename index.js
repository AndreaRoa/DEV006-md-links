const {
  isAbsolute,
  converterAbsolute,
  existPath,
  isAFile,
  isADirectory,
  readDirectory, //codigo asincrono
  isMd,
  readAFile, //codigo asincrono
  extractLinks,
  verifyLinks, // codigo asincrono
} = require("./functions");


function mdLinks(filePath, options) {
  const newPromise = new Promise(function (resolve, reject) {
    const resolveIsAbsolute = isAbsolute(filePath) ? filePath : converterAbsolute(filePath);

    if (existPath(resolveIsAbsolute)) {
      if (isAFile(resolveIsAbsolute)) {
        const resultIsMd = isMd(resolveIsAbsolute);

        if (resultIsMd === false) {
          reject(new Error("the file does not have the .md extension"));
          return;
        }

        readAFile(resolveIsAbsolute)
          .then((result) => {
            const extract = extractLinks(result, resolveIsAbsolute);
            if (options.validate === false) {
              resolve(extract);
            } else {
              resolve(verifyLinks(extract));
            }
          })
          .catch((error) => {
            reject(new Error("There was an error reading the file"));
          });
      } else if (isADirectory(resolveIsAbsolute)) {
        readDirectory(resolveIsAbsolute)
          .then((result) => {
            const promises = result.map((link) =>
              readAFile(link)
                .then((result) => {
                  const extract = extractLinks(result, link);
                  if (options.validate === false) {
                    return extract;
                  } else {
                    return verifyLinks(extract);
                  }
                })
                .catch(() => {
                  return "There was an error reading the file: " + link;
                })
            );

            Promise.all(promises)
              .then((result) => {
                const flattenedResult = result.flat();
                resolve(flattenedResult);
              })
              .catch(() => {
                reject(new Error("The folder does not contain .md files"));
              });
          })
          .catch(() => {
            reject(new Error("Error reading the directory"));
          });
      }
    } else {
      reject("Path does not exist");
    }
  });

  return newPromise;
}

const filePath = "C:/Users/wader/Documents/DEV006-md-links/evidence/text.md";
const options = { validate: false };
mdLinks(filePath, options)
  .then(function (result) {
    console.log(result, "este es el resultado");
  })
  .catch(function (error) {
    console.log(error);
  });

module.exports = {
  mdLinks,
};