var express = require("express");
var mongoose = require('mongoose');
var User = require('./user');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');

var app = express();

app.use(cors({
    credentials: true,
}));

app.set('trust proxy', 1);
app.use(session({
    secret: 'keyboard cat',

}));

app.use(express.static(__dirname + '/../client/build'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + 'index.html');
});


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


app.get('/check', function (req, res) {

});

app.get('/logout', function (req, res) {
    req.session.username = "";
    res.send({
        code: 0,
        message: "logged out"
    });
    res.end();
});


app.get('/get_todos', function (req, res) {
    if (!req.session.username) {
        res.send({
            code: 1,
            message: "Вы не залогинены"
        });
        res.end();
    } else {
        let todos;
        User.findOne({username: req.session.username}).then(result => {

            todos = result.todos;
            res.send({
                todos, code: 0, message: "ok"
            });
            res.end();
        });


    }
});

app.post('/add_todo', function (req, res) {
    if (!req.session.username) {
        res.send({
            code: 1,
            message: "you're not logged in..."
        });
        res.end();
    } else {
        let conditions = {
            username: req.session.username
        };
        let update = {
            $addToSet: {todos: {text: req.body.text}}
        };

        User.findOneAndUpdate(conditions, update, {new:true}, function (err, doc) {
            console.log(doc);
            res.send({todos: doc.todos});
            res.end();
        })


    }
});

app.post('/remove_todo', function (req, res) {
    if (!req.session.username) {
        res.send({
            code: 1,
            message: "you're not logged in..."
        });
        res.end();
    } else {

        User.findOne({username: req.session.username}, function (err, doc) {

            if (err) {
                res.send(null, 500);
            } else if (doc) {

                let index = doc.todos.findIndex(function (el) {
                    return el._id === req.body.id
                });

                doc.todos.splice(index, 1);

                doc.save(function(error) {
                    if (error) {

                        res.send(null, 500);
                    } else {
                        res.send({todos: doc.todos, code: 0, message: "todo deleted"});
                        res.end();
                    }
                });


            }
        });


    }
});

app.listen(3001);


mongoose.connect('mongodb://localhost/test');



