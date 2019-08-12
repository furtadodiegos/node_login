const { addUser } = require('../user/user.controllers');
const { login } = require('./auth.controllers');
const { handleToken } = require('./auth.middlewares');

module.exports = (router) => {
  router.route('/singup').post([handleToken, addUser]);

  router.route('/signin').post(login);
};
