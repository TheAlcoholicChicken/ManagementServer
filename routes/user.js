const express = require('express');
const router = express.Router();
const errors = require('../controllers/errors');
const request = require('request');

/*
Look at https://thealcoholicchicken.github.io/Documentation/
for req and response structures.
*/

module.exports = (app, db) => {
    const authToken = require('../middlewares/tokenAuth')(db);
    const connectToExternalApp = require('../middlewares/connectToExternalApp')(
        db
    );
    const User = require('../models/User');
    const ExternalApp = require('../models/ExternalApp');
    //const user_db = require('../models/User');

    /* Don't worry about hashing passwords for now. We will have to discuss methods for both python and node.js first irl */
    router.post('/create_account', authToken, (req, res) => {
        // perform request
        let email = req.body.user_email;
        let password = req.body.password;

        User.findOne({ email, password }, (err, user) => {
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
                    (err, user) => {
                        if (err) {
                            errors.handle(err);
                            res.status(400).json({ msg: err });
                        }

                        if (User) {
                            res.status(400).json({
                                msg: 'Great Success!',
                                user_id: user._id
                            });
                        }
                    }
                );
            } else {
                res.status(400).json({
                    msg: 'User with ' + email + ' exists'
                });
            }
        });
    });

    /* Don't worry about hashing passwords for now.*/
    router.post('/login', authToken, connectToExternalApp, (req, res) => {
        // perform request
        let email = req.body.user_email;
        let password = req.body.password;

        User.findOne({ email, password }, (err, user) => {
            if (err) {
                errors.handle(err);
                res.status(400).json({ msg: err });
            }

            console.log(user);
            if (user != null) {
                res.status(200).json({
                    msg: 'Login successful.',
                    user_id: user._id
                });
            } else {
                res.status(400).json({
                    msg: 'Login unsuccessful.'
                });
            }
        });
    });

    /* send the /user/get_badge_message post request to all external apps in 
    the DB (will be have to configiured first with the POST request in 'admin.js')
    then return a response like what's specifided in the docs */
    router.post('/get_badges', authToken, (req, res) => {
        // perform request
        let user_id = req.body.user_id;
        if (!user_id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({ msg: 'not a valid ID' });
        } else {
            User.findById(user_id, (err, user) => {
                if (err) {
                    errors.handle(err);
                    res.status(400).json({ msg: err });
                }

                console.log(user);
                if (user != null) {
                    console.log(user);

                    let connected_external_apps = user.connected_external_apps;

                    let get_badges = [];
                    if (connected_external_apps.length == 0) {
                        {
                            res.status(200).json([]);
                        }
                    }

                    for (let app_id in connected_external_apps) {
                        // console.log(app_id);

                        ExternalApp.findById(
                            connected_external_apps[app_id],
                            (err, app) => {
                                if (app) {
                                    request(
                                        {
                                            uri:
                                                app.app_url +
                                                'user/get_badge_message',
                                            method: 'POST',
                                            json: {
                                                user_id: user._id,
                                                token: app.auth_token
                                            }
                                        },
                                        function(error, response, body) {
                                            if (
                                                !error &&
                                                response.statusCode == 200
                                            ) {
                                                console.log(body);
                                                get_badges.push({
                                                    user_id: body.userid,
                                                    app_name: app.app_name,
                                                    app_url: app.app_url,
                                                    app_icon: app.app_icon, // url to image
                                                    badge_text: body.msg
                                                });
                                            } else {
                                                get_badges.push({
                                                    user_id: body.userid,
                                                    app_name: app.app_name,
                                                    app_url: app.app_url,
                                                    app_icon: app.app_icon, // url to image
                                                    badge_text: null
                                                });
                                            }

                                            if (
                                                get_badges.length ===
                                                connected_external_apps.length
                                            ) {
                                                res.status(200).json(
                                                    get_badges
                                                );
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }
                    // res.status(200).json({
                    //     msg: 'fgdhjk.'
                    // });
                } else {
                    res.status(400).json({
                        msg: 'No user found.'
                    });
                }
            });
        }
    });

    app.use('/user', router);
};
