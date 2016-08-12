var myApp=angular.module('EasyDonations');

myApp.controller('signUpController', function($scope,$http){
    
     

    $scope.isSame = function(){
        
        if($scope.orphanageSignupInfo.password != $scope.orphanageSignupInfo.confirmPassword)
        {    $scope.showButton=true;
           
            return false;
        }
        else
        {
            $scope.showButton=false;
            
            return true;
        }
    }
    
    

    $scope.signup = function() {
        
        $http.post("/auth/signup",$scope.signupInfo).success(function(response){
		 
		});
      };
    
     $scope.orphanageSignup = function() {
        
        
        $http.post("/auth/orphanageSignup",$scope.orphanageSignupInfo).success(function(response){
		 
		});
      };
});