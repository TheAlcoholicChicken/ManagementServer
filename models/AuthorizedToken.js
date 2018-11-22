const mongoose = require('mongoose');

let AuthorizedToken = new mongoose.Schema({
  token: String,
});

/**
 * Export functions for the outside use.
 */
module.exports = mongoose.model('authorizedToken', AuthorizedToken);


