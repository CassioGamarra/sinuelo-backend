//import das libs
const express = require('express')
const routes = express.Router();
const verifyJWT = require('./middlewares/auth'); 
//import dos Controllers 
const LoginController = require('./controllers/Login/LoginController');   
const FazendaController = require('./controllers/Fazendas/FazendaController');

//Rotas 
routes.post('/admin/login', LoginController.administrador); //Login do administrador (no site)

//Fazendas
routes.get('/fazendas', verifyJWT, FazendaController.buscar);
routes.get('/fazendas/:id', verifyJWT, FazendaController.buscarPorId);
routes.post('/fazendas' , verifyJWT, FazendaController.cadastrar);
routes.put('/fazendas/:id' , verifyJWT, FazendaController.atualizar);
routes.delete('/fazendas/:id', verifyJWT, FazendaController.excluir);

module.exports = routes;