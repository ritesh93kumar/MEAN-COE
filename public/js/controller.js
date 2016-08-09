var myApp = angular.module("EasyDonations",[]);

myApp.controller('loginController',function($scope,$http){
    console.log($scope.loginInfo);
    console.log("inside controller");
    
    $scope.login = function() {
       
        $http.post("/auth/login",$scope.loginInfo).then(function successCallback(response) {
            console.log(response.data.user.username);
            console.log(response.data.user.password);
            
        }, function errorCallback(response) {
            alert("invalid Username/password");
        });
      };
    
	});


myApp.controller('signUpController', function($scope,$http){
    
     $scope.signup = function() {
        
        $http.post("/auth/signup",$scope.signupInfo).success(function(response){
		 
		});
      };
});