"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoServer = void 0;

var _express = _interopRequireDefault(require("express"));

var _http = require("http");

var _socket = _interopRequireDefault(require("socket.io"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VideoServer {
  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
    this.socketsArray = [];
  }

  createApp() {
    this.app = new _express.default();
    this.app.use(_express.default.static(_path.default.join(__dirname, 'public')));
  }

  config() {
    this.port = process.env.PORT || 5000;
  }

  createServer() {
    this.server = (0, _http.createServer)(this.app);
  }

  sockets() {
    this.io = (0, _socket.default)(this.server);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });
    this.io.on('connection', socket => {
      this.onConnection(socket);
      socket.on('disconnect', () => {
        this.onDisconnect(socket);
      });
      socket.on('set-users-currentTime', currentTime => {
        this.onSetUsersCurrentTime(currentTime);
      });
      socket.on('pause-all', data => {
        this.io.emit('pause-client', '');
      });
      socket.on('play-all', data => {
        this.onPlayAll();
      });
      socket.on('update-current-time', currentTime => {
        this.io.emit('update-current-time-client', currentTime);
      });
    });
  }

  onPlayAll() {
    var startTime = this.getStartTime();
    this.io.emit('play-client', startTime.getTime());
  }

  getStartTime() {
    var startTime = new Date(Date.now());
    startTime.setSeconds(startTime.getSeconds() + 2);
    return startTime;
  }

  onSetUsersCurrentTime(currentTime) {
    var startTime = this.getStartTime();
    this.io.emit('start-new-currentTime', currentTime, startTime.getTime());
  }

  onDisconnect(socket) {
    this.socketsArray.splice(this.socketsArray.indexOf(socket.id), 1);

    if (this.socketsArray.length > 0) {
      this.io.to(this.socketsArray[0]).emit("set-master", true);
    }

    console.log(this.socketsArray);
  }

  onConnection(socket) {
    this.socketsArray.push(socket.id);

    if (this.socketsArray.indexOf(socket.id) == 0) {
      this.io.to(socket.id).emit("set-master", true);
    }

    console.log(this.socketsArray);
    socket.broadcast.emit('new-user', {
      users: [socket.id]
    });
  }

  getApp() {
    return this.app;
  }

}

exports.VideoServer = VideoServer;