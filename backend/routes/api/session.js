const express = require('express');
const asyncHandler = require('express-async-handler');

const { validateLogin } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const  { User } = require('../../db/models');

const router = express.Router();

// login user - POST /api/session
router.post(
  '/',
  validateLogin,
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;
  
    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    // if login success
    await setTokenCookie(res, user);

    return res.json({
      user
    });
  })
);

// log out - DELETE '/api/session'
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// get user (restore user session) - GET /api/session
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);

module.exports = router;
