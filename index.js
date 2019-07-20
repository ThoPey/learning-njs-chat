const socketServer = require('./public/js/socket-server');

const port    = 8080;
const express = require('express');

const app     = express();
const server  = require('http').createServer(app);
const io      = require('socket.io')(server);

app.use(express.static(__dirname + "/public/"));

io.on('connection', socketServer.clientConnection);

app.use(function (res, res, next) {
  res.setHeader("Content-Type", "text/html");
  return next();
})
.get("/enter", function(req, res) {
  res.render("index.ejs", { username: req.query.username } );
})
.all("/", function(req, res) {
  res.render("connect.ejs");
})
.use(function (req, res) {
  res.status(404);
  res.render("404.ejs");
});

server.listen(port);