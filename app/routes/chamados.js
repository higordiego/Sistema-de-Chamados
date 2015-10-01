module.exports = function(app){
  var   autenticar = require('../middleware/autenticador')
  , passport = require('passport')
  , chamados = app.controllers.chamados;

  app.post('/sgc/chamados/inserir'        , autenticar.loginSistema, chamados.inserir);
  app.post('/sgc/chamados/listar'         , autenticar.loginSistema, chamados.listar);
  app.post('/sgc/chamados/update:id'      , autenticar.loginSistema, chamados.update);
  app.get('/sgc/chamados/cadastrar'       , autenticar.loginSistema, chamados.cadastrar);
  app.get('/sgc/chamados/modificar'       , autenticar.loginSistema, chamados.alterar);
  app.get('/sgc/chamados/cancelar'        , autenticar.loginSistema, chamados.cancelar);
  app.post('/sgc/chamados/deletar:id'     , autenticar.loginSistema, chamados.deletar);
  app.post('/sgc/chamados/listarTecnico'  , autenticar.loginSistema, chamados.listarTecnico);

}
