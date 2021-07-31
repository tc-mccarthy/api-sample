const json_response = require("../../lib/json_response");
const data_source = require("../../data");
const createError = require("http-errors");
const moment = require("moment");
const array_chunk = require("../../lib/array_chunk");

module.exports = function (req, res, next) {
  const query_allowed = ["since", "until", "date", "name", "company", "job"];

  const query_ignore = ["orderBy", "apiKey", "page", "hitsPerPage"];
  let orderBy = {
    date: "ASC",
  };

  let { hitsPerPage, page } = req.query;
  let nextPage = false;

  if (!hitsPerPage) {
    hitsPerPage = 20;
  }
  if (!page) {
    page = 1;
  }

  hitsPerPage = parseInt(hitsPerPage);
  page = parseInt(page);

  const disallowed = Object.keys(req.query).filter(
    (q) => query_allowed.indexOf(q) === -1 && query_ignore.indexOf(q) === -1
  );

  if (disallowed.length > 0) {
    next(createError(`Invalid query params: ${disallowed.join(", ")}`));
  } else {
    try {
      let data = data_source;

      Object.keys(req.query).forEach((q) => {
        if (query_ignore.indexOf(q) > -1) {
          return false;
        }
        data = data.filter((d) => {
          // if this is before, do a date-based query
          if (q === "since") {
            return moment(d.date).isSameOrAfter(moment(req.query[q]));
          }

          // if this is after, do a date-based query
          if (q === "until") {
            return moment(d.date).isSameOrBefore(moment(req.query[q]));
          }

          // if this is date, do a date-based query
          if (q === "date") {
            return moment(d.date).isSame(moment(req.query[q]));
          }

          return d[q].toLowerCase().indexOf(req.query[q].toLowerCase()) > -1;
        });
      });

      //sort the array
      if (req.query.orderBy) {
        const orderArr = req.query.orderBy.split(/,\s*/);
        const ord = {};
        orderArr.forEach((o) => {
          const [matches, key, value] = o.match(/([A-Za-z0-9]+)\s*(ASC|DESC)/);
          ord[key] = value;
        });

        orderBy = ord;
      }
      const props = Object.keys(orderBy);
      props.forEach((prop, idx) => {
        data = data.sort((a, b) => {
          if (idx > 0) {
            const prevProp = props[idx - 1];
            if (a[prevProp] !== b[prevProp]) {
              return 0;
            }
          }

          if (prop === "date") {
            if (orderBy.date === "DESC") {
              if (moment(a.date).isAfter(moment(b.date))) {
                return -1;
              }

              if (moment(a.date).isBefore(moment(b.date))) {
                return 1;
              }
            }

            if (orderBy.date === "ASC") {
              if (moment(a.date).isAfter(moment(b.date))) {
                return 1;
              }

              if (moment(a.date).isBefore(moment(b.date))) {
                return -1;
              }
            }
          } else {
            if (orderBy[prop] === "DESC") {
              return a[prop] < b[prop] ? 1 : -1;
            } else {
              return a[prop] > b[prop] ? 1 : -1;
            }
          }
        });
      });

      total_records = data.length;
      total_pages = Math.ceil(total_records / hitsPerPage);
      data = array_chunk(data, hitsPerPage);
      let new_params = Object.assign({}, req.query);
      new_params.page = page + 1;

      new_params = new URLSearchParams(new_params);

      if (page - 1 < total_pages) {
        nextPage =
          "https://www.journodev.com/learn-api/api/records" +
          new_params.toString();
      }

      json_response(
        { data: data[page - 1], page, hitsPerPage, total_pages, nextPage },
        res
      );
    } catch (e) {
      next(createError(`Error: ${e.message}`));
    }
  }
};
