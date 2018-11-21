let authToken = (req, res, next) => {
    let token = req.body.token;
    
    if (!token) res.status(401).send({ error: 'Token Missing' });

    if (token === config.token) {
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