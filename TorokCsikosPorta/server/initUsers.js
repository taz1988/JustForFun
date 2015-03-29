Accounts.config({
  forbidClientAccountCreation : true
});



Meteor.startup(function () {
  Accounts.createUser({
    "username" : "taz",
    "email" : "taz19880922@gmail.com"
  });
});