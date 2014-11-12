app = {};
Backbone = require('backbone');
Model = require('../client/scripts/Model.js');
Collection = require('../client/scripts/collections.js');
var expect = require('chai').expect;
var should = require('should');
var User = Model.User;
var UserCollection = Collection.UserCollection;

describe('User', function () {

  it('should set a property when instantiated', function () {
    var user = new User({
      'username': 'thejsj'
    });
    user.get('username').should.equal('thejsj');
  });

  it('should add friends when a user model is passed', function () {
    var user1 = new User({
      'username': 'alexhawkins'
    });
    var user2 = new User({
      'username': 'jorgesilver'
    });
    user1.addFriend(user2);
    expect(user1.get('friends').length).to.equal(1);
  });

  it('should add a friend when a username is passed and the user exists', function () {
    app._users = new UserCollection({
      'username': 'jorgesilver'
    });
    var user1 = new User({
      'username': 'alexhawkins'
    });
    user1.addFriend('jorgesilver');
    expect(user1.get('friends').length).to.equal(1);
  });

  it('should not add a friend when a username is passed and the user doesn\'t exist', function () {
    var app = {};
    app._users = new UserCollection({
      'username': 'jorgesilver'
    });
    var user1 = new User({
      'username': 'alexhawkins'
    });
    user1.addFriend('not-jorgesilver');
    expect(user1.get('friends').length).to.equal(0);
  });

  it('should remove a friend when a user is passed', function () {
    var user1 = new User({
      'username': 'alexhawkins'
    });
    var user2 = new User({
      'username': 'jorgesilver'
    });
    user1.addFriend(user2);
    expect(user1.get('friends').length).to.equal(1);
    user1.removeFriend(user2);
    expect(user1.get('friends').length).to.equal(0);
  });

  it('should remove a friend when a username is passed and the user exists', function () {
    app._users = new UserCollection({
      'username': 'jorgesilver'
    });
    var user1 = new User({
      'username': 'alexhawkins'
    });
    user1.addFriend('jorgesilver');
    expect(user1.get('friends').length).to.equal(1);
    user1.removeFriend('jorgesilver');
    expect(user1.get('friends').length).to.equal(0);
  });

  it('should not remove a friend when a username is passed and the user doesn\'t exist', function () {
    var app = {};
    app._users = new UserCollection({
      'username': 'jorgesilver'
    });
    var user1 = new User({
      'username': 'alexhawkins'
    });
    var user2 = new User({
      'username': 'jorgesilver'
    });
    user1.addFriend(user2);
    expect(user1.get('friends').length).to.equal(1);
    user1.removeFriend('silver-jorge');
    expect(user1.get('friends').length).to.equal(1);
  });


});