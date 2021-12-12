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

    res.json(rev);
  })
)

router.delete(
  '/:reviewId',
  requireAuth,
  asyncHandler(async (req, res) => {
    const review = await Review.findOne({
      where: {
        id: req.params.reviewId
      }
    });

    if (req.user.dataValues.id === review.userId) {
      await review.destroy();
      console.log('got to line 39')
      res.status(200);
      return res.json({ review });
    } else {
      // can i put unauth in here?
      next();
    }

  })
)


module.exports = router;
