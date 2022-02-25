const db = require("../models");
const {encrypt} = require('../helpers/password')

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
        user.password = password ? await encrypt(password) : user.password
        user.image = image ? image : user.image
        if (req.body.roleId == '1') {
            user.roleId = roleId ? roleId : user.roleId
        }
        await user.save()

        return res.status(200).json({
            msg: 'user updated succesfully',
        })

      } catch (error) {
          return res.status(500).json({
              msg: 'internal server error',
          })
      }
  }
}
  