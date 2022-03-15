const db = require("../models");

module.exports = {
    deleteMember: async (req, res) => {
        try {
            const { id } = req.params;
            const memberDeleted = await db.Member.destroy({
                where: {
                    id,
                },
            });
            if (memberDeleted === 1) {
                res.status(200).json({
                    del: true,
                    message: `member with id ${id}, was deleted successfully`,
                });
            } else {
                res.status(404).json({
                    del: false,
                    message: `the id ${id} does not correspond to any member`,
                });
            }
        } catch (error) {
            res.status(500).json({
                del: false,
                data: error,
            });
        }
    }
}
