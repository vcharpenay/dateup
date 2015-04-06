var app = angular.module('dateup', ['ngDialog']);

window.ondragstart = function() { return false; } 

app.controller('ProfileController', function ($scope,$http,ngDialog) {
    console.log("Profile Controller loaded");
    var stack;

    $scope.matches;
    
//    console.log($scope.currentUser);
//    console.log($scope.user_profile_pic);
    $scope.onLike = function(){
        console.log("like !");
    }
    
    $scope.onDislike = function(){
        console.log("dislike !");
    }
    
    $scope.onNeutral = function(){
        console.log("")
    }
    
    $scope.getMatches = function(){
          $http.get('http://dateup-charpi.rhcloud.com/user').
            success(function(data, status, headers, config) {
              $scope.matches = data;
              $scope.$apply();
              $scope.initiateStack();
            }).
            error(function(data, status, headers, config) {
              // TODO : log error
            });
    }
    
    $scope.getMatches();
        
    $scope.initiateStack = function(){
        
        [].forEach.call(document.querySelectorAll('.stack li'), function (targetElement) {
            stack.createCard(targetElement);
            targetElement.classList.add('in-deck');

        });
    }
    
    $scope.openSettings = function () {
        $('#main-view').addClass("blur");
        ngDialog.open({
            template: 'settingsTmpl.html',
            controller: 'SettingsController',
            className: 'ngdialog-theme-default',
            showClose : false,
            preCloseCallback: function(value) {
                $('#main-view').removeClass("blur");
            }
        });
    };
    
    ////FOR SWING JS /////
    //// Probably do the angular port ? ///// 
    var config = {
        minThrowOutDistance : 350,
        maxThrowOutDistance : 400
    };
    stack = gajus.Swing.Stack(config);
//    $('#state-mark').hide()
    stack.on('throwout', function (e) {
        console.log(e.target.innerText || e.target.textContent, 'has been thrown out of the stack to the', e.throwDirection == 1 ? 'right' : 'left', 'direction.');
        
        console.log(e);
        if(e.throwDirection == -1){
            //dislike
            $scope.onDislike();
            $('#' + e.target.id).find('#state-mark-like').hide();
            $('#' + e.target.id).find('#state-mark-dislike').show();
        }else{
            //like
            console.log('Like !' + e.target.id)
            $scope.onLike();
            $('#' + e.target.id).find('#state-mark-dislike').hide();
            $('#' + e.target.id).find('#state-mark-like').show();
        }
        e.target.classList.remove('in-deck');
    });

    stack.on('throwin', function (e) {
        console.log(e.target.innerText || e.target.textContent, 'has been thrown into the stack from the', e.throwDirection == 1 ? 'right' : 'left', 'direction.');
        $('#' + e.target.id).find('#state-mark-like').hide();
        $('#' + e.target.id).find('#state-mark-dislike').hide();
        $scope.onNeutral();
        //neutral the card
        e.target.classList.add('in-deck');
    });
});