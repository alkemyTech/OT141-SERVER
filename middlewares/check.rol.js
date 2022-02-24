const checkRol = (req, res, next) => {
  const { roleId } = req.body;
  // In the database the number 1 represents the administrator role
  return roleId !== 1
    ?  res.status(401).json({
        meta: {
          status: 401,
          ok: false,
        },
        errors: { msg: "You do not have permissions for this resource" },
      }) 
      
    : next();
};

module.exports = { checkRol };
