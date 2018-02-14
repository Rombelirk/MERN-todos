var User = require('../user');

module.exports = function (app) {
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
};