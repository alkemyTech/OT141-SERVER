const db = require("../models");

module.exports = {
    // DELETE USER = SOFT DELETE
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            // As paranoid at model is setted to true, this will make a soft delete;
            await db.User.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({
                del: true,
                message: `user with id ${id} was deleted successfully`,
            })
        } catch (error) {
            res.status(500).json({
                del: false,
                data: error
            });
        }
    }
}