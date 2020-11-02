// APP
var express = require("express");
var app = new express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require("path");
app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
});

var socketsArray = [];
//Sockets
io.on("connection", socket => {
  //se conecto un usuario en otra ventana. 
  //emito el current time
  // aviso que se den play
  socketsArray.push(socket.id);
  if (socketsArray.indexOf(socket.id) == 0)
  {
    io.to(socket.id).emit("set-master", true);
  }
  console.log(socketsArray);

  socket.broadcast.emit('new-user', {
      users: [socket.id]
  });

  socket.on('disconnect', () => {   
    socketsArray.splice(socketsArray.indexOf(socket.id), 1);
    if (socketsArray.length > 0){
      io.to(socketsArray[0]).emit("set-master", true);
    }
    console.log(socketsArray);
    
  });

  socket.on('set-users-currentTime', (currentTime) => {
    //mandar un Date en el cual arrancar (delay de 2 segundos cosa de que todos)
    //los videos arranquen en el mismo momento
    var startTime = new Date(Date.now());
    startTime.setSeconds(startTime.getSeconds() + 2);
    io.emit('start-new-currentTime', currentTime, startTime.getTime());
  });

  socket.on('pause-all', (data) => {
    io.emit('pause-client', '');
  });

  socket.on('play-all', (data) => { 
    var startTime = new Date(Date.now());
    startTime.setSeconds(startTime.getSeconds() + 2);
    io.emit('play-client', startTime.getTime());
  });
});

http.listen(4000, () => {
  console.log('listening on *:4000');
});
