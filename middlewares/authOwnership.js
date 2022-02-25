const verifyJwt = require('../helpers/verifyJWT')
const { ROLE_ADMIN } = require('../constants/user.constants')

const authOwnership = async (req, res, next) => {
    const authHeader = req.headers.authorization
    const { email } = req.body
    try {
        const bearerToken = authHeader.split(' ')[1]
        const payload = await verifyJwt(bearerToken)
        //verify user ownership or admin role
        if (payload.email === email || payload.roleId === ROLE_ADMIN) 
            return next()
            
        return res.status(403).json( msgAccessFobidden() )
    } catch (error) {
        return res.status(403).json( msgAccessFobidden() )
    } 
}

function msgAccessFobidden(error) {
    return {
        ok: false,
        msg: "Access Forbidden",
    }
}

module.exports = authOwnership