const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('./errors')

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  // console.log("authorization", authorization);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(403).send({ message: 'Authorization required' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    return err.status(403).send({ message: 'Authorization required' });
  }

  req.user = payload;
  next();
};

module.exports = {
  auth,
};
