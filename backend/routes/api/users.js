const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie } = require('../../utils/auth');
const { validateSignup } = require('../../utils/validation');
const { User } = require('../../db/models');

const router = express.Router();

// sign up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie();

    return res.json({
      user
    });
  })
);

module.exports = router;
