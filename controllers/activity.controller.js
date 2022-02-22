const { validationResult } = require("express-validator");
const db = require("../models");

module.exports = {
  store: async (req, res) => {

    // constant variables
    const { name, content, image } = req.body;
    const errors = validationResult(req) // I get errors fetched from middleware made with express-validator
    const errorsObjects = errors.mapped();

    try {
      if (errors.isEmpty()) {
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

      } else {

        // I loop through the object and remove unnecessary properties
        for (key in errorsObjects) {
          delete errorsObjects[key].param;
          delete errorsObjects[key].location;
        }
        // Api response with error code 422 (Existence of errors) 
        res.status(422).json({
          meta: {
            status: 422,
            ok: false,
          },
          data: null,
          errors: errorsObjects,
        });
      }
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


};
