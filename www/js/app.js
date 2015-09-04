// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module  mple (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var db = null;

var sequel = angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    db = $cordovaSQLite.openDB({name:  "my.db"});
    $cordovaSQLite.execute(
      db,
      "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)"
    );
  });
});

sequel.controller("SequelController", function($scope, $cordovaSQLite){

  $scope.insert = function(firstname, lastname) {
       var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
       $cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(res) {
           console.log("INSERT ID -> " + res.insertId);
       }, function (err) {
           console.error(err);
       });
   }

   $scope.select = function(lastname) {
       var query = "SELECT firstname, lastname FROM people WHERE lastname = ?";
       $cordovaSQLite.execute(db, query, [lastname]).then(function(res) {
           if(res.rows.length > 0) {
               console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
           } else {
               console.log("No results found");
           }
       }, function (err) {
           console.error(err);
       });
   }

});
