const verifyJwt = require('../helpers/verifyJWT')

const authOwnership = async (req, res, next) => {
    const authHeader = req.headers.authorization
    try {
        const bearerToken = authHeader.split(' ')[1]
        const payload = await verifyJwt(bearerToken)
        //verify user ownership
        if (payload.email === req.body.email) 
            return next()
        //verify admin role
        if (payload.roleId == 1 ) 
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