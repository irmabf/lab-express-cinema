const express = require("express");
const Movie = require("../models/Movie.model");
const movieController = require("../controllers/movieController");
const router = express.Router();

router.get("/", movieController.getAllMovies);
router.route("/:id").get(movieController.getMovie);

module.exports = router;
