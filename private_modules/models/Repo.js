var mongoose = require('mongoose');

var repoSchema = new mongoose.Schema({
  id: String,
  repos: Array
});

module.exports = mongoose.model('Repo', repoSchema);
