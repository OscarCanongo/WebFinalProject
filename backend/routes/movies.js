var express = require('express');
var router = express.Router();
var pusher = require('../services/pusher_service');
const fetch = require("node-fetch");
const mysqlConnection = require("../connection");

const cors = require('cors');
router.all('*', cors());

var access_key = "a82ee3cb";

router.get('/:id', async (req, res) => {
  const id = req.body.id;
  const ejemplo2 = await fetch(`http://www.omdbapi.com/?apikey=${access_key}&i=${id}`)
  .then(res => res.json());
  const nameMovie = ejemplo2.Title;
  const directorMovie = ejemplo2.Director;
  const yearMovie = ejemplo2.Year;
  const plotMovie = ejemplo2.Plot;
  const posterMovie = ejemplo2.Poster;
  movie={
    nameMovie,directorMovie,yearMovie,ratingMovie,plotMovie,posterMovie
  }
  res.send(movies);
})

router.post('/', async (req, res, next) => {
  address = req.body.dropoff_address;
  const name = req.body.name1;
  const year = req.body.year1;
  const movies=[];

  const ejemplo = await fetch(`http://www.omdbapi.com/?apikey=${access_key}&s=${name}&y=${year}&page=1&type=movie`)

    .then(res => res.json());

    
    if(ejemplo.totalResults>5){
      var x = 0;
      for(x;x<5;x++){
        const ejemplo2 = await fetch(`http://www.omdbapi.com/?apikey=${access_key}&i=${ejemplo.Search[x].imdbID}`)
        .then(res => res.json());
        const nameMovie = ejemplo2.Title;
        const directorMovie = ejemplo2.Director;
        const yearMovie = ejemplo2.Year;
        const plotMovie = ejemplo2.Plot;
        const posterMovie = ejemplo2.Poster;
        const id = ejemplo2.imdbID;

        const ejemplo3 = await fetch (`http://localhost:3001/movies/${id}`)
        .then(res => res.json());
        const ratingMovie = ejemplo3.estrellas;

        movies[x]={
          id,nameMovie,directorMovie,yearMovie,ratingMovie,plotMovie,posterMovie
        }
      }
    }
    else{
      var x = 0;
      for(x;x<ejemplo.totalResults;x++){
        
        const ejemplo2 = await fetch(`http://www.omdbapi.com/?apikey=${access_key}&i=${ejemplo.Search[x].imdbID}`)
        .then(res => res.json());
        const nameMovie = ejemplo2.Title;
        const directorMovie = ejemplo2.Director;
        const yearMovie = ejemplo2.Year;
        const plotMovie = ejemplo2.Plot;
        const posterMovie = ejemplo2.Poster;
        const id = ejemplo2.imdbID;

        const ejemplo3 = await fetch (`http://localhost:3001/movies/${id}`)
        .then(res => res.json());
        const ratingMovie = ejemplo3.estrellas;

        movies[x]={
          id,nameMovie,directorMovie,yearMovie,ratingMovie,plotMovie,posterMovie
        }
        console.log(movies[x]);   
      }
    }
  console.log(movies);
  res.send(movies);
});




module.exports = router;