module.exports = function(app){
  var Empresa = app.models.empresa;
  var empresaIndex ={
    cadastrar: function(req,res){
      res.render('sgc/empresa/cadastrar',{
        user: req.user
      });
    },
    inserir: function(req,res){
      var empresa = new Empresa();
      req.assert('fantasia', 'required').notEmpty();
      req.assert('razao', 'required').notEmpty();
      req.assert('computadores', 'required').notEmpty();
      req.assert('email','required').isEmail();
      req.assert('cnpj','required').notEmpty();
      req.assert('cidade','required').notEmpty();
      req.assert('numero1','required').notEmpty();
      req.assert('numero2','required').notEmpty();
      req.assert('endereco','required').notEmpty();
      var errors = req.validationErrors();
      if(errors){
        res.json({'entrei': errors})
      }else{
        empresa.cnpj = req.body.cnpj;
        Empresa.findOne({'cnpj': empresa.cnpj },function(err,empresa){
          if(empresa){
            req.flash('msg', 3);
            res.redirect('/sgc/empresa/cadastrar');
          }else{
            empresa = new Empresa();
            empresa.cidade = req.body.cidade;
            empresa.telefone.numero1 = req.body.numero1;
            empresa.telefone.numero2 = req.body.numero2;
            empresa.fantasia = req.body.fantasia;
            empresa.razao = req.body.razao;
            empresa.computadores = parseInt(req.body.computadores);
            empresa.email = req.body.email;
            empresa.cnpj = req.body.cnpj;
            empresa.endereco = req.body.endereco;
            empresa.save(function(err,empresa){
              if(err){
                req.flash('msg', 3);
                res.redirect('/sgc/empresa/cadastrar');
              }else{
                req.flash('msg', 2);
                res.redirect('/sgc/empresa/cadastrar');
              }
            });
          }
        });
      }
    },
    alterar: function(req,res){
        res.render('sgc/empresa/alterar',{
          user: req.user
        });
    },
    listar: function(req,res){
      Empresa.find(function(err,empresa){
        res.json(empresa);
      });
    },
    excluir: function(req,res){

    }
  };
  return empresaIndex;
}
