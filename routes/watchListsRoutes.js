const express = require('express');
const router = express.Router();

const {
  addMovieToList,
  getWatchList,
  removeMovieFromList,
} = require('../controllers/watchListsControllers');

const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addMovieToList);
router.get('/', protect, getWatchList);
router.delete('/:id', protect, removeMovieFromList);

module.exports = router;
