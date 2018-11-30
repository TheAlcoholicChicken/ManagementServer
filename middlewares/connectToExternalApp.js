const ExternalApp = require('../models/ExternalApp');
const User = require('../models/User');
const error = require('../controllers/errors');

/* this does not work,
you will have to look at the token in req.body.token, and see if it's in the 
authorizedtokens collection. if it is, then call next() to proceed with the request */
let connectToExternalApp = (req, res, next) => {
    let token = req.body.token;
    let email = req.body.user_email;

    if (!token) res.status(401).send({ error: 'Token Missing' });

    ExternalApp.findOne({ token }, (err, app) => {
        if (err) return error.handle(err);
        if (app) {
            User.findOne({ email }, (err, user) => {
                if (err) return error.handle(err);
                if (user) {

                    if (user.connected_external_apps == null)
                        user.connected_external_apps = [];

                    if (user.connected_external_apps.includes('' + app._id)) {
                        console.log('not first time from', app._id);
                        next();
                    } else {
                        console.log('first time from', app._id);
                        user.connected_external_apps.push(app._id);
                        User.update(
                            { _id: user._id },
                            {
                                connected_external_apps:
                                    user.connected_external_apps
                            },
                            err => {
                                if (err) return error.handle(err);
                                next();
                            }
                        );
                    }
                } else {
                    res.status(400).json({ msg: 'Token is not valid' });
                }
            });
        } else {
            res.status(400).json({ msg: 'Token is not valid' });
        }
    });
};

module.exports = db => {
    this.db = db;
    return connectToExternalApp.bind(this);
};
