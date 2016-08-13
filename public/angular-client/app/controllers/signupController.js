var myApp=angular.module('EasyDonations');

myApp.controller('signUpController', function($scope,$cookies,$window,$http){
    
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
        if($scope.donorSignupInfo.password!=$scope.donorSignupInfo.confirmPassword)
            alert("Re-enter Password! Both password did not match");
        else
        {
            $http.post("/auth/donorSignup",$scope.donorSignupInfo).success(function(response){
                console.log("inside post signup "+response);
	            $cookies.put("user", response.user.username);
                console.log("Signed status of" + $scope.sessionUser + " : " + $scope.isUserLoggedIn);
                console.log( $scope.isSignedup);
                $window.location.href = '/';
            });
        }
    };
    
     $scope.orphanageSignup = function() {
         $http.post("/auth/orphanageSignup",$scope.orphanageSignupInfo)
             .success(function(response){});
     };
     
});
    
