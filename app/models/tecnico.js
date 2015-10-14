module.exports = function(app){
  var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = mongoose.Schema.Types.ObjectId;

  var tecnico = new Schema(
    {
      nome:       { type: String, required:true},
      email: 		  { type: String, unique: true, required: true },
      telefone: {
        numero1: String,
        numero2: String
      },
      created_at: { type: Date, default: Date.now },
      updated_at: { type: Date, default: Date.now }
    }
  );

  return mongoose.model('Tecnico', tecnico);
}
