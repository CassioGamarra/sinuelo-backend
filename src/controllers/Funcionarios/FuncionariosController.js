const pool = require('../../database/connection'); 
const bcrypt = require('bcryptjs');
require('dotenv/config');

module.exports = {

  //GET
  async buscar(req, res) {
    const isAdmin = req.isAdmin;
    
    if (isAdmin) {
      const schema = req.schema;

      const sqlSelect = {
        text: ` 
          SELECT 
            F.ID_FUNCIONARIO AS ID, 
            F.NOME, 
            F.USUARIO,
            CASE 
              WHEN F.ATIVO = TRUE THEN 'Sim'
              ELSE 'Não'
            END AS ATIVO
          FROM ${schema}.FUNCIONARIOS F  
        `
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlSelect, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            res.json(result.rows);
          }
        }); 
      }); 
    } else {
      res.json({
          statusCode: 401,
          title: "Erro",
          message: "Não autorizado!"
      });
    } 
  },

  //GET com ID
  async buscarPorId(req, res) {
    const isAdmin = req.isAdmin;
    
    if (isAdmin) {
      const schema = req.schema;
      const idFuncionario = req.params.id; 

      const sqlSelect = {
        text: ` 
          SELECT 
            ID_FUNCIONARIO AS ID,
            NOME,
            USUARIO,
            EMAIL,
            ATIVO
          FROM ${schema}.FUNCIONARIOS
          WHERE ID_FUNCIONARIO = $1
        `,
        values:[idFuncionario]
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlSelect, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            res.json(result.rows);
          }
        }); 
      }); 
    } else {
      res.json({
          statusCode: 401,
          title: "Erro",
          message: "Não autorizado!"
      });
    }
  },

  //POST
  async cadastrar(req, res) {
    const isAdmin = req.isAdmin;
    
    if (isAdmin) {
      const schema = req.schema;
      const dados = req.body;

      const salt = bcrypt.genSaltSync(10);
      const password = bcrypt.hashSync(dados.SENHA, salt);


      const sqlInsert = {
        text: `INSERT INTO ${schema}.FUNCIONARIOS (NOME, USUARIO, SENHA, EMAIL, ATIVO, NIVEL) VALUES ($1, $2, $3, $4, $5, $6)`,
        values: [dados.NOME, dados.USUARIO, password, dados.EMAIL, dados.ATIVO, 1] 
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlInsert, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            res.json({
              statusCode: 200,
              title: "Cadastrar Funcionário",
              cadastrado: true,
              message: "Funcionário cadastrado com sucesso!",
            });
          }
        }); 
      }); 
    } else {
      res.json({
          statusCode: 401,
          title: "Erro",
          message: "Não autorizado!"
      });
    } 
  },

  //PUT
  async atualizar(req, res) {
    const isAdmin = req.isAdmin;
    
    if (isAdmin) {
      const schema = req.schema;
      const dados = req.body;
      const idFazenda = req.params.id;

      const sqlUpdate = {
        text: `UPDATE ${schema}.FAZENDA SET NOME = $1, CEP = $2, CIDADE = $3, ESTADO = $4 WHERE ID_FAZENDA = $5`,
        values: [dados.NOME, dados.CEP, dados.CIDADE, dados.ESTADO, idFazenda] 
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlUpdate, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            res.json({
              statusCode: 200,
              title: "Editar Fazenda",
              cadastrado: true,
              message: "Fazenda atualizada com sucesso!",
            });
          }
        }); 
      }); 
    } else {
      res.json({
          statusCode: 401,
          title: "Erro",
          message: "Não autorizado!"
      });
    } 
  },

  //DELETE
  async excluir(req, res) {
    const isAdmin = req.isAdmin;
    
    if (isAdmin) {
      const schema = req.schema; 
      const idFazenda = req.params.id;

      const sqlUpdate = {
        text: `DELETE FROM ${schema}.FAZENDA WHERE ID_FAZENDA = $1`,
        values: [idFazenda] 
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlUpdate, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            res.json({
              statusCode: 200,
              title: "Excluir Fazenda",
              deletado: true,
              message: "Fazenda excluída com sucesso!",
            });
          }
        }); 
      }); 
    } else {
      res.json({
          statusCode: 401,
          title: "Erro",
          message: "Não autorizado!"
      });
    } 
  }, 
}