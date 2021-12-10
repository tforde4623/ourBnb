const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { validateLocation } = require('../../utils/validation');
const { Location, Image, User, Review } = require('../../db/models');

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
        },
        {
          model: Review,
          include: {
            model: User
          }
        }],
        limit: 10
      });

    res.json(locations);
  })
);

// get one location (by id)
router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const location = 
      await Location.findByPk(req.params.id, { 
        include: [
          { model: Image },
          { model: User },
          { model: Review }
        ]
      });

    if (!location) next();
    else res.json(location);
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

// edit a route (if it belongs to you...)
router.put(
  '/:id',
  requireAuth,
  validateLocation,
  asyncHandler(async (req, res) => {
    const { title, description, location, price, image } = req.body;
    const id = req.params.id;
    const oldPost = await Location.findByPk(id);
    
    if (+oldPost.ownerId !== +req.user.dataValues.id) {
      res.status(401);
      res.json({ msg: 'You are not the owner of this post!' });
    } else {
      await oldPost.update({
        title,
        description,
        location,
        price
      })

      const oldImage = await Image.findOne({ where: { locationId: id }})

      await oldImage.update({ imageUrl: image })
      res.status(204); // updated successfully
      res.json({ msg: 'Success' });
    }
  })
);


// delete a location (by id) DELETE /api/locations/:id
router.delete(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    const location = await Location.findByPk(req.params.id);

    if (+location.ownerId !== +req.user.dataValues.id) {
      res.status(401);
      res.json({ msg: 'You are not the owner of this post!'});
    } else {
      await Location.destroy({ where: { id: req.params.id }});

      res.status(202);
      res.json({ msg: 'success' });
    }
  })
);

// get all the reviews of a given location
router.get(
  '/:locationId/reviews',
  asyncHandler(async (req, res) => {
    const locationId = req.params.locationId;
    const reviews = await Review.findAll({ 
      where: { locationId },
      include: [{ model: User }]
    });

    if (reviews) {
      res.json(reviews);
    }
  })
);


module.exports = router;
