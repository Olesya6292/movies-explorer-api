const express = require('express');
const router = require('express').Router();
const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controller/movies');

const { addMovieValidator, deleteMovieValidator } = require('../utils/celebrateValidator');

router.get('/', getMovies);

router.post(
  '/',
  express.json(),
  addMovieValidator,
  addMovie,
);

router.delete(
  '/:movieId',
  deleteMovieValidator,
  deleteMovie,
);

module.exports = router;
