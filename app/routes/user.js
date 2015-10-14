module.exports = function(app){
  var   autenticar = require('../middleware/autenticador')
  , passport = require('passport')
  , user = app.controllers.user
  , userApi = app.controllers.userApi;

//Mobile..
app.get('/api/loginfail', function(req, res){
  res.status(403).json({login: false});
});


app.post('/api/login', passport.authenticate('local', { failureRedirect: '/api/loginfail'}), userApi.user);


  //Sistema Web

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
  //app.get('/inserir'  , user.prioridade);

}
