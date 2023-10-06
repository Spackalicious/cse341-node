const routes = require('express').Router();

// routes.use('/', require('./lesson1'));
// routes.use('/', require('./contacts'));
routes.use('/contacts', require('./contacts'));
routes.use('/', require('./swagger'));

module.exports = routes; 