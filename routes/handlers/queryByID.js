const json_response = require("../../lib/json_response");
const data_source = require("../../data");
const createError = require("http-errors");

module.exports = function (req, res, next) {
  const data = data_source.find((d) => d.id === req.params.id);

  if (!data) {
    next(createError("ID not found"));
  } else {
    json_response({ data }, res);
  }
};
