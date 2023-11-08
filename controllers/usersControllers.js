const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/usersModel');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Por favor ingresar los datos');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('Usuario ya registrado');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error('No se pudo registrar al usuario');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('Ingrese los campos');
  }

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const payloadData = {
      id: user._id,
      role: user.role,
    };

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(payloadData),
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error('Credenciales Incorrectas');
  }
});

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

const generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: '1hr',
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
