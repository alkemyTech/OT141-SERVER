const { LIMIT_CATEGORIES } = require('../constants/category.constants');
const db = require('../models');

const createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const nameUpperCase = name.toUpperCase();

    const newCategory = await db.category.create({
      name: nameUpperCase,
      description: description || null,
      image: image || null,
    });

    return res.status(201).json({
      ok: true,
      msg: `Created ${newCategory.name} category`,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: 'Contact to administrator',
    });
  }
};

const getAllCategories = async (req, res) => {
  let { page = 1 } = req.query;
  const errorMsg = 'Invalid page number';
  try {
  // If the PAGE is less than 0 or is not a number
  // THROW me an error instance by the catch
    if (page <= 0 || Number.isNaN(page)) throw new Error(errorMsg);

    // The user sends us a page value but the function offset starts at 0 to show the first records
    page = +page - 1;

    // Function to get the url (adapted if it is in production)
    // and receives as second parameter the page number.
    const getUrl = (request, NPage) => `${request.protocol}://${request.get('host')}/categories?page=${NPage}`;

    // If page exists then offset receives the multiplication of the page value with
    // the requested element limit if not offset equals 0
    const offset = page ? page * LIMIT_CATEGORIES : 0;

    const { count, rows: results } = await db.category.findAndCountAll({
      attributes: ['name'],
      limit: LIMIT_CATEGORIES,
      offset,
    });

    if (results.length === 0) {
      return res.status(204).json({
        ok: false,
        msg: 'There are no categories created',
      });
    }

    // If the OFFSET value obtained from the multiplication is greater than
    // the total number of records in the database, an error instance is thrown by the catch
    if (offset > count) throw new Error(errorMsg);

    const existPrev = page > 0 && offset < count;
    const existNext = Math.floor(count / LIMIT_CATEGORIES) > page;

    res.status(200).json({
      prev: existPrev ? getUrl(req, page) : null,
      next: existNext ? getUrl(req, page + 2) : null,
      results,
    });
  } catch (err) {
    const isErrorServer = err.message !== errorMsg;
    if (isErrorServer) {
      return res.status(isErrorServer ? 500 : 400).json({
        ok: false,
        msg: isErrorServer ? 'Contact to administrator' : err.message,
      });
    }
  }
};

const updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image } = req.body;
    const category = await db.Category.update(
      {
        name,
        description,
        image,
      },
      {
        where: { id },
      },
    );
    if (!category) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }
    return res.status(200).json({
      message: 'Category updated',
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await db.Category.findOne({
      where: { id },
    });
    if (!category) {
      return res.status(404).json({
        ok: false,
        msg: 'The category does not exist',
      });
    }
    return res.status(200).json({
      message: 'Category found',
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategoryById,
  getCategoryById,
};
