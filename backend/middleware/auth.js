const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  // console.log("authorization", authorization);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(403).send({ message: `Authorization required: ${err}` });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    return res.status(403).send({ message: `Authorization required: ${err}` });
  }

  req.user = payload;
  next();
};

module.exports = {
  auth,
};
