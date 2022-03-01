const db = require("../models");

module.exports = {
    // DELETE USER = DELETE
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const userToDelete = await db.User.findByPk(id);
            if (!userToDelete) {
                res.status(404).json({
                    del: false,
                    message: "it is not possible to delete that user since that id is not found in our database",
                })
            } else {
                await db.User.destroy({
                    where: {
                        id
                    }
                })
                res.status(200).json({
                    del: true,
                    message: `user with id ${id} was deleted successfully`,
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

