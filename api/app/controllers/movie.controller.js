const Movie = require("../models/movies.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
   //Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //Create a Movie
  const movie = new Movie({
    movie: req.body.movie,
    usuario: req.body.usuario,
    review: req.body.review
  });

  // Save Customer in the database
  Movie.create(movie, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

//Retrieve all Moviess from the database.
exports.findAll = (req, res) => {
    Movie.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving movies."
          });
        else res.send(data);
      });
};

// Find a single Movie with a movieId
exports.findOne = (req, res) => {
    Movie.findById(req.params.movieId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Movie with id ${req.params.movieId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Movie with id " + req.params.movieId
            });
          }
        } else res.send(data);
    });
};
