var express = require('express')
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path')
var data = JSON.parse(require('./data').history)


io.on('connection', function(socket){
  console.log('a user connected');
});

const  generateNewInvite = (counter => () => {
  counter += 1
  return  {
    "invite_id": counter,
    "sender_id": data[~~(Math.random() * data.length)].sender_id,
    "invite": data[~~(Math.random() * data.length)].invite,
    "vector": "db",
    "invite_time": new Date().getTime(),
    "status": "unread"
  } 
})(0)

setInterval(function(){
  io.emit('newInvite', JSON.stringify(generateNewInvite()))
  console.log('server2 emitting new Invite')
}
,  1000)

http.listen(process.env.PORT || 3002, function(){
  console.log('listening on port: 3002');
});


