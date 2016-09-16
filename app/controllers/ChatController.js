'use strict';
chatApp.controller('ChatController',
  function ChatController($scope, Client, $socket, $location){
    $scope.messages = [];
    $scope.textMessage = "";
    $scope.count = Client.count;

    $scope.messages.push({type:'log', log:'there are ' + Client.getCount() + ' people'});

    $socket.on('new message', function(data){
      $scope.messages.push({type:'message', message:data.message, username:data.username});
    });

    $socket.on('user joined', function(data){
      Client.setUserCount(data.numUsers);
      $scope.messages.push({type:'log', log: data.username + ' just joined'});
      $scope.messages.push({type:'log', log: 'there are ' + Client.getCount() + ' people'});
    });

    $socket.on('user left', function(data){
      Client.setUserCount(data.numUsers);
      $scope.messages.push({type:'log', log: data.username + ' just left'});
      $scope.messages.push({type:'log', log: 'there are ' + Client.getCount() + ' people'});
    });

    $socket.on('disconnected', function(){
      $location.url('/');
    });

    $scope.send = function(){
      if($scope.textMessage !== ""){
        $socket.emit('new message', $scope.textMessage);
        $scope.messages.push({type:'message', message: $scope.textMessage, username: Client.user()});
        $scope.textMessage = "";
      }
    };
  }
);
