module.exports = function(app){
  var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

  var servicos = new Schema(
    {
      nome:       { type: String, required: true},
      img:        { data: Buffer, contentType: String },
      descricao:  { type: String, required: true},
      created_at: { type: Date, default: Date.now },
      updated_at: { type: Date, default: Date.now }
    }
  );
  return mongoose.model('Servicos', servicos);
}
