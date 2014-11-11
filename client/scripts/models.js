var Models = {};

Models.User = Backbone.Model.extend({
  defaults: {
    'username' : null,
    'first_name' : null,
    'last_name' : null,
    'age' : null
  }
});

Models.Message = Backbone.Model.extend({

});


try {
  if (module !== undefined && module.exports !== undefined) {
    module.exports = Models;
  }
} catch(err) {}



