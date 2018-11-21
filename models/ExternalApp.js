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
module.exports = {
    ExternalApp: mongoose.model('externalApp', ExternalApp),
    connect: callback => {
        mongoose.connection
            .once('open', () => {
                console.log('Connected successfully to MongoDB server!');
                callback();
            })
            .on('error', error => {
                console.log('Connection error:', error);
            });
    }
};
