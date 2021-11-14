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
      const idAnimal = req.params.id; 

      const sqlSelect = {
        text: ` 
          SELECT 
            A.ID_ANIMAL AS ID,   
            A.ID_FAZENDA, 
            F.NOME AS FAZENDA,
            A.ID_PIQUETE,
            P.NOME AS PIQUETE, 
            A.ID_RACA, 
            R.NOME AS RACA,
            A.NOME, 
            A.SEXO, 
            TO_CHAR(A.DATA_NASCIMENTO, 'DD/MM/YYYY') AS DT_NASCIMENTO, 
            A.NOME_PAI, 
            A.NOME_MAE, 
            A.PESO, 
            A.PELAGEM
          FROM ${schema}.ANIMAIS A
            INNER JOIN ${schema}.FAZENDAS F ON A.ID_FAZENDA = F.ID_FAZENDA
            INNER JOIN ${schema}.RACAS R ON A.ID_RACA = R.ID_RACA
            LEFT JOIN ${schema}.PIQUETES P ON A.ID_PIQUETE  = P.ID_PIQUETE
          WHERE ID_ANIMAL = $1
        `,
        values:[idAnimal]
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
      const idAnimal = req.params.id; 

      console.log(dados.ID_PIQUETE)

      const sqlUpdate = {
        text: `UPDATE ${schema}.ANIMAIS SET ID_FAZENDA = $1, ID_PIQUETE = $2, ID_RACA = $3, NOME = $4, SEXO = $5, DATA_NASCIMENTO = $6, 
        NOME_PAI = $7, NOME_MAE = $8, PESO = $9, PELAGEM = $10 WHERE ID_ANIMAL = $11`,
        values: [dados.ID_FAZENDA, dados.ID_PIQUETE, dados.ID_RACA, dados.NOME, dados.SEXO, dados.DATA_NASCIMENTO, dados.NOME_PAI, dados.NOME_MAE, dados.PESO, dados.PELAGEM, idAnimal] 
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlUpdate, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            res.json({
              statusCode: 200,
              title: "Editar Animal",
              cadastrado: true,
              message: "Animal atualizado com sucesso!",
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
      const idAnimal = req.params.id;

      const sqlUpdate = {
        text: `DELETE FROM ${schema}.ANIMAIS WHERE ID_ANIMAL = $1`,
        values: [idAnimal] 
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlUpdate, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            res.json({
              statusCode: 200,
              title: "Excluir Animal",
              deletado: true,
              message: "Animal excluído com sucesso!",
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