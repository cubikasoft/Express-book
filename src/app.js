const express = require('express'); //requerimos el framework
const app = express();// ejecutamos el framework
const path = require('path');//nos permite concatenar directorios y hacerlos multiplataformas
const morgan = require('morgan');
// Settings
app.set('port', 5000); //Configura el puerto
app.set('views',path.join(__dirname,'views'));// Obtiene la ruta completa de las vistas
app.set('view engine','ejs');// Configura el motor de plantilla que utiliza express por defecto

// Middlewares(funciones que se ejecutan antes de llegar a las rutas)
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));//Convierte los datos que vienen de un formulario en formato JSON

// Routes (Se configuran en un archivo por separado routes/index.js)
app.use(require('./routes/index')); //Para que el servidor utilice las rutas

// Static
app.use(express.static(path.join(__dirname,'public')));// Obtiene express la ruta completa de la carpeta public donde están los archivos estáticos conm imagenes, css nuestro, js nuestro etc..

// 404 handler
app.use((req,res,next)=>{
    res.status(404).send('404 Not found');//mensaje de error 404. No se encuentra el recurso dentro del servidor
});//Manejador de peticiones
module.exports = app;