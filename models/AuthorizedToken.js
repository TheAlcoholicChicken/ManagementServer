const mongoose = require('mongoose');

let AuthorizedToken = new mongoose.Schema({
  token: String
});

/**
 * Export functions for the outside use.
 */
module.exports = {
    AuthorizedToken: mongoose.model('authorizedToken', AuthorizedToken),
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


