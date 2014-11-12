var Model = {};

Model.User = Backbone.Model.extend({
  defaults: {
    'username': null,
    'first_name': null,
    'last_name': null,
    'age': null,
    'friends': null
  },
  initialize: function (params) {
    this.set('friends', new Collection.Friends());
  },
  addFriend: function (user) {
    // Find user by user name, from the global _users
    if (typeof user === 'string') {
      var user = app._users.findWhere({
        username: user
      });
    }
    if (!(user instanceof Model.User) || !user) {
      return false;
    }
    // Add user to our friends collection
    this.get('friends').add(user);
    return true;
  },
  removeFriend: function (user) {
    // Find user by user name, from the global _users
    if (typeof user === 'string') {
      var user = app._users.findWhere({
        username: user
      });
    }
    if (!(user instanceof Model.User) || !user) {
      return false;
    }
    // Add user to our friends collection
    this.get('friends').remove(user);
    return true;
  }
});

Model.Message = Backbone.Model.extend({
  url: 'https://api.parse.com/1/classes/chatterbox/',
  parse: function (response) {
    return response.result;
  },
});

Model.Room = Backbone.Model.extend({
  url: 'https://api.parse.com/1/classes/chatterbox/',
  initialize: function (params) {
    if (params.name !== undefined) {
      this.load(params.name);
    }
  },
  parse: function (response) {
    if (response.results !== undefined && response.results.length > 0) {
      var collection = new Collection.Messages();
      _.each(response.results, function (message) {
        collection.add(message);
      });
      this.set('collection', collection);
      this.set('name', response.results[0].roomname);
    }
  },
  load: function (name) {
    if (name !== undefined) {
      this.fetch({
        data: {
          order: '-createdAt',
          where: '{"roomname":"' + name + '"}',
        }
      });
    }
  },
});

try {
  if (module !== undefined && module.exports !== undefined) {
    module.exports = Model;
  }
} catch (err) {}