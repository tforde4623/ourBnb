const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
// validations
const { Location, Image, User, Review } = require('../../db/models');

const router = express.Router();

// add a new review
router.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { locationId, content, title } = req.body;
    const rev = await Review.create({
      locationId,
      content,
      title,
      userId: req.user.dataValues.id
    });

    console.log(rev)
    res.json(rev); // test this
  })
)


module.exports = router;
