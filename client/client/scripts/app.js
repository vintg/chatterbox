var App = {

  username: 'anonymous',
  roomName: 'lobby',

  initialize: function() {
    App.username = window.location.search.substr(10);
    //App.roomName =

    FormView.initialize();
    RoomsView.initialize();
   // MessagesView.initialize();

    // Fetch initial batch of messages

    App.fetch();


  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
       callback();
    });
  },


};
