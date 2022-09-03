/* eslint-disable consistent-return */
/* eslint-disable object-curly-newline */
const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { CREATED, MONGO_ERROR } = require('../utils/constants');
const {
  NotFoundError,
  BadRequestError,
  ConflictError,
} = require('../errors/errors');

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-key',
      { expiresIn: '7d' },
    );
    return res.send({ token });
  } catch (err) {
    next(err);
  }
};

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .orFail(new NotFoundError('Пользователь не найден'));
    return res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      email,
      password: hash,
      name,
    });
    return res.status(CREATED).send({ email, name });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(
        new BadRequestError(
          'Переданы некорректные данные при создании пользователя',
        ),
      );
    }
    if (err.code === MONGO_ERROR) {
      return next(
        new ConflictError('Пользователь с таким email уже существует'),
      );
    }
    next(err);
  }
};

module.exports.updateUserInfo = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true, upsert: false },
    )
      .orFail(new NotFoundError('Пользователь не найден'));
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(
        new BadRequestError('Переданы некорректные имя или email'),
      );
    }
    if (err.codeName === 'DuplicateKey') {
      return next(
        new ConflictError('Пользователь с таким email уже существует'),
      );
    }
    next(err);
  }
};
