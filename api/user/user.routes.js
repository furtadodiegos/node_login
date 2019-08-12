const { getUser } = require('./user.controllers');
const { authorizationIsValid } = require('../authorization/auth.middlewares');

module.exports = (router) => {
  router.route('/users/:userId').get([authorizationIsValid, getUser]);
};
