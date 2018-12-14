var MessageView = {

  render: _.template(`
      <div class="chat">
        <div class="username" onclick = "Friends.toggleStatus(this)"><%= username %></div>

        <div class ="msg"> <%= text %> </div>
         <div class ="time"> <%= timestamp %>

      </div>
    `)

};