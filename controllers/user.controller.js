const db = require('../models');
const passwordHelper = require('../helpers/password');

module.exports = {
  update: async (req, res) => {
    const { id } = req.params;
    const {
      firstName, lastName, email, password, image,
    } = req.body;
    try {
      const user = await db.User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          msg: 'user not found',
        });
      }

      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.email = email || user.email;
      user.password = password ? await passwordHelper.encrypt(password) : user.password;
      user.image = image || user.image;

      await user.save();
      const { password: pass, ...rest } = user.dataValues;

      return res.status(200).json({
        message: 'user updated succesfully',
        user: rest,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'internal server error',
      });
    }
  },
  // DELETE USER = SOFT DELETE
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      // As paranoid at model is setted to true, destroy method will make a soft delete;
      const userDeleted = await db.User.destroy({
        where: {
          id,
        },
      });
      if (userDeleted === 1) {
        res.status(200).json({
          del: true,
          message: `user with id ${id} was deleted successfully`,
        });
      } else {
        res.status(404).json({
          del: false,
          message: `the id ${id} is no longer available in database`,
        });
      }
    } catch (error) {
      res.status(500).json({
        del: false,
        data: error,
      });
    }
  },
};
