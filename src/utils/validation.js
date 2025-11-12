const validator = require("validator");

const validateLeaderboardFilters = (req) => {
  const { page = 0, limit = 10, name, gender, department } = req.query || {};

  if (
    page < 0 ||
    limit < 0 ||
    !validator.isNumeric(page.toString()) ||
    !validator.isNumeric(limit.toString())
  ) {
    throw new Error(
      `Invalid page value = [${page}] and limit value = [${limit}]`
    );
  }

  // name validation
  if (name && !validator.isAlpha(name)) {
    throw new Error(`Invalid name value = ${name}`);
  }

  // gender validation
  if (gender && !["female", "male"].includes(gender)) {
    throw new Error(`Invalid gender value = ${gender}`);
  }

  // department validation
  if (
    department &&
    !["SALES", "SERVICES", "MARKETING", "HR"].includes(department)
  ) {
    throw new Error(`Invalid department value = ${department}`);
  }
};

module.exports = {
  validateLeaderboardFilters,
};
