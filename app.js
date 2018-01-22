var sqExpress = require('express');
var sqPath = require('path');
var sqFavicon = require('serve-favicon');
var sqLogger = require('morgan');
const sqMongoose = require("mongoose");
var sqCookieParser = require('cookie-parser');
var sqBodyParser = require('body-parser');

const sqSession = require('express-session');
var sqIndex = require('./routes/index');
var sqStudent = require('./routes/student');
var sqCourse = require('./routes/course');


var sqApp = sqExpress();


// connecting to mongoose
   sqMongoose.connect("mongodb://localhost:27017/studentApp");


// view engine setup
// view engine setup
sqApp.set('views', sqPath.join(__dirname, 'views'));
sqApp.set('view engine', 'ejs');



//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
sqApp.use(sqLogger('dev'));
sqApp.use(sqSession({secret:'trafficHit',resave:false,saveUninitialized:false}));
sqApp.use(sqBodyParser.json());
sqApp.use(sqBodyParser.urlencoded({ extended: false }));
sqApp.use(sqCookieParser());
sqApp.use(sqExpress.static(sqPath.join(__dirname, 'public')));


sqApp.use('/student', sqStudent);
sqApp.use('/course', sqCourse);
sqApp.use('/', sqIndex);




// catch 404 and forward to error handler
sqApp.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
sqApp.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = sqApp;