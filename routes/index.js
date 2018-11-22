const routes = [require('./user'), require('./admin')]

module.exports = (app, db) => {
    console.log('index.js');

    for (let i in routes) {
        routes[i](app, db);
    }
};
