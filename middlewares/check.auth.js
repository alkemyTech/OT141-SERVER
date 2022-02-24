const checkAuth = (req, res, next) => {
  // We obtain the value of the Authorization property received by the user's header
  const token = req.header("Authorization");

  // If the token does not exist, we send as a response that access was denied
  if (!token) {
    return res.status(403).json({
      meta: {
        status: 403,
        ok: false,
      },
      data: null,
      errors: { msg: "Access denied" },
    });
  }
  next();
};

module.exports = {
  checkAuth,
};
