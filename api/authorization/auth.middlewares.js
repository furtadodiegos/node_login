const jwt = require('jsonwebtoken');

const authorizationIsValid = ({ headers: { authorization } }, res, next) => {
  if (!authorization || authorization.substring(0, 6) !== 'Bearer') {
    return res.status(401).send('Não autorizado');
  }

  const decoded = jwt.verify(authorization.replace('Bearer ', ''), process.env.JWT_SECRET);

  if (new Date() > new Date(decoded.iat * 1000)) return res.status(401).send('Sessão inválida');

  return next();
};

const handleToken = (req, res, next) => {
  req.body.token = jwt.sign(
    { email: req.body.email, iat: Math.floor(Date.now() / 1000) + 1800 },
    process.env.JWT_SECRET,
  );

  next();
};

module.exports = { handleToken, authorizationIsValid };
