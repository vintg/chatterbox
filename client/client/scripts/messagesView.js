var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
  },

  renderMessage: function(message) {
    $('#chats').append(MessageView.render(message));
  }

};