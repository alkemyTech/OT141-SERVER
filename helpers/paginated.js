const paginated = (array, limit, page, req) => {
  page -= 1;
  const offset = page ? page * limit : 0;

  let results = [];
  for (let i = offset; i < limit + offset; i++) {
    if (array[i] != null) {
      results = [...results, array[i]];
    }
  }

  const existPrev = page > 0 && offset < array.length;
  const existNext = Math.floor(array.length / limit) > page;

  const prev = existPrev
    ? `${req.protocol}://${req.get('host')}/categories?page=${page}`
    : null;
  const next = existNext
    ? `${req.protocol}://${req.get('host')}/categories?page=${page + 2}`
    : null;

  return { results, next, prev };
};

module.exports = { paginated };
