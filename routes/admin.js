const express = require('express');
const router = express.Router();
const error = require('../controllers/errors');
let AuthorizedToken = require('../models/AuthorizedToken');
let ExternalApp = require('../models/ExternalApp');
const TokenGenerator = require('uuid-token-generator');
const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);

/* this routes are for admin ONLY, to add companies with having to hardcore, so you just hardcode the request lol */

module.exports = (app, db) => {
    /* Handle POST requests from the core-app. Returns user information */
    router.post('/add_app_token', (req, res) => {
        let token = tokgen.generate();

        let app_name = req.body.app_name;
        let app_url = req.body.app_url;
        let app_icon = req.body.app_icon; // url to image

        // see if apps already exists with the same metadata
        ExternalApp.findOne({ app_name, app_url, app_icon }, (err, ex_app) => {
            if (err) return error.handle(err);

            // if not, create new app in db
            if (ex_app == null) {
                // index app
                ExternalApp.create(
                    { app_name, app_url, app_icon, token },
                    function(err, small) {
                        if (err) return error.handle(err);

                        // add token to tokens collection
                        AuthorizedToken.create({ token }, function(err, small) {
                            if (err) return error.handle(err);

                            res.status(200).json({
                                msg: 'Great Success!'
                            });
                        });
                    }
                );
            // app already is indexed
            } else {
                res.status(400).json({
                    msg: 'App already indexed'
                });
            }
        });
    });

    app.use('/admin', router);
};
