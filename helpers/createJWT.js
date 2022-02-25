const jwt = require('jsonwebtoken');

const createJWT = (user) => {
    return new Promise((resolve, reject) => {
        const payload = user;

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Was can not create the token');
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    createJWT
}