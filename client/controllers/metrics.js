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


 myApp.controller('BuildsController', function ($scope, $http){
    $scope.builds = "hello";
    $http({
        method: 'GET',
        url: '/api/builds'
    }).then(function successCallback(response) {
        $scope.builds= response;
     },function errorCallback(response) {

      });
   });
