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
            B.ID_BRINCO AS ID, 
            CASE
              WHEN B.COD_RFID IS NOT NULL THEN B.COD_RFID
              WHEN B.COD_VISUAL IS NOT NULL THEN B.COD_VISUAL
              ELSE '-' END CODIGO,
            (SELECT A.NOME
              FROM ${schema}.ANIMAIS A
            WHERE A.ID_ANIMAL = B.ID_ANIMAL) AS ANIMAL 
          FROM ${schema}.BRINCOS B  
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

      const idAnimal = dados.ID_ANIMAL !== '' ? dados.ID_ANIMAL : null;
      const codRFID = dados.COD_RFID !== '' ? dados.COD_RFID : null; 
      const codVisual = dados.COD_VISUAL !== '' ? dados.COD_VISUAL : null; 

      const sqlInsert = {
        text: `INSERT INTO ${schema}.BRINCOS (ID_ANIMAL, COD_RFID, COD_VISUAL) VALUES ($1, $2, $3)`,
        values: [idAnimal, codRFID, codVisual] 
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlInsert, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            res.json({
              statusCode: 200,
              title: "Cadastrar Brinco",
              cadastrado: true,
              message: "Brinco cadastrado com sucesso!",
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