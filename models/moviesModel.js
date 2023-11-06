const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  backdrop_path: {
    type: String,
  },
  original_language: {
    type: String,
  },
  original_title: {
    type: String,
    required: [true, 'Ingrese el titulo original de la pelicula'],
  },
  overview: {
    type: String,
    required: [true, 'Ingrese la sinopsis de la pelicula'],
  },
  popularity: {
    type: Number,
  },
  poster_path: {
    type: String,
    required: [true, 'Ingrese la imagen del poster de la pelicula'],
  },
  release_date: {
    type: String,
    required: [true, 'Ingrese la fecha del estreno'],
  },
  title: {
    type: String,
    required: [true, 'Ingrese el titulo de la pelicula'],
  },
  video: {
    type: Boolean,
    default: false,
  },
  vote_average: {
    type: Number,
  },
  vote_count: {
    type: Number,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Movie', movieSchema);
