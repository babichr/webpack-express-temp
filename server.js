var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongo = require('mongo');
var mongoose = require('mongoose');
var path = require('path');
var mongo = require("mongo");
var Promise = require('mpromise');


// Webpack + Express
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
var webpackDevMiddleware = require("webpack-dev-middleware");


var app = express();
var compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler));


//DB connection
// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/app');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){});

//Favicon
app.use(favicon(__dirname + '/static/favicon.ico'));

//Logger
app.use(morgan('combined'));

//Request data parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// URLs
app.get('/', function(req, res){
	res.status(200).sendFile(path.join(__dirname + "/index.html"));
});

app.get('/login', function(req, res){
	res.status(200).sendFile(path.join(__dirname + "/login.html"));
});


app.listen('3000', function(){
	console.log('Express works on 3000 port');
});