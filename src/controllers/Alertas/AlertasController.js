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
            A.ID_ALERTA AS ID,
            A.DESCRICAO
          FROM ${schema}.ALERTAS A
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
      const idAlerta = req.params.id; 

      const sqlSelect = {
        text: ` 
          SELECT 
            ID_ALERTA AS ID,
            DESCRICAO
          FROM ${schema}.ALERTAS
          WHERE ID_ALERTA = $1
        `,
        values:[idAlerta]
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
        text: `INSERT INTO ${schema}.ALERTAS (DESCRICAO) VALUES ($1)`,
        values: [dados.DESCRICAO] 
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlInsert, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            res.json({
              statusCode: 200,
              title: "Cadastrar Alerta",
              cadastrado: true,
              message: "Alerta cadastrado com sucesso!",
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
      const idAlerta = req.params.id;

      const sqlUpdate = {
        text: `UPDATE ${schema}.ALERTAS SET DESCRICAO = $1 WHERE ID_ALERTA = $2`,
        values: [dados.DESCRICAO, idAlerta] 
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlUpdate, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            res.json({
              statusCode: 200,
              title: "Editar Alerta",
              cadastrado: true,
              message: "Alerta atualizado com sucesso!",
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
      const idAlerta = req.params.id;

      const sqlSelect = {
        text: `SELECT 1 FROM ${schema}.HISTORICO_ALERTAS WHERE ID_ALERTA = $1 FETCH FIRST ROW ONLY`,
        values: [idAlerta] 
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
                title: "Excluir Alerta",
                error: true,
                message: "Não foi possível excluir o alerta pois isso irá afetar o histórico.",
              });
            } else {
              const sqlUpdate = {
                text: `DELETE FROM ${schema}.ALERTAS WHERE ID_ALERTA = $1`,
                values: [idAlerta] 
              }
        
              pool.connect((err, client, done) => {
                if (err) throw err; 
                client.query(sqlUpdate, (err, result) => {
                  if (err) throw err;
                  else {    
                    done(); 
                    res.json({
                      statusCode: 200,
                      title: "Excluir Alerta",
                      deletado: true,
                      message: "Alerta excluído com sucesso!",
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