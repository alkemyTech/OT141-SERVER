const db = require("../models");

module.exports = {
    // DELETE USER = SOFT DELETE
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            // As paranoid at model is setted to true, destroy method will make a soft delete;
            let userDeleted = await db.User.destroy({
                where: {
                    id
                }
            })
            if (userDeleted == 1) {
                res.status(200).json({
                    del: true,
                    message: `user with id ${id} was deleted successfully`,
                })
            } else {
                res.status(500).json({
                    del: false,
                    message: `the id ${id} is no longer available in database`
                })
            }
        } catch (error) {
            res.status(500).json({
                del: false,
                data: error
            });
        }
    }
}