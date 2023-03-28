// ES NUESTRO CONTENEDOR DE NUESTRAS TAREAS. ACA SE VAN A REALIZAR LAS FUNCIONES Y SE VA A CONECTAR EL PACKAGE.JSON CON EL GULPIFLE
// ES DONDE SE COMUNICA GULPFILE DIGAMOS.
const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const avif = require('gulp-avif');
// ES UNA HERRAMIENTA PARA AUTOMATIZAR TAREAS. 
// gulfile requiere node.js para ejecutarse .

// Imagenes a webp
const webp = require('gulp-webp');

// para compilar la hoja de estilos de sass
function css (cb) {
    try {
        src('src/scss/**/*.scss') // de forma recursiva va a ir recorriendo la carpeta y todos sus archivos. los q cumplan con la extension va a mirarlos 
        .pipe(plumber())
        .pipe(sass())
        .pipe(dest('build/css'));
    
    } catch (error) {
        console.log(error)
    }
    // Identificar el archivo SASS
    // Compilarlo
    // Almacenarla en el disco duro. 
    cb() // callback q avisa a gulp cuando llegamos al final. 
}

function serviceWebp (cb) {
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{png, jpg}') // le pasamos la ubi de las imagenes, entra de forma recursiva a buscar ambos formatos. gracias a las llaves
        .pipe(webp(opciones))
        .pipe(dest('build/img')) // para q la guarde ahi 
    cb();
}

function serviceAvif (cb) {
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{png, jpg}') // le pasamos la ubi de las imagenes, entra de forma recursiva a buscar ambos formatos. gracias a las llaves
        .pipe(avif(opciones))
        .pipe(dest('build/img')) // para q la guarde ahi 
    cb()
}

function dev (cb) { // va a llamar a la funcion css de arriba en cadena. es el watcher. 
    watch('src/scss/**/*.scss', css);
    cb();
}



exports.css = css;
exports.serviceWebp = serviceWebp;
exports.serviceAvif = serviceAvif;
exports.dev = parallel(serviceWebp, serviceAvif, dev);


// con gulp tenes 2 metodos para ejecutar tareas: series: hace una antes q la otra, de forma secuencial. paralell hace todas juntas.