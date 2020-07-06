module.exports = app => {
    const movies = require("../controllers/movie.controller.js");
  
    // Create a new Movie
    app.post("/movies", movies.create);
  
    //  Retrieve all Movies
    app.get("/movies", movies.findAll);
  
    // Retrieve a single Movie with customerId
    app.get("/movies/:movieId", movies.findOne);
  
  };