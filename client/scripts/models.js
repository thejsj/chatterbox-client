var Models = {};

Models.User = Backbone.Model.extend({
  defaults: {
    'username' : null,
    'first_name' : null,
    'last_name' : null,
    'age' : null,
    'friends' : null
  },
  initialize: function(params){
    this.set('friends', new Collection.Friends())
  },
  addFriend: function(user){
    // Find user by user name, from the global _users
    if(typeof user === 'string'){
      var user = app._users.findWhere({username: user});
    }
    if (!(user instanceof Models.User) || !user) {
      return false;
    }
    // Add user to our friends collection
    this.get('friends').add(user);
    return true;
  },
  removeFriend: function (user) {
    // Find user by user name, from the global _users
    if(typeof user === 'string'){
      var user = app._users.findWhere({username: user});
    }
    if (!(user instanceof Models.User) || !user) {
      return false;
    }
    // Add user to our friends collection
    this.get('friends').remove(user);
    return true;
  }

});

Models.Message = Backbone.Model.extend({

});


try {
  if (module !== undefined && module.exports !== undefined) {
    module.exports = Models;
  }
} catch(err) {}



