var con = require('../config');//OJO HAY QUE COLOCAR UN PUNTO DE MÁS PORQUE HAY QUE BAJAR UNA CARPETA A CONTROLLER Y ENTRAR 
var controller = {
    addProject: function (req, res) {
        let body = req.body;
        console.log (body)
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
    },
    getProjects:function (req, res) {
        let sql = 'SELECT * from rutas';
        con.query(sql, function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(result);
             
            }
        });
    },
    deleteProjects: function (req, res) {
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
    },
    updateProject: function (req, res) {
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
    },
}
module.exports= controller;