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
            A.ID_ANIMAL AS ID,
            A.NOME, 
            CASE
              WHEN B.COD_RFID IS NOT NULL THEN B.COD_RFID
              WHEN B.COD_VISUAL IS NOT NULL THEN B.COD_VISUAL
              ELSE '-' END BRINCO,
            A.PESO AS PESO_ORIGINAL,  
            CASE
              WHEN HP.PESO IS NOT NULL THEN CAST(HP.PESO AS VARCHAR)
              ELSE '-'
            END PESO_ATUAL,  
            R.NOME AS RACA,
            A.SEXO
          FROM ${schema}.ANIMAIS A
            INNER JOIN ${schema}.RACAS R ON A.ID_RACA = R.ID_RACA
            LEFT JOIN ${schema}.BRINCOS B ON A.ID_ANIMAL = B.ID_ANIMAL
            LEFT JOIN ${schema}.HISTORICO_PESAGENS HP ON A.ID_ANIMAL = HP.ID_ANIMAL
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
        text: `INSERT INTO ${schema}.ANIMAIS (ID_FAZENDA, ID_PIQUETE, ID_RACA, NOME, SEXO, DATA_NASCIMENTO, NOME_PAI, NOME_MAE, PESO, PELAGEM) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        values: [dados.ID_FAZENDA, dados.ID_PIQUETE, dados.ID_RACA, dados.NOME, dados.SEXO, dados.DATA_NASCIMENTO, dados.NOME_PAI, dados.NOME_MAE, dados.PESO, dados.PELAGEM] 
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlInsert, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            res.json({
              statusCode: 200,
              title: "Cadastrar Animal",
              cadastrado: true,
              message: "Animal cadastrada com sucesso!",
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