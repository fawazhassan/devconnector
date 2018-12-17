module.exports = {
  mongoURI:
    "mongodb://fawaz007%40msn.com:Sabahat193@ds147033.mlab.com:47033/tutorial_devconnector",
  secretOrKey: "secret"
};

if (process.env.NODE_ENV === "production") {
  module.exports = require("./keys_prod");
} else {
  module.exports = require("./keys_dev");
}
