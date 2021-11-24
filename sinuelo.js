const express = require("express");
const cron = require("node-cron");
const cors = require('cors');
const app = express();
const routes = require('./src/routes'); 

app.use(cors());
app.use(express.json());
app.use(routes);
 
app.listen(3333);