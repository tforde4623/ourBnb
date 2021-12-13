const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { validateReview } = require('../../utils/validation');
const { User, Review } = require('../../db/models');

const router = express.Router();

// add a new review
router.post(
  '/',
  requireAuth,
  validateReview,
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
      res.status(200);
      return res.json({ review });
    } else {
      // can i put unauth in here?
      next();
    }

  })
)

router.put(
  '/:id',
  requireAuth,
  validateReview,
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const review = await Review.findByPk(id); 

    if (req.user.dataValues.id === review.userId) {
      await review.update(req.body);
      res.status(200);

      const retReview = await Review.findOne({
        where: { id },
        include: { model: User }
      });
      res.json(retReview);
    } else {
      res.status(401);
      res.json({ msg: 'you do not own this record' });
    }
  })
);


module.exports = router;
