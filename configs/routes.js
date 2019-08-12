const express = require('express');
const authorization = require('../api/authorization/auth.routes');
const user = require('../api/user/user.routes');

module.exports = (app) => {
  const router = express.Router();

  // Routes
  authorization(router);
  user(router);

  // Check if api is online
  router.route('/healthcheck').get((req, res) => res.send('OK'));

  app.use('/api', router);
};
