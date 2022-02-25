const jwt = require('jsonwebtoken');

const verifyJWT = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRETORPRIVATEKEY, (err, authData) => {
            if (err) {
                reject(err)
            }
            resolve(authData)
        })
    })
}

module.exports = verifyJWT