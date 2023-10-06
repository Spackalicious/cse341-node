const routes = require('express').Router();
const contactsController = require('../controllers/contacts');

// routes.get('/', contactsController.blankMsg);
// routes.get('/contacts', contactsController.getContacts);
// routes.get('/contacts/:id', contactsController.getIndividual);

routes.get('/', contactsController.getContacts);
routes.get('/:id', contactsController.getIndividual);

routes.post('/', contactsController.newContact);
// routes.post('/contacts', contactsController.newContact);

routes.put('/:id', contactsController.updateContact);
// routes.put('/contacts/:id', contactsController.updateContact);

routes.delete('/:id', contactsController.removeContact);
// routes.delete('/contacts/:id', contactsController.removeContact);

module.exports = routes;
