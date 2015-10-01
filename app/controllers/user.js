module.exports = function(app) {
  var User = app.models.user;
  var userIndex = {
    home: function(req,res){
      res.render('index');
    },
    login: function(req,res){
      res.redirect('/sgc');
    },
    loginerro: function(req,res){
      req.flash('msg', true);
      res.redirect('/');
    },
    cadastrar: function(req,res){
      var user = new User();
      user.nome = req.body.nome;
      user.email = req.body.email;
      user.password = req.body.password;
      if(req.body.admin == 2){
        user.admin = true;
      }
      user.save(function(err,user){
        res.json(user);
      });
    },
    alterar: function(req,res){
      var user = new User();
      user._id = req.params.id;
      user.nome = req.body.nome;
      user.email = req.body.email;
      user.password = req.body.password;
      if(req.body.admin == 2){
        user.admin = true;
      }
      User.update({_id: user._id}, {$set: {nome: user.nome, email:user.email,password: user.password, admin: user.admin}}, function(err,user){
        console.log(err);
      });
    },
    deslogar: function(req,res){
      req.logout();
      res.redirect('/');
    },
    listar: function(req,res){
      User.find(function(err,user){
        res.json(user);
      });
    },
    pesquisar: function(req,res){
      var user = new User();
      user._id = req.params.id;
      User.findOne({_id: user._id},function(err,user){
        res.json(user);
      });
    },
    deletar: function(req,res){
      var user = new User();
      user._id = req.params.id;
      user.remove({_id: user._id}, function(err,user){
        res.json(err);
      });
    }
  }
  return userIndex;
}
