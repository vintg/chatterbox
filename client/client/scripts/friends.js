var Friends = {

  friends:{},

  initialize: function() {
  },

  toggleStatus: function(user){
    var userid = $(user).html();
    if (!Friends.friends.hasOwnProperty(userid)){
        Friends.friends[userid] = userid;
    };
    var x = $('.username:contains(' + userid +')');
    // if(x.hasClass('friend')){
    //   x.removeClass('friend');
    //   delete Friends.friends[userid];
    // } else{
    x.addClass('friend');
  // }
  },

  refresh: function(){
    for (var k in Friends.friends){
      var user = Friends.friends[k];

    $('.username:contains(' + user +')').trigger('click');

    }
  }


};