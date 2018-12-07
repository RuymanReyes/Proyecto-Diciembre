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
    let sql = `INSERT INTO rutas (nombre, origen, destino, descripcion, fecha) VALUES ('${body.name}',
     '${body.origin}', '${body.destiny}','${body.description}','${body.date}')`;    
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
                fecha: body.date,
            }
 
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
// mirar como lo hace en un solo update. antes de hacerlo comprobar que los campos no esten en blanco. 

app.post('/vulcan/update', function (req, res) {
    let body= req.body;
    let sql = '';
     
    if(body.origin && body.destiny && body.description && body.date &&body.name){
        sql= `UPDATE rutas set origen = '${body.origin}', destino = '${body.destiny}', descripcion = '${body.description}', fecha = '${body.date}', nombre='${body.name}' where id ='${body.id}'`;
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
            req.body.name ? proyecto.item = req.body.name : proyecto.item = req.body.category
            console.log(proyecto);
            res.send(proyecto);
        }
    });
});




    // con.query(sql, function (err, result) {
    //         if (err) {
    //             res.send(err);
    //         }
    //         else {
    //             let proyecto = {
    //                 nombre: req.body.name,
    //                 destino: req.body.destiny,
    //                 descripcion: req.body.descripcion,
    //                 fecha:req.body.date,
    //                 origen:req.body.origin
    //             }
   
    //             res.send(proyecto);
    //         }
    //     });
    // });



module.exports = con;
module.exports = app; 





// JOSE PREGUNTAR 

// la fecha no la inserta, undifine, sé que tengo un error chorra en algún lado, no lo encuentro por mucho que lo miro
//conseguir que se me modifique la base de datos. no hay que usar un if sino una validacion de si el campo esta vacio... pase hasta que lo consiga el cambio 
