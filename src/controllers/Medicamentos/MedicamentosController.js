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
            M.ID_MEDICAMENTO AS ID,
            M.DESCRICAO, 
            M.MODO_USO
          FROM ${schema}.MEDICAMENTOS M
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
      const idMedicamento = req.params.id; 

      const sqlSelect = {
        text: ` 
          SELECT 
            ID_MEDICAMENTO AS ID,
            DESCRICAO,
            MODO_USO
          FROM ${schema}.MEDICAMENTOS
          WHERE ID_MEDICAMENTO = $1
        `,
        values:[idMedicamento]
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
        text: `INSERT INTO ${schema}.MEDICAMENTOS (DESCRICAO, MODO_USO) VALUES ($1, $2)`,
        values: [dados.DESCRICAO, dados.MODO_USO] 
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlInsert, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            res.json({
              statusCode: 200,
              title: "Cadastrar Medicamento",
              cadastrado: true,
              message: "Medicamento cadastrado com sucesso!",
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
      const idMedicamento = req.params.id;

      const sqlUpdate = {
        text: `UPDATE ${schema}.MEDICAMENTOS SET DESCRICAO = $1, MODO_USO = $2 WHERE ID_MEDICAMENTO = $3`,
        values: [dados.DESCRICAO, dados.MODO_USO, idMedicamento] 
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlUpdate, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            res.json({
              statusCode: 200,
              title: "Editar Medicamento",
              cadastrado: true,
              message: "Medicamento atualizado com sucesso!",
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
      const idMedicamento = req.params.id;

      const sqlSelect = {
        text: `SELECT 1 FROM ${schema}.HISTORICO_MEDICAMENTOS WHERE ID_MEDICAMENTO = $1 FETCH FIRST ROW ONLY`,
        values: [idMedicamento] 
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
                title: "Excluir Medicamento",
                error: true,
                message: "Não foi possível excluir o medicamento pois isso irá afetar o histórico.",
              });
            } else {
              const sqlUpdate = {
                text: `DELETE FROM ${schema}.MEDICAMENTOS WHERE ID_MEDICAMENTO = $1`,
                values: [idMedicamento] 
              }
        
              pool.connect((err, client, done) => {
                if (err) throw err; 
                client.query(sqlUpdate, (err, result) => {
                  if (err) throw err;
                  else {    
                    done(); 
                    res.json({
                      statusCode: 200,
                      title: "Excluir Medicamento",
                      deletado: true,
                      message: "Medicamento excluído com sucesso!",
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