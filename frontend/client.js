//const socket = io('http://localhost:8000',{transports:["websocket"]});
const socket = io('https://chatmailer-server1-io.onrender.com:8000',{transports:["websocket"]});

const Form = document.getElementById('send-container') ;
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
// var audio = new Audio(file directory)

const append = (message, position)=>{
	const messageElement = document.createElement('div');
	messageElement.innerText = message;
	messageElement.classList.add('message') ;
	messageElement.classList.add(position) ;
	messageContainer.append(messageElement) ;
	
}

Form.addEventListener('submit', (e)=>{
	e.preventDefault();
	const message = messageInput.value;
append(`You: ${message}`, 'right');
	socket.emit('send', message);
	messageInput.value = '';
})

const name = prompt("Enter your name to join.");
socket.emit("new-user-joined", name);

socket.on('user-joined', name =>{
	append(`${name} joined the Chat`, 'right');
});

socket.on('receive', data =>{
	append(`${data.name}: ${data.message}`, 'left');
});

socket.on('left', name =>{
	append(`${name} Left the chat`, 'left');
});