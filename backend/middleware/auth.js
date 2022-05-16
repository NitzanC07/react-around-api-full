module.exports = (req, res, next) => {
  const { authorization } = req.header;
  console.log(authorization);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Authorization required' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload

  try {
    payload = jwt.verify(
      token,
      process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret'
      );
  } catch {
    return res.status(401).send({ message: 'Authorization required' });
  }

  console.log(req.user);
  req.user = payload;
  next();
}
