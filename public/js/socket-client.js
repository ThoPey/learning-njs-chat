"use strict";

const socket = io.connect('http://localhost:8080');

/*** Functions ***/

// Returns a HTML element
function createMessage(author, message, fromMe = false) {
  let container = document.createElement("div");
  container.classList.add("message");
  container.classList.add( fromMe ? "sent" : "received" );
  container.appendChild( document.createElement("div") );
  container.appendChild( document.createElement("div") );
  container.children[0].innerHTML = author;
  container.children[1].innerHTML = message;
  return container;
}

// message : HTML DOM object
function appendMessage(message) {
  document.querySelector("main").appendChild(message);
}

/*** Events ***/

document.getElementsByName("send-form")[0].addEventListener("submit", function(evt) {
  evt.preventDefault(); // Prevent changing page when submitting message
  const author = document.querySelector("header h1").innerHTML;
  const messageText = evt.target[0].value;
  if (messageText !== "")
    appendMessage( createMessage(author, messageText, true) );
  evt.target[0].value = "";
});
