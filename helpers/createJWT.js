const jwt = require('jsonwebtoken');

const createJWT = (user) => new Promise((resolve, reject) => {
  const payload = { user };

  jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
    expiresIn: '4h',
  }, (err, token) => {
    if (err) {
      reject(err);
    } else {
      resolve(token);
    }
  });
});

module.exports = {
  createJWT,
};
