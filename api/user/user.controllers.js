/* eslint no-underscore-dangle: 0 */
const cryptoJS = require('crypto-js');
const { User } = require('./user.model');

const addUser = async ({ body }, res, next) => {
  try {
    const emailExist = await User.findOne({ email: body.email });

    if (emailExist) return res.status(409).send('E-mail já existente.');

    // eslint-disable-next-line no-param-reassign
    body.senha = body.senha ? cryptoJS.AES.encrypt(body.senha, process.env.PWD_SECRET) : undefined;

    const user = await new User(body).save();

    return res.status(201).send(await User.findById(user._id));
  } catch (e) {
    return next(e);
  }
};

const getUser = async ({ params: { userId }, headers: { authorization } }, res, next) => {
  try {
    const user = await User.findById(userId);

    if (user.token !== authorization.replace('Bearer ', '')) {
      return res.status(401).send('Não autorizado');
    }

    return res.send(user);
  } catch (e) {
    return next(e);
  }
};

module.exports = { addUser, getUser };
