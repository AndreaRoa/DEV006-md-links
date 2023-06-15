const fs = require('fs');
const promise = require('fs/promises');
const path = require ('path');
//validar ruta si es absoluta
const isAbsolute=(route)=>path.isAbsolute(route);
//Convertir ruta relativa a absoluta
const converterAbsolute=(route)=>path.resolve(route);
//existe la ruta 
const existPath=(route)=>fs.existsSync(route);
//es un archivo
const isAFile = (route) =>fs.statSync(route).isFile();

//es un directorio
const isADirectory =(route) =>fs.statSync(route).isDirectory();
// leer archivos de un directorio
const readDirectory=(route)=>fs.readdirSync(route, 'utf8');
//validar si tiene extension .md
const isMd = (route)=> {
const result= path.extname(route)
if (result==='.md'){
console.log(true);
}
else{console.log(null);}
}

isMd("C:/Users/wader/Documents/DEV006-md-links/index.js");


