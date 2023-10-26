const asyncHandler = require('express-async-handler');
const WatchList = require('../models/watchListsModel');
const e = require('express');

const addMovieToList = asyncHandler(async (req, res) => {
  const { movie, user } = req.body;

  const data = { movie, user };

  const watchList = new WatchList(data);
  await watchList.save();

  if (watchList) {
    res.status(201).json({
      message: 'Pelicula agregada a la lista',
      _id: watchList._id,
      movie: req.movie,
      user: req.user,
    });
  } else {
    res.status(400);
    throw new Error('No se pudo agregar a la lista');
  }
});

const getWatchList = asyncHandler(async (req, res) => {
  const watchList = await WatchList.find({ user: req.user.id });
  res.status(200).json(watchList);
});

const removeMovieFromList = asyncHandler(async (req, res) => {
  const watchList = await WatchList.findById(req.params.id);

  if (!watchList) {
    res.status(404);
    throw new Error('Pelicula no encontrada en la lista');
  }

  if (watchList.user.toString() != req.user.id) {
    res.status(401);
    throw new Error('Acceso no autorizado');
  } else {
    watchList.deleteOne();
    res.status(200).json({ id: watchList._id });
  }
});

module.exports = {
  addMovieToList,
  getWatchList,
  removeMovieFromList,
};
