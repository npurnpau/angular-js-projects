myApp.controller('totalTestMetrics', function ($scope, $http){
    $http({
        method: 'GET',
        url: '/api/metrics'
    }).then(function successCallback(response) {
        $scope.metrics= response;
     },function errorCallback(response) {
      });
});
