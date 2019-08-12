const { User } = require('./user.model');

const prepareDatabase = (done) => {
  User.deleteMany({})
    .then(() => done())
    .catch((err) => done(err));
};

module.exports = { prepareDatabase };
