// Test the clone of repo
'use strict';
chatApp.factory('Client',
  function($socket){
    this.username = "chuss";
    this.count = 0;

    var that = this;
    return {
      setUsername: function(user){
        that.username = user;
      },
      user: function(){
        return that.username;
      },
      setUserCount: function(c){
       that.count = c;
      },
      getCount : function(){
        return that.count;
      }
    };
  }
);
