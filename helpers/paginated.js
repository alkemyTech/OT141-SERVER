const paginated = async (model, limit, page, req) => {
  page -= 1;
  const offset = page ? page * limit : 0;

  const { rows: results, count } = await model.findAndCountAll({
    offset,
    limit,
  });

  const existPrev = page > 0 && offset < count;
  const existNext = Math.floor(count / limit) > page;

  const prev = existPrev
    ? `${req.protocol}://${req.get('host')}/categories?page=${page}`
    : null;
  const next = existNext
    ? `${req.protocol}://${req.get('host')}/categories?page=${page + 2}`
    : null;

  return { results, next, prev };
};

module.exports = { paginated };
