//Nuestro enrutador
const {Router} = require('express'); //Función de express
const router = Router();// Esta función devuelve un objeto que exportamos
const fs = require('fs');//modulo pre-instalado de node para el manejo de archivos
const { v4: uuidv4 }  = require('uuid');//Genera ids únicos 

const json_books=fs.readFileSync('src/books.json','utf-8');
let books = JSON.parse(json_books);

router.get('/', (req,res)=>{
    res.render('index',{
        books
    });
});
router.get('/new-entry',(req,res)=>{
    res.render('new-entry');
})
router.post('/new-entry',(req,res)=>{
    const {title,author,image,description}= req.body;
    if(!title || !author || !image || !description){
        res.status(400).send('You must completed all entries');
        return;
    }
    let newBook = {
        id: uuidv4(),
        title,
        author,
        image,
        description
    };
    books.push(newBook);//inserta el objeto en el array books

    const json_books = JSON.stringify(books);//Convierte el string del arreglo en JSON
    fs.writeFileSync('src/books.json',json_books,'utf-8');//Función que guarda los datos al archivo de manera syncrona.Para una aplicación se puede utilizar para una grande se utiliza writeFile que es asyncrona.
    res.redirect('/');

});

router.get('/delete/:id', (req,res)=>{
    books = books.filter(book => book.id != req.params.id);//Filter método que permite flitrar resultados. Actualiza el arreglo
    const json_books = JSON.stringify(books);
    fs.writeFileSync('src/books.json',json_books,'utf-8');//Copia de nuevo el arreglo sin el id que se ha eliminado.
    res.redirect('/');
});



module.exports = router;
