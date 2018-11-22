const express = require('express');
const router = express.Router();

/*
Look at https://thealcoholicchicken.github.io/Documentation/
for req and response structures.
*/

module.exports = (app, db) => {
    const authToken = require('../middlewares/tokenAuth')(db);
    const authTokenList = require('../models/AuthorizedToken');
    //const user_db = require('../models/User');

    /* Don't worry about hashing passwords for now. We will have to discuss methods for both python and node.js first irl */
    router.post('/create_account', authToken, (req, res) => {
        // perform request
        let user_email = req.body.user_email;
        let password = req.body.password;
        let token = req.body.token;

        res.status(200).json({msg: "Account created."})

    });
 
    /* Don't worry about hashing passwords for now.*/
    router.post('/login', authToken, (req, res) => {
        // perform request
        let user_email = req.body.user_email;
        let password = req.body.password;
        let token = req.body.token;

        res.status(200).json({msg: "Login successful."})
    });

    /* send the /user/get_badge_message post request to all external apps in 
    the DB (will be have to configiured first with the POST request in 'admin.js')
    then return a response like what's specifided in the docs */
    router.post('/get_badges', authToken, (req, res) => {
        // perform request
        let user_id = req.body.user_id;
        let token = req.body.token;

        res.status(200).json({msg: "Badges retrieved."})
    });
    
    app.use('/user', router);
}