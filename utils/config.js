require('dotenv').config();

const {
  PORT = 3000,
  JWT_SECRET = 'dev-key',
  DATABASE_URL = 'mongodb://127.0.0.1:27017/moviesdb',
} = process.env;

module.exports = {
  PORT,
  JWT_SECRET,
  DATABASE_URL,
};
