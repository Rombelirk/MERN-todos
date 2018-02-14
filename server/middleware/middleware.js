var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');

module.exports = function (app) {
    app.use(session({
        secret: 'keyboard cat',
    }));

    app.use(cors({
        credentials: true,
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
};