const db = require('../models');


const getNewById = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await db.News.findOne({
            where: { id },
        });
        if (!news) {
            return res.status(404).json({
                ok: false,
                msg: 'The new does not exist',
            });
        }
        return res.status(200).json({
            message: 'New found',
            data: news,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = { getNewById };