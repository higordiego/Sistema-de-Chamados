module.exports = function(app){
  var Prioridade = app.models.prioridade;
  var Tecnico = app.models.tecnico
  , Chamados = app.models.chamados;
  var chamadosIndex = {
    cadastrar: function(req,res){
      Prioridade.find(function(err,prioridade){
        Tecnico.find(function(err,tecnico){
          res.render('sgc/chamados/cadastrar',{
            prioridade: prioridade,
            tecnico: tecnico,
            user: req.user
          });
        });
      });
    },
    inserir: function(req,res){
      req.assert('problema', 'required').notEmpty();
      req.assert('prioridade','required').notEmpty();
      req.assert('tecnico','required').notEmpty();
      req.assert('observacao','required').notEmpty();
      var errors = req.validationErrors();
      if(errors){
        res.redirect('/sgc/chamados/cadastrar',{
          user: req.user
        });
      }else{
        var chamados = new Chamados();
        chamados.prioridade = req.body.prioridade;
        chamados.tecnico = req.body.tecnico;
        chamados.observacao = req.body.observacao;
        chamados.problema = req.body.problema;
        chamados.user = req.user._id;
        chamados.save(function(err,chamados){
          if(err){
            res.json(err);
          }else{
            req.flash('msg',2);
            res.redirect('/sgc/chamados/cadastrar');
          }
        });
      }
    },
    alterar: function(req,res){
      if(req.user.admin == true){
        res.render('sgc/chamados/alterar',{
          user: req.user
        });
      }else{

      }
    },
    listar: function(req,res){
      Chamados.find({resolvido: 0, user: req.user._id,}).populate({
        path: 'user',
        select: 'email admin nome'
      }).populate('chamados').exec(function (err, chamados) {
        if (err) {
          res.json(err);
        } else {
          for (var i = 0; i < chamados.length; i++) {
            if(chamados[i].prioridade == 1){
              chamados[i].prioridade = 'Alta';
            } else if(chamados[i].prioridade == 2){
              chamados[i].prioridade = 'Média';
            }else{
              chamados[i].prioridade = 'Baixa';
            }
          }
          res.json(chamados);
        }
      });
    },
    listarTecnico: function(req,res){
      if(req.user.admin == true){
        Chamados.find({resolvido: 0}).populate({
          path: 'user',
          select: 'email admin nome'
        }).populate('chamados').exec(function (err, chamados) {
          if (err) {
            res.json(err);
          } else {
            console.log(chamados);
            for (var i = 0; i < chamados.length; i++) {
              if(chamados[i].prioridade == 1){
                chamados[i].prioridade = 'Alta';
              } else if(chamados[i].prioridade == 2){
                chamados[i].prioridade = 'Média';
              }else{
                chamados[i].prioridade = 'Baixa';
              }
            }
            res.json(chamados);
          }

        });
      }else{
        res.send(403);
      }
    },
    update: function(req,res){
      if(req.user.admin == true){
        var chamados = new Chamados();
        chamados.solucao = req.body.solucao;
        chamados._id = req.params.id;
        chamados.resolvido = 1;
        Chamados.update({_id: chamados._id}, {$set: {resolvido: chamados.resolvido, solucao: chamados.solucao}}, function(err,chamados){
          console.log(err);
          console.log(chamados);
        });
      }else{
        res.send(403);
      }
    },
    deletar: function(req,res){
        Chamados.remove({_id: req.params.id},function(err){
          res.json(err);
        });
    },
    cancelar: function(req,res){
      res.render('sgc/chamados/cancelar',{
        user: req.user
      });
    },
    buscarCancelar: function(req,res){
      Chamados.find({resolvido: 0}).populate({
        path: 'user',
        select: 'email admin nome'
      }).populate('chamados').exec(function (err, chamados) {
        if (err) {
          res.json(err);
        } else {
          for (var i = 0; i < chamados.length; i++) {
            if(chamados[i].prioridade == 1){
              chamados[i].prioridade = 'Alta';
            } else if(chamados[i].prioridade == 2){
              chamados[i].prioridade = 'Média';
            }else{
              chamados[i].prioridade = 'Baixa';
            }
          }
          res.json(chamados);
        }
      });
    }
  };
  return chamadosIndex;
}
