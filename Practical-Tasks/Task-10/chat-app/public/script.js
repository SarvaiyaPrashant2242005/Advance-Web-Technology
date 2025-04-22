const socket = io();

// DOM elements
const messageInput = document.getElementById('m');
const sendButton = document.getElementById('send');
const messagesList = document.getElementById('messages');

// Send a message when the 'Send' button is clicked
sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  if (message) {
    socket.emit('chat message', message);
    messageInput.value = ''; // Clear the input field
  }
});

// Display the incoming messages
socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  messagesList.appendChild(li);
});
