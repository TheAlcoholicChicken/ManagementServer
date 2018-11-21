const config = require('../config')
const mongoose = require('mongoose');

mongoose.connect(
    config.db_url,
    { useNewUrlParser: true }
);


module.exports = {
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