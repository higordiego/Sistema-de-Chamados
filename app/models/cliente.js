module.exports = function(app){
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var cliente = new Schema(
    {
      email: 		{ type: String, unique: true, required: true  },
      nome:     {type: String, required:true},
      telefone: {
        numero1: String,
        numero2: String
      },
      endereco:   {type:String, required:true},
      cidade:     {type:String, required:true},
      profissao:  {type:String},
      created_at: { type: Date, default: Date.now },
      updated_at: { type: Date, default: Date.now }
    }
  );

  return mongoose.model('Cliente', cliente);
}
