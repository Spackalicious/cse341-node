const express = require('express');
const routes = express.Router();
const profController = require('../controllers/professional');
 
routes.get('/', profController.getData);
// this'll happen at localhost:8080/professional/
// routes.get('/second', profController.secondRoute);

module.exports = routes;