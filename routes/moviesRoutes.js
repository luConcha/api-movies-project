const express = require('express');

const router = express.Router();

const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovieDataById,
  updateMovieLikesById,
  deleteMovie,
} = require('../controllers/moviesControllers');

router.get('/', getMovies);
router.get('/:id', getMovieById);
router.post('/', createMovie);
router.put('/:id', updateMovieDataById);
router.put('/liked/:id', updateMovieLikesById);
router.delete('/:id', deleteMovie);

module.exports = router;
