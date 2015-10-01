module.exports = function(app){
  var   autenticar = require('../middleware/autenticador')
  , passport = require('passport')
  , chamados = app.controllers.chamados;

  //app.get('/sgc/chamados/cadastrar' , autenticar.loginSistema, chamados.cadastrar);
  app.get('/sgc/chamados/modificar' , autenticar.loginSistema, chamados.alterar);
}
