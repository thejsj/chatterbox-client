/*global $:true, Backbone:true, _:true */
var Views = {};
// Child View of Views.RoomsView
// Not tied to DOM, just returns an HTML string
Views.RoomListSingleView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($("#room-list-single-view").html()),
  events: {
    'click': 'changeView',
  },
  initialize: function(params) {
    this.model = params.model;
  },
  render: function() {
    this.el = this.template({
      name: this.model.name
    });
    this.$el = $(this.el);
    this.delegateEvents();
    return this.$el;
  },
  changeView: function() {
    app._current_room = new Views.SingleRoomView({
      model: this.model
    });
  }
});
// This has no template
// It just renders all the SingleRoomViews into a div
Views.RoomListView = Backbone.View.extend({
  el: '#roomSelect',
  tagName: 'div',
  className: 'room-select',
  template: _.template($("#rooms-view").html()),
  initialize: function(params) {
    this.collection = params.collection;
  },
  render: function() {
    this.$el.html(this.template());
    // Go through each model and append its HTML into the div
    _.each(this.collection, function(room) {
      var view = new Views.RoomListSingleView({
        model: room
      });
      this.$el.find('.rooms').append(view.render());
    }.bind(this));
  }
});
Views.SingleRoomView = Backbone.View.extend({
  tagName: 'div',
  el: '#single-room-container',
  className: 'single-room',
  template: _.template($("#single-room-view").html()),
  events: {
    'submit #message-submission': 'addMessage'
  },
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html(this.template({
      name: this.model.name
    }));
    _.each(this.model.models, function(message) {
      var view = new Views.MessageView({
        model: message
      });
      this.$el.find('.messages').prepend(view.render());
    }.bind(this));
  },
  addMessage: function(event) {
    event.preventDefault();
    var $textarea = this.$el.find('#message-submission textarea');
    var text = $textarea.val();
    $textarea.val('');
    if(typeof text === 'string' && text.length > 0) {
      var message = new Models.Message({
        text: text,
        roomname: this.model.name,
        username: app.username
      });
      console.log('text');
      console.log(message.get('text'));
      message.publish();
      this.model.add(message);
      this.render();
    }
    event.stopPropagation();
  }
});
Views.MessageView = Backbone.View.extend({
  tagName: 'div',
  template: _.template($('#single-message-view').html()),
  render: function() {
    return this.template(this.model.toJSON());
  }
});
