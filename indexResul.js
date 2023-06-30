// const {
//   isAbsolute,
//   converterAbsolute,
//   existPath,
//   isAFile,
//   isADirectory,
//   readDirectory, //codigo asincrono
//   isMd,
//   readAFile, //codigo asincrono
//   extractLinks,
//   verifyLinks, // codigo asincrono
// } = require("./functions");
// const fs = require("fs");
// const path = require("path");

// function mdLinks(path, options) {
//   const newPromise = new Promise(function (resolve, reject) {
//     const resolveIsAbsolute = isAbsolute(path) ? path : converterAbsolute(path);

//     if (existPath(resolveIsAbsolute)) {
//       if (isAFile(resolveIsAbsolute)) {
//         const resultIsMd = isMd(resolveIsAbsolute);

//         if (resultIsMd === false) {
//           reject("the file does not have the .md extension");
//         }

//         readAFile(resolveIsAbsolute)
//           .then((result) => {
//             const extract = extractLinks(result, resolveIsAbsolute);
//             if (options.validate === false) {
//               return extract;
//             } else {
//               verifyLinks(extract)
//                 .then((result) => {
//                   resolve(result);
//                 })
//                 .catch((error) => {
//                   resolve(error);
//                 });
//             }
//           })
//           .catch(() => {
//             reject("hubo problemas al leer el archivo");
//           });
//       }
//       if (isADirectory(resolveIsAbsolute)) {
//         readDirectory(resolveIsAbsolute)
//           .then((result) => {
//             const promises = result.map((link) =>
//               readAFile(link)
//                 .then((result) => {
//                   const extract = extractLinks(result, link);
//                   return extract;
//                 })
//                 .catch(() => {
//                   reject("Hubo problemas al leer el archivo: " + link);
//                 })
//             );

//             if (options.validate === false) {
//               console.log("no validar");
//               Promise.all(promises)
//                 .then((result) => {
//                   const flattenedResult = result.flat();
//                   resolve(flattenedResult);
//                 })
//                 .catch(() => {
//                   reject("La carpeta no contiene archivos .md");
//                 });
//             } else {
//               console.log("si validar");
//               const promiseResult = Promise.all(promises)
//                 .then((result) => {
//                   const flattenedResult = result.flat();
//                   return flattenedResult;
//                 })
//                 .catch(() => {
//                   reject("La carpeta no contiene archivos .md");
//                 });
//               console.log(promiseResult);
//               const result = promiseResult.then((array) => {
//                 console.log(array);
//                 const validations = verifyLinks(array);
//                 console.log(validations);
//                 const arrayValidaciones = Promise.all(validations);
//                 console.log(arrayValidaciones);
//                 arrayValidaciones.then((resultValidaciones) => {
//                    return resultValidaciones;
//                  resolve(resultValidaciones);
//                 });
//               });
//               console.log(result, "aqui es");
//               result.then((resultConsole)=>{
//                 console.log(resultConsole);
//                 resolve (resultConsole)
//               })
//             }
           
//             Promise.all(promises)
//               .then((result) => {
//                 const flattenedResult = result.flat();
//                 if(options.validate === false) {
//                   resolve (flattenedResult);
//                 }
//                 else{
//                   verifyLinks(flattenedResult)
//                   .then((resultArray)=>{
//                     console.log(resultArray);
//                     resolve(resultArray)})
//                   .catch((error)=>{reject(error)})
//                 }

//               })
//               .catch(() => {
//                 reject ("La carpeta no contiene archivos .md");
//               });
//           })
//           .catch(() => {
//             reject("Error al leer el directorio");
//           });
//       }
//     } else {
//       reject("Path does not exist");
//     }
//   });
//   return newPromise;
// }

// const resultPath = "C:/Users/wader/Documents/DEV006-md-links/evidence";
// const options = { validate: true };
// mdLinks(resultPath, options)
//   .then(function (result) {
//     console.log(result, "este es el resultado");
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

// module.exports = {
//   mdLinks,
// };
