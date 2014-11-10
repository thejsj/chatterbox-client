var Backbone = require('backbone');

var Models = {};

Models.User = Backbone.Model.extend({
  defaults: {
    'username' : null,
    'first_name' : null,
    'last_name' : null,
    'age' : null
  }
});

try {
  if (module !== undefined && module.exports !== undefined) {
    module.exports = Models;
  }
} catch(err) {}
