var myApp = angular.module('myApp',['ngRoute']);


myApp.config(function($routeProvider){
    $routeProvider.when('/', {
        controller : "BuildsController",
        templateUrl : 'views/metricsDetails.html'

    })
    .when('/builds', {
        controller : "BuildsController",
        templateUrl : 'views/metricsDetails.html'

    })
    
    .when('/dashboard',{
        controller : "DashboardController",
        templateUrl : 'views/dashboard.html'
    })

    
});