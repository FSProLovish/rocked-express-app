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
      filters.name = name;
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
    const data = await User.findAll({
      where: {
        ...filters,
      },
      order: [["stars", "DESC"]],
      offset,
      limit: _limit,
    });

    const users = data.map((row) => row.toJSON());

    res.status(200).json({
      success: true,
      data: users,
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
