Accounts.config({
  forbidClientAccountCreation : true
});



Meteor.startup(function () {
  var user = Meteor.users.findOne({"username" : "taz"});
  if (typeof user === "undefined") {
    Accounts.createUser({
      "username" : "taz",
      "email" : "taz19880922@gmail.com"
    });
  }
});