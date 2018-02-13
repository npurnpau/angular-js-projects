var myApp = angular.module('myApp');
myApp.controller('sprintsPreviousMetrics', function ($scope, $http){
   
    $http({
        method: 'GET',
        url: '/api/staticSprints/'
    }).then(function successCallback(response) {
        console.log(response);
        $scope.prd= response;
     },function errorCallback(response) {
    });
 });