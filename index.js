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
const axios = require("axios");
function mdLinks(filePath, options) {
  const newPromise = new Promise(function (resolve, reject) {
    const resolveIsAbsolute = isAbsolute(filePath)
      ? filePath
      : converterAbsolute(filePath);

    if (existPath(resolveIsAbsolute)) {
      if (isAFile(resolveIsAbsolute)) {
        const resultIsMd = isMd(resolveIsAbsolute);

        if (resultIsMd === false) {
          reject("The file does not have the .md extension");
          return;
        }

        readAFile(resolveIsAbsolute)
          .then((result) => {
            const extract = extractLinks(result, resolveIsAbsolute);
            if (options.validate === false) {
              resolve(extract);
            } else {
              verifyLinks(extract)
                .then((validatedLinks) => {
                  resolve(validatedLinks);
                })
                .catch((error) => {
                  reject("There was an error validating the links");
                });
            }
          })
          .catch((error) => {
            reject("There was an error reading the file");
          });
      } else if (isADirectory(resolveIsAbsolute)) {
        readDirectory(resolveIsAbsolute)
          .then((result) => {
            const promises = result.map((link) =>
              readAFile(link)
                .then((result) => {
                  const extract = extractLinks(result, link);
                  return extract;
                })
                .catch(() => {
                  return "There was an error reading the file: " + link;
                })
            );

            if (options.validate === false) {
              Promise.all(promises)
                .then((result) => {
                  const flattenedResult = result.flat();
                  resolve(flattenedResult);
                })
                .catch(() => {
                  reject("La carpeta no contiene archivos .md");
                });
            } else {
              Promise.all(promises)
                .then((result) => {
                  const flattenedResult = result.flat();
                  return verifyLinks(flattenedResult);
                })
                .then((validatedLinks) => {
                  resolve(validatedLinks);
                })
                .catch(() => {
                  reject("La carpeta no contiene archivos .md");
                });
            }
          })
          .catch(() => {
            reject("Error al leer el directorio");
          });
      }
    } else {
      reject("Path does not exist");
    }
  });
  return newPromise;
}

pathWhitoudMd = "C:\\Users\\wader\\Documents\\DEV006-md-links\\evidence\\text.md";
const options = { validate: true };
mdLinks(pathWhitoudMd, options)
  .then(function (result) {
    console.log(result, "este es el resultado");
  })
  .catch(function (error) {
    console.log(error);
  });

module.exports = {
  mdLinks,
};
