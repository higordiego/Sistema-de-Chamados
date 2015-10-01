module.exports = function(app){
  var Cliente = app.models.cliente;
  var crudCadastrar = {
    inserir: function(req,res){
      var cliente = new Cliente();
      req.assert('nome', 'required').notEmpty();
      req.assert('email','requird').isEmail();
      req.assert('profissao','required').notEmpty();
      req.assert('cidade','required').notEmpty();
      req.assert('numero1','required').notEmpty();
      req.assert('numero2','required').notEmpty();
      var errors = req.validationErrors();
      if(errors){
        req.redirect('/sgc/cliente/cadastrar');
      }else{
        cliente.email = req.body.email;
        Cliente.findOne({'email': cliente.email},function(erro,cliente){
          if(cliente==null){
            cliente = new Cliente();
            cliente.nome = req.body.nome;
            cliente.email = req.body.email;
            cliente.endereco = req.body.endereco;
            cliente.cidade = req.body.cidade;
            cliente.telefone.numero1 = req.body.numero1;
            cliente.telefone.numero2 = req.body.numero2;
            cliente.profissao = req.body.profissao;
            cliente.save(function(err, cliente){
              if(err){
                res.json(err);
              }else{
                req.flash('msg', 2);
                res.redirect('/sgc/cliente/cadastrar');

              }
            });
          }else{
            req.flash('msg', 3);
            res.redirect('/sgc/cliente/cadastrar');
          }
        });
      }
    },
    alterar: function(req,res){
      Cliente.find(function(err,cliente){
        res.render('sgc/cliente/alterar',{
          cliente: cliente
        });
      });
    },
    cadastrar: function(req,res){
      res.render('sgc/cliente/cadastrar');
    }
  };
  return crudCadastrar;
}
