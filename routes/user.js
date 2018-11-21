const express = require('express');
const router = express.Router();

module.exports = (app, db) => {
    const authToken = require('../middlewares/tokenAuth')(db);

    /* Handle POST requests from the core-app. Returns user information */
    router.post('/get_badge_message', authToken, (req, res) => {
        // perfrom request
    });

    app.use('/user', router);
}