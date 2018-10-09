var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
    email: String,
    password: String,
    // series: [
    //   {
    //     name: String,
    //     season: String,
    //     episode: String
    //   }
    // ]
  });

module.exports = mongoose.model('user', userSchema);