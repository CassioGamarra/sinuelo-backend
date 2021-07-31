const { Pool } = require('pg');
require('dotenv/config');

//Cria uma conexão com o PostgreSQL
/*Obs.: modificado o USER por USERNAME pois o parametro USER no enviroment busca
o usuário do sistema com base no parâmetro (root, user)*/
const pool = new Pool({
  user: process.env.ADMIN,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

//Verifica se é possível conectar com o PostgreSQL
pool.connect((err) => {
  if (err) {
    console.log("Erro ao conectar no banco de dados!" + err)
  } else {
    console.log(`PostgreSQL conectado [${process.env.PORT}]`);
  }
});

module.exports = pool;