const db = require('../models');

const activitiesController = {
    update: async (req, res) => {
        const { id } = req.params
        const { name, content, image } = req.body;
        try {
            let activityFound = await db.Activity.findBypk(id)
            if (!activityFound) {
                res.status(404).json({
                    url: `api/activities/update/${id}`,
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
                res.status(201).json({
                    url: `api/activities/update/${id}`,
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
}

module.exports = activitiesController;