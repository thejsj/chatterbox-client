_.templateSettings.variable = "rc";
var app = {
  init: function(){

  },
  server: 'https://api.parse.com/1/classes/chatterbox',
  templates: {
    message: _.template("<li class='message'><span class='username'><% rc.username %></span><p> class='text'><% rc.text %></p></li>")
  },
  display: function(message) {
    $('#chats').append('<li>' + message + '</li>');
  },
  fetch: function(callback) {
    $.ajax({
      url: this.server,
      type: 'GET',
      data: {
        order: 'createdAt'
      },
      success: function(data) {
        $('.messages li').remove(); //remove all messages
        //append new messages by calling our display method
        //on our new results
        _.each(data.results, function(result) {
          callback(result.text);
        })
      },
      error: function() {
        alert("Unable to fetch");
      }
    });
  },
  send: function(newMessage) {
    $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(newMessage),
      contentType: 'application/json',
      success: function() {
        $('.draft').val('');
      },
      error: function() {
        alert('Unable to send request!');
      }
    });
  },
  clearMessages: function () {
    $('#chats').html('');
  },
  addMessage: function (newMessage) {
    console.log(this.templates.message);
    $('#chats')
      .append(this.templates.message(newMessage));
  },
  addRoom: function (roomName) {
    $('#roomSelect')
      .append('<li>' + roomName + '</li>');
  }
};

$(function() {
  //fetch our data
  app.fetch(app.display);
  setInterval(function(){
   app.fetch(app.display);
  }, 3000);
  $('.send').click(function(){
    app.send($('.draft').val());
  });
});
