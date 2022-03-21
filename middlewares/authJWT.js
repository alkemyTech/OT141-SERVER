const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = (req, res, next) => {
  let token = req.header('Authorization');

  if (!token) {
    return res.status(403).json({ error: 'A token is required for authentication' });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  try {
    const decoded = jwt.verify(token, config.SECRETORPRIVATEKEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ error: 'Invalid Token' });
  }
  return next();
};

module.exports = { verifyToken };
