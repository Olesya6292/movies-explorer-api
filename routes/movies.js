const express = require('express');
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controller/movies');
const validateUrl = require('../utils/validateUrl');

router.get('/', getMovies);

router.post(
  '/',
  express.json(),
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.number().required(),
      description: Joi.string().required(),
      image: Joi.string().required().custom(validateUrl),
      trailerLink: Joi.string().required().custom(validateUrl),
      thumbnail: Joi.string().required().custom(validateUrl),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  addMovie,
);

router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
