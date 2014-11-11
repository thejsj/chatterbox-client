/*globals $:true, Models:true, Collection:true, Views:true, _:true */
var app = {
  init: function() {
    var parts = window.location.href.split('username=');
    this.username = _.last(parts);
  },
  server: 'https://api.parse.com/',
  display: function(message) {},
  _rooms: {},
  _users: [],
  fetch: function(callback) {
    $.ajax({
      url: this.server + '1/classes/chatterbox/',
      type: 'GET',
      data: {
        order: 'createdAt',
        count: 1000,
        limit: 1000,
      },
      success: function(data) {
        app._parseData(data);
        app._room_view = new Views.RoomListView({
          collection: this._rooms
        });
        app._room_view.render();
        var firstRoom = this._rooms[Object.keys(this._rooms)[0]];
        app._current_room = new Views.SingleRoomView({
          model: firstRoom
        });
      }.bind(this),
      error: function(e) {
        console.log(e);
        console.log("Unable to fetch");
      }
    });
  },
  _parseData: function(data) {
    window.data = data;
    //get all room names
    var roomNames = _.uniq(_.map(data.results, function(result) {
      return result.roomname;
    }));
    roomNames = _.filter(roomNames, function(roomName) {
      if(typeof roomName === 'string' && roomName.length > 0) {
        return true;
      }
    });
    console.log(roomNames);
    //create all Rooms
    _.each(roomNames, function(roomName) {
      this._rooms[roomName] = new Collection.Room();
      this._rooms[roomName].name = roomName;
    }.bind(this));
    //get all users
    var userNames = _.uniq(_.map(data.results, function(result) {
      return {
        username: result.username
      };
    }));
    //create all Users
    this._users = new Collection.UserCollection(userNames);
    //create all Messages with their corresponding Rooms and Users
    _.each(data.results, function(message) {
      message.user = this._users.findWhere({
        username: message.username
      });
      if(typeof message.text === 'string' && message.text.length > 0) {
        if(this._rooms[message.roomname]) {
          this._rooms[message.roomname].add(message);
        }
      }
    }.bind(this));
  },
  send: function(newMessage, url) {
    url = url || this.server;
    $.ajax({
      url: url,
      type: 'POST',
      data: JSON.stringify(newMessage),
      contentType: 'application/json',
      success: function() {},
      error: function() {
        alert('Unable to send request!');
      }
    });
  },
  clearMessages: function() {},
  addMessage: function(newMessage) {},
  addRoom: function(roomName) {}
};
$(function() {
  //fetch our data
  app.init();
  app.fetch(app.display);
  /* setInterval(function(){
     app.fetch(app.display);
   }, 3000); */
});
