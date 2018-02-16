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
    })
    .when('/sprints',{
        controller : "sprintsMetrics",
        templateUrl : 'views/sprint.html'
    })
    .when('/sprintExecutive',{
        controller : "sprintsMetricsExec",
        templateUrl : 'views/sprint_exec.html'
    });
    
});