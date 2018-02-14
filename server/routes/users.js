var User = require('../models/user');

module.exports = function (app) {
    app.post('/login', function (req, res) {
        User.find({username: req.body.username, password: req.body.password}).then(function (response) {
            if (response.length > 0) {
                req.session.username = req.body.username;
                res.send({
                    code: 0,
                    message: "found"
                });
            } else {

                res.send({
                    code: 1,
                    message: "Неверное имя пользователя или пароль"
                });
            }
            res.end();
        });
    });

    app.post('/signup', function (req, res) {
        User.find({username: req.body.username}).then(function (response) {

            if (response.length > 0) {
                res.send("Пользователь с таким именем уже существует");
                res.end();
            } else {
                const newUser = new User({username: req.body.username, password: req.body.password});
                newUser.save().then(() => {
                    res.send("Пользователь создан");
                    res.end();
                });
            }

        });
    });
    app.get('/logout', function (req, res) {
        req.session.username = "";
        res.send({
            code: 0,
            message: "logged out"
        });
        res.end();
    });

};