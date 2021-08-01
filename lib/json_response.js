module.exports = function (payload, res, status = 200) {
  const maxage = 365 * 24 * 60 * 60;
  res.header("Cache-Control", `public, max-age=${maxage}, s-maxage=${maxage}`);
  payload = Object.assign(
    {},
    { success: !payload.error, version: "1.0.0" },
    payload
  );
  res.status(status).json(payload);
};
