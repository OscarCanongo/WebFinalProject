const sql = require("../db.js");

// constructor
const Movie = function(movie) {
  this.id = movie.id;
  this.usuario=usuario;
  //this.nombre = movie.nombre;
  //this.estrellas = movie.estrellas;
  this.reseñas = movie.reseñas;
};

Movie.create = (newMovie, result) => {
  sql.query("INSERT INTO reviews SET ?", newMovie, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created movie: ", { id: res.insertId, ...newMovie });
    result(null, { id: res.insertId, ...newMovie });
  });
};

Movie.findById = (movieId, result) => {
  sql.query(`SELECT AVG(estrellas) as estrellas from reviews WHERE movies_idmovies = '${movieId}' GROUP BY movies_idmovies`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Movie.getAll = result => {
  sql.query("SELECT movies_idmovies, estrellas FROM reviews", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("movies: ", res);
    result(null, res);
  });
};

module.exports = Movie;