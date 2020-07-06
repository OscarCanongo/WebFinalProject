const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");
const jwt = require('jsonwebtoken');
var JWTMiddleware = express.Router();

const secret = "Just keep guessing";


Router.post("/enter", async (req, res) =>{
  
  const nombre = req.body.nombre;
  const password = req.body.password;

  mysqlConnection.query("SELECT * FROM usuarios WHERE nombre ='" + nombre + "'AND password ='"+password+"';",(err, rows, fields) =>{
    if(rows.length > 0){
        const token = jwt.sign({id: rows[0].idusuarios}, secret)
        res.setHeader("authorization", `Bearer ${token}`);
        return res.json(token);
    }
    else{
        return res.send("No hay usuario")
    }
  })

})

Router.get('/prueba', JWTMiddleware, function(req, res, next) {
    res.send({id: req.decoded.id});
});

Router.get('/getnombre', JWTMiddleware, function(req, res, next) {

  console.log(req.decoded.id)

  const id = req.decoded.id

  mysqlConnection.query("SELECT * FROM usuarios WHERE idusuarios ='" + id + "' ;",(err, rows, fields) =>{
  if(rows.length > 0){
      console.log(rows[0].nombre)
      const nombre = rows[0].nombre
      res.send({nombre: nombre})

  }
})

});

Router.post("/notificaciones", async (req, res) =>{

    const nombre = req.body.nombre;
    const password = req.body.password;
  
    mysqlConnection.query("SELECT * FROM usuarios WHERE nombre ='" + nombre + "'AND password ='"+password+"';",(err, rows, fields) =>{
      if(rows.length > 0){
          const token = jwt.sign({id: rows[0].idusuarios}, secret)
          return res.send({token});
      }
      else{
          return res.send("No hay usuario")
      }
    })
  
})

JWTMiddleware.use((req, res, next) => {
    const token = req.headers['authorization'] ?
          req.headers['authorization'].slice(7) : null;  
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(401).send('Authentication failed');
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.send('Authentication failed');
    }
  });

module.exports = Router;