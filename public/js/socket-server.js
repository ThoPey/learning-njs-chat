"use strict";

module.exports = {
  clientConnection: clientConnection,
  sendMessage: sendMessage
};

function clientConnection() {
  console.log("Socket connection event triggered");
}

function sendMessage(socket, data) {
  socket.emit('broadcast', data);
}