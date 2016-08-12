var myApp=angular.module('EasyDonations');

myApp.controller('signUpController', function($scope,$http){
    
     

    $scope.isSameOrphanage = function(){
        
        if($scope.orphanageSignupInfo.password != $scope.orphanageSignupInfo.confirmPassword)
        {    $scope.showButtonOrphanage=true;
           
            return false;
        }
        else
        {
            $scope.showButtonOrphanage=false;
            
            return true;
        }
    }
    
    $scope.isSameDonor = function(){
        
        if($scope.donorSignupInfo.password != $scope.donorSignupInfo.confirmPassword)
        {    $scope.showButtonDonor=true;
           
            return false;
        }
        else
        {
            $scope.showButtonDonor=false;
            
            return true;
        }
    }
    
    

    $scope.donorSignup = function() {
        
        $http.post("/auth/donorSignup",$scope.donorSignupInfo).success(function(response){
		 
		});
      };
    
     $scope.orphanageSignup = function() {
        
        
        $http.post("/auth/orphanageSignup",$scope.orphanageSignupInfo).success(function(response){
		 
		});
      };
});