const router = require('express').Router();

router.use('/session', require('./session.js'));
router.use('/users', require('./users.js'));
router.use('/locations', require('./locations'))
router.use('/reviews', require('./reviews'))

router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;
