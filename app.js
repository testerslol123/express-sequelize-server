require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Sequelize = require('sequelize');

var app = express();

// Option 1: Passing parameters separately
const db = new Sequelize('server-testing', 'root', 'root', {
  host: 'localhost',
  port: '8889',
  dialect: 'mysql',
	timezone : process.env.TZ,
	pool: {
	    max: 5,
	    min: 0,
	    idle: 10000
	}
});

var itemModels = require('./models/item')(Sequelize, db);

var indexRouter = require('./routes/index')(itemModels);
var usersRouter = require('./routes/users');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


db
  .authenticate()
  .then(() => {
		// view engine setup
		console.log('Connection has been established successfully.');
		app.use('/', indexRouter);
		app.use('/users', usersRouter);

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
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


module.exports = app;
