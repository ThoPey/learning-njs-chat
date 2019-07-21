"use strict";

const socket = io.connect('http://localhost:8080');

/*** Functions ***/

function getSelfName() {
  return document.querySelector("header h1").innerHTML;
}

// Returns a HTML element
function createMessage(author, message, fromMe = false) {
  let container = document.createElement("div");
  container.classList.add("message");
  container.classList.add( fromMe ? "sent" : "received" );
  container.appendChild( document.createElement("div") );
  container.appendChild( document.createElement("div") );
  container.children[0].innerText = author;
  container.children[1].innerText = message;
  return container;
}

// Returns a HTML element
function createConnectionMessage(author) {
  let container = document.createElement("div");
  container.classList.add("message");
  container.appendChild( document.createElement("span"));
  container.classList.add("message");
  container.classList.add("connection");
  container.children[0].innerText = author + " has arrived !";
  return container;
}

// message : HTML DOM object
function appendMessage(message) {
  document.querySelector("main").appendChild(message);
  const messagesElement = document.querySelector("main");
  messagesElement.scrollTop = messagesElement.scrollHeight;
}

function newMessage(author, text, fromMe = false) {
  appendMessage( createMessage(author, text, fromMe) );
}

function newConnectionMessage(author) {
  appendMessage( createConnectionMessage(author) );
}

/*** Events ***/

document.getElementsByName("send-form")[0].addEventListener("submit", function(evt) {
  evt.preventDefault(); // Prevent changing page when submitting message
  const author = getSelfName();
  const messageText = evt.target[0].value;

  // Write message to self's screen
  if (messageText !== "") {
    newMessage(author, messageText, true);
    evt.target[0].value = "";

    // Send message to other users
    const data = {
      type: 'message',
      author: author,
      text: messageText
    };
    socket.emit("message", data);
  }

});

socket.on('broadcast', data => {
  if (data.hasOwnProperty('type')) {
    switch (data.type) {
      case 'connection': {
        newConnectionMessage(data.author);
        break;
      }
      case 'message': {
        if (data.author !== getSelfName())
          newMessage(data.author, data.text);
        break;
      }
      default:
        break;
    }
  }
});
