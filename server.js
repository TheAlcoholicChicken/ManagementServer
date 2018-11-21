var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db_con = require('./controllers/db')


const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



db_con.connect(() => {
    require('./routes')(app, db_con);
});

app.listen(port, () => {
    console.log('Listening on:' + port);
});

