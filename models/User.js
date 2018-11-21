const mongoose = require('mongoose');

let User = new mongoose.Schema({
  user_id: String, // computed when user signs up
  connected_external_apps: [app_ids],
  credentials: {
    email: String,
    password: String // will be hashed
  }
});

/**
 * Export functions for the outside use.
 */
module.exports = {
    User: mongoose.model('user', User),
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
