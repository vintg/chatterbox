var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
     $( ".roomselect" ).change(function() {
          App.roomName = RoomsView.$select.val().toString();

          console.log('Switching to '+App.roomName);
          $( ".roomselect" ).val(App.roomName);
          $('#chats').empty();
          Messages.display(App.roomName);

     });
  },

  renderRoom: function(roomName = App.roomName) {
    if(roomName!==''){
      var exists = false;
      $.each( $('option'), function(e, v ) {
        if($(v).val()===roomName){exists = true;};
      });
      if(!exists){
         this.$select.append(Rooms.render({'room':roomName.toString()}));

          // if(!Messages.hasOwnProperty(roomName)){
          //   Messages[roomName] = [];
          // }
      }
    }
  },


};

