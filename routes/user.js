const express = require('express');
const router = express.Router();

/*
Look at https://thealcoholicchicken.github.io/Documentation/
for req and response structures.
*/

module.exports = (app, db) => {
    const authToken = require('../middlewares/tokenAuth')(db);

    /* Don't worry about hashing passwords for now. We will have to discuss methods for both python and node.js first irl */
    router.post('/create_account', authToken, (req, res) => {
        // perfrom request
    });

    /* Don't worry about hashing passwords for now.*/
    router.post('/login', authToken, (req, res) => {
        // perfrom request
    });

    /* send the /user/get_badge_message post request to all external apps in 
    the DB (will be have to configiured first with the POST request in 'admin.js')
    then return a response like what's specifided in the docs */
    router.post('/get_badges', authToken, (req, res) => {
        // perfrom request
    });
    
    app.use('/user', router);
}