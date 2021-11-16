const pool = require('../../database/connection'); //Import connection
const bcrypt = require('bcryptjs'); //Import bcrypt
const jwt = require('jsonwebtoken');
require('dotenv/config');

//Gera um token que expira em 12 horas -> 43200
function generateToken(params = {}) {
  return jwt.sign(params, process.env.AUTHKEY, {
    expiresIn: 43200,
  });
}

module.exports = { 

  async administrador(req, res) { 
    const { usuario, senha } = req.body; 

    if (senha && senha.length < 200) {
      //Cria o SQL para consulta 
      const sqlSelect = {
        text: `
          SELECT U.ID_USUARIO, U.SENHA, C.NOME_SCHEMA
          FROM SINUELO.USUARIOS U
            JOIN SINUELO.CLIENTES C ON U.ID_CLIENTE = C.ID_CLIENTE
          WHERE U.USUARIO = $1 AND U.ATIVO = TRUE 
        `,
        values: [usuario]
      }
      pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(sqlSelect, (err, result) => {
          if (err) throw err;
          done();
          if (result.rows.length === 0) {
            res.json({
              statusCode: 404,
              title: "Erro",
              message: "Login não encontrado!"
            })
          } else {
            const comparaSenha = bcrypt.compareSync(senha, result.rows[0].senha); 
            if(comparaSenha) {
              const token = generateToken({ idUsuario: result.rows[0].id_usuario, isAdmin: true, isActive: true, cliente: result.rows[0].nome_schema }); 
              res.json({
                statusCode: 200, 
                token: token
              });
            } else {
              res.json({
                statusCode: 403,
                title: "Erro",
                message: "Senha incorreta!"
              })
            }
          }
        });
      });
    } else {
      res.status(400).json({
        statusCode: 400,
        message: "Preencha os campos obrigatórios."
      });
    }
  },

  async funcionario(req, res) {  
    const { usuario, senha, tokenFazenda } = req.body;  

    if (senha && senha.length < 200) {
      //Cria o SQL para consulta
      const sqlSelect = {
        text: `SELECT NOME_SCHEMA FROM SINUELO.CLIENTES WHERE CAMINHO = $1`,
        values: [tokenFazenda]
      }

      pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(sqlSelect, (err, result) => {
          if (err) throw err;
          done();
          if (result.rows.length === 0) {
            res.json({
              statusCode: 404,
              title: "Erro",
              message: "Verifique os dados e tente novamente!"
            })
          } else {
            const schema = result.rows[0].nome_schema;

            const sqlSelect = {
              text: `SELECT ID_FUNCIONARIO, USUARIO, SENHA FROM ${schema}.FUNCIONARIOS WHERE USUARIO = $1 AND ATIVO = TRUE`,
              values: [usuario]
            }
      
            pool.connect((err, client, done) => {
              if (err) throw err;
              client.query(sqlSelect, (err, result) => {
                if (err) throw err;
                done();
                if (result.rows.length === 0) {
                  res.json({
                    statusCode: 404,
                    title: "Erro",
                    message: "Login não encontrado!"
                  })
                } else {
                  const comparaSenha = bcrypt.compareSync(senha, result.rows[0].senha); 
                  if(comparaSenha) {
                    const token = generateToken({ idUsuario: result.rows[0].id_funcionario, cliente: schema, isActive: true }); 
                    res.json({
                      statusCode: 200,
                      usuario: result.rows[0].usuario, 
                      token: token
                    });
                  } else {
                    res.json({
                      statusCode: 403,
                      title: "Erro",
                      message: "Usuário ou senha incorretos!"
                    });
                  }
                }
              });
            });
          }
        });
      }); 
    } else {
      res.status(400).json({
        statusCode: 400,
        message: "Preencha os campos obrigatórios."
      });
    }
  },
}