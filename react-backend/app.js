var createError = require('http-errors');
var express = require('express');
var socket_io    = require( "socket.io" );
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

var app = express();

var io = socket_io();
app.io = io;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pollsRouter = require('./routes/polls');
var votesRouter = require('./routes/votes');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/polls', pollsRouter);
app.use('/votes', votesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var mongoose = require('mongoose')
var mongoDB = 'mongodb://localhost:27017/planning_poker';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.db = db;

module.exports = app;
