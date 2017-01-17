
module.exports = function(io){ 
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
  }
  ,3000)
}
