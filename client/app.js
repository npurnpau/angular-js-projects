var myApp = angular.module('myApp',['ngRoute']);


myApp.config(function($routeProvider){
    $routeProvider.when('/', {
         controller : "BuildsController",
         templateUrl : 'views/metricsDetails.html'

     }) 
    .when('/builds', {
        controller : "DashboardController",
        templateUrl : 'views/dashboad.html'

    })    
    .when('/dashboard',{
        controller : "DashboardController",
        templateUrl : 'views/dashboad.html'
    });
});