const pool = require('../../database/connection'); 
require('dotenv/config');

module.exports = {
 
  //GET com ID
  async buscarPorId(req, res) {
    const isAdmin = req.isAdmin; 
    const schema = req.schema;
    
    if (isAdmin) {
      const idRelatorio = req.params.id;  
      switch(Number(idRelatorio)) {
        case 1: {
          relatorioPesos();
          break;
        }
        case 2: {
          relatorioVacinas();
          break;
        }
        case 3: {
          relatorioDoencas();
          break;
        }
        case 4: {
          relatorioMedicamentos();
          break;
        }
        default: {
          res.json({
            statusCode: 400,
            title: "Erro",
            message: "Relatorio não encontrado"
          });
          break;
        }
      }

    } else {
      res.json({
          statusCode: 401,
          title: "Erro",
          message: "Não autorizado!"
      });
    }

    async function relatorioPesos() { 
      const sqlSelect = {
        text: ` 
          SELECT 
            H.ID_HISTORICO_PESAGEM AS ID,
            F.NOME AS FUNCIONARIO,
            A.NOME AS ANIMAL,
            H.PESO,
            CASE WHEN H.OBSERVACAO IS NOT NULL THEN H.OBSERVACAO ELSE '-' END AS OBSERVACAO, 
            TO_CHAR(H.DATA, 'DD/MM/YYYY') || ' às ' || TO_CHAR(H.HORA, 'HH24:MI') AS DATA
          FROM ${schema}.HISTORICO_PESAGENS H
            INNER JOIN ${schema}.FUNCIONARIOS F ON H.ID_FUNCIONARIO = H.ID_FUNCIONARIO
            INNER JOIN ${schema}.ANIMAIS A ON H.ID_ANIMAL = A.ID_ANIMAL
          ORDER BY 1 DESC
        `, 
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlSelect, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            const colunas = [
              { title: 'id', field: 'id', hidden: true },
              { title: 'Responsável', field: 'funcionario', width: 20 },
              { title: 'Animal', field: 'animal', width: 250 },
              { title: 'Peso', field: 'peso', width: 20 },
              { title: 'Observação', field: 'observacao', width: 20 },
              { title: 'Registrado em', field: 'data', width: 20 }, 
            ];
              
            res.json({
              dados: result.rows,
              colunas: colunas
            });
          }
        }); 
      }); 
    } 

    async function relatorioVacinas() { 
      const sqlSelect = {
        text: ` 
          SELECT 
            H.ID_HISTORICO_VACINA AS ID,
            F.NOME AS FUNCIONARIO,
            A.NOME AS ANIMAL,
            V.DESCRICAO AS VACINA,
            CASE WHEN H.OBSERVACAO IS NOT NULL THEN H.OBSERVACAO ELSE '-' END AS OBSERVACAO, 
            TO_CHAR(H.DATA, 'DD/MM/YYYY') || ' às ' || TO_CHAR(H.HORA, 'HH24:MI') AS DATA
          FROM ${schema}.HISTORICO_VACINAS H
            INNER JOIN ${schema}.FUNCIONARIOS F ON H.ID_FUNCIONARIO = H.ID_FUNCIONARIO
            INNER JOIN ${schema}.ANIMAIS A ON H.ID_ANIMAL = A.ID_ANIMAL
            INNER JOIN ${schema}.VACINAS V ON H.ID_VACINA = V.ID_VACINA
          ORDER BY 1 DESC
        `, 
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlSelect, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            const colunas = [
              { title: 'id', field: 'id', hidden: true },
              { title: 'Responsável', field: 'funcionario', width: 20 },
              { title: 'Animal', field: 'animal', width: 250 },
              { title: 'Vacina', field: 'vacina', width: 20 },
              { title: 'Observação', field: 'observacao', width: 20 },
              { title: 'Registrado em', field: 'data', width: 20 }, 
            ];
              
            res.json({
              dados: result.rows,
              colunas: colunas
            });
          }
        }); 
      }); 
    }

    async function relatorioDoencas() { 
      const sqlSelect = {
        text: ` 
          SELECT 
            H.ID_HISTORICO_DOENCA AS ID,
            F.NOME AS FUNCIONARIO,
            A.NOME AS ANIMAL,
            D.DESCRICAO AS DOENCA,
            CASE WHEN H.OBSERVACAO IS NOT NULL THEN H.OBSERVACAO ELSE '-' END AS OBSERVACAO, 
            TO_CHAR(H.DATA, 'DD/MM/YYYY') || ' às ' || TO_CHAR(H.HORA, 'HH24:MI') AS DATA
          FROM ${schema}.HISTORICO_DOENCAS H
            INNER JOIN ${schema}.FUNCIONARIOS F ON H.ID_FUNCIONARIO = H.ID_FUNCIONARIO
            INNER JOIN ${schema}.ANIMAIS A ON H.ID_ANIMAL = A.ID_ANIMAL
            INNER JOIN ${schema}.DOENCAS D ON H.ID_DOENCA = D.ID_DOENCA
          ORDER BY 1 DESC
        `, 
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlSelect, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            const colunas = [
              { title: 'id', field: 'id', hidden: true },
              { title: 'Responsável', field: 'funcionario', width: 20 },
              { title: 'Animal', field: 'animal', width: 250 },
              { title: 'Doença', field: 'doenca', width: 20 },
              { title: 'Observação', field: 'observacao', width: 20 },
              { title: 'Registrado em', field: 'data', width: 20 }, 
            ];
              
            res.json({
              dados: result.rows,
              colunas: colunas
            });
          }
        }); 
      });  
    }

    async function relatorioMedicamentos() { 
      const sqlSelect = {
        text: ` 
          SELECT 
            H.ID_HISTORICO_MEDICAMENTO AS ID,
            F.NOME AS FUNCIONARIO,
            A.NOME AS ANIMAL,
            M.DESCRICAO AS MEDICAMENTO,
            CASE WHEN H.OBSERVACAO IS NOT NULL THEN H.OBSERVACAO ELSE '-' END AS OBSERVACAO, 
            TO_CHAR(H.DATA, 'DD/MM/YYYY') || ' às ' || TO_CHAR(H.HORA, 'HH24:MI') AS DATA
          FROM ${schema}.HISTORICO_MEDICAMENTOS H
            INNER JOIN ${schema}.FUNCIONARIOS F ON H.ID_FUNCIONARIO = H.ID_FUNCIONARIO
            INNER JOIN ${schema}.ANIMAIS A ON H.ID_ANIMAL = A.ID_ANIMAL
            INNER JOIN ${schema}.MEDICAMENTOS M ON H.ID_MEDICAMENTO = M.ID_MEDICAMENTO
          ORDER BY 1 DESC
        `, 
      }

      pool.connect((err, client, done) => {
        if (err) throw err; 
        client.query(sqlSelect, (err, result) => {
          if (err) throw err;
          else {    
            done(); 
            const colunas = [
              { title: 'id', field: 'id', hidden: true },
              { title: 'Responsável', field: 'funcionario', width: 20 },
              { title: 'Animal', field: 'animal', width: 250 },
              { title: 'Medicamento', field: 'medicamento', width: 20 },
              { title: 'Observação', field: 'observacao', width: 20 },
              { title: 'Registrado em', field: 'data', width: 20 }, 
            ];
              
            res.json({
              dados: result.rows,
              colunas: colunas
            });
          }
        }); 
      });  
    }
  }, 
}