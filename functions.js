//fs biblioteca de node.js
const fs = require("fs");
//para utilizar funciones de manejo de promesas
const promise = require("fs/promises");
//modulo para acceder a funciones que permiten manipular archivos y directorios
const path = require("path");
// JSDOM, biblioteca para la manipulacion del DOM
const { JSDOM } = require("jsdom");
//biblioteca para analizar y renderizar markdown
const markdownIt = require("markdown-it");

const colors = require("colors");

//validar ruta si es absoluta
const isAbsolute = (route) => path.isAbsolute(route);
//Convertir ruta relativa a absoluta
const converterAbsolute = (route) => path.resolve(route);
//existe la ruta
const existPath = (route) => fs.existsSync(route);
//es un archivo
const isAFile = (route) => fs.statSync(route).isFile();

//es un directorio
const isADirectory = (route) => fs.statSync(route).isDirectory();
// leer archivos de un directorio
// validar archivos si hay
// si hay , iterar por cada uno
//volver el archivo en ruta absoluta
// ir uniendo por .push las rutas de los archivos del directorio .
const readDirectory = (route) => {
  return new Promise((resolve, reject) => {
    fs.readdir(route, "utf8", (error, routes) => {
      if (routes.length === 0) {
        reject("Not has file.");
      } else {
        const arrayRoute = [];
        routes.forEach((file) => {
          const resultExt = path.extname(file);
                  if (resultExt === ".md") {
            const routeAbsolute = path.resolve(route, file);
            arrayRoute.push(routeAbsolute);
          }
        });
        resolve(arrayRoute);
           }
    });
  });
};


//validar la extensión
const isMd = (route) => {
  const pathRut = path.extname(route);
  if (pathRut === ".md") {
    return true;
  } else {
    return false;
  }
};

//leer contenido del archivo  de extension .md

const readAFile = (route) => {
  return new Promise((resolve, reject) => {
    fs.readFile(route, "utf8", (err, data) => {
      if (err) {
        reject("Error reading data");
      } else data;
      resolve(data);
    });
  });
};
//funcion para extraer links del archivo .md
const extractLinks = (data, file) => {
  const md = markdownIt();
  const renderFile = md.render(data);
  const dom = new JSDOM(renderFile);
  const allLinks = [];
  const { document } = dom.window;
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    const href = link.getAttribute("href");
    const text = link.textContent.slice(0, 50);
    if (href.startsWith("http")) {
      allLinks.push({ href, text, file });
    }
  });
  return allLinks;
};
const textMarkdown = `[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, ...) y es muy común.

Dentro de una comunidad de código abierto, nos han propuesto crear una herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos en formato \`Markdown\`, para verificar los links que contengan y reportar algunas estadísticas.`;

const routeWithoutPath = "C:/Users/wader/Documents/DEV006-md-links/evidence/text.md";

//console.log(extractLinks(textMarkdown, routeWithoutPath));

//function para validar los links
const verifyLinks = (links) => {
  const arrayPromise = links.map((link) => {
    return new Promise((resolve, reject) => {
      fetch(link.href)
        .then((response) => {
          const arrayResult = {
            Ruta: link.file,
            Text: link.text,
            Link: link.href,
            Code: response.status === 200 ? 200 : 400,
            Status: response.status === 200 ? "OK" : "FAIL",
          };
          //console.log(colors.red.bgBlue('Hello world!'));
          resolve(arrayResult);
        })
        .catch((error) => {
          const arrayResult = {
            Ruta: link.file,
            Text: link.text,
            Link: link.href,
            Code: error.name,
            Status: error.message,
          };
          resolve(arrayResult);
        });
    });
  });
  return Promise.all(arrayPromise);
};

module.exports = {
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
};