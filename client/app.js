var myApp = angular.module('myApp',['ngRoute']);


myApp.config(function($routeProvider){
    $routeProvider.when('/', {
        controller : "DashboardController",
        templateUrl : 'views/dashboad.html'

     }) 
    .when('/builds', {
        controller : "BuildsController",
         templateUrl : 'views/metricsDetails.html'

    })    
    .when('/dashboard',{
        controller : "DashboardController",
        templateUrl : 'views/dashboad.html'
    });
    
});