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

myApp.service("getBuildNumber", function () {
    var build_no = '';

        return {
            getProperty: function () {
                return build_no;
            },
            setProperty: function(value) {
                build_no = value;
            }
        };
});

 myApp.controller('DashboardController', function ($scope, $http, $location, getBuildNumber){
    $scope.builds1 = "hello";
    $http({
        method: 'GET',
        url: '/api/buildNumberList'
    }).then(function successCallback(response) {
        console.log(response);
        $scope.builds1= response;
     },function errorCallback(response) {
    });
    $scope.getBuildDetails = function(build_no) {
        getBuildNumber.setProperty(build_no);
        console.log('-------------------' + build_no);
        $location.path('/builds');
      };
   });

   myApp.filter('round', function() {
    return function(input) {
        return Math.round(input*100)/100;
    };
});
