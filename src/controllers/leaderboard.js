const User = require("../models/user");
const validator = require("validator");
const { validateLeaderboardFilters } = require("../utils/validation");

const getLeaderboard = async (req, res) => {
  try {
    // validate filters
    validateLeaderboardFilters(req);

    const { page, limit, name, gender, department } = req.query;

    // support of various filters
    const filters = {};
    if (name && validator.isAlpha(name)) {
      filters.firstName = name;
    }

    if (gender) {
      filters.gender = gender;
    }

    if (department) {
      filters.department = department;
    }

    const offset = Number.parseInt(page) || 0;
    const _limit = Number.parseInt(limit) || 10;

    // fetching user data with pagination and filters
    const { count, rows } = await User.findAndCountAll({
      where: {
        ...filters,
      },
      order: [["stars", "DESC"]],
      attributes: ["email", "firstName", "lastName", "stars"],
      offset: offset * _limit,
      limit: _limit,
    });

    const users = rows
      .map((row) => row.toJSON())
      .map((row, i) => ({
        rank: i + 1,
        ...row,
      }));

    res.status(200).json({
      success: true,
      data: {
        hits: users,
        nbHits: count,
        page: offset,
        limit: _limit,
        nbPages: Math.floor(count / _limit),
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      err: err.message,
    });
  }
};

module.exports = {
  getLeaderboard,
};
