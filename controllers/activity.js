const { uploadInBucket } = require('../helpers/uploadAWS-S3');
const db = require('../models');

module.exports = {
  store: async (req, res) => {
    // constant variables
    const { name, content } = req.body;
    try {
      let fileURL;
      if (req.files?.image) {
        const { Location } = await uploadInBucket(req.files.image);
        fileURL = Location;
      }
      const data = await db.Activity.create({
        name,
        content,
        image: fileURL || 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      });
        // I loop through the object and remove unnecessary properties
      for (key in data) { // eslint-disable-line
        delete data[key].createdAt; // eslint-disable-line
        delete data[key].updatedAt; // eslint-disable-line
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
        errors: { msg: 'Server no disponible' },
      });
    }
  },
  update: async (req, res) => {
    // const variables
    const { id } = req.params;
    const { name, content } = req.body;
    try {
      const activityFound = await db.Activity.findByPk(id);
      let fileURL;
      if (req.files?.image) {
        const { Location } = await uploadInBucket(req.files.image);
        fileURL = Location;
      }

      if (!activityFound) {
        return res.status(404).json({
          msg: 'there is no activity matching the specified id',
        });
      }
      await db.Activity.update({
        name,
        image: fileURL || activityFound.image,
        content,
      }, {
        where: { id },
      });
      return res.status(200).json({
        msg: 'activity updated successfully',
        data: {
          ...activityFound.dataValues, name, content, image: activityFound.image,
        },
      });
    } catch (error) {
      return res.status(500).json({
        msg: 'an error occurred',
        data: error,
      });
    }
  },
};
