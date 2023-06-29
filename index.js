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
const fs = require("fs");
const path = require("path");

function mdLinks(path, options) {
  const newPromise = new Promise(function (resolve, reject) {
    const resolveIsAbsolute = isAbsolute(path) ? path : converterAbsolute(path);

    if (existPath(resolveIsAbsolute)) {
      if (isAFile(resolveIsAbsolute)) {
        const resultIsMd = isMd(resolveIsAbsolute);

        if (resultIsMd === false) {
          return "the file does not have the .md extension";
        }

        readAFile(resolveIsAbsolute)
          .then((result) => {
            const extract = extractLinks(result, resolveIsAbsolute);
            if (options.validate === false) {
              return extract;
            } else {
              verifyLinks(extract)
                .then((result) => {
                  resolve(result);
                })
                .catch((error) => {
                  resolve(error);
                });
            }
          })
          .catch(() => {
            return "hubo problemas al leer el archivo";
          });
      }
      if (isADirectory(resolveIsAbsolute)) {
        readDirectory(resolveIsAbsolute)
          .then((result) => {
            const promises = result.map((link) =>
              readAFile(link)
                // .then((result) => {
                //   const extract = extractLinks(result, link);
                //   if (options.validate === false) {
                //     return extract;
                //   } else {
                //     return verifyLinks(extract);
                //   }
                // })
                // .catch(() => {
                //   return "Hubo problemas al leer el archivo: " + link;
                // })
            );

            Promise.all(promises)
              .then((result) => {
                const flattenedResult = result.flat();
                resolve(flattenedResult);
              })
              .catch(() => {
                return "La carpeta no contiene archivos .md";
              });
          })
          .catch(() => {
            return "Error al leer el directorio";
          });
      }
    } else {
      return new Error("Path does not exist");
    }
  });
  return newPromise;
}

// const path = "C:/Users/wader/Documents/DEV006-md-links/evidence";
// const options = { validate: true };
// mdLinks(path, options)
//   .then(function (result) {
//     console.log(result, "este es el resultado");
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

module.exports = {
  mdLinks,
};
