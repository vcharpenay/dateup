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
});

app.controller('FirstDialogCtrl', function ($scope, ngDialog) {

});