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
    console.log(resolveIsAbsolute);
    if (existPath(resolveIsAbsolute)) {
      if (isAFile(resolveIsAbsolute)) {
        console.log("is file");
        const resultIsMd = isMd(resolveIsAbsolute);
        console.log(resultIsMd, "este One");
        if (resultIsMd === false) {
          reject("Error");
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
             result.map((link)=>{
            readAFile(result)
              .then((result) => {
                const extract = extractLinks(result, link);
                if (options.validate === false) {
                  resolve(extract);
                } else {
                  resolve(verifyLinks(extract));
                }
              })
              .catch(reject);
          })
          })
          .catch(() => {
            reject("La carpeta no tiene archivos");
          });
        //     result.map((link) => {
        //       readAFile(link)
        //         .then((result) => {
        //           const extract = extractLinks(result, link);
        //           if (options.validate === false) {
        //             resolve(extract);
        //           } else {
        //             resolve(verifyLinks(extract));
        //           }
        //         })
        //         .catch(reject);
        //     });
        //   })
        //   .catch(()=>{reject("Carpeta sin archivos")});
      }
    } else {
      reject("La ruta no existe");
    }
  });
}

const path = "C:/Users/wader/Documents/DEV006-md-links/prueba";
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
