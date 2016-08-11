var myApp = angular.module('EasyDonations',[]);

myApp.controller('loginController',function($scope,$http){
    console.log($scope.loginInfo);
    console.log("inside login controller");
    
    $scope.login = function() {
       
        $http.post("/auth/login",$scope.loginInfo).then(function successCallback(response) {
            console.log(response.data.user.username);
            console.log(response.data.user.password);
            
        }, function errorCallback(response) {
            alert("invalid Username/password");
        });
      };
    
	});