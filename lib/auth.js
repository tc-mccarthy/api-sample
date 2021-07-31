const createError = require("http-errors");

module.exports = function (req, res, next) {
  const { apiKey } = req.query;

  if (apiKey === "50f71056b8a7b122011973b6966bc6c25a597b95") {
    next();
  } else {
    next(createError("Invalid API Key"));
  }
};
