module.exports = function (payload, res, status = 200) {
  payload = Object.assign(
    {},
    { success: !payload.error, version: "1.0.0" },
    payload
  );
  res.status(status).json(payload);
};
