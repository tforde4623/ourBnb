const express = require('express');
const router = express.Router();

router.use('/api', require('./api'));

// serve some client side assets in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');

  // server index.html at root route
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../fontend', 'build', 'index.html')
    );
  });

  // static assets in build folder
  router.use(express.static(path.resolve('../frontend/build')));

  // serve clients index.html when route does not start with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });
}

// getting xsrf token when not in production
if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.json({});
  });
}

module.exports = router;
