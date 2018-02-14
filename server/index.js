var express = require("express");
var mongoose = require('mongoose');


var app = express();

const dependencies = {
    settings: [
        "settings/settings"
    ],
    middleware: [
        "middleware/middleware"
    ],
    routes: [
        "routes/users",
        "routes/todos",
        "routes/view"
    ]
};

Object.keys(dependencies).map(
    el => {
        dependencies[el].map(
            elem => {
                (require('./' + elem))(app)
            }
        )
    }
);

app.listen(3001);

mongoose.connect('mongodb://localhost/test');



