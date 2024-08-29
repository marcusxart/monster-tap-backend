const { Op } = require("sequelize");
const { MAX_RESULTS } = require("../config/constants");

const filterSortPaginate = async (
  model,
  options = [],
  attributes,
  reqQuery,
) => {
  const {
    page = 1,
    limit = MAX_RESULTS,
    sort = "id",
    order = "ASC",
    search = "",
  } = reqQuery;
  const sequelizeOptions = {};

  // Apply pagination if 'paginate' is in options
  if (options.includes("paginate")) {
    const size = parseInt(limit);
    const offset = (parseInt(page) - 1) * size;
    sequelizeOptions.limit = size;
    sequelizeOptions.offset = offset;
  }

  // Apply sorting if 'sort' is in options
  if (options.includes("sort")) {
    sequelizeOptions.order = [[sort, order.toUpperCase()]];
  }

  // Apply filtering if 'filter' is in options
  const filterOption = options.find(
    (option) => typeof option === "object" && option.filter,
  );
  if (filterOption && filterOption.filter) {
    sequelizeOptions.where = {
      [Op.or]: filterOption.filter.map((key) => ({
        [key]: { [Op.like]: `%${search}%` },
      })),
    };
  }

  try {
    const result = await model.findAndCountAll({
      ...sequelizeOptions,
      ...attributes,
    });

    return {
      totalItems: result.count || 1,
      count: result.rows.length,
      currentPage: parseInt(page),
      data: result.rows,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = filterSortPaginate;
