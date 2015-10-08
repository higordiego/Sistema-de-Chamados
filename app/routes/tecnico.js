module.exports = function(app){
  var   autenticar = require('../middleware/autenticador')
  , passport = require('passport')
  , tecnico = app.controllers.tecnico;
  app.post('/sgc/tecnicos/inserir'  , autenticar.loginSistema, tecnico.inserir);
  //Api
  app.get('/api/tecnicos/listar'    , tecnico.listar);
}
