var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var index = require('./routes/index');


var orphanage_api=require('./routes/orphange_api');
var donors_api = require('./routes/donors_api');
var post_api  = require('./routes/post_api');
var authenticate = require('./routes/authenticate')(passport);
var donation_api=require('./routes/donation_api');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/easyDonations', function(err){
    // not getting printed on console
    if(err){
        console.log("Connection refused");
        throw err;
    }
     else
        console.log("connection successfull");  
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(session({   secret: 'secret'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
var initPassport = require('./passport-init');
initPassport(passport);

app.use('/', index);

app.use('/api', donors_api);
app.use('/api', orphanage_api);
//app.use('/auth', authenticate);

app.use('/api', post_api);
app.use('/auth', authenticate);

app.use('/api',donation_api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
