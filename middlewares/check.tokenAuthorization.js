const { verify } = require('jsonwebtoken');

const checkTokenAuthorization = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(403).json({ error: 'Access denied' }); // If the token does not exist, we send as a response that access was denied

  try {
    const user = await verify(
      token,
      process.env.SECRETORPRIVATEKEY,
    ); // We check if the token is valid

    // We create an object in our request with the user property
    // and assign it an object with user information
    req.user = user;
    return next();
  } catch (error) {
    return res.status(403).json({ error: 'Token is invalid' }); // If there is an error we send as a response that the token was invalid
  }
};

module.exports = {
  checkTokenAuthorization,
};
