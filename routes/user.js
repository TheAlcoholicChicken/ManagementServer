const express = require('express');
const router = express.Router();
const errors = require('../controllers/errors')

/*
Look at https://thealcoholicchicken.github.io/Documentation/
for req and response structures.
*/

module.exports = (app, db) => {
    const authToken = require('../middlewares/tokenAuth')(db);
    const authTokenList = require('../models/AuthorizedToken');
    const User = require('../models/User');
    //const user_db = require('../models/User');

    /* Don't worry about hashing passwords for now. We will have to discuss methods for both python and node.js first irl */
    router.post('/create_account', authToken, (req, res) => {
        // perform request
        let email = req.body.user_email;
        let password = req.body.password;

        User.findOne(
            {  email, password  },
            (err, user) => {
                if (err) {
                    errors.handle(err);
                    res.status(400).json({ msg: err });
                }

                if (user == null) {
                    User.create(
                        {
                            connected_external_apps: null,
                            email,
                            password // will need to be hashed
                            
                        },
                        (err, User) => {
                            if (err) {
                                errors.handle(err);
                                res.status(400).json({ msg: err });
                            }

                            if (User) {
                                res.status(400).json({
                                    msg: 'Great Success!'
                                });
                            }
                        }
                    );
                } else {
                    res.status(400).json({
                        msg: 'User with ' + email + ' exists'
                    });
                }
            }
        );
    });
 
    /* Don't worry about hashing passwords for now.*/
    router.post('/login', authToken, (req, res) => {
        // perform request
        let email = req.body.user_email;
        let password = req.body.password;

        User.findOne(
            {  email, password  },
            (err, user) => {
                if (err) {
                    errors.handle(err);
                    res.status(400).json({ msg: err });
                }

                console.log(user);
                if (user != null) {
                    res.status(200).json({ msg: 'Login successful.' });
                } else {
                    res.status(400).json({
                        msg: 'Login unsuccessful.'
                    });
                }
            }
        );

    });

    /* send the /user/get_badge_message post request to all external apps in 
    the DB (will be have to configiured first with the POST request in 'admin.js')
    then return a response like what's specifided in the docs */
    router.post('/get_badges', authToken, (req, res) => {
        // perform request
        let email = req.body.user_email;

        User.findOne(
            {  email  },
            (err, user) => {
                if (err) {
                    errors.handle(err);
                    res.status(400).json({ msg: err });
                }  
                console.log(user);
                
                if (user != null) {
                    console.log(user)
                    res.status(200).json({
                        msg: 'fgdhjk.'
                    });
                } else {
                    res.status(400).json({
                        msg: 'No user found.'
                    });
                }

            });
    });
    
    app.use('/user', router);
}