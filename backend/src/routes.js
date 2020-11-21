const express = require('express');
const ActivityController = require('./controllers/ActivityController');

const routes = express.Router();

/**
 * Incidents
 */
routes.get('/index', ActivityController.index);
routes.post('/create', ActivityController.create);
routes.delete('/delete/:id', ActivityController.delete);
routes.put('/edit/:id', ActivityController.update);

module.exports =  routes;