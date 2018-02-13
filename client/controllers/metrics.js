var myApp = angular.module('myApp');

function BuildsController($scope, $http, getBuildNumber){
    $http({
        method: 'GET',
        url: '/api/builds/'+getBuildNumber.getProperty()
    }).then(function successCallback(response) {
        $scope.builds= response;
     },function errorCallback(response) {
      });
    $scope.getAllBuilds = function() {
        $location.path('/builds');
      };
}
myApp.controller('BuildsController', BuildsController);
