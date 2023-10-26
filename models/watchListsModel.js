const mongoose = require('mongoose');

const watchListSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Movie',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('WatchList', watchListSchema);
