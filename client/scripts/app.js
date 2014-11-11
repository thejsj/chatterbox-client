var app = {
  init: function(){

  },
  server: 'https://api.parse.com/1/classes/chatterbox',
  display: function(message) {

  },
  _rooms: {},
  _users: [],
  fetch: function(callback) {
    $.ajax({
      url: this.server,
      type: 'GET',
      data: {
        order: 'createdAt'
      },
      success: app._parseData.bind(this),
      error: function() {
        alert("Unable to fetch");
      }
    });
  },
  _parseData: function(data){
    window.data = data;
    //get all room names
    var roomNames = _.uniq(_.map(data.results, function(result){
      return result.roomname;
    }));
    //create all Rooms
    _.each(roomNames, function(roomName){
      this._rooms[roomName] = new Collection.Room({name: roomName});
    }.bind(this));
    //get all users
    var userNames = _.uniq(_.map(data.results, function(result){
      return { username: result.username };
    }));
    //create all Users
    this._users = new Collection.UserCollection(userNames);
    //create all Messages with their corresponding Rooms and Users
    _.each(data.results, function(message){
      message.user = this._users.findWhere({ username: message.username });
      if (message.text !== undefined) {
        this._rooms[message.roomname].add(message);
      }
    }.bind(this));
  },
  send: function(newMessage) {
    $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(newMessage),
      contentType: 'application/json',
      success: function() {

      },
      error: function() {
        alert('Unable to send request!');
      }
    });
  },
  clearMessages: function () {

  },
  addMessage: function (newMessage) {

  },
  addRoom: function (roomName) {

  }
};

$(function() {
  //fetch our data
  app.fetch(app.display);
 /* setInterval(function(){
    app.fetch(app.display);
  }, 3000); */
});
