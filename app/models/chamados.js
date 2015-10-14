module.exports = function(app){
  var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = mongoose.Schema.Types.ObjectId;

  var chamado = new Schema(
    {
      user: 		    {type: ObjectId, ref: 'User'},
      problema:     {type:String,  required:true},
      prioridade:   {type:String,  required:true},
      observacao:   {type:String,  default:""},
      data:         {type:Date,  default: Date.now },
      tecnico: 		  {type:ObjectId, ref: 'Tecnico'},
      agendamento:  {type:Date,},
      solucao:      {type:String, default:""},
      resolvido:    {type: Number, default: 0},
      created_at: { type: Date, default: Date.now },
      updated_at: { type: Date, default: Date.now }
    }
  );


  return mongoose.model('Chamado', chamado);
}
