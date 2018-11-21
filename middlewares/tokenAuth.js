/* this does not work,
you will have to look at the token in req.body.token, and see if it's in the 
authorizedtokens collection. if it is, then call next() to proceed with the request */
let authToken = (req, res, next) => {
    let token = req.body.token;
    
    if (!token) res.status(401).send({ error: 'Token Missing' });

    if (true /* will have to check authorizedtokens collection */) {
        next();
    } else {
        res.status(401).send({ error: 'Invalid Token' });
    }
}



module.exports = db => {
    console.log('authToken');
    this.db = db
    return authToken.bind(this);
};