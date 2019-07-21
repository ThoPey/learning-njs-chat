"use strict";

module.exports = {
  clientConnection: clientConnection,
  sendMessage: sendMessage
};

function clientConnection(client, socket, url) {
  const urlstring = client.handshake.headers.referer;
  const username = url.parse(urlstring, true).query.username;
  const data = {
    type: "connection",
    author: username
  }
  sendMessage(socket, data);
}

function sendMessage(socket, data) {
  socket.emit('broadcast', data);
}