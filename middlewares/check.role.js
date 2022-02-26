const { verify } = require("jsonwebtoken");
const {ROLE_ADMIN} = require("../constants/user.constants.js")

const checkRole = async (req, res, next) => {
  const token = req.header("Authorization");

  try {
    // Decrypt el token
    const { roleId } = await verify(token, process.env.SECRETORPRIVATEKEY);
    // In the database the number 1 represents the administrator role

   if(roleId !== ROLE_ADMIN){
    return res.status(401).json({
       meta: {
         status: 401,
         ok: false,
       },
       errors: { msg: "You do not have permissions for this resource" },
     });
   }
    next();

  } catch (error) {
    res.status(503).json({
      meta: {
        status: 503,
        ok: false,
      },
      errors: { msg: "Server failure" },
    });
  }
};

module.exports = { checkRole };
