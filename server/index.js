var express = require("express");
var mongoose = require('mongoose');


var app = express();
var dependencies = require("./config/"+app.get('env'));



Object.keys(dependencies).map(
    el => {
        dependencies[el].map(
            elem => {
                (require('./' + elem))(app)
            }
        )
    }
);

mongoose.connect('mongodb://localhost/test');
app.listen(3001);





