"use strict";

module.exports = {
  clientConnection: clientConnection,
  clientDisconnection: clientDisconnection,
  getUsername: getUsername,
  sendMessage: sendMessage
};

function clientConnection(socket, username) {
  const data = {
    type: "connection",
    author: username
  }
  sendMessage(socket, data);
}

function clientDisconnection(socket, username) {
  const data = {
    type: "disconnection",
    author: username
  }
  sendMessage(socket, data);
}

function getUsername(client, url) {
  const urlstring = client.handshake.headers.referer;
  return url.parse(urlstring, true).query.username;
}

function sendMessage(socket, data) {
  socket.emit('broadcast', data);
}