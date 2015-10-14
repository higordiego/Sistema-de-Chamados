module.exports = function(app){
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;


	var prioridade = new Schema(
		{
      nome:       { type: String, required: true},
			codigo: 		{ type: Number, unique: true, required: true  }
		}
	);

	return mongoose.model('Prioridade', prioridade);
}
