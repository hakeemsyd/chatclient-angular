'use strict';
/* jshint -W079 */
//Declare app level modle which depends on views, and components
var chatApp = angular.module('chatApp', [
  'ngRoute',
  'ngSocket'
]);

chatApp.config(function($routeProvider, $socketProvider){
  $routeProvider.when('/',{
    templateUrl: 'views/login.html',
    controller: 'UsersController'
  })
  .when('/chat', {
    templateUrl: 'views/chatpage.html',
    controller: 'ChatController',
    reloadOnSearch: false
  }).
  otherwise({
    redirectTo: '/'
  });

  //$socketProvider.setUrl('http://localhost:5000');
  $socketProvider.setUrl('https://chussapp.herokuapp.com');
});

