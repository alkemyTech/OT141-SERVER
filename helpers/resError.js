// Error response for use if server was error
const resError = (err, res) => {
  res.status(500).json({
    msg: 'Contact to administrator',
    error: err,
  });
};

module.exports = {
  resError,
};
