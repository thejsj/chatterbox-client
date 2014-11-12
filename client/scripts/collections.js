var Collection = {};

Collection.Rooms = Backbone.Collection.extend({
  model: Model.Room,
  url: 'https://api.parse.com/1/classes/chatterbox/',
  load: function () {
    this.fetch({
      data: {
        order: '-createdAt',
        limit: '200'
      }
    });
  },
  parse: function (response) {
    var roomnames = _.filter(_.uniq(_.map(response.results, function (result) {
      return result.roomname;
    })), function (name) {
      if (typeof name === 'string' && name.length > 0) {
        return true;
      }
    });
    return _.map(roomnames, function (roomname) {
      return {
        'name': roomname
      };
    });
  }
});

Collection.Messages = Backbone.Collection.extend({
  model: Model.Message
});

Collection.Friends = Backbone.Collection.extend({
  model: Model.User,
});

Collection.Users = Backbone.Collection.extend({
  model: Model.User
});
/********************/
try {
  if (module !== undefined && module.exports !== undefined) {
    module.exports = Collection;
  }
} catch (err) {}