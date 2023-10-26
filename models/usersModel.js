const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor ingrese un nombre'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Por favor ingrese un email'],
    },
    password: {
      type: String,
      require: [true, 'Por favor ingrese un password'],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model('User', userSchema);
