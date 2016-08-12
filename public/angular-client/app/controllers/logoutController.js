var myApp = angular.module('EasyDonations');

myApp.controller('logoutController', function($scope,$http,$cookies){
    console.log("inside logout");
    $scope.isUserLoggedIn = true;
    $scope.logout=function(){
        $http.post("/auth/signout").then(function successCallback(response) {
        $scope.userInfo=response.data.user.username;
        console.log("Seesion user in Logout Controller : " + response.data.user.username);
        $scope.sessionUser = $cookies.remove($cookies.get(response.data.user.username));
        $scope.isUserLoggedIn = false;
        }, function errorCallback(response) {
            console.log("logout failed!");
        });
    };
    
	});