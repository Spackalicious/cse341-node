const express = require('express');
const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');

const port = process.env.PORT || 3000;
const app = express();
// const cors = require('cors');

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'))
//  .use(cors());
 
// app.listen(port);
// console.log('Web Server is listening at port ' + (port));

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});