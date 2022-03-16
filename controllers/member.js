const { LIMIT_PAGE } = require('../constants/limit-page.constants');
const { paginated } = require('../helpers/paginated');
const db = require("../models");

module.exports = {
    list: async (req, res) => {
        try {
            const { page = 1 } = req.query;
            const members = await db.Member.findAll();
            const { results, next, prev } = await paginated(members, LIMIT_PAGE, +page, req);
            if (results.length === 0) {
                return res.status(204).json({
                  ok: false,
                  msg: 'There are no members created',
                });
              }
            return res.status(200).json({ prev, next, results });
            });
        } catch (error) {
            return res.status(500).json({
                message: 'internal server error',
                data: error
            });
        }
    },
}; 