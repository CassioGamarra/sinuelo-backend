const conn = require('./database/connection');
module.exports = {
    
    async atualizar(){
        let data = new Date(Date.now()).toString();
        console.log(data);
        const sql = `SELECT RENOVACAO_AUTOMATICA FROM CONFIGURACOES`; //Verifica se a renovação automática está ativa
        await conn.query(sql, (err, row) => {
            if (err) throw err;
            if (row[0].RENOVACAO_AUTOMATICA === 1) {
                execRenovacao(36);
                finalizar(61);
            } else {
                console.log("Renovacao automatica esta inativa...");
                finalizar(36);
            }
        });
        //Executa uma renovação
        async function execRenovacao(days){
            const sql = `UPDATE PERIODOS_VALIDADE SET DT_FINAL = DATE_ADD(DT_FINAL, INTERVAL 30 DAY), RENOVADO = 1
                        WHERE STATUS = 1 AND RENOVADO = 0 AND DATEDIFF(CURDATE(), DT_INICIAL) = ${days}`;
            await conn.query(sql, (err, results) => {
                if (err) throw err;
                else{
                    console.log("Atualizacao concluida, foram renovadas "+results.changedRows+" oportunidades!");
                }
            })
        }
        //Executa uma finalização
        async function finalizar(days){
            const sql = `UPDATE PERIODOS_VALIDADE SET STATUS = 2
                        WHERE STATUS = 1 AND DATEDIFF(CURDATE(), DT_INICIAL) = ${days}`;
            await conn.query(sql, (err, results) => {
                if (err) throw err;
                else{
                    console.log("Atualizacao concluida, foram finalizadas "+results.changedRows+" oportunidades!");
                    finalizarAtividades();
                }
            });
        }

        //Finaliza as atividades
        async function finalizarAtividades() {
            const sql = `UPDATE ATIVIDADE SET STATUS = 2, DATA_OCORRENCIA = CURDATE() WHERE STATUS <> 2 AND ID_OPORTUNIDADE IN (SELECT PV.ID_OPORTUNIDADE FROM PERIODOS_VALIDADE PV WHERE PV.STATUS = 2)`;
            await conn.query(sql, (err, results) => {
                if (err) throw err;
                else{
                    console.log("Atualizacao concluida, foram finalizadas "+results.changedRows+" atividades!");
                }
            });
        }
    },
}