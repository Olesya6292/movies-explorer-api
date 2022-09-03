const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле страна должно быть заполнено'],
  },
  director: {
    type: String,
    required: [true, 'Поле директор должно быть заполнено'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле продолжительность должно быть заполнено'],
  },
  year: {
    type: Number,
    required: [true, 'Поле год должно быть заполнено'],
  },
  description: {
    type: String,
    required: [true, 'Поле описание должно быть заполнено'],
  },
  image: {
    type: String,
    required: [true, 'Поле постер должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле трейлер должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле превью постера должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: [true, 'Поле Id фильма должно быть заполнено'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле название фильма на русском языке должно быть заполнено'],
  },
  nameEN: {
    type: String,
    name: [true, 'Поле название фильма на английском языке должно быть заполнено'],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
