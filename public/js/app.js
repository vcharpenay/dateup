var app = angular.module('dateup', ['ngDialog']);

app.controller('MainCtrl', function ($scope, ngDialog) {
    $scope.open = function () {
        ngDialog.open({
            template: 'firstDialog',
            controller: 'FirstDialogCtrl',
            className: 'ngdialog-theme-default',
            showClose : false
        });
    };
    
    $scope.facebookLogin = function(){
        FB.login(function(response) {
            //TODO: save user to DB
          if (response.status === 'connected') {
            // Logged into your app and Facebook.
              window.location = 'profile.html';
          } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
          } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
          }

        }, {scope: 'public_profile,email,user_likes'});
//        FB.getLoginStatus(function(response) {
//          if (response.status === 'connected') {
//            console.log('Logged in.');
//          }
//          else {
//            FB.login();
//          }
//        });
    }
});

app.controller('FirstDialogCtrl', function ($scope, ngDialog) {

});