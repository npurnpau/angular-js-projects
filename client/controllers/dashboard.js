var myApp = angular.module('myApp');

//  myApp.controller('BuildsController',['$scope','$http','$location','$routeParams',function($scope,$http,$location,$routeParams){
//     $scope.builds= "hello";
//      console.log('builds controller loaded......');
//      $scope.getBuilds = function() {
//          $http.get('/api/builds').succes(function(response){
//              $scope.builds= response;
//          });
//     }
//  }]);

 myApp.controller('DashboardController', function ($scope, $http){
    $scope.builds1 = "hello";
    $http({
        method: 'GET',
        url: '/api/builds'
    }).then(function successCallback(response) {
        console.log(response);
        $scope.builds1= response;
     },function errorCallback(response) {

    });
   });
