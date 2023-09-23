const routes = require('express').Router();
const contactsController = require('../controllers/contacts');

routes.get('/', contactsController.blankMsg);
routes.get('/contacts', contactsController.getContacts);
routes.get('/contacts/:id', contactsController.getIndividual);

// there needs to be a route to call all of my contacts
// there needs to be a route to retrieve single contacts by ID entered in the URL

// when each of those is accessed, call the route through the controllers, thru contacts.js 

module.exports = routes;
