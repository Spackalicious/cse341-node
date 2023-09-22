const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const professionalRoutes = require('./routes/professional')
const port = process.env.PORT || 8080; 
const app = express();
var cors = require('cors');

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/professional', professionalRoutes);

// app.use(cors());

// app.use(bodyParser.json());
// app.use((req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // next();
// });
// app.use('/professional', professionalRoutes);

// this is from the pre-stretch assignment
// app.listen(port);
// console.log('Web Server is listening at port ' + port);

// adding data from mongodb instead for the stretch challenge: 
mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});