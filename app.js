var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var db = require('./models/index');

var cinemaRouter = require('./routes/cinema')
var movieRouter =  require('./routes/movie')
var movieshowtimeRouter = require('./routes/movieshowtimes')
var profileRouter = require('./routes/profile')
var orderRouter = require('./routes/order')
var activitylogRouter = require('./routes/activitylog')
var cartRouter = require('./routes/cart')
var authRouter = require('./routes/authRoute')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/cinema', cinemaRouter);
app.use('/movie',  movieRouter);
app.use('/movieshowtimes', movieshowtimeRouter);
app.use('/profile', profileRouter);
app.use('/order', orderRouter);
app.use('/activitylog', activitylogRouter);
app.use('/cart', cartRouter);

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

module.exports = app;
