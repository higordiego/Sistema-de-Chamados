module.exports = function(app){
  var Tecnico = app.models.tecnico;
  var tecnicoControle = {
    cadastrar: function(req,res){
      res.render('sgc/tecnico/cadastrar');
    },
    inserir: function(req,res){
      req.assert('nome', 'required').notEmpty();
      req.assert('email','requird').isEmail();
      req.assert('cidade','required').notEmpty();
      req.assert('numero1','required').notEmpty();
      req.assert('numero2','required').notEmpty();
      req.assert('endereco','required').notEmpty();
      var errors = req.validationErrors();
      if(errors){
        res.json(errors);
      }else{
        var tecnico = new Tecnico();
        tecnico.email = req.body.email;
        Tecnico.findOne({'email':tecnico.email}, function(err,tecnico){
          if(tecnico){
            req.flash('msg', 3);
            res.redirect('/sgc/tecnico/cadastrar');
          }else{
            tecnico = new Tecnico();
            tecnico.nome = req.body.nome;
            tecnico.email = req.body.email;
            tecnico.telefone.numero1 = req.body.numero1;
            tecnico.telefone.numero2 = req.body.numero2;
            tecnico.cidade = req.body.cidade;
            tecnico.endereco = req.body.endereco;
            tecnico.save(function(err,tecnico){
              if(err){
                res.json(err);
              }else{
                req.flash('msg', 2);
                res.redirect('/sgc/tecnico/cadastrar');
              }
            });
          }
        });
      }
    },
    alterar: function(req,res){
      var tecnico = new Tecnico();
      Tecnico.find(function(err,tecnico){
        if(err){
          res.json(err);
        }else{
          res.render('sgc/tecnico/alterar',{
            tecnico: tecnico
          });
        }
      });

    },
    excluir: function(req,res){

    }
  };
  return tecnicoControle;
}
