// NODE SERVER.
const io = require("socket.io")(80);

const users = {};

io.on("connection", socket =>{
// creates new user join gives user a name and shows them
	socket.on("new-user-joined", name =>{	
		// defining user name	
		users[socket.id] = name;
console.log('new user ',name);	
		// showing the users that joined the server.
		socket.broadcast.emit('user-joined', name);
	});
// when message sent, user shoulds receive. 	
	socket.on('send', message =>{
		socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
	});
	
	// when message sent, user shoulds receive. 	
	socket.on('disconnect', message =>{
		socket.broadcast.emit('left',users[socket.id]);
		delete users[socket.id];
	});
});