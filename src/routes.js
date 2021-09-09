//import das libs
const express = require('express')
const routes = express.Router();
const verifyJWT = require('./middlewares/auth'); 
//import dos Controllers 
const LoginController = require('./controllers/Login/LoginController');   
const FazendasController = require('./controllers/Fazendas/FazendasController');
const PiquetesController = require('./controllers/Piquetes/PiquetesController');
const RacasController = require('./controllers/Racas/RacasController');
const AnimaisController = require('./controllers/Animais/AnimaisController');

//Rotas 
routes.post('/admin/login', LoginController.administrador); //Login do administrador (no site)

//Fazendas
routes.get('/fazendas', verifyJWT, FazendasController.buscar);
routes.get('/fazendas/:id', verifyJWT, FazendasController.buscarPorId);
routes.get('/fazendas/:id/piquetes', verifyJWT, FazendasController.buscarPiquetes);
routes.post('/fazendas' , verifyJWT, FazendasController.cadastrar);
routes.put('/fazendas/:id' , verifyJWT, FazendasController.atualizar);
routes.delete('/fazendas/:id', verifyJWT, FazendasController.excluir);
//Piquetes
routes.get('/piquetes', verifyJWT, PiquetesController.buscar);
routes.get('/piquetes/:id', verifyJWT, PiquetesController.buscarPorId);
routes.post('/piquetes' , verifyJWT, PiquetesController.cadastrar);
routes.put('/piquetes/:id' , verifyJWT, PiquetesController.atualizar);
routes.delete('/piquetes/:id', verifyJWT, PiquetesController.excluir);
//Raças
routes.get('/racas', verifyJWT, RacasController.buscar);
routes.get('/racas/:id', verifyJWT, RacasController.buscarPorId);
routes.post('/racas' , verifyJWT, RacasController.cadastrar);
routes.put('/racas/:id' , verifyJWT, RacasController.atualizar);
routes.delete('/racas/:id', verifyJWT, RacasController.excluir);
//Animais
routes.get('/animais', verifyJWT, AnimaisController.buscar);
routes.get('/animais/:id', verifyJWT, AnimaisController.buscarPorId);
routes.post('/animais' , verifyJWT, AnimaisController.cadastrar);
routes.put('/animais/:id' , verifyJWT, AnimaisController.atualizar);
routes.delete('/animais/:id', verifyJWT, AnimaisController.excluir);


module.exports = routes;