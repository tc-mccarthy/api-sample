const express = require("express");
const router = express.Router();
const json_response = require("../lib/json_response");
const query = require("./handlers/query");
const queryByID = require("./handlers/queryByID");
const data = require("../data");
const { v4: uuidv4 } = require("uuid");

/* GET users listing. */
router.get("/", function (req, res, next) {
  json_response(
    {
      data: {
        message: "API is running. Welcome!",
      },
    },
    res
  );
});
router.get("/records", query);
router.get("/records/:id", queryByID);
router.get("/mutate", function (req, res, next) {
  json_response(
    {
      data: data.map((d) => {
        d = {
          id: uuidv4(),
          ...d,
          geo: { latitude: d.latitude, longitude: d.longitude },
        };
        delete d.latitude;
        delete d.longitude;

        return d;
      }),
    },
    res
  );
});

module.exports = router;
