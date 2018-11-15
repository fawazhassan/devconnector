const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.School = !isEmpty(data.School) ? data.School : "";
  data.Degree = !isEmpty(data.Degree) ? data.Degree : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.School)) {
    errors.School = "Educational Insitution name is Required.";
  }

  if (Validator.isEmpty(data.Degree)) {
    errors.Degree = "Degree title is Required.";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "Start date is Required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
