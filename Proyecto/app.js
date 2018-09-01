var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var nib = require('nib');
//var stylus = require('stylus');
var session = require('express-session');
//var admin = require('firebase-admin');
var passport   = require('passport');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var flash = require('connect-flash');

app.use(flash());

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
// session secret  
app.use(session({ secret: 'proyecto',resave: true, saveUninitialized:true})); 
app.use(passport.initialize()); 
app.use(passport.session()); // persistent login sessions

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(session({
  secret: 'sf-4354-uure-4',
  resave: true,
  saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);


//modelos
var models = require('./models');
models.sequelize.sync().then( () => {
    console.log('Se ha conectado la bd');
}).catch(err => {console.log(err, "Hubo un error");}) ;

require('./config/pasaporte/passport.js')(passport, models.cuenta, models.persona, models.rol, models.Revista, models.Libro, models.Articulo);

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
