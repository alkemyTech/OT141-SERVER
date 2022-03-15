const db = require("../models");

module.exports = {
    list: async (req, res) => {
        try {
            const members = await db.Member.findAll();
            return res.status(200).json({
                message: 'list of members',
                count: members.length,
                data: members
            });
        } catch (error) {
            return res.status(500).json({
                message: 'internal server error',
                data: error
            });
        }
    },
}