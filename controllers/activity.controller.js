
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
  }


};
