const router = require('express').Router();

const {
  getCurrentUser,
  updateUserInfo,
} = require('../controller/users');

const { updateUserInfoValidator } = require('../utils/celebrateValidator');

router.get('/me', getCurrentUser);

router.patch(
  '/me',
  updateUserInfoValidator,
  updateUserInfo,
);

module.exports = router;
