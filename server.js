var express = require('express');
var bodyParser = require('body-parser');
var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log('Listening on:' + port);
});