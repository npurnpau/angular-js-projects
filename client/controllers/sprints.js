var myApp = angular.module('myApp');

myApp.service("getComment", function () {
    var comment = '';
        return {
            getProperty: function () {
                return comment;
            },
            setProperty: function(value) {
                comment = value;
            }
        };
});

myApp.controller('sprintsMetrics', function ($scope, $http, $location, getBuildNumber, getComment){
   
    $http({
        method: 'GET',
        url: '/api/sprintMetrics/'
    }).then(function successCallback(response) {
        var arr = response.data;
        for(i=0;i<arr.length;i++){
            if(arr[i].comments == "NA"){
                arr[i].comments = "";
            }
            arr[i].buildDetails["0"].PROTRACTOR_passed = Math.floor((arr[i].buildDetails["0"].PROTRACTOR_passed)/(arr[i].buildDetails["0"].PROTRACTOR_total)*100);
            arr[i].buildDetails["0"].REST_passed = Math.floor((arr[i].buildDetails["0"].REST_passed)/(arr[i].buildDetails["0"].REST_total)*100);
            arr[i].buildDetails["0"].UI_passed = Math.floor((arr[i].buildDetails["0"].UI_passed)/(arr[i].buildDetails["0"].UI_total)*100);
            arr[i].buildDetails["0"].XTHJTH_passed = Math.floor((arr[i].buildDetails["0"].XTHJTH_passed)/(arr[i].buildDetails["0"].XTHJTH_total)*100);
        }
        $scope.prd= response;
     },function errorCallback(response) {
    });

    $scope.getBuildDetails = function(build_no) {
        getBuildNumber.setProperty(build_no);
        $location.path('/builds');
    };

    $scope.navigateToExecutive = function() {
         $location.path('/sprintExecutive');
    };

    $scope.updateComment = function($event, build_no) {
        getBuildNumber.setProperty(build_no);
        var comment = $event.currentTarget.value;
        if(comment == ""){
            getComment.setProperty("NA");
        }
        else{
            getComment.setProperty($event.currentTarget.value);
        }
        var data = {
            'build_no':  getBuildNumber.getProperty(),
            'comment': getComment.getProperty()
        };
        $http({
            method: 'PUT',
            url: '/api/updateComments/',
            data: data
        }).then(function successCallback(response) {
            $location.path('/sprints');
            },function errorCallback(response) {
        });
    };
});

myApp.controller('sprintsMetricsExec', function ($scope, $http, $location, getBuildNumber){

    $http({
        method: 'GET',
        url: '/api/sprintMetrics/'
    }).then(function successCallback(response) {
        var arr = response.data;
        for(i=0;i<arr.length;i++){
            if(arr[i].comments == "NA"){
                arr[i].comments = "";
            }
            arr[i].buildDetails["0"].PROTRACTOR_passed = Math.floor((arr[i].buildDetails["0"].PROTRACTOR_passed)/(arr[i].buildDetails["0"].PROTRACTOR_total)*100);
            arr[i].buildDetails["0"].REST_passed = Math.floor((arr[i].buildDetails["0"].REST_passed)/(arr[i].buildDetails["0"].REST_total)*100);
            arr[i].buildDetails["0"].UI_passed = Math.floor((arr[i].buildDetails["0"].UI_passed)/(arr[i].buildDetails["0"].UI_total)*100);
            arr[i].buildDetails["0"].XTHJTH_passed = Math.floor((arr[i].buildDetails["0"].XTHJTH_passed)/(arr[i].buildDetails["0"].XTHJTH_total)*100);
        }

        $scope.prd= response;
     },function errorCallback(response) {
    });

    $scope.getBuildDetails = function(build_no) {
        getBuildNumber.setProperty(build_no);
        $location.path('/builds');
    };

});