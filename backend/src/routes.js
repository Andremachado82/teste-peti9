const express = require('express');
const PetController = require('./app/controllers/PetController');

const routes = express.Router();

routes.post('/pets' , PetController.store);

routes.get('/pets' , PetController.index);
routes.get('/pets/:id' , PetController.find);  

routes.put('/pets/:id' , PetController.update);
routes.delete('/pets/:id' , PetController.delete);

module.exports = routes;