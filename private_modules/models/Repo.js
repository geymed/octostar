var mongoose = require('mongoose');

var repoSchema = new mongoose.Schema({
  id: String,
  repos: {
    local: Array,
    remote: Array
  }
});

module.exports = mongoose.model('Repo', repoSchema);
