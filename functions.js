const fs = require('fs');
const promise = require('fs/promises');
const path = require ('path');
//const markdownIt = require('markdown-it')

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
// validar archivos si hay 
// si hay , iterar por cada uno 
//volver el archivo en ruta absoluta 
// ir uniendo por .push las rutas de los archivos del directorio .
const readDirectory=(route)=>{
const generalRead= fs.readdirSync(route, 'utf8');
const arrayRoute = [];
if (generalRead){
generalRead.forEach((route)=>{
resultExt= path.extname(route);
if(resultExt === '.md'){
const routeAbsolute= path.resolve(route);
arrayRoute.push(routeAbsolute);
}
else{return null;}
})}
console.log(arrayRoute);
};

readDirectory("C:/Users/wader/Documents/DEV006-md-links/prueba");


// //validar si tiene extension .md
// const isMd = (route)=> {
// const result= path.extname(route)
// if (result==='.md'){

// console.log(true);
// }
// else{console.log(null);}
// }




