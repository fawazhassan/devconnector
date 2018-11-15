const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is Required.";
  }

  if (!Validator.isEmail(data.email) && isEmpty(errors.email)) {
    errors.email = "Not a valid Email Address.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "A password has not been provided.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
