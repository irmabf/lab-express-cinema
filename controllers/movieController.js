const Movie = require("../models/Movie.model");

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.render("movies", {
      movies,
    });
  } catch (err) {
    res.status(404).send({
      status: "fail",
      message: err,
    });
  }
};

exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    res.render("movie", {
      movie,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
