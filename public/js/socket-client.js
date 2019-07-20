"use strict";

const socket = io.connect('http://localhost:8080');

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