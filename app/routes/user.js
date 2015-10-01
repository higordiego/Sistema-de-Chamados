module.exports = function(app){
  var   autenticar = require('../middleware/autenticador')
  , passport = require('passport')
  , user = app.controllers.user;
  app.get('/sgc/user/cadastrar', function(req,res){
    res.render('sgc/usuario/cadastrar',{
      user: req.user
    });
  });
  app.post('/sgc/user/listar'       ,autenticar.loginSistema, user.listar);
  app.post('/sgc/user/cadastrar'    ,autenticar.loginSistema, user.cadastrar);
  app.post('/sgc/user/deletar:id'   ,autenticar.loginSistema, user.deletar);
  app.post('/sgc/user/update:id'    ,autenticar.loginSistema, user.alterar);
  app.post('/sgc/user/pesquisar:id' ,autenticar.loginSistema, user.pesquisar);
  //app.post('/sgc/tecnicos/inserir'  , autenticar.loginSistema, tecnico.inserir);

}
