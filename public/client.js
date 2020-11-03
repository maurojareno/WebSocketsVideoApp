
var socket = io.connect();
socket.on('new-user', function (id) {
    var video = document.getElementById('video');
    var master = document.getElementById('master');
    if (master.value == "true") {
        socket.emit('set-users-currentTime', video.currentTime);
    }
});

socket.on('set-master', function (data) {
    var master = document.getElementById('master');
    master.value = data;
    if (master.value == "true") {
        socket.emit('set-users-currentTime', video.currentTime);
    }
});

socket.on('start-new-currentTime', function (currentTime, startTime) {
    var video = document.getElementById('video');
    video.currentTime = currentTime;
    setInterval(function () {
        if (Date.now() < startTime) {  }
    }, 10);
    video.play();
});

socket.on('pause-client', function (data) {
    var video = document.getElementById('video');
    video.pause();
});

socket.on('play-client', function (startTime) {
    var video = document.getElementById('video');        
    setInterval(function () {
        if (Date.now() < startTime) {  }
    }, 10);
    video.play();
});

socket.on('update-current-time-client', function (currentTime) {
    var video = document.getElementById('video');
    video.currentTime = currentTime;
});

document.addEventListener("DOMContentLoaded", function (event) {
    var video = document.getElementById('video');
    video.addEventListener('play', (event) => {
        socket.emit('play-all', '');
    });

    video.addEventListener('pause', (event) => {
        socket.emit('pause-all', '');
    });

    video.addEventListener('seeked', (event) => {
        // socket.emit('pause-all', '');
        //console.log('seeked');
        //var video = document.getElementById('video');
        //socket.emit('update-current-time', video.currentTime);
    });
});