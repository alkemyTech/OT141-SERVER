
const db = require("../models");

module.exports = {
  store: async (req, res) => {

    // constant variables
    const { name, content, image } = req.body;

    try { 
       const data = await db.Activity.create({
          name,
          content,
          image
        });
        // I loop through the object and remove unnecessary properties
        for (key in data) {
          delete data[key].createdAt;
          delete data[key].updatedAt;
        }
        res.status(201).json({
          meta: {
            status: 201,
            ok: true,
          },
          data,
          errors: null,
        });
        
    } catch (error) {
      // Api response with error code 503 (Server Server no disponible)
     res.status(503).json({
        meta: {
          status: 503,
          ok: false,
        },
        data: null,
        errors: {msg : 'Server no disponible'},
      });
    }
  },
  update: async (req, res) => {
    // const variables
    const { id } = req.params
    const { name, content, image } = req.body;
    try {
        let activityFound = await db.Activity.findByPk(id)
        if (!activityFound) {
            res.status(404).json({
                msg: `there is no activity matching the specified id`,
            })
        } else {
            await db.Activity.update({
                name,
                image,
                content,
            }, {
                where: { id: id }
            })
            res.status(200).json({
                msg: `activity updated successfully`,
                data: activityFound
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
