var mongoose = require('mongoose');

var repoSchema = new mongoose.Schema({
  id: String,
  lastSynced: Number,
  repos: {
    local: Array,
    remote: Array
  }
});

module.exports = mongoose.model('Repo', repoSchema);
