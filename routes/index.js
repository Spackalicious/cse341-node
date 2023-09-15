const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');

routes.get('/', lesson1Controller.paulRoute);
routes.get('/gabby', lesson1Controller.gabbyRoute);
routes.get('/lydia', lesson1Controller.lydiaRoute);
routes.get('/millie', lesson1Controller.millieRoute);

module.exports = routes; 