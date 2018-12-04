const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "Educational Insitution name is Required.";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree title is Required.";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "Start date is Required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
