const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie } = require('../../utils/auth');
const { validateSignup } = require('../../utils/validation');
const { User, Location, Image } = require('../../db/models');

const router = express.Router();

// sign up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  })
);

// GET /api/users/:userId/locations
router.get(
  '/:userId/locations',
  asyncHandler(async (req, res) => {
    const locations =
      await Location.findAll({
        where: {
          ownerId: req.params.userId
        },
        include: { model: Image }
      });

    res.json(locations);
  })
);

module.exports = router;
