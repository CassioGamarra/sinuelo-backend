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
      const idBrinco = req.params.id; 

      const sqlSelect = {
        text: ` 
          SELECT 
            B.ID_BRINCO AS ID,
            B.ID_ANIMAL,
            B.COD_RFID,
            B.COD_VISUAL,
            A.NOME AS ANIMAL
          FROM ${schema}.BRINCOS B
            LEFT JOIN ${schema}.ANIMAIS A ON B.ID_ANIMAL = A.ID_ANIMAL
          WHERE ID_BRINCO = $1
        `,
        values:[idBrinco]
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

      const codigo = codRFID ? codRFID : codVisual
      const sqlSelect = {
        text: `SELECT ID_BRINCO FROM ${schema}.BRINCOS WHERE COD_RFID = $1 OR COD_VISUAL = $1`,
        values: [codigo] 
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
                title: "Cadastrar Brinco",
                error: true,
                message: "Já existe um brinco com este código!",
              });
            } else {   
              if(idAnimal) {
                const sqlSelect = {
                  text: `SELECT COD_RFID, COD_VISUAL FROM ${schema}.BRINCOS WHERE ID_ANIMAL = $1`,
                  values: [idAnimal] 
                }
                pool.connect((err, client, done) => {
                  if (err) throw err; 
                  client.query(sqlSelect, (err, result) => {
                    if (err) throw err;
                    else {    
                      done(); 
                      if(result.rows.length > 0) { 
                        const codigoBrinco = result.rows[0].cod_rfid ? result.rows[0].cod_rfid : result.rows[0].cod_visual 
                        res.json({
                          statusCode: 400,
                          title: "Cadastrar Brinco",
                          error: true,
                          message: `O animal selecionado já possui o brinco ${codigoBrinco}`,
                        });
                      } else {
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
                      }
                    }
                  }); 
                }); 
              } else {
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

  //PUT
  async atualizar(req, res) {
    const isAdmin = req.isAdmin;
    
    if (isAdmin) {
      const schema = req.schema;
      const dados = req.body;
      const idBrinco = req.params.id;

      const sqlUpdate = {
        text: `UPDATE ${schema}.BRINCOS SET ID_ANIMAL = $1, COD_RFID = $2, COD_VISUAL = $3 WHERE ID_BRINCO = $4`,
        values: [dados.ID_ANIMAL, dados.COD_RFID, dados.COD_VISUAL, idBrinco] 
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlUpdate, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            res.json({
              statusCode: 200,
              title: "Editar Brinco",
              cadastrado: true,
              message: "Brinco atualizado com sucesso!",
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
      const idBrinco = req.params.id;

      const sqlSelect = {
        text: `SELECT 1 FROM ${schema}.BRINCOS WHERE ID_ANIMAL IS NOT NULL AND ID_BRINCO = $1 FETCH FIRST ROW ONLY`,
        values: [idBrinco] 
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
                title: "Excluir Brinco",
                error: true,
                message: "Não foi possível excluir o brinco pois existe um animal vinculado!",
              });
            } else {
              const sqlUpdate = {
                text: `DELETE FROM ${schema}.BRINCOS WHERE ID_BRINCO = $1`,
                values: [idBrinco] 
              }
        
              pool.connect((err, client, done) => {
                if (err) throw err; 
                client.query(sqlUpdate, (err, result) => {
                  if (err) throw err;
                  else {    
                    done(); 
                    res.json({
                      statusCode: 200,
                      title: "Excluir Brinco",
                      deletado: true,
                      message: "Brinco excluído com sucesso!",
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