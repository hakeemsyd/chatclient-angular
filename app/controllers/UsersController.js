'use strict';
chatApp.controller('UsersController',
  function($scope,$location, Client, $socket){
    $scope.username = "";

    $socket.on('login', function(count){
      Client.setUserCount(count.numUsers);
      $location.url('chat');
    });

    $scope.enterChat = function(){
      if($scope.username !== ""){
        $socket.emit('add user', $scope.username);
        Client.setUsername($scope.username);
      }
    };
  }
);
