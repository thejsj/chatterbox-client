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
  render: function () {
    this.el = this.template(this.model.attributes);
    this.$el = $(this.el);
    this.delegateEvents();
    return this.$el;
  },
  changeView: function () {
    window.app.currentRoom = new Views.SingleRoomView({
      model: this.model
    });
  }
});

// This has no template
// It just renders all the SingleRoomViews into a div
Views.RoomListView = Backbone.View.extend({
  tagName: 'div',
  className: 'room-select',
  template: _.template($("#rooms-view").html()),
  initialize: function () {
    this.collection.on('all', this.render, this);
  },
  render: function () {
    this.$el.html(this.template());
    // Go through each model and append its HTML into the div
    this.collection.forEach(function (room) {
      var view = new Views.RoomListSingleView({
        model: room
      });
      this.$('.rooms').prepend(view.render());
    }, this);
  }
});


Views.SingleRoomView = Backbone.View.extend({
  tagName: 'div',
  className: 'single-room',
  el: '#single-room-container',
  template: _.template($("#single-room-view").html()),
  events: {
    'submit #message-submission': 'addMessage',
    'keypress #message-submission input': 'submitForm'
  },
  initialize: function () {
    this.render();
    this.model.get('collection').on('all', this.renderMessages.bind(this));
  },
  renderMessages: function () {
    console.log('--------Render Messages ---------');
    var $messages = this.$el.find('.messages');
    $messages.html('');
    var messages = this.model.get('collection').sortBy(function (m) {
      console.log(m);
      return m.get('createdAt');
    });
    messages.forEach(function (message) {
      var view = new Views.MessageView({
        model: message
      });
      $messages.prepend(view.render());
    }, this);
  },
  render: function () {
    console.log('Render: ' + this.model.get('collection').length);
    this.$el.html(this.template(this.model.attributes));
    this.renderMessages();
  },
  addMessage: function (event) {
    console.log('addMessage');
    event.preventDefault();
    var $input = this.$el.find('#message-submission input');
    var text = $input.val();
    $input.val('');
    if (typeof text === 'string' && text.length > 0) {
      this.model.get('collection').create({
        text: text,
        roomname: this.model.get('name'),
        username: window.app.username
      });
    }
    event.stopPropagation();
  },
  submitForm: function (event) {
    if (event.keyCode === 13) {
      console.log('Submit Form');
      this.$('#message-submission').submit();
    }
  }
});

Views.MessageView = Backbone.View.extend({
  tagName: 'div',
  template: _.template($('#single-message-view').html()),
  render: function () {
    this.el = this.template(this.model.attributes);
    this.$el = $(this.el);
    this.delegateEvents();
    return this.$el;
  }
});