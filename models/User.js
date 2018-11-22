const mongoose = require('mongoose');

let User = new mongoose.Schema({
  connected_external_apps: [String],
  email: String,
  password: String // will be hashed
  
});

/**
 * Export functions for the outside use.
 */
module.exports = mongoose.model('user', User);
