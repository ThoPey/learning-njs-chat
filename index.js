const express = require('express');

const app  = express();
const port = 8080;

app.use(express.static(__dirname + "/public/"));

app.use(function (res, res, next) {
  res.setHeader("Content-Type", "text/html");
  return next();
})
.all("/", function (res, req, next) {
  return next(); // For now. Has to be replaced
})
.use(function(req, res) {
  res.status("404");
  res.render("404.ejs");
});

app.listen(port);