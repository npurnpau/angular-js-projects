var myApp = angular.module('myApp');
 myApp.controller('BuildsController', function ($scope, $http){
    $http({
        method: 'GET',
        url: '/api/builds'
    }).then(function successCallback(response) {
        $scope.builds= response;
     },function errorCallback(response) {
      });
});
