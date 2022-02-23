const {request, response} = require('express');
const bcryptjs = require('bcryptjs');
const {
    createJWT,
    resError
} = require('../helpers');
const db = require('../models');

const userLogin = async(req, res) => {
    try {
        const {email, password} = req.body;
    
        const user = await db.User.findOne({
        where: {email}
        });
    
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: `The ${email} not exist`
            });
        }

        // Verify Password
        const validPass = bcryptjs.compareSync(password, user.password);
        if (!validPass) {
            return res.status(400).json({
                ok: false,
                msg: "The passsword is wrong"
            });
        }
    
        //Create JWT
        const token = await createJWT(user.email);
    
        res.status(200).json({
            ok: true,
            msg: 'User logged in',
            token
        });
    } catch (err) {
        resError(err, res);
    }
}

module.exports = {
    userLogin
}