/* eslint no-underscore-dangle: 0 */
const cryptoJS = require('crypto-js');
const { User } = require('../user/user.model');

const login = async ({ body }, res, next) => {
  try {
    const user = await User.findOne({ email: body.email });

    if (!user) return res.status(401).send('Usuário e/ou senha inválidos');

    const decrypt = cryptoJS.AES.decrypt(user.senha, process.env.PWD_SECRET);

    if (decrypt.toString(cryptoJS.enc.Utf8) !== body.senha) {
      return res.status(401).send('Usuário e/ou senha inválidos');
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { ultimo_login: new Date(), data_atualizacao: new Date() } },
      { new: true },
    );

    return res.send(updatedUser);
  } catch (e) {
    return next(e);
  }
};

module.exports = { login };
