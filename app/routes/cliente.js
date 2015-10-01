module.exports = function(app){
  var   autenticar = require('../middleware/autenticador')
  , passport = require('passport')
  , cliente = app.controllers.cliente;

  app.post('/sgc/cliente/inserir'  , autenticar.loginSistema, cliente.inserir);
  
}
