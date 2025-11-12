const validator = require("validator");

const validateLeaderboardFilters = (req) => {
  const { page, limit, name, gender, department } = req.query;

  if (!validator.isNumeric(page) || !validator.isNumeric(limit)) {
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
