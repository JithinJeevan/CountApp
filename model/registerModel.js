const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var registerSchema = new Schema({
  url: String,
  status: String,
  domain: String,
  count:Number
});

var Register = mongoose.model('counts',registerSchema);

module.exports = Register;