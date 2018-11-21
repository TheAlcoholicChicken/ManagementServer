const mongoose = require('mongoose');

let ExternalApp = new mongoose.Schema({
  app_name: String,
  app_url: String,
  app_icon: String, // url to image
  token: String, // unique token used to make requests for the external app
});

/**
 * Export functions for the outside use.
 */
module.exports =  mongoose.model('externalApp', ExternalApp);
