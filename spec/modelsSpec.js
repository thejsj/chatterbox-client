Backbone = require('backbone');
var User = require('../client/scripts/models.js').User;
var expect = require('chai').expect;
var should = require('should');

describe('User', function () {

  it('should set a property when instantiated', function () {
    var user = new User({'username': 'thejsj'});
    user.get('username').should.equal('thejsj');
  });

});
