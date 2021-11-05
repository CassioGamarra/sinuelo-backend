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
            P.ID_PIQUETE AS ID,
            P.ID_FAZENDA,
            F.NOME AS FAZENDA, 
            P.NOME AS PIQUETE, 
            P.CAPACIDADE,
            (SELECT COUNT (A.ID_ANIMAL)
            FROM ${schema}.ANIMAIS A
            WHERE A.ID_PIQUETE = P.ID_PIQUETE) AS NUM_ANIMAIS
          FROM ${schema}.PIQUETES P
            INNER JOIN ${schema}.FAZENDAS F ON P.ID_FAZENDA = F.ID_FAZENDA
          GROUP BY P.ID_PIQUETE, F.NOME
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
      const idPiquete = req.params.id; 

      const sqlSelect = {
        text: ` 
          SELECT
            P.ID_PIQUETE AS ID,
            P.ID_FAZENDA,
            F.NOME AS FAZENDA, 
            P.NOME AS PIQUETE, 
            P.CAPACIDADE,
            (SELECT COUNT (A.ID_ANIMAL)
            FROM ${schema}.ANIMAIS A
            WHERE A.ID_PIQUETE = P.ID_PIQUETE) AS NUM_ANIMAIS
          FROM ${schema}.PIQUETES P
            INNER JOIN ${schema}.FAZENDAS F ON P.ID_FAZENDA = F.ID_FAZENDA
          WHERE P.ID_PIQUETE = $1 
        `,
        values:[idPiquete]
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
        text: `INSERT INTO ${schema}.PIQUETES (ID_FAZENDA, NOME, CAPACIDADE) VALUES ($1, $2, $3)`,
        values: [dados.ID_FAZENDA, dados.NOME, dados.CAPACIDADE] 
      } 

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlInsert, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            res.json({
              statusCode: 200,
              title: "Cadastrar Piquete",
              cadastrado: true,
              message: "Piquete cadastrado com sucesso!",
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
      const idPiquete = req.params.id;

      const sqlUpdate = {
        text: `UPDATE ${schema}.PIQUETES SET ID_FAZENDA = $1, NOME = $2, CAPACIDADE = $3 WHERE ID_PIQUETE = $4`,
        values: [dados.ID_FAZENDA, dados.NOME, dados.CAPACIDADE, idPiquete] 
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlUpdate, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            res.json({
              statusCode: 200,
              title: "Editar Piquete",
              cadastrado: true,
              message: "Piquete atualizado com sucesso!",
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
      const idPiquete = req.params.id;

      const sqlSelect = {
        text: `SELECT 1 FROM ${schema}.ANIMAIS WHERE ID_PIQUETE = $1 FETCH FIRST ROW ONLY`,
        values: [idPiquete] 
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlSelect, (err, result) => {
          if (err) throw err;
          else {    
            done();
            if(result.rows.length > 0 ) {
              res.json({
                statusCode: 400,
                title: "Excluir Piquete",
                error: true,
                message: "Não foi possível excluir o piquete pois existem animais cadastrados!",
              });
            } else {
              const sqlUpdate = {
                text: `DELETE FROM ${schema}.PIQUETES WHERE ID_PIQUETE = $1`,
                values: [idPiquete] 
              }
        
              pool.connect((err, client, done) => {
                if (err) throw err; 
                client.query(sqlUpdate, (err, result) => {
                  if (err) throw err;
                  else {    
                    done(); 
                    res.json({
                      statusCode: 200,
                      title: "Excluir Piquete",
                      deletado: true,
                      message: "Piquete excluído com sucesso!",
                    });
                  }
                }); 
              }); 
            } 
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