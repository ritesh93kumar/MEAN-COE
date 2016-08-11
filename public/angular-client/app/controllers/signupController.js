var myApp=angular.module('EasyDonations');

myApp.controller('signUpController', function($scope,$http){
    
     $scope.signup = function() {
        
        $http.post("/auth/signup",$scope.signupInfo).success(function(response){
		 
		});
      };
});