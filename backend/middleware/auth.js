const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const {authorization} = req.headers;
  // console.log("authorization", authorization);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(403).send({ message: 'Authorization required 111' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload

  try {
    payload = jwt.verify(
      token,
      process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret'
      );
  } catch {
    return res.status(403).send({ message: 'Authorization required 222' });
  }

  req.user = payload;
  next();
}
