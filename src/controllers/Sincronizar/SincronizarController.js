const pool = require('../../database/connection');  
const format = require('pg-format');
require('dotenv/config');

module.exports = {

  //GET  
  async buscar(req, res) {
    const isActive = req.isActive; 

    if (isActive) { 
      const schema = req.schema;

      const sqlSelect = {
        text: `
          SELECT
            A.ID_ANIMAL AS ID,
            A.NOME, 
            CASE
              WHEN B.COD_RFID IS NOT NULL THEN B.COD_RFID
              WHEN B.COD_VISUAL IS NOT NULL THEN B.COD_VISUAL
              ELSE '-' END BRINCO
          FROM ${schema}.ANIMAIS A 
            LEFT JOIN ${schema}.BRINCOS B ON A.ID_ANIMAL = B.ID_ANIMAL;

          SELECT 
            B.ID_BRINCO AS ID, 
            B.ID_ANIMAL,  
            CASE
              WHEN B.COD_RFID IS NOT NULL THEN B.COD_RFID
              WHEN B.COD_VISUAL IS NOT NULL THEN B.COD_VISUAL END CODIGO
          FROM ${schema}.BRINCOS B WHERE B.ID_ANIMAL IS NOT NULL;

          SELECT 
            A.ID_ALERTA AS ID,
            A.DESCRICAO
          FROM ${schema}.ALERTAS A;   

          SELECT
            V.ID_VACINA AS ID,
            V.DESCRICAO
          FROM ${schema}.VACINAS V; 

          SELECT
            D.ID_DOENCA AS ID,
            D.DESCRICAO
          FROM ${schema}.DOENCAS D;

          SELECT
            M.ID_MEDICAMENTO,
            M.DESCRICAO
          FROM ${schema}.MEDICAMENTOS M;
        `
      }  
      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlSelect, (err, result) => {
          if (err) throw err;
          else {    
            done();
            const data = {
              animais: result[0].rows,
              brincos: result[1].rows,
              alertas: result[2].rows,
              vacinas: result[3].rows,
              doencas: result[4].rows,
              medicamentos: result[5].rows,   
            }
            res.json(data);
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
    const isActive = req.isActive; 

    if (isActive) { 
      const schema = req.schema; 
      const idFuncionario = req.idUsuario;

      const dados = req.body;
      
      const historicoAlertas = dados.historicoAlertas;   
      const historicoPesagens = dados.historicoPesagens;
      const historicoVacinas = dados.historicoVacinas;
      const historicoDoencas = dados.historicoDoencas;
      const historicoMedicamentos = dados.historicoMedicamentos;

      /*Queries multiplas*/ 
      const valuesHistoricoAlerta = []; 
      for(let item of historicoAlertas) {
        valuesHistoricoAlerta.push([idFuncionario, item.ID_ANIMAL, item.ID_ALERTA, item.DATA, item.HORA])
      } 
      const insertHistoricoAlertas = format(`INSERT INTO ${schema}.HISTORICO_ALERTAS (ID_FUNCIONARIO, ID_ANIMAL, ID_ALERTA, DATA, HORA) VALUES %L`, valuesHistoricoAlerta);
 
      const valuesHistoricoPesagens = []; 
      for(let item of historicoPesagens) {
        valuesHistoricoPesagens.push([idFuncionario, item.ID_ANIMAL, item.PESO, item.OBSERVACAO, item.DATA, item.HORA])
      } 
      const insertHistoricoPesagens = format(`INSERT INTO ${schema}.HISTORICO_PESAGENS (ID_FUNCIONARIO, ID_ANIMAL, PESO, OBSERVACAO, DATA, HORA) VALUES %L`, valuesHistoricoPesagens);
 
      const valuesHistoricoVacinas = []; 
      for(let item of historicoVacinas) {
        valuesHistoricoVacinas.push([idFuncionario, item.ID_ANIMAL, item.ID_VACINA, item.OBSERVACAO, item.DATA, item.HORA])
      } 
      const insertHistoricoVacinas = format(`INSERT INTO ${schema}.HISTORICO_VACINAS (ID_FUNCIONARIO, ID_ANIMAL, ID_VACINA, OBSERVACAO, DATA, HORA) VALUES %L`, valuesHistoricoVacinas);
 

      const valuesHistoricoDoencas = []; 
      for(let item of historicoDoencas) {
        valuesHistoricoDoencas.push([idFuncionario, item.ID_ANIMAL, item.ID_DOENCA, item.OBSERVACAO, item.DATA, item.HORA])
      } 
      const insertHistoricoDoencas = format(`INSERT INTO ${schema}.HISTORICO_DOENCAS (ID_FUNCIONARIO, ID_ANIMAL, ID_DOENCA, OBSERVACAO, DATA, HORA) VALUES %L`, valuesHistoricoDoencas);
 

      const valuesHistoricoMedicamentos = []; 
      for(let item of historicoMedicamentos) {
        valuesHistoricoMedicamentos.push([idFuncionario, item.ID_ANIMAL, item.ID_MEDICAMENTO, item.OBSERVACAO, item.DATA, item.HORA])
      } 
      const insertHistoricoMedicamentos = format(`INSERT INTO ${schema}.HISTORICO_MEDICAMENTOS (ID_FUNCIONARIO, ID_ANIMAL, ID_MEDICAMENTO, OBSERVACAO, DATA, HORA) VALUES %L`, valuesHistoricoMedicamentos);
  
      pool.connect( async (err, client, done) => {
        if (err) throw err; 

        if(valuesHistoricoAlerta.length > 0) await client.query(insertHistoricoAlertas); 
        if(valuesHistoricoPesagens.length > 0) await client.query(insertHistoricoPesagens); 
        if(valuesHistoricoVacinas.length > 0) await client.query(insertHistoricoVacinas); 
        if(valuesHistoricoDoencas.length > 0) await client.query(insertHistoricoDoencas); 
        if(valuesHistoricoMedicamentos.length > 0) await client.query(insertHistoricoMedicamentos); 

        done();

        res.json({
          statusCode: 200,
          title: "Sincronizar históricos",
          cadastrado: true,
          message: "Histórico sincronizado com sucesso!",
        });
      });

    } else {
      res.json({
          statusCode: 401,
          title: "Erro",
          message: "Não autorizado!"
      });
    }   
  }
}