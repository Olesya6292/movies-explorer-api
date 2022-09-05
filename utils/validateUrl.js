const validator = require('validator');
const { BadRequestError } = require('../errors/errors');

const validateUrl = (value) => {
  const result = validator.isURL(value);
  if (!result) {
    throw new BadRequestError('Введённый URL некорректный');
  }
  return value;
};

module.exports = { validateUrl };
