const json_response = require("./json_response");

module.exports = function (err, req, res, next) {
  json_response({ error: err.message }, res, 400);
};
