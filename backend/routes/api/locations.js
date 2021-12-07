const express = require('express');
const asyncHandler = require('express-async-handler');

const { Location, Image, User } = require('../../db/models');

const router = express.Router();

// get all blind route (first 10 for now)
// don't require authentication
router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const locations = 
      await Location.findAll({ 
        include: [{
          model: Image,
          limit: 1,
          attributes: ['imageUrl']
        }],
        limit: 10
      });

    res.json(locations);
  })
);

// get all by location route

module.exports = router;
