module.exports = function(app){
  var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = mongoose.Schema.Types.ObjectId;

  var empresa = new Schema(
    {
      razao:        {type: String, required:true},
      fantasia:     {type: String, required:true},
      cnpj:         {type:String,  required:true, unique: true},
      endereco:     {type:String,  required:true},
      cidade:       {type: String, required:true},
      telefone: {
        numero1: String,
        numero2: String,
      },
      computadores: {type:Number},
      email:      {type:String, required:true},
      created_at: { type: Date, default: Date.now },
      updated_at: { type: Date, default: Date.now }
    }
  );

  return mongoose.model('Empresa', empresa);
}
