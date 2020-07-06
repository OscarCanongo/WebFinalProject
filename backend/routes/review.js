const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");
const Pusher = require('pusher');

var pusher = new Pusher({
  appId: '1009293',
  key: '2300a02c2ef4840f578b',
  secret: 'b093e09915ce9891d56f',
  cluster: 'us2',
  encrypted: true
});

Router.post("/", async (req, res) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  const id = req.body.id1;
  const movie = req.body.pelicula;
  const user = req.body.reviewerId; 
  const userName = req.body.reviewer1;
  const review = req.body.review1;
  const stars = req.body.stars1;
  const estrellas = req.body.estrellas1;
  const info = [userName, stars, review, movie];
  console.log(user);



  pusher.trigger('chat', 'message', info);

  
  if(estrellas>0){
    mysqlConnection.query("INSERT INTO reviews (movies_idmovies, usuarios_idusuarios, reviews, estrellas) VALUES ('" + id + "', "+ user +", '" + review +"', "+ stars +");", (err, rows, fields) =>{
      if(!err){
      }else{
          console.log(err);
        }
    })
  }
  else{
    mysqlConnection.query("INSERT INTO movies (idmovies) VALUES ('" + id + "');", (err, rows, fields) =>{
      if(!err){
      }else{
          console.log(err);
        }
    })
    mysqlConnection.query("INSERT INTO reviews (movies_idmovies, usuarios_idusuarios, reviews, estrellas) VALUES ('" + id + "', "+ user +", '" + review +"', "+ stars +");", (err, rows, fields) =>{
      if(!err){
      }else{
          console.log(err);
        }
    })
  }  
})

Router.post("/getReviews", async (req, res) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  const id = req.body.id1;
    mysqlConnection.query("SELECT reviews, estrellas FROM reviews WHERE movies_idmovies = '" + id + "' ;", (err, rows, fields) =>{
    if(!err){
        res.send(rows);
    }else{
        console.log(err);
      }
  })
})

module.exports = Router;    