module.exports = function(app){
  var   autenticar = require('../middleware/autenticador')
    , passport = require('passport')
    , user = app.controllers.user;
  app.get('/', user.home);
  app.get('/loginerro'  ,user.loginerro)
  app.post('/entrar'    ,passport.authenticate('local', { failureRedirect: '/loginerro'}), user.login);
  app.get('/logout'     ,autenticar.loginSistema, user.deslogar);
}
