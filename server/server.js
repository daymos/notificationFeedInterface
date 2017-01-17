var express = require('express')
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path')

app.get('/', function(req, res){
  res.sendFile('index.html', {root: __dirname + '/../dist'});
});

app.use('/static', express.static(path.join(__dirname, '/../dist/static')))

io.on('connection', function(socket){
  console.log('a user connected');
});


const  generateNewInvite = (counter => () => {
  counter += 1
  return  {
    "invite_id": counter,
    "sender_id": (counter % 2)? 'jeff': (counter % 3)? 'jim': 'matt',
    "invite": "The Owner has invited you to join Situation 25121 [Mail system down]\\nPlease follow this link to open Situation Room: http://www.moogsoft.com",
    "vector": "Internal",
    "invite_time": new Date().getTime(),
    "status": "unread"
  } 
})(0)

setInterval(function(){
  io.emit('newInvite', JSON.stringify(generateNewInvite()))
  console.log('emitting new Invite')
}
,3000)

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on port: 3000');
});


