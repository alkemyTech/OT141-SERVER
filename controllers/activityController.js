const db = require('../models');

const activityController = {
    update: async (req, res) => {
        // const variables
        const { id } = req.params
        const { name, content, image } = req.body;
        try {
            let activityFound = await db.Activity.findBypk(id)
            if (!activityFound) {
                res.status(404).json({
                    msg: `there is no activity matching the specified id`,
                })
            } else {
                let activityUpdated = await db.Activity.Update({
                    name,
                    image,
                    content,
                }, {
                    where: { id: id }
                })
                res.status(200).json({
                    msg: `activity updated successfully`,
                    data: activityUpdated
                })
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                msg: 'an error occurred',
                data: error
            })
        }
    }
};

module.exports = activityController;