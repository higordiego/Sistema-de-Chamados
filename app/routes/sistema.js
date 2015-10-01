//Todos os metodos get do sistema está aqui!
module.exports = function(app){
  var   autenticar = require('../middleware/autenticador')
  , passport = require('passport')
  , tecnico  = app.controllers.tecnico
  , cliente  = app.controllers.cliente
  , empresa  = app.controllers.empresa
  //, prioridade = app.controllers.prioridade
  , chamados = app.controllers.chamados;
  app.get('/sgc', autenticar.loginSistema,function(req,res){
    res.render('sgc/index');
  });
  app.get('/sgc/cliente/cadastrar'  , autenticar.loginSistema, cliente.cadastrar);
  app.get('/sgc/cliente/modificar'  , autenticar.loginSistema, cliente.alterar);
  app.get('/sgc/tecnico/cadastrar'  , autenticar.loginSistema, tecnico.cadastrar);
  app.get('/sgc/tecnico/modificar'  , autenticar.loginSistema, tecnico.alterar);


//  app.get('/sgc/chamados/prioridade', prioridade.cadastrar);
}
