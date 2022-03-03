const db = require("../models");
const passwordHelper = require('../helpers/password')

module.exports = {
    update: async (req, res) => {
      const { id } = req.params
      const { firstName, lastName, email, password, image, roleId} = req.body;
      try {
        let user = await db.User.findByPk(id)
        if (!user) {
            return res.status(404).json({
                msg: 'user not found',
            })
        }

        user.firstName = firstName ? firstName : user.firstName
        user.lastName = lastName ? lastName : user.lastName
        user.email = email ? email : user.email
        user.password = password ? await passwordHelper.encrypt(password) : user.password
        user.image = image ? image : user.image

        await user.save()
        const { password: pass, ...rest } = user.dataValues

        return res.status(200).json({
            message: 'user updated succesfully',
            user: rest,
        })

      } catch (error) {
          return res.status(500).json({
              message: 'internal server error',
          })
      }
  }
}
  