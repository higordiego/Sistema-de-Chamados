var express = require('express')
, path = require('path')
, favicon = require('serve-favicon')
, logger = require('morgan')
, cookieParser = require('cookie-parser')
, bodyParser = require('body-parser')
, load = require('express-load')
, passportLocal = require ('passport-local')
, passport = require('passport')
, expressSession = require('express-session')
, mongoose = require('mongoose')
, passportHttp  = require('passport-http')
, flash = require('express-flash')
, expressValidator = require('express-validator')
, app = express();


//Conexão com Banco de Dados
var mongoose = require('mongoose');
mongoose.connect('mongodb://chamados:chamados@ds051903.mongolab.com:51903/chamados', function(err){
  // mongoose.connect('mongodb://bulaapi:bulaapi@ds031982.mongolab.com:31982/bula', function(err){
  if( err ) {
    console.log("Error conectar mongo db: " + err);
  } else {
    console.log("Conexao realizada com sucesso!");
  }
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Conexao realizada!');
});
//Fim de conexão

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
//Acessar arquivos publico
app.use(express.static(path.join(__dirname, 'public')));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('iY}ONxQ,Y9I^Z}&y6-i}~35cS/vk/sf8+y@8c.2></>P*Z03Xhue?lzY%|dzN>S'));
app.use(expressSession({
                            secret: process.env.SESSION_SECRET || '1a5H(qzO&1+!8M35tXvai3A*JF%Os]eOoG63/Oo+:1S(R[%x[js09UKDam0#85',
                            saveUninitialized: false,
                            resave: false
                        }
                    )
        );

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


//Passport local para sessão de login
passport.use(new passportLocal.Strategy({
    usernameField: 'login',
    passwordField: 'password',

},verificaLogin));
passport.use(new passportHttp.BasicStrategy(verificaLogin));

function verificaLogin(username, password, done){
    var pass = require('./app/middleware/password');
    var User = app.models.user;
    User.findOne({ 'email': username }, function (err, result) {
        if(err) { console.log("ERROR: " + err); }
        else {
            if(result){
                if(result.email == username && pass.validate(result.password, password)) {
                    done(null, result);
                } else {
                    //req.flash('info', 'Erro:' + err);
                    done(null, null);
                }
            } else {
                //req.flash('info', 'Erro:' + err);
                done(null, null);
            }
        }
    });
}



passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});

load('models',{cwd: 'app'})
    .then('controllers')
    .then('routes')
    .into(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  //err.status = 404;
  res.render(404);
  //next(err);
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
