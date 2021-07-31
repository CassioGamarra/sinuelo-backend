const express = require("express");
const cron = require("node-cron");
const cors = require('cors');
const app = express();
const routes = require('./src/routes');
const jobs = require('./src/jobs');


app.use(cors());
app.use(express.json());
app.use(routes);

/*Cron jobs - Executados todos os dias, as 3:30*/
//cron.schedule("30 3 * * *", () => jobs.atualizar()); 
  
app.listen(3333);