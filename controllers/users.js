var con = require('../config');
var bcrypt = require('bcrypt-nodejs');
var controller = {
    registerUser: function (req, res) {
        let password = req.body.password;
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, null, function (err, hash) {
                password = hash;
                let sql = `INSERT INTO users (email,name,password) VALUES ('${req.body.email}', '${req.body.name}', '${password}')`;
                con.query(sql, function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send(err);
                    }
                    else {
                        letuser = {
                            id: result.insertId,
                            nombre: req.body.name
                        }
                        req.session.user = {
                            'user': req.body.name,
                            'email': req.body.email
                        }
                        return res.send(user);
                    }
                });
            });
        })
    },
    loginUser: function (req, res) {
        let sql = `SELECT * from users where email ='${req.body.email}'`; con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            } else {
                if (result == "") {
                    return res.send('Email introducido no válido');
                } else {
                    bcrypt.compare(req.body.password, result[0].password, function (err, iguales) {
                        if (err) {
                            return res.send(err)
                        } else {
                            if (iguales) {
                                req.session.user = {
                                'user': result[0].name,
                                'email': result[0].email
                            }
                                return res.send(result);
                            } else {
                                return res.send('La contraseña no es correcta')
                            };
                            // no sé si esto va aquí hay que comprarar y probar que va bien 

                        };
                    });
                };
            };
        });
    },
    logoutUser: function (req, res) {
        if (req.session.user) {
            req.session.destroy();
        } else {
            return res.send('No existe un login de usuario')
        }
    }
};

module.exports = controller;