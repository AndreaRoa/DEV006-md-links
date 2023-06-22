const {
  isAbsolute,
  converterAbsolute,
  existPath,
  isAFile,
  isADirectory,
  readDirectory,
  isMd,
  readAFile,
  extractLinks,
  verifyLinks,
} = require("./functions");

function mdLinks(path, options) {
  return new Promise(function (resolve, reject) {
    const resolveIsAbsolute = isAbsolute(path) ? path : converterAbsolute(path);

    if (existPath(resolveIsAbsolute)) {
      if (isAFile(resolveIsAbsolute)) {
        const resultIsMd = isMd(resolveIsAbsolute);

        if (resultIsMd === false) {
          reject("Error: El archivo no tiene la extension .md");
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
          .catch(reject);
      }

      if (isADirectory(resolveIsAbsolute)) {
        readDirectory(resolveIsAbsolute)
          .then((result) => {
            const promises = result.map((link) =>
              readAFile(link).then((result) => {
                const extract = extractLinks(result, link);
                if (options.validate === false) {
                  return extract;
                } else {
                  return verifyLinks(extract);
                }
              })
            );

            Promise.all(promises)
              .then((result) => {
                const flattenedResult = result.flat();
                resolve(flattenedResult);
              })
              .catch(() => {
                reject("La carpeta no contiene archivos .md");
              });
          })
          .catch(() => {
            reject("Error al leer el directorio");
          });
      }
    } else {
      reject("La ruta no existe");
    }
  });
}

const path = "prueba";
const options = { validate: false };
const resultFunction = mdLinks(path, options);
console.log(resultFunction, "resultado funcion");
resultFunction
  .then(function (result) {
    console.log(result, "es esteee:");
  })
  .catch(function (error) {
    console.log(error);
  });

module.exports = {
  mdLinks,
};
