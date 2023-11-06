const asyncHandler = require('express-async-handler');
const Movie = require('../models/moviesModel');

const createMovie = asyncHandler(async (req, res) => {
  const {
    backdrop_path,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    title,
    video,
    vote_average,
    vote_count,
    active,
  } = req.body;

  const data = {
    backdrop_path,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    title,
    video,
    vote_average,
    vote_count,
    active,
  };

  if (!original_title || !overview || !poster_path || !release_date || !title) {
    res.status(400);
    throw new Error('Capturar campos requiridos');
  }

  const movieExists = await Movie.findOne({ title });
  if (movieExists) {
    res.status(400);
    throw new Error('Pelicula con el mismo titulo ya existe.');
  }

  const movie = new Movie(data);
  await movie.save();

  if (movie) {
    res.status(201).json({
      message: 'Pelicula agregada',
      _id: movie._id,
      title: movie.title,
    });
  } else {
    res.status(400);
    throw new Error('No se pudo registrar la pelicula');
  }

  res.status(201).json({ message: 'createMovie' });
});

const getMovies = asyncHandler(async (req, res) => {
  const queryParam = { active: true };
  const movies = await Movie.find(queryParam);
  res.status(200).json(movies);
});

const getMovieById = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.status(200).json(movie);
});

const updateMovieDataById = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    res.status(404);
    throw new Error('Pelicula no encontrada');
  }

  const updateMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updateMovie);
});

const updateMovieLikesById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  const movieLikesCount = movie.vote_count + 1;
  const newLikesCount = { vote_count: movieLikesCount };

  const movieLiked = await Movie.findByIdAndUpdate(id, newLikesCount);

  res.status(201).json({ message: `Pelicula ${id} Liked`, movieLiked });
});

const deleteMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const falseActive = { active: false };

  const movie = await Movie.findByIdAndUpdate(id, falseActive);

  res.status(200).json({ message: `Pelicula ${id} eliminada`, movie });
});

module.exports = {
  createMovie,
  getMovies,
  getMovieById,
  updateMovieDataById,
  updateMovieLikesById,
  deleteMovie,
};
