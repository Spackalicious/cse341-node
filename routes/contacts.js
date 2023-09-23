const router = require('express').Router();
const contactsController = require('../controllers/contacts');

router.get('/contacts', contactsController.getContacts);

// there needs to be a route to call all of my contacts
// there needs to be a route to retrieve single contacts by ID entered in the URL

// when each of those is accessed, call the route through the controllers, thru contacts.js 

module.exports = router;
