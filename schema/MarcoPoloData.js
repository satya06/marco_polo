var mongoose = require('../db/connect');
var Schema = mongoose.Schema;

var MarcoPoloSchema = new Schema({
  numbers: String,
  result: String
});

var MarcoPoloData = mongoose.model('MarcoPoloData', MarcoPoloSchema);
module.exports = MarcoPoloData;
