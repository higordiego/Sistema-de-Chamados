module.exports = function(app){
  var   autenticar = require('../middleware/autenticador')
  , passport = require('passport')
  , empresa = app.controllers.empresa;
  app.post('/sgc/empresa/inserir'   , autenticar.loginSistema, empresa.inserir);
  app.get('/sgc/empresa/cadastrar'  , autenticar.loginSistema, empresa.cadastrar);
  app.get('/sgc/empresa/modificar'  , autenticar.loginSistema, empresa.alterar);
  app.post('/sgc/empresa/listar'    , autenticar.loginSistema, empresa.listar);
}
