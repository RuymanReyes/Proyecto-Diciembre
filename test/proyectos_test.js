var routes = require('../routes');
var chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
var con= require('../config') // configuracion de bases de datos 


describe('/GET proyecto', () =>{
    it ('deberia devolverme todos los proyectos', (done)=> {
        chai.request(routes)
        .get('/vulcan')
        .end((err,res)=> {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        });
    });
});
describe('/POST book', () => {
    it('Debería insertar un proyecto', (done) => {
        let proyecto = {
            name: "Nuevo proyecto"
        }
        chai.request(routes)
            .post('/vulcan/add')
            .send(proyecto)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id').be.a('number');
                res.body.should.have.property('nombre').be.a('string');
                done();
            });
    });
});
it('Debería eliminar un proyecto', (done) => {
    let sql = `INSERT INTO vulcan (name) VALUES ('test')`;
    con.query(sql, function (err, result) { 
        console.log(result)
        let id = { id: result.insertId };
        chai.request(routes)
            .post('/rutas/delete')
            .send(id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('affectedRows').eql(1);
                done();
            });
    });
});
