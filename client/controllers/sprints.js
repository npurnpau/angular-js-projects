var myApp = angular.module('myApp');
myApp.controller('sprintsMetrics', function ($scope, $http, $location, getBuildNumber){
   
    $http({
        method: 'GET',
        url: '/api/metricsLatest/'
    }).then(function successCallback(response) {
        console.log(response);
        $scope.prd= response;
     },function errorCallback(response) {
    });
     $scope.getBuildDetails = function(build_no) {
            getBuildNumber.setProperty(build_no);
            console.log('-------------------' + build_no);
            $location.path('/builds');
          };
 });