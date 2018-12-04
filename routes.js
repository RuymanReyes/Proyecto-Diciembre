var con = require('./config');
var app = require('./app');
// Rutas 
app.get('/', function (req, res) {
    res.render('index');
});
app.get('/rutas', function (req, res) {
    res.render('rutas');
});
app.get('/prueba', function (req, res) {
    res.render('prueba');
});

//añadir proyectos
//proyectos es una ruta quele damos que nosotros queremos, la unica requerida es que quiera 
// tener un sentido con lo que estamos haciendo. lo que añade es proyecto a la BD

app.post('/vulcan/add', function (req, res) {
    let body = req.body;
    let sql = `INSERT INTO rutas (nombre, origen, destino, descripcion) VALUES ('${body.name}',
     '${body.origin}', '${body.destiny}','${body.description}')`;
    // vamos a crear una variable de scope local,
    // si queremos añadir
    // un valor extra lo hacemos igual que name,
    //si lo que queremos es guardar todo lo podemos meter en una variable, let  body= rq.body
    //hay que hacer una comprobación de todos los datos que estamos enviando y recibiendo para 
    //comprobar que recibimos. para evitar problemas. estos datos los recogemos del cuerpo de la petición. 
    con.query(sql, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            console.log(result)
            let proyecto = {
                id: result.insertId,
                nombre: body.name,
                origen: body.origin,
                destino: body.destiny,
                descripcion: body.description,
            }
            console.log(proyecto)
            res.send(proyecto);
        }
    });
});

//CONSULTA DE PROYECTOS 
app.get('/vulcan', function (req, res) { // el nombre de proyecto puede ser cualquiera, en este caso es el proyecto. 
    let sql = 'SELECT * from rutas';
    con.query(sql, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
            console.log
        }
    });
})

//ELIMINAR PROYECTOS 
app.post('/vulcan/delete', function (req, res) {
    console.log(req.body)
    let sql = `DELETE FROM rutas where id = '${req.body.id}'`;
    console.log(sql)
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
})
//MODIFICAR REGISTROS 
app.post('/vulcan/update', function (req, res) {
    let sql = '';
    if (req.body.description){
        sql = `UPDATE rutas set descripcion='${req.body.description}'
    where id = '${req.body.id}'`;
    }
    else if(req.body.origin){
        sql = `UPDATE rutas set origen='${req.body.origin}'
    where id = '${req.body.id}'`;
    }
    else if(req.body.destiny){
        sql = `UPDATE rutas set destino='${req.body.destiny}'
    where id = '${req.body.id}'`;
    }
     else{
        sql = `UPDATE rutas set nombre='${req.body.name}'
    where id = '${req.body.id}'`;
    }
    con.query(sql, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            let proyecto = {
                item: "",
                result: result
            };
            req.body.name ? proyecto.item = req.body.name : proyecto.item = req.body.description //expresion ternarias
            console.log(proyecto)
            res.send(proyecto);
        }
    });
});









module.exports = con;
module.exports = app; 
