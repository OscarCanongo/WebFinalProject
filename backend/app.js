var express = require('express');
var logger = require('morgan');
var cors = require('cors');
 
var moviesRouter = require('./routes/movies');
var reviewRouter = require('./routes/review');
var getloginRouter = require('./routes/login');

 
var app = express();
app.use(cors());
 
app.use(logger('dev'));
app.use(express.json());

app.use('/api/movies', moviesRouter); 
app.use('/api/review', reviewRouter);
app.use('/api/login', getloginRouter);
 
module.exports = app;