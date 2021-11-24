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
const FuncionariosController = require('./controllers/Funcionarios/FuncionariosController');
const BrincosController = require('./controllers/Brincos/BrincosController');
const AlertasController = require('./controllers/Alertas/AlertasController');
const VacinasController = require('./controllers/Vacinas/VacinasController');
const DoencasController = require('./controllers/Doencas/DoencasController');
const MedicamentosController = require('./controllers/Medicamentos/MedicamentosController');
//Sincronização
const SincronizarController = require('./controllers/Sincronizar/SincronizarController'); 
//Relatorios
const RelatoriosController = require('./controllers/Relatorios/RelatoriosController');

//Rotas 
routes.post('/admin/login', LoginController.administrador); //Login do administrador (no site)
routes.post('/login', LoginController.funcionario); //Login do funcionário (aplicativo)

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
//Funcionários
routes.get('/funcionarios', verifyJWT, FuncionariosController.buscar);
routes.get('/funcionarios/:id', verifyJWT, FuncionariosController.buscarPorId);
routes.post('/funcionarios' , verifyJWT, FuncionariosController.cadastrar);
routes.put('/funcionarios/:id' , verifyJWT, FuncionariosController.atualizar);
routes.delete('/funcionarios/:id', verifyJWT, FuncionariosController.excluir);
//Brincos
routes.get('/brincos', verifyJWT, BrincosController.buscar);
routes.get('/brincos/:id', verifyJWT, BrincosController.buscarPorId);
routes.post('/brincos' , verifyJWT, BrincosController.cadastrar);
routes.put('/brincos/:id' , verifyJWT, BrincosController.atualizar);
routes.delete('/brincos/:id', verifyJWT, BrincosController.excluir);
//Alertas
routes.get('/alertas', verifyJWT, AlertasController.buscar);
routes.get('/alertas/:id', verifyJWT, AlertasController.buscarPorId);
routes.post('/alertas' , verifyJWT, AlertasController.cadastrar);
routes.put('/alertas/:id' , verifyJWT, AlertasController.atualizar);
routes.delete('/alertas/:id', verifyJWT, AlertasController.excluir);
//Vacinas
routes.get('/vacinas', verifyJWT, VacinasController.buscar);
routes.get('/vacinas/:id', verifyJWT, VacinasController.buscarPorId);
routes.post('/vacinas' , verifyJWT, VacinasController.cadastrar);
routes.put('/vacinas/:id' , verifyJWT, VacinasController.atualizar);
routes.delete('/vacinas/:id', verifyJWT, VacinasController.excluir);
//Doenças
routes.get('/doencas', verifyJWT, DoencasController.buscar);
routes.get('/doencas/:id', verifyJWT, DoencasController.buscarPorId);
routes.post('/doencas' , verifyJWT, DoencasController.cadastrar);
routes.put('/doencas/:id' , verifyJWT, DoencasController.atualizar);
routes.delete('/doencas/:id', verifyJWT, DoencasController.excluir);
//Medicamentos
routes.get('/medicamentos', verifyJWT, MedicamentosController.buscar);
routes.get('/medicamentos/:id', verifyJWT, MedicamentosController.buscarPorId);
routes.post('/medicamentos' , verifyJWT, MedicamentosController.cadastrar);
routes.put('/medicamentos/:id' , verifyJWT, MedicamentosController.atualizar);
routes.delete('/medicamentos/:id', verifyJWT, MedicamentosController.excluir);
//Sincronizar
routes.get('/sincronizar', verifyJWT, SincronizarController.buscar);
routes.post('/sincronizar', verifyJWT, SincronizarController.cadastrar);
//Relatorios
routes.get('/relatorios/:id', verifyJWT, RelatoriosController.buscarPorId);

module.exports = routes;