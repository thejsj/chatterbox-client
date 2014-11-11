var Collection = {};

Collection.Room = Backbone.Collection.extend({
  model : Models.Message
});

Collection.Friends = Backbone.Collection.extend({
  model : Models.User
});

Collection.UserCollection = Backbone.Collection.extend({
  model : Models.User
});
/********************/
try {
  if (module !== undefined && module.exports !== undefined) {
    module.exports = Collection;
  }
} catch(err) {}

