const routes = require('express').Router();

const lesson1Controller = require('../controllers/lesson1');
routes.get('/paul', lesson1Controller.paulRoute);
routes.get('/gabby', lesson1Controller.gabbyRoute);
routes.get('/lydia', lesson1Controller.lydiaRoute);
routes.get('/millie', lesson1Controller.millieRoute);

// const contactsController = require('../controllers/contacts');
routes.use('/', require('./contacts'));
// routes.use('/contacts', require('./contacts.'));

module.exports = routes; 