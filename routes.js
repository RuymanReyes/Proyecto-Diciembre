var app = require('./app');
var ProjectController = require('./controllers/projectController');
var UsersController = require('./controllers/users');
var auth = function (req, res, next) {
    if (req.session.user)
        return next(); else
        return res.sendStatus(404);
};




//añadir proyectos
app.post('/vulcan/add', ProjectController.addProject);
//consultar proyectos
app.get('/vulcan', ProjectController.getProjects);
//borrar rutas
app.post('/vulcan/delete', ProjectController.deleteProjects);
//modificar proyectos
app.post('/vulcan/update', ProjectController.updateProject);

//LLamada a home.ejs
app.get('/home', auth, function (req, res) {
    res.render('home', {
        email: req.session.user.email
    });
});
//Meter archivo en la pagina en la zona garaje y usuarios
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './public/img/img_download' })

app.post('/vulcan/add', multipartMiddleware, function (req, res) {
    let oldPath = req.files.foto.path;
    let newPath = './public/img/img_download' + req.files.foto.originalFilename; fs.rename(oldPath, newPath, function (err) {
    });
});

// Rutas 
app.get('/', function (req, res) {
    res.render('index');
});
app.get('/rutas', function (req, res) {
    res.render('rutas');
});
app.get('/portada', function (req, res) {
    res.render('portada');
});
app.get('/google', function (req, res) {
    res.render('experimento626-3');
});
app.get('/perfil', function (req, res) {
    res.render('perfil');
});
app.get('/rutasPpal', function (req, res) {
    res.render('rutasPpal');
});
app.get('/garaje', function (req, res) {
    res.render('garaje');
});
app.get('/retos', function (req, res) {
    res.render('retos');
});
app.get('/descubre', function (req, res) {
    res.render('descubre');
});

// REGISTRO DE USUARIOS 

app.post('/users/register', UsersController.registerUser);
app.post('/users/login', UsersController.loginUser);












module.exports = app; 
