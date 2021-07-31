  <h3 align="center">Newmark API Consumption training</h3>

  <p align="center">
    An easy-to-consume RESTful API for practice!
    <br />
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

A simple data set that is queryable via an API located at https://www.journodev.com/learn-api

### Built With

- [NodeJS](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [MomentJS](https://momentjs.com/)

<!-- GETTING STARTED -->

## Getting Started

Acquire an API key from your teacher

## Usage

This is a signed API. All requests must include an `apiKey=<YOUR API KEY>` parameter in the URL.

### Getting all records

This will return an array of all records available via this API

```
https://www.journodev.com/learn-api/api/records
```

### Retrieving a single record

Every record has a unique ID and you can retrieve each record by that ID using the following URL structure

```
https://www.journodev.com/learn-api/api/records/2fb6547f-11d4-4cf0-8afa-29e7c4f40188
```

### Filtering/Querying

The API accepts key=value query string pairs to narrow your result set. For example, if you wanted to query for all records where the `job` is `Exhibition designer`

```
https://www.journodev.com/learn-api/api/records?job=Exhibition designer
```

#### Working with dates

The API leverages momentJS to perform intelligent analysis on dates. Most standard date formats are accepted but I recommend you use `YYYY-MM-DD` whenever possible. The API will do an exact date match if you filter/query on `date=` in your URL. You can also search by date range using `since` and `until`.

For example, the following will find all records with a date greater than or equal to January 1, 2021.

```
https://www.journodev.com/learn-api/api/records?since=2021-01-01
```

The following will find all records with a date less than or equal to January 1, 2022.

```
https://www.journodev.com/learn-api/api/records?until=2022-01-01
```

#### Combining filters

You can filter on multiple fields by including multiple key/value pairs in your query string separated by `&`. For example, the following will find all records where the `job` is `Exhibition designer` with a date between January 1, 2021 and January 1, 2022

```
https://www.journodev.com/learn-api/api/records?job=Exhibition designer&since=2021-01-01&until=2022-01-01
```

### Ordering records

You can sort the response by any field. By default, responses are ordered by date ascending (least to most).

```
https://www.journodev.com/learn-api/api/records?orderBy=name ASC
```

#### Multidimensional sorts

You sometimes need to be able to sort in multiple tiers. The following will order all records first by the value of the job fields ascending, and then by the name field. The entire list will be sorted by the job field -- when multiple records have the same value for `job` those records will be sorted among themselves by `name`. You can combine sorts by separating them with a `,`

```
https://www.journodev.com/learn-api/api/records?orderBy=job ASC,name ASC
```

### Pagination

The API breaks results sets up into pages to keep response payloads small.

By default, the API responds with up to 20 items in a payload. You can get the next 20 items by adding/updating a `page=<PAGE NUMBER>` parameter to your query. You can also change the number of records in the response payload by adding/updating a `hitsPerPage=<RECORDS PER RESPONSE>` parameter to your request.

Response payloads include `hitsPerPage`, `page`, `total_records`, and `total_pages` metadata to inform your code about visible and remaining records. The metadata will also include a `next` parameter with the full URL to the next page of records if your query and parameters are spanned across multiple pages.

The following pulls in every record, displaying a maximum of 100 records per page and loads up the third page of results

```
https://www.journodev.com/learn-api/api/records?page=2&hitsPerPage=100
```

### Putting it all together

Filtering and ordering can be readily combined. The following finds all records from Jan. 1, 2020 - Jan. 1, 2021 with the records sorted by `job` name. The response set contains 50 records per page and loads up the second page of results.

```
https://www.journodev.com/learn-api/api/records?since=2020-01-01&until=2021-01-01&orderBy=job%20ASC&page=2&hitsPerPage=50
```

## License

Distributed under the MIT License. See `LICENSE` for more information.
