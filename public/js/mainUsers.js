$(document).ready(function () {
    var registerButton = $('#registerButton');
    var registerForm = $('#registerForm');
    registerButton.on('click', function () {
        let data = registerForm.serialize();
        $.post('/users/register', data, function (res) {
            alert(res.nombre + ' ha sido registrado correctamente');
        });
    });
    var loginButton = $('#loginButton'); var loginForm = $('#loginForm'); loginButton.on('click', function () {
        let data = loginForm.serialize(); $.post('/users/login', data, function (res) {
        console.log(res) });
        });


});