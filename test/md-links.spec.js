const { mdLinks } = require("../index.js");
const {
  readDirectory,
  isMd,
  readAFile,
  extractLinks,
  verifyLinks,
} = require("../functions.js");
const path = require("path");
const fs = require("fs");
const pathExample = ".\\evidence\\text.md";
const absolutePath = path.resolve(pathExample);
const routeCoverted = absolutePath.replace(/\\/g, "/");
const optionsTrue = { validate: true };
const optionsFalse = { validate: false };
const textMarkdown = `[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
    ligero muy popular entre developers. Es usado en muchísimas plataformas que
    manejan texto plano (GitHub, foros, blogs, ...) y es muy común

    Dentro de una comunidad de código abierto, nos han propuesto crear una
    herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
    en formato \`Markdown\`, para verificar los links que contengan y reportar
    algunas estadísticas.`;
describe("mdLinks", () => {
  
  it('should return a promise that resolves to an array of objects', () => {
   
    // Mock 
    jest.mock('../functions.js', () => ({
      ...jest.requireActual('../functions.js'),
      verifyLinks: jest.fn(() => Promise.resolve({ Code: 200, Status: 'OK' })),
    }));
  
    return mdLinks(routeCoverted, optionsTrue)
      .then((result) => {
        
        result.forEach((link) => {
          expect(link).toHaveProperty('Code');
          expect(link).toHaveProperty('Status');
        });
      });
  });

  it ("mdLinks should be a function",()=>{
      return expect(typeof mdLinks).toBe("function")
  });

  it("should return a promise that resolves to an array of objects,only with href, text and file", (done) => {
    const resultOfFalse = mdLinks(routeCoverted, optionsFalse);
    return expect(resultOfFalse)
      .resolves.toEqual([
        {
          href: "https://es.wikipedia.org/wiki/Markdown",
          text: "Markdown",
          file: "C:/Users/wader/Documents/DEV006-md-links/evidence/text.md",
        },
        {
          href: "https://nodejs.org/",
          text: "Node.js",
          file: "C:/Users/wader/Documents/DEV006-md-links/evidence/text.md",
        },
      ])
      .then(done);
  });
  it("should return an error when path does not exist", (done) => {
    const pathBroken = "evidence\text.md";

    return expect(mdLinks(pathBroken))
      .rejects.toEqual("Path does not exist")
      .then(done);
  });
  // it ("should return an error when path does not have .md extension",()=>{
  //   const pathWhitoudMd = "C:\\Users\\wader\\Documents\\DEV006-md-links\\evidence\\text.html";
  //   expect(mdLinks(pathWhitoudMd))
  //   .rejects.toEqual("the file does not have the .md extension")
  //   .then(done);
  // });
});

describe("read Directory", () => {
  it ("readDirectory should be a function",()=>{
   return expect(typeof readDirectory).toBe("function")
  });
  it("Should return an array of object with the links", (done) => {
    const routeFolder = "C:/Users/wader/Documents/DEV006-md-links/evidence";
    return expect(readDirectory(routeFolder))
      .resolves.toEqual([
        "C:\\Users\\wader\\Documents\\DEV006-md-links\\evidence\\text.md",
        "C:\\Users\\wader\\Documents\\DEV006-md-links\\evidence\\textOne.md",
        "C:\\Users\\wader\\Documents\\DEV006-md-links\\evidence\\textthree.md",
      ])
      .then(done);
  });
  it("Should return an array empty if there are not link", (done) => {
    const routeWhitOutPath = "test";
    return expect(readDirectory(routeWhitOutPath)).resolves.toEqual([]).then(done);
  });
  it("Should return an array empty if there are not link", (done) => {
    const routeWhitOutPath = "test";
    return expect(readDirectory(routeWhitOutPath)).resolves.toEqual([]).then(done);
  });
  it("Should return an reject with the message, Not has file", (done) => {
    const routeWhitOutPath = "Folderwhitoutfile";
    return expect(readDirectory(routeWhitOutPath))
      .rejects.toEqual("Not has file")
      .catch(done);
  });
});

describe("the path is .md", () => {
  it ("isMd should be a function",()=>{
   return expect(typeof isMd).toBe("function")
  });
  it("Should return true if the path is .md", () => {
    return expect(isMd(routeCoverted)).toEqual(true);
  });
  it("Should return false if the path isn't .md", () => {
    const routeTwo =
      "C:/Users/wader/Documents/DEV006-md-links/evidence/text.html";
    return expect(isMd(routeTwo)).toEqual(false);
  });
});

describe("read the file", () => {
  it ("readAFile should be a function",()=>{
    return expect(typeof readAFile).toBe("function")
  });
  // it("Should return the data of an file", (done) => {

  //   expect(readAFile(routeCoverted)).resolves.toEqual(textMarkdown).then(done);
  // });
  it("Should return an error", (done) => {
    const routeWhithoutData = "evidence\textthree.md";
    return expect(readAFile(routeWhithoutData))
      .rejects.toEqual("Error reading data")
      .catch(done);
  });
});

describe("Extract Links", () => {
  it ("ExtractLinks should be a function",()=>{
   return expect(typeof extractLinks).toBe("function")
  });
  it ("ExtractLinks function",()=>{
    return  expect(typeof extractLinks).toBe("function")
  });
  it("Should return an array of the links, with href,text,file", () => {
    return expect(extractLinks(textMarkdown, routeCoverted)).toEqual( [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:/Users/wader/Documents/DEV006-md-links/evidence/text.md'
      },
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'C:/Users/wader/Documents/DEV006-md-links/evidence/text.md'
      }
    ])
  });
});

// describe("",()=>{
// //   it("",()=>{
// //     expect().toEqual();
// //   })
// // })
