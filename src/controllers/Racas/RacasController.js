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
      const idRaca = req.params.id; 

      const sqlSelect = {
        text: ` 
          SELECT  
            NOME
          FROM ${schema}.RACAS
          WHERE ID_RACA = $1
        `,
        values:[idRaca]
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

      const sqlSelect = {
        text: `SELECT ID_RACA FROM ${schema}.RACAS WHERE NOME = $1`,
        values: [dados.NOME] 
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlSelect, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            if(result.rows.length > 0) {
              res.json({
                statusCode: 400,
                title: "Adicionar Raça",
                error: true,
                message: "Já existe um raça com este nome!",
              });
            } else {  
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

  //PUT
  async atualizar(req, res) {
    const isAdmin = req.isAdmin;
    
    if (isAdmin) {
      const schema = req.schema;
      const dados = req.body;
      const idRaca = req.params.id; 

      const sqlSelect = {
        text: `SELECT ID_RACA FROM ${schema}.RACAS WHERE NOME = $1`,
        values: [dados.NOME] 
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlSelect, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            if(result.rows.length > 0 && dados.NOME !== dados.NOME_ORIGINAL) {
              res.json({
                statusCode: 400,
                title: "Editar Raça",
                error: true,
                message: "Já existe um raça com este nome!",
              });
            } else {  
              const sqlUpdate = {
                text: `UPDATE ${schema}.RACAS SET NOME = $1 WHERE ID_RACA = $2`,
                values: [dados.NOME, idRaca]
              }

              pool.connect((err, client, done) => {
                if (err) throw err;
                client.query(sqlUpdate, (err, result) => {
                  if (err) throw err;
                  else {
                    done();
                    res.json({
                      statusCode: 200,
                      title: "Editar Raça",
                      cadastrado: true,
                      message: "Raça atualizada com sucesso!",
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

  //DELETE
  async excluir(req, res) {
    const isAdmin = req.isAdmin;
    
    if (isAdmin) {
      const schema = req.schema; 
      const idRaca = req.params.id; 

      const sqlSelect = {
        text: `SELECT 1 FROM ${schema}.ANIMAIS WHERE ID_RACA = $1 FETCH FIRST ROW ONLY`,
        values: [idRaca] 
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
                title: "Excluir Raça",
                error: true,
                message: "Não foi possível excluir a raça pois existem animais cadastrados!",
              });
            } else {
              const sqlUpdate = {
                text: `DELETE FROM ${schema}.RACAS WHERE ID_RACA = $1`,
                values: [idRaca] 
              }
        
              pool.connect((err, client, done) => {
                if (err) throw err; 
                client.query(sqlUpdate, (err, result) => {
                  if (err) throw err;
                  else {    
                    done(); 
                    res.json({
                      statusCode: 200,
                      title: "Excluir Raça",
                      deletado: true,
                      message: "Raça excluída com sucesso!",
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