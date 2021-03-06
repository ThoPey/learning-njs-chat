const socketServer = require('./public/js/socket-server');
const url = require('url');

const port    = 8080;
const express = require('express');

const app     = express();
const server  = require('http').createServer(app);
const io      = require('socket.io')(server);

app.use(express.static(__dirname + "/public/"));

io.on('connection', client => {
  const username = socketServer.getUsername(client, url);

  client.on('message', data => socketServer.sendMessage(io, data) );
  client.on('disconnect', () => socketServer.clientDisconnection(io, username));

  socketServer.clientConnection(io, username);
});

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