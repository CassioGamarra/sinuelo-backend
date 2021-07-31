const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = (req, res, next) => {
  const authReader = req.headers.authorization; //Busca o header de autorização
  if (!authReader) return res.status(401).send({ error: "No token provided" }); //Se não informar o token

  const parts = authReader.split(' '); //Separa o token em duas partes

  if (!parts.length === 2) return res.status(401).send({ error: 'Token Error' });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: 'Malformated Token' });

  jwt.verify(token, process.env.AUTHKEY, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Invalid token' });

    req.idUsuario = decoded.idUsuario; 
    req.schema = decoded.cliente; 
    req.isAdmin = decoded.isAdmin; 
    
    return next();
  });
}