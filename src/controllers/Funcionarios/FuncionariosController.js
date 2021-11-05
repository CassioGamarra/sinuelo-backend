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

      const sqlSelect = {
        text: `SELECT ID_FUNCIONARIO FROM ${schema}.FUNCIONARIOS WHERE USUARIO = $1`,
        values: [dados.USUARIO] 
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
                title: "Adicionar Funcionário",
                error: true,
                message: "Já existe um funcionário com este usuário!",
              });
            } else { 
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
      const idFuncionario = req.params.id;

      const sqlSelect = {
        text: `SELECT ID_FUNCIONARIO FROM ${schema}.FUNCIONARIOS WHERE USUARIO = $1`,
        values: [dados.USUARIO] 
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlSelect, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            if(result.rows.length > 0 && dados.USUARIO !== dados.USUARIO_ORIGINAL) {
              res.json({
                statusCode: 400,
                title: "Editar Funcionário",
                error: true,
                message: "Já existe um funcionário com este usuário!",
              });
            } else { 
              if(dados.SENHA) {
                const salt = bcrypt.genSaltSync(10);
                const password = bcrypt.hashSync(dados.SENHA, salt);
              
                const sqlUpdate = {
                  text: `UPDATE ${schema}.FUNCIONARIOS SET NOME = $1, USUARIO = $2, SENHA = $3, EMAIL = $4, ATIVO = $5 WHERE ID_FUNCIONARIO = $6`,
                  values: [dados.NOME, dados.USUARIO, dados.SENHA, dados.EMAIL, dados.ATIVO, idFuncionario] 
                }
          
                pool.connect((err, client, done) => {
                  if (err) throw err; 
                  client.query(sqlUpdate, (err, result) => {
                    if (err) throw err;
                    else {    
                      done(); 
                      res.json({
                        statusCode: 200,
                        title: "Editar Funcionário",
                        cadastrado: true,
                        message: "Funcionário atualizado com sucesso!",
                      });
                    }
                  }); 
                }); 
              } else {
                const sqlUpdate = {
                  text: `UPDATE ${schema}.FUNCIONARIOS SET NOME = $1, SENHA = $2, EMAIL = $3, ATIVO = $4 WHERE ID_FUNCIONARIO = $5`,
                  values: [dados.NOME, dados.USUARIO, dados.EMAIL, dados.ATIVO, idFuncionario] 
                }
          
                pool.connect((err, client, done) => {
                  if (err) throw err; 
                  client.query(sqlUpdate, (err, result) => {
                    if (err) throw err;
                    else {    
                      done(); 
                      res.json({
                        statusCode: 200,
                        title: "Editar Funcionário",
                        cadastrado: true,
                        message: "Funcionário atualizado com sucesso!",
                      });
                    }
                  }); 
                }); 
              } 
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
      const idFuncionario = req.params.id; 

      const sqlSelect = {
        text: ` 
          SELECT 1 FROM ${schema}.HISTORICO_ALERTAS WHERE ID_FUNCIONARIO = $1 
          UNION
          SELECT 1 FROM ${schema}.HISTORICO_PESAGENS WHERE ID_FUNCIONARIO = $1  
          UNION
          SELECT 1 FROM ${schema}.HISTORICO_VACINAS WHERE ID_FUNCIONARIO = $1 
          UNION
          SELECT 1 FROM ${schema}.HISTORICO_DOENCAS WHERE ID_FUNCIONARIO = $1 
          UNION
          SELECT 1 FROM ${schema}.HISTORICO_MEDICAMENTOS WHERE ID_FUNCIONARIO = $1 FETCH FIRST ROW ONLY 
        `,
        values: [idFuncionario] 
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlSelect, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            if(result.rows.length > 0 ) { 
              const sqlUpdate = {
                text: `UPDATE ${schema}.FUNCIONARIOS SET ATIVO = FALSE WHERE ID_FUNCIONARIO = $1`,
                values: [idFuncionario] 
              }
        
              pool.connect((err, client, done) => {
                if (err) throw err; 
                client.query(sqlUpdate, (err, result) => {
                  if (err) throw err;
                  else {    
                    done(); 
                    res.json({
                      statusCode: 200,
                      title: "Excluir Funcionário",
                      deletado: true,
                      message: "O funcionário foi desativado para manter o histórico de ações!",
                    });
                  }
                }); 
              }); 
            } else {
              const sqlUpdate = {
                text: `DELETE FROM ${schema}.FUNCIONARIOS WHERE ID_FUNCIONARIO = $1`,
                values: [idFuncionario] 
              }
        
              pool.connect((err, client, done) => {
                if (err) throw err; 
                client.query(sqlUpdate, (err, result) => {
                  if (err) throw err;
                  else {    
                    done(); 
                    res.json({
                      statusCode: 200,
                      title: "Excluir Funcionário",
                      deletado: true,
                      message: "Funcionário excluído com sucesso!",
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