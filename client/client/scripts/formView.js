var FormView = {

  $form: $('form'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();

    var msg = {
      username: App.username,
      text: $( "#send :text" ).val(),
      roomname: App.roomName
    };
    Messages[App.roomName].clear();
    Parse.create(msg);

    $( "#send :text" ).val('');
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};