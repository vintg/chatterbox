var Rooms = {

  add: function(){
     var roomName = prompt('Enter Room ID: ', 'lobby');
     RoomsView.renderRoom(roomName);
     App.roomName = roomName;
      $( ".roomselect" ).val(roomName);
      if(!Messages[App.roomName]){
       Messages[App.roomName]={};
      }
      Messages.display(roomName);
  },


  render: _.template(`
      <option value="<%= room %>">
        <%= room %>
      </option>
    `)

};