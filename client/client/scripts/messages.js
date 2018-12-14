var Messages = {


  store: function(data){

    var log = data.results;
    var len =log.length;

    // var len = Math.min(10, log.length);
    Messages.last = undefined;

    for (var i=0;i<len;i++){

      var room = log[i].roomname;
      //create room storage if !exists
      if(!Messages.hasOwnProperty(room)){
        Messages[room] = new Map();
        RoomsView.renderRoom(room);
      }

      if (!Messages.last && room===App.roomName){
        Messages.last = log[i];
      }

      var user = Messages.clean(log[i].username);
      var msg = Messages.clean(log[i].text);
      var time = log[i].createdAt;

      //actual msg obj creation
      var message = {};
      var key = log[i].objectId;

        message[key] = {
            username: user,
            text: msg,
            timestamp: time
          };

      if(!Messages[room].has(key)){
        Messages[room].set(key, message);
      }

    } //end loop through data log

    if(JSON.stringify(Messages.last) !== JSON.stringify(log[len-1]))
    {
      Messages.display(App.roomName);
    }

  },


  clean: function(text = ''){
    var cleaned = JSON.stringify(text).split('');
    var escapes = ['<','>'];
    for (var ch in cleaned){
      if (escapes.includes(cleaned[ch])){
        cleaned.splice(ch,1);
      }
    }
    return JSON.parse(cleaned.join(''));
  },

  display: function(roomName){
    $('#chats').empty();
     for (var [key, value] of Messages[roomName]){
        var chatmsg = value;
        var key = Object.keys(chatmsg);
      // if(chatmsg[key].timestamp > Messages.last["createdAt"]){
          if (chatmsg[key].text.trim()!==''){
            MessagesView.renderMessage(chatmsg[key]);
         }
      // }
     } //end for

    Friends.refresh();

    setTimeout(function(){
      App.fetch();

    },1000);
  },

};
