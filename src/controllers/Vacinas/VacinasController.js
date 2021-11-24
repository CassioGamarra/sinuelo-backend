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
            V.ID_VACINA AS ID,
            V.DESCRICAO,
            V.IND_OBRIGATORIO,
            V.MODO_USO,
            SUBSTRING(V.DETALHES, 0, 80) AS DETALHES 
          FROM ${schema}.VACINAS V
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
      const idVacina = req.params.id; 

      const sqlSelect = {
        text: ` 
          SELECT 
            ID_VACINA AS ID,
            DESCRICAO,
            IND_OBRIGATORIO,
            MODO_USO,
            DETALHES  
          FROM ${schema}.VACINAS
          WHERE ID_VACINA = $1
        `,
        values:[idVacina]
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
        text: `SELECT ID_VACINA FROM ${schema}.VACINAS WHERE DESCRICAO = $1`,
        values: [dados.DESCRICAO] 
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
                title: "Cadastrar Vacina",
                error: true,
                message: "Já existe um vacina com esta descrição!",
              });
            } else {   
              const sqlInsert = {
                text: `INSERT INTO ${schema}.VACINAS (DESCRICAO, IND_OBRIGATORIO, MODO_USO, DETALHES) VALUES ($1, $2, $3, $4)`,
                values: [dados.DESCRICAO, dados.IND_OBRIGATORIO, dados.MODO_USO, dados.DETALHES] 
              }

              pool.connect((err, client, done) => {
                if (err) throw err; 
                client.query(sqlInsert, (err, result) => {
                  if (err) throw err;
                  else {    
                    done(); 
                    res.json({
                      statusCode: 200,
                      title: "Cadastrar Vacina",
                      cadastrado: true,
                      message: "Vacina cadastrada com sucesso!",
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
      const idVacina = req.params.id;

      const sqlUpdate = {
        text: `UPDATE ${schema}.VACINAS SET DESCRICAO = $1, IND_OBRIGATORIO = $2, MODO_USO = $3, DETALHES = $4 WHERE ID_VACINA = $5`,
        values: [dados.DESCRICAO, dados.IND_OBRIGATORIO, dados.MODO_USO, dados.DETALHES, idVacina] 
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlUpdate, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            res.json({
              statusCode: 200,
              title: "Editar Vacina",
              cadastrado: true,
              message: "Vacina atualizada com sucesso!",
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
      const idVacina = req.params.id;

      const sqlSelect = {
        text: `SELECT 1 FROM ${schema}.HISTORICO_VACINAS WHERE ID_VACINA = $1 FETCH FIRST ROW ONLY`,
        values: [idVacina] 
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
                title: "Excluir Vacina",
                error: true,
                message: "Não foi possível excluir a vacina pois isso irá afetar o histórico.",
              });
            } else {
              const sqlUpdate = {
                text: `DELETE FROM ${schema}.VACINAS WHERE ID_VACINA = $1`,
                values: [idVacina] 
              }
        
              pool.connect((err, client, done) => {
                if (err) throw err; 
                client.query(sqlUpdate, (err, result) => {
                  if (err) throw err;
                  else {    
                    done(); 
                    res.json({
                      statusCode: 200,
                      title: "Excluir Vacina",
                      deletado: true,
                      message: "Vacina excluída com sucesso!",
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