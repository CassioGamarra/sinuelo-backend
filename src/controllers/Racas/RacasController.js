const pool = require('../../database/connection'); 
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
            R.ID_RACA AS ID, 
            R.NOME,  
            (SELECT COUNT(A.ID_ANIMAL)
            FROM ${schema}.ANIMAIS A
            WHERE A.ID_RACA = R.ID_RACA) AS NUM_ANIMAIS
          FROM ${schema}.RACAS R 
          GROUP BY R.ID_RACA
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
      const idFazenda = req.params.id; 

      const sqlSelect = {
        text: ` 
          SELECT 
            ID_FAZENDA AS ID,
            NOME,
            CEP,
            CIDADE,
            ESTADO
          FROM ${schema}.FAZENDA
          WHERE ID_FAZENDA = $1
        `,
        values:[idFazenda]
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

      const sqlInsert = {
        text: `INSERT INTO ${schema}.RACAS (NOME) VALUES ($1)`,
        values: [dados.NOME] 
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlInsert, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            res.json({
              statusCode: 200,
              title: "Cadastrar Raça",
              cadastrado: true,
              message: "Raça cadastrada com sucesso!",
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