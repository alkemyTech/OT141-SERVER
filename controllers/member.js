const db = require('../models');
module.exports = {
    updateMember: async (req, res) => {
        const { id } = req.params;
        const { name, image } = req.body;
        try {
            let member = await db.Member.update({
                name,
                image,
            }, {
                where: { id },
            });

            if (!member[0]) {
                return res.status(404).json({
                    ok: false,
                    msg: 'there is no member matching the specified id',
                });

            }
            res.status(200).json({
                ok: true,
                msg: 'member updated successfully',
            });

        } catch (error) {
            res.status(500).json({
                msg: 'an error occurred',
                data: error,
            });
        }
    }
}