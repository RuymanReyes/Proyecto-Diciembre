//aqui en app configuramos el servidor

var express = require('express');
var bodyParser = require('body-parser');
const port= 3000;
var app = express();
// configuración de archivos
// donde se aloja los archivos estaticos
// donde se alojan las vistas
// indicamos quien se va aencargar de renderizar html
// nueva config del servidor en donde le indicamos el motor de las nuevas
// vistas que estamos renderizando. 
app.use(express.static(__dirname + '/public')); //__dirname, es la forma para que nosea necesaria porner la dirección entera busca la carpeta raíz.
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')
//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
//creacion del servidor 
app.listen(port, () =>{
    console.log('Servidor corriendo correctamente');
});
module.exports = app;
