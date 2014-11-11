var Views = {};

Views.MessageView = Backbone.View.extend({
  tagName: 'li',
  template: _.template("<li class='message'><span class='username'><%= _.escape(username) %></span><p> class='text'><% text %></p></li>"),
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});


// Child View of Views.RoomsView
// Not tied to DOM, just returns an HTML string
Views.SingleRoomView = Backbone.View.extend({
  tagName: 'li',
  initialize: function (name) {
    this.name = name;
    this.template = _.template($("#sinlge-room-view").html());
  },
  render: function () {
    console.log('');
    console.log('this.name');
    console.log(this.name);
    return this.template({name: this.name});
  }
});

// This has no template
// It just renders all the SingleRoomViews into a div
Views.RoomsView = Backbone.View.extend({
  el: '#roomSelect',
  tagName: 'div',
  className: 'room-select',
  initialize: function (params) {
    this.template = _.template($("#rooms-view").html());
    this.collection = params.collection;
  },
  render: function () {
    this.$el.html(this.template());
    // Go through each model and append its HTML into the div
    _.each(this.collection, function (room) {
      var view = new Views.SingleRoomView(room.name);
      this.$el.find('.rooms')
        .append(view.render());
    }.bind(this));
  }
})
