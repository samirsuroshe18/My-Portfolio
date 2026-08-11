/**
 * Shared admin list-query helper: search + pagination + sort.
 * `searchableFields` are matched with a case-insensitive regex OR'd together.
 */
export async function paginate(Model, req, { searchableFields = [], baseFilter = {} } = {}) {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
  const sortBy = req.query.sortBy || 'order';
  const sortOrder = req.query.sortOrder === 'asc' ? 1 : req.query.sortOrder === 'desc' ? -1 : 1;

  const filter = { ...baseFilter };

  if (req.query.search && searchableFields.length > 0) {
    const regex = new RegExp(escapeRegex(req.query.search), 'i');
    filter.$or = searchableFields.map((field) => ({ [field]: regex }));
  }

  const [items, total] = await Promise.all([
    Model.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit),
    Model.countDocuments(filter),
  ]);

  return {
    items,
    meta: {
      page,
      limit,
      total,
      pageCount: Math.ceil(total / limit) || 1,
    },
  };
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
