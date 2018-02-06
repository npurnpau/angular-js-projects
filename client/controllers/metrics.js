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

 myApp.controller('totalTestMetrics', function ($scope, $http){
    $http({
        method: 'GET',
        url: '/api/metrics'
    }).then(function successCallback(response) {
        $scope.metrics= response;
     },function errorCallback(response) {
      });
});
