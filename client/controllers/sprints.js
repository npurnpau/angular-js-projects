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
        }
        $scope.prd= response;
     },function errorCallback(response) {
    });

    $scope.getBuildDetails = function(build_no) {
        getBuildNumber.setProperty(build_no);
        $location.path('/builds');
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