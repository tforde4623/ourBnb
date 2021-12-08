const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { validateLocation } = require('../../utils/validation');
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

    console.log(locations)
    res.json(locations);
  })
);

// get all by location route

// add a location (require auth)
router.post(
  '/',
  requireAuth,
  validateLocation,
  asyncHandler(async (req, res) => {
    const { title, description, location, price, image } = req.body;
    const newLocation = await Location.create({
      ownerId: req.user.dataValues.id,
      title,
      description,
      location,
      price
    });
    await Image.create({ locationId: newLocation.id, imageUrl: image });

    res.json({ msg: 'succes' }); // maybe change to id or something
  })
);

module.exports = router;
